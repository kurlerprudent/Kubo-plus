import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const MotionButton = motion(Button);
import { Loader2, Upload, Brain, CheckCircle } from "lucide-react";
import { COLORS } from "@/constants/colors";

interface AnalysisControlsProps {
  // For the doctor dashboard version
  filesCount?: number;
  isValidPatientInfo?: boolean;
  onClearAll?: () => void;
  
  // For the demo version
  files?: File[];
  onFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile?: (index: number) => void;
  
  // Common props
  isAnalyzing: boolean;
  onStartAnalysis: () => void;
  uploadProgress?: number;
  analysisProgress?: number;
  currentStage?: 'idle' | 'uploading' | 'processing' | 'analyzing' | 'complete' | 'error';
}

export const AnalysisControls = ({
  // Doctor dashboard props
  filesCount,
  isValidPatientInfo,
  onClearAll,
  
  // Demo props  
  files,
  onFileUpload,
  onRemoveFile,
  
  // Common props
  isAnalyzing,
  onStartAnalysis,
  uploadProgress = 0,
  analysisProgress = 0,
  currentStage = 'idle'
}: AnalysisControlsProps) => {
  const isDemoMode = !!files;
  const actualFilesCount = isDemoMode ? files?.length || 0 : filesCount || 0;
  const getProgressMessage = () => {
    if (!isAnalyzing) return "";
    
    if (uploadProgress < 100) {
      return "Uploading X-ray images...";
    } else if (analysisProgress < 100) {
      return "AI analyzing X-ray images...";
    } else {
      return "Analysis complete!";
    }
  };

  const getProgressIcon = () => {
    if (!isAnalyzing) return null;
    
    if (uploadProgress < 100) {
      return <Upload className="mr-2 h-4 w-4" />;
    } else if (analysisProgress < 100) {
      return <Brain className="mr-2 h-4 w-4" />;
    } else {
      return <CheckCircle className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <motion.div 
      className="mt-8 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress indicators when analyzing */}
      {isAnalyzing && (
        <motion.div 
          className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center text-sm text-blue-700 font-medium">
            {getProgressIcon()}
            {getProgressMessage()}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-blue-600">
              <span>Upload Progress</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-blue-600">
              <span>AI Analysis Progress</span>
              <span>{Math.round(analysisProgress)}%</span>
            </div>
            <Progress value={analysisProgress} className="h-2" />
          </div>
        </motion.div>
      )}

      {/* Control buttons */}
      <div className="flex justify-end gap-4">
        {onClearAll && (
          <Button
            variant="outline"
            onClick={onClearAll}
            disabled={isAnalyzing || actualFilesCount === 0}
            className="px-6 py-2"
            style={{ 
              borderColor: COLORS.border,
              color: COLORS.text.secondary
            }}
          >
            Clear All
          </Button>
        )}
        
        {/* Demo mode file upload */}
        {isDemoMode && (
          <>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onFileUpload}
              className="hidden"
              id="demo-file-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('demo-file-upload')?.click()}
              disabled={isAnalyzing}
              className="px-6 py-2"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload X-rays
            </Button>
          </>
        )}
        
        <MotionButton
          onClick={onStartAnalysis}
          disabled={isAnalyzing || actualFilesCount === 0 || (!isDemoMode && !isValidPatientInfo)}
          className="px-6 py-2"
          style={{ 
            backgroundColor: (isDemoMode || isValidPatientInfo) && !isAnalyzing 
              ? COLORS.accent.primary 
              : COLORS.accent.tertiary,
            color: 'white'
          }}
          whileHover={{ scale: isAnalyzing ? 1 : 1.03 }}
          whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Start AI Analysis
            </>
          )}
        </MotionButton>
      </div>
    </motion.div>
  );
};