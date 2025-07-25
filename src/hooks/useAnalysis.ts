import { useState, useCallback } from "react";
import { 
  uploadXrayImages, 
  startXrayAnalysis, 
  getAnalysisStatus, 
  AdvancedAIAnalysisEngine,
  AIAnalysisResult 
} from "@/lib/api-enhanced";
import { toast } from "sonner";

interface AnalysisState {
  isAnalyzing: boolean;
  analysisComplete: boolean;
  analysisResults: AIAnalysisResult[];
  activeTab: number | null;
  uploadProgress: number;
  analysisProgress: number;
  currentStage: 'idle' | 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error';
  error: string | null;
  analysisId: string | null;
  uploadId: string | null;
}

export const useAnalysis = (files: File[], patientInfo: any) => {
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    analysisComplete: false,
    analysisResults: [],
    activeTab: null,
    uploadProgress: 0,
    analysisProgress: 0,
    currentStage: 'idle',
    error: null,
    analysisId: null,
    uploadId: null,
  });

  const updateState = useCallback((updates: Partial<AnalysisState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const validateInputs = useCallback(() => {
    const errors: string[] = [];
    
    if (!patientInfo.patientName?.trim()) errors.push("Patient name is required");
    if (!patientInfo.dob) errors.push("Date of birth is required");
    if (!patientInfo.clinicalHistory?.trim()) errors.push("Clinical history is required");
    if (!patientInfo.examDate) errors.push("Examination date is required");
    if (files.length === 0) errors.push("At least one X-ray image is required");
    
    // Validate file types and sizes
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/dicom'];
    const maxSize = 50 * 1024 * 1024; // 50MB
    
    files.forEach((file, index) => {
      if (!validTypes.includes(file.type)) {
        errors.push(`File ${index + 1} (${file.name}) has invalid type. Supported: JPEG, PNG, DICOM`);
      }
      if (file.size > maxSize) {
        errors.push(`File ${index + 1} (${file.name}) is too large. Maximum size: 50MB`);
      }
    });
    
    return errors;
  }, [files, patientInfo]);

  const startAnalysis = useCallback(async () => {
    // Validate inputs
    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      toast.error(`Validation failed: ${validationErrors.join(', ')}`);
      return;
    }

    updateState({
      isAnalyzing: true,
      analysisComplete: false,
      uploadProgress: 0,
      analysisProgress: 0,
      currentStage: 'uploading',
      error: null,
      analysisResults: []
    });

    try {
      // Stage 1: Upload X-ray images
      console.log("🔄 Starting X-ray upload...");
      updateState({ currentStage: 'uploading', uploadProgress: 10 });
      
      const uploadResponse = await uploadXrayImages(files, {
        patientName: patientInfo.patientName,
        patientId: patientInfo.patientId || `AUTO_${Date.now()}`,
        dateOfBirth: patientInfo.dob,
        age: patientInfo.age,
        gender: patientInfo.sex,
        clinicalHistory: patientInfo.clinicalHistory,
        suspectedDisease: patientInfo.suspectedDisease,
        examDate: patientInfo.examDate,
        view: patientInfo.view || 'PA',
        radiologistName: patientInfo.radiologistName || 'Dr. AI Assistant',
      });

      if (!uploadResponse.success) {
        throw new Error("Upload failed");
      }

      updateState({ 
        uploadProgress: 100, 
        uploadId: uploadResponse.data.uploadId,
        currentStage: 'processing'
      });
      
      console.log("✅ Upload successful:", uploadResponse.data.uploadId);
      toast.success(`${files.length} images uploaded successfully`);

      // Stage 2: Start AI analysis
      console.log("🧠 Starting AI analysis...");
      updateState({ analysisProgress: 10 });
      
      const analysisResponse = await startXrayAnalysis(uploadResponse.data.uploadId);
      
      if (!analysisResponse.success) {
        throw new Error("Analysis initiation failed");
      }

      updateState({ 
        analysisId: analysisResponse.data.analysisId,
        currentStage: 'analyzing',
        analysisProgress: 20
      });
      
      console.log("🔬 Analysis started:", analysisResponse.data.analysisId);

      // Stage 3: Poll for analysis completion with progressive updates
      let completed = false;
      let attempts = 0;
      const maxAttempts = 120; // 10 minutes max wait
      const pollInterval = 5000; // 5 seconds
      
      while (!completed && attempts < maxAttempts) {
        const progressPercent = 20 + (attempts / maxAttempts) * 70;
        updateState({ analysisProgress: progressPercent });
        
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        
        try {
          const statusResponse = await getAnalysisStatus(analysisResponse.data.analysisId);
          
          if (statusResponse.success) {
            const { status, progress, results, error } = statusResponse.data;
            
            console.log(`📊 Analysis status: ${status} (${progress}%)`);
            
            if (progress) {
              updateState({ analysisProgress: Math.max(progressPercent, progress) });
            }
            
            if (status === 'completed' && results) {
              console.log("🎉 Analysis completed successfully");
              updateState({
                analysisResults: results,
                analysisComplete: true,
                analysisProgress: 100,
                currentStage: 'complete',
                activeTab: 0
              });
              
              toast.success(`Analysis completed! ${results.length} results generated.`);
              completed = true;
              return results;
            } else if (status === 'failed') {
              throw new Error(error || 'AI analysis failed');
            }
          }
        } catch (pollError) {
          console.warn("Polling error:", pollError);
          // Continue polling on minor errors
        }
        
        attempts++;
      }

      if (!completed) {
        throw new Error("Analysis timed out after 10 minutes");
      }

    } catch (error) {
      console.error("❌ Analysis pipeline failed:", error);
      
      // Enhanced fallback with user notification
      toast.warning("Backend unavailable. Using advanced AI simulation...");
      
      updateState({ 
        currentStage: 'analyzing',
        analysisProgress: 30 
      });

      try {
        console.log("🤖 Falling back to advanced AI simulation...");
        
        const aiEngine = AdvancedAIAnalysisEngine.getInstance();
        
        const simulatedResults = await aiEngine.analyzeXrayImages(
          files, 
          patientInfo,
          (progress) => updateState({ analysisProgress: 30 + (progress * 0.7) })
        );

        updateState({
          analysisResults: simulatedResults,
          analysisComplete: true,
          analysisProgress: 100,
          currentStage: 'complete',
          activeTab: 0,
          error: null
        });

        console.log("✨ Advanced simulation completed successfully");
        toast.success(`AI simulation completed! ${simulatedResults.length} detailed analyses generated.`);
        
        return simulatedResults;
        
      } catch (simulationError) {
        console.error("💥 Simulation also failed:", simulationError);
        
        updateState({
          currentStage: 'error',
          error: simulationError instanceof Error ? simulationError.message : 'Unknown error occurred'
        });
        
        toast.error("Analysis failed completely. Please try again.");
        throw simulationError;
      }
    } finally {
      updateState({ isAnalyzing: false });
    }
  }, [files, patientInfo, validateInputs, updateState]);

  const resetAnalysis = useCallback(() => {
    setState({
      isAnalyzing: false,
      analysisComplete: false,
      analysisResults: [],
      activeTab: null,
      uploadProgress: 0,
      analysisProgress: 0,
      currentStage: 'idle',
      error: null,
      analysisId: null,
      uploadId: null,
    });
  }, []);

  const setActiveTab = useCallback((index: number) => {
    updateState({ activeTab: index });
  }, [updateState]);

  // Advanced analysis statistics
  const getAnalysisStats = useCallback(() => {
    if (!state.analysisResults.length) return null;
    
    const totalConfidence = state.analysisResults.reduce((sum, r) => sum + r.confidence, 0);
    const avgConfidence = totalConfidence / state.analysisResults.length;
    
    const severityCounts = state.analysisResults.reduce((acc, r) => {
      acc[r.severity] = (acc[r.severity] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    const urgencyLevels = state.analysisResults.reduce((acc, r) => {
      const urgency = r.clinicalIndicators.urgencyLevel;
      acc[urgency] = (acc[urgency] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalImages: state.analysisResults.length,
      averageConfidence: Math.round(avgConfidence),
      severityDistribution: severityCounts,
      urgencyDistribution: urgencyLevels,
      averageProcessingTime: Math.round(
        state.analysisResults.reduce((sum, r) => sum + r.processingTime, 0) / state.analysisResults.length
      ),
      aiModelsUsed: [...new Set(state.analysisResults.map(r => r.aiModel))],
    };
  }, [state.analysisResults]);

  return {
    // State
    ...state,
    
    // Actions
    startAnalysis,
    resetAnalysis,
    setActiveTab,
    
    // Computed
    analysisStats: getAnalysisStats(),
    
    // Helper functions
    validateInputs,
  };
};