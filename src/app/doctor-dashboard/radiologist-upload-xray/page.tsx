// pages/radiologist/upload-xray.tsx
"use client"
import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UploadCloud, X } from "lucide-react";
import { useState } from "react";

export default function UploadXRayPage() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <SidebarProvider>
      <RadiologistAppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/radiologist/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Upload X-Ray</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto">
          <div className="bg-white shadow p-6 rounded-xl">
            <h1 className="text-2xl font-bold mb-6">Upload Chest X-Ray Images</h1>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <input
                type="file"
                multiple
                accept="image/*,.dcm"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium"
              >
                Select DICOM/JPEG Files
              </label>
              <p className="text-gray-500 mt-2 text-sm">or drag and drop files here</p>
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Selected Files</h2>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end gap-4 mt-6">
                  <button className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Start Analysis
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}