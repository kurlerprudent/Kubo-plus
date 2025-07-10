import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

interface UploadSectionProps {
  triggerFileSelect: () => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export function UploadSection({
  triggerFileSelect,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  fileInputRef
}: UploadSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <UploadCloud className="h-5 w-5" />
        Upload X-Ray Images
      </h2>
      
      <div 
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 group hover:border-green-400 relative overflow-hidden border-gray-400"
        onClick={triggerFileSelect}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></div>
        
        <div className="relative z-10">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            <UploadCloud className="mx-auto h-12 w-12 mb-3 text-gray-500" />
          </motion.div>
          <input
            type="file"
            multiple
            accept="image/*,.dcm"
            className="hidden"
            id="file-upload"
            ref={fileInputRef}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300 border border-gray-500 text-gray-700 bg-transparent"
          >
            <UploadCloud className="h-4 w-4" />
            Select DICOM/JPEG Files
          </label>
          <p className="mt-2 text-sm text-gray-500">
            or drag and drop files here
          </p>
          <p className="text-xs mt-1 text-gray-500">
            Supports .dcm, .jpg, .png files
          </p>
        </div>
      </div>
    </div>
  );
}