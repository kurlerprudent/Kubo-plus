import { useState } from "react";
import { API_URLS } from "@/constants/index";

export const useAnalysis = (files: File[], patientInfo: any) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const startAnalysis = async () => {
    if (!patientInfo.patientName || !patientInfo.dob || !patientInfo.clinicalHistory) {
      throw new Error("Please fill all patient information fields");
    }

    setIsAnalyzing(true);

    try {
      // Real API integration would look like:
      // const formData = new FormData();
      // files.forEach(file => formData.append('files', file));
      // formData.append('patientInfo', JSON.stringify(patientInfo));
      //
      // const response = await fetch(API_URLS.ANALYZE, {
      //   method: 'POST',
      //   body: formData
      // });
      //
      // const results = await response.json();
      // setAnalysisResults(results);

      // Simulated analysis
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const results = files.map((_, index) => ({
        id: index,
        diagnosis: index % 2 === 0 ? "Normal" : "Pneumonia Detected",
        confidence: index % 2 === 0 ? 98 : 92,
        findings: index % 2 === 0 
          ? "No significant abnormalities detected." 
          : "Consolidation observed in the lower right lobe.",
        recommendations: index % 2 === 0 
          ? "Routine follow-up." 
          : "Further evaluation with CT scan advised.",
        severity: index % 2 === 0 ? 0 : 3,
        heatmapData: index % 2 === 0 ? null : [
          { x: 30, y: 70, radius: 20, intensity: 0.8 },
        ]
      }));

      setAnalysisResults(results);
      setAnalysisComplete(true);
      setActiveTab(0);
      return results;
    } catch (error) {
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    analysisComplete,
    analysisResults,
    activeTab,
    setActiveTab,
    startAnalysis
  };
};