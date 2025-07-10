import Image from "next/image";
import { X } from "lucide-react";
import { motion } from "framer-motion";

interface FileItemProps {
  file: File;
  index: number;
  removeFile: (index: number) => void;
  isAnalyzing: boolean;
  analysisComplete: boolean;
  result?: any;
  isActive: boolean;
}

export function SelectedFileItem({
  file,
  index,
  removeFile,
  isAnalyzing,
  analysisComplete,
  result,
  isActive
}: FileItemProps) {
  return (
    <div className={`rounded-xl overflow-hidden border transition-all duration-300 ${
      isActive 
        ? "ring-2 ring-green-400 border-transparent" 
        : "border-gray-300"
    }`}>
      <div className="p-4 flex flex-col bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 truncate">
            <span className="text-sm font-medium truncate">
              {file.name}
            </span>
          </div>
          <button
            onClick={() => removeFile(index)}
            className="text-red-500 hover:text-red-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100">
          {file.type.startsWith("image/") ? (
            <>
              <Image
                src={URL.createObjectURL(file)}
                alt="X-ray preview"
                layout="fill"
                objectFit="contain"
                className="bg-white"
              />
              
              {analysisComplete && result?.heatmapData && (
                <div className="absolute inset-0">
                  {result.heatmapData.map((point: any, i: number) => (
                    <div 
                      key={i}
                      className="absolute rounded-full opacity-70"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: `${point.radius}px`,
                        height: `${point.radius}px`,
                        backgroundColor: `rgba(255, ${Math.round(100 - point.intensity * 100)}, 0, ${point.intensity * 0.7})`,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 15px 5px rgba(255, ${Math.round(100 - point.intensity * 100)}, 0, ${point.intensity * 0.5})`,
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-4">
                <div className="h-12 w-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">DICOM</span>
                </div>
                <p className="text-gray-500">DICOM File</p>
              </div>
            </div>
          )}
          
          {analysisComplete && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.7)]">
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-white">
                    {result?.diagnosis}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    result?.diagnosis === "Normal" 
                      ? "bg-green-500" 
                      : "bg-red-500"
                  } text-white`}>
                    {result?.confidence}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {isAnalyzing && isActive && (
          <div className="mt-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
              className="h-1.5 rounded-full bg-green-400"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">
                Analyzing...
              </span>
              <span className="text-xs text-gray-500">
                AI Processing
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}