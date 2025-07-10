import { HeartPulse, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResult } from "@/types/report";
import { ReportPreview } from "@/components/ReportPreview"

interface AnalysisResultsProps {
  analysisResults: AnalysisResult[];
  showReport: boolean;
  setShowReport: (value: boolean) => void;
  reportGenerated: boolean;
  reportContent: any;
  generatePDF: () => void;
  isGeneratingPDF: boolean;
  radiologistName: string;
  patientName: string;
  patientId: string;
  dob: string;
  age: string;
  sex: string;
  examDate: string;
  view: string;
  suspectedDisease: string;
  clinicalHistory: string;
  isTyping: boolean;
}

export function AnalysisResultsSection({
  analysisResults,
  showReport,
  setShowReport,
  reportGenerated,
  reportContent,
  generatePDF,
  isGeneratingPDF,
  radiologistName,
  patientName,
  patientId,
  dob,
  age,
  sex,
  examDate,
  view,
  suspectedDisease,
  clinicalHistory,
  isTyping
}: AnalysisResultsProps) {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 pt-6 border-t border-gray-300"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HeartPulse className="h-5 w-5" />
            Analysis Results
          </h2>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowReport(!showReport)}
              className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-400 text-gray-700 bg-gray-50 transition-colors duration-300"
            >
              {showReport ? "Hide Report" : "View Report"}
            </button>
            
            {reportGenerated && reportContent && (
              <button 
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className={`px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1 transition-colors duration-300 ${
                  isGeneratingPDF ? "opacity-70 cursor-not-allowed bg-green-300" : "bg-green-400"
                } text-gray-900`}
              >
                {isGeneratingPDF ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Preparing...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Download Report
                  </>
                )}
              </button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {analysisResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-5 border ${
                result.diagnosis === "Normal" 
                  ? "border-green-200" 
                  : "border-red-200"
              } bg-gray-50`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold">
                  {result.diagnosis}
                </h3>
                <span 
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    result.diagnosis === "Normal" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Confidence: {result.confidence}%
                </span>
              </div>
              
              <div className="mb-4">
                <p className="text-sm mb-1 flex items-center gap-1">
                  <span className="bg-gray-200 p-1 rounded">📋</span>
                  Findings:
                </p>
                <p className="text-sm text-gray-600">
                  {result.findings}
                </p>
              </div>
              
              <div>
                <p className="text-sm mb-1 flex items-center gap-1">
                  <span className="bg-gray-200 p-1 rounded">⚠️</span>
                  Recommendations:
                </p>
                <p className="text-sm text-gray-600">
                  {result.recommendations}
                </p>
              </div>
              
              {result.diagnosis !== "Normal" && (
                <div className="mt-4">
                  <p className="text-sm mb-2 flex items-center gap-1">
                    <span className="bg-gray-200 p-1 rounded">📊</span>
                    Severity:
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className={`h-1.5 rounded-full flex-1 ${
                          i < result.severity 
                            ? "bg-red-500" 
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Report Preview */}
        {showReport && reportContent && (
          <ReportPreview 
            reportContent={reportContent}
            radiologistName={radiologistName}
            patientName={patientName}
            patientId={patientId}
            dob={dob}
            age={age}
            sex={sex}
            examDate={examDate}
            view={view}
            suspectedDisease={suspectedDisease}
            clinicalHistory={clinicalHistory}
            isTyping={isTyping}
            isGeneratingPDF={isGeneratingPDF}
            generatePDF={generatePDF}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}