import { useState, useRef } from "react";
import { VALID_FILE_TYPES, MAX_FILE_SIZE } from "@/constants";

export const useFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const validFiles = Array.from(selectedFiles).filter(
      (file) =>
        VALID_FILE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
    );

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setFiles([]);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return {
    files,
    fileInputRef,
    isDragging,
    handleFileSelect,
    removeFile,
    clearAllFiles,
    triggerFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};