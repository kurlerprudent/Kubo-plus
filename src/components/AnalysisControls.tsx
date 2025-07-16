import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MotionButton = motion(Button);
import { Loader2 } from "lucide-react";
import { COLORS } from "@/constants/colors";

interface AnalysisControlsProps {
  filesCount: number;
  isAnalyzing: boolean;
  isValidPatientInfo: boolean;
  onClearAll: () => void;
  onStartAnalysis: () => void;
}

export const AnalysisControls = ({
  filesCount,
  isAnalyzing,
  isValidPatientInfo,
  onClearAll,
  onStartAnalysis
}: AnalysisControlsProps) => (
  <motion.div 
    className="flex justify-end gap-4 mt-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Button
      variant="outline"
      onClick={onClearAll}
      disabled={isAnalyzing || filesCount === 0}
      className="px-6 py-2"
      style={{ 
        borderColor: COLORS.border,
        color: COLORS.text.secondary
      }}
    >
      Clear All
    </Button>
    <MotionButton
      onClick={onStartAnalysis}
      disabled={isAnalyzing || filesCount === 0 || !isValidPatientInfo}
      className="px-6 py-2"
      style={{ 
        backgroundColor: isValidPatientInfo && !isAnalyzing 
          ? COLORS.accent.primary 
          : COLORS.accent.tertiary,
        color: 'white'
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {isAnalyzing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        "Start Analysis"
      )}
    </MotionButton>
  </motion.div>
);