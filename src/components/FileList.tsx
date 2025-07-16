import { motion } from "framer-motion";
import { X } from "lucide-react";
import { COLORS } from "@/constants/colors";

interface FileListProps {
  files: File[];
  removeFile: (index: number) => void;
  isAnalyzing: boolean;
  analysisComplete: boolean;
  analysisResults: any[];
  activeTab: number | null;
  setActiveTab: (index: number) => void;
}

export const FileList = ({
  files,
  removeFile,
  isAnalyzing,
  analysisComplete,
  analysisResults,
  activeTab,
  setActiveTab
}: FileListProps) => (
  <div className="space-y-6">
    <h2 className="text-lg font-semibold" style={{ color: COLORS.text.primary }}>
      Selected Files ({files.length})
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((file, index) => (
        <motion.div
          key={index}
          className={`border rounded-lg overflow-hidden transition-all duration-300 ${
            activeTab === index ? "ring-2 ring-blue-400" : ""
          }`}
          style={{ 
            backgroundColor: COLORS.background.primary,
            borderColor: COLORS.border
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div 
            className="p-4 flex justify-between items-start"
            onClick={() => setActiveTab(index)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="min-w-0">
                  <p 
                    className="font-medium truncate" 
                    style={{ color: COLORS.text.primary }}
                  >
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              {analysisComplete && analysisResults[index] && (
                <div className="mt-2">
                  <div className="flex items-center">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        analysisResults[index].diagnosis === "Normal" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {analysisResults[index].diagnosis}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      {analysisResults[index].confidence}% confidence
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {!isAnalyzing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);