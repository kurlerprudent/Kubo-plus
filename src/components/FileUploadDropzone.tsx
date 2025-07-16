import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import { COLORS } from "@/constants/colors";

interface FileUploadDropzoneProps {
  isDragging: boolean;
  triggerFileSelect: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent) => void;
}

export const FileUploadDropzone = ({
  isDragging,
  triggerFileSelect,
  handleDragOver,
  handleDragLeave,
  handleDrop
}: FileUploadDropzoneProps) => (
  <motion.div
    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-300 ${
      isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
    }`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    onClick={triggerFileSelect}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    style={{ backgroundColor: isDragging ? COLORS.accent.tertiary : COLORS.background.primary }}
  >
    <div className="flex flex-col items-center justify-center space-y-4">
      <UploadCloud 
        className={`h-12 w-12 ${isDragging ? "text-blue-500" : "text-gray-400"}`} 
      />
      <div className="space-y-2">
        <h3 className="text-lg font-medium" style={{ color: COLORS.text.primary }}>
          {isDragging ? "Drop files here" : "Upload DICOM or X-Ray images"}
        </h3>
        <p className="text-sm" style={{ color: COLORS.text.secondary }}>
          Drag & drop files or click to browse
        </p>
        <p className="text-xs text-gray-500">
          Supported formats: JPEG, PNG, DICOM • Max size: 100MB
        </p>
      </div>
      <Button 
        variant="outline" 
        className="mt-4"
        style={{ 
          backgroundColor: COLORS.accent.primary,
          color: 'white',
          borderColor: COLORS.accent.secondary
        }}
      >
        Select Files
      </Button>
    </div>
  </motion.div>
);