// pages/radiologist/upload-xray.tsx
"use client";
import { RadiologistAppSidebar } from "@/components/app-sidebar-doctor";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { useState, useRef, useEffect } from "react";

import jsPDF from "jspdf";
import { AnalysisResultsSection } from "@/components/AnalysisResultsSection";
import { SelectedFileItem } from "@/components/SelectedFileItem";
import { UploadSection } from "@/components/UploadSection";
import { PatientInformationForm } from "@/components/PatientInformationForm";

const colors = {
  primaryBtn: "#00FF9C",
  primaryBtnHover: "#B6FFA1",
  textColor: "#26355D",
  textColorSecondary: "#6B7280",
  background1: "#F2F2F2",
  background2: "#F5F5F5",
  background3: "#F2EFE7",
};

export default function UploadXRayPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Patient information form state
  const [radiologistName, setRadiologistName] = useState<string>('Dr. Jane Smith');
  const [patientName, setPatientName] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [clinicalHistory, setClinicalHistory] = useState<string>('');
  const [suspectedDisease, setSuspectedDisease] = useState<string>('pneumonia');
  const [age, setAge] = useState<string>('');
  const [sex, setSex] = useState<string>('male');
  const [examDate, setExamDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState<string>('PA');
  
  // Report state
  const [reportContent, setReportContent] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
      setAnalysisComplete(false);
      setAnalysisResults([]);
      setReportGenerated(false);
      setShowReport(false);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (newFiles.length === 0) {
      setAnalysisComplete(false);
      setAnalysisResults([]);
      setReportGenerated(false);
      setShowReport(false);
    }
  };

  const startAnalysis = () => {
    if (!patientName || !dob || !clinicalHistory) {
      alert("Please fill all patient information fields");
      return;
    }
    
    setIsAnalyzing(true);
    setReportGenerated(false);
    setShowReport(false);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setAnalysisResults(
        files.map((file, index) => ({
          id: index,
          diagnosis: index % 2 === 0 ? "Normal" : "Pneumonia Detected",
          confidence: index % 2 === 0 ? 98 : 92,
          findings: index % 2 === 0 
            ? "No significant abnormalities detected. Lung fields are clear with normal cardiac silhouette and mediastinum." 
            : "Consolidation observed in the lower right lobe with associated air bronchograms. Mild pleural effusion noted.",
          recommendations: index % 2 === 0 
            ? "Routine follow-up recommended in 6 months." 
            : "Further evaluation with CT scan advised. Consider antibiotic therapy and repeat chest X-ray in 2 weeks.",
          severity: index % 2 === 0 ? 0 : 3,
          heatmapData: index % 2 === 0 ? null : [
            { x: 30, y: 70, radius: 20, intensity: 0.8 },
            { x: 35, y: 65, radius: 15, intensity: 0.6 },
            { x: 40, y: 75, radius: 25, intensity: 0.9 },
          ]
        }))
      );
      setActiveTab(0);
      
      // Simulate report generation
      setTimeout(() => {
        setReportGenerated(true);
        generateReportContent();
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }, 2000);
    }, 3500);
  };

  // Generate report content based on analysis results
  const generateReportContent = () => {
    const lungFindings = analysisResults[0].findings;
    const isNormal = !analysisResults.some(r => r.diagnosis !== "Normal");
    
    const content = {
      patientName,
      patientId,
      examDate,
      view,
      clinicalHistory,
      radiologistName,
      findings: `- Lungs and Pleura:  
  ${lungFindings}

- Cardiac Silhouette and Mediastinum:  
  Normal heart size. No mediastinal widening.

- Bones and Soft Tissues:  
  No rib fractures or lytic lesions. Soft tissues unremarkable.

- Diaphragm and Costophrenic Angles:  
  Diaphragms are normal in contour. Costophrenic angles are sharp.

- Devices (if any):  
  No lines/tubes/devices seen.`,
      impression: isNormal 
        ? "No acute cardiopulmonary abnormality." 
        : "Findings consistent with pulmonary pathology. Clinical correlation advised.",
      reportDate: new Date().toISOString().split('T')[0]
    };
    
    setReportContent(content);
    return content;
  };

  // Generate PDF using jsPDF
  const generatePDF = () => {
    if (!reportContent) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("RADIOLOGY REPORT", 105, 20, { align: "center" });
      
      // Add patient information
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      
      let yPos = 35;
      
      doc.text(`Patient Name: ${reportContent.patientName}`, 20, yPos);
      doc.text(`Patient ID: ${reportContent.patientId || 'N/A'}`, 20, yPos + 8);
      doc.text(`Date of Study: ${reportContent.examDate}`, 20, yPos + 16);
      doc.text(`Modality: Chest X-Ray (CXR)`, 20, yPos + 24);
      doc.text(`View: ${reportContent.view}`, 20, yPos + 32);
      
      yPos += 45;
      
      // Add clinical indication
      doc.setFont("helvetica", "bold");
      doc.text("Clinical Indication:", 20, yPos);
      doc.setFont("helvetica", "normal");
      const clinicalLines = doc.splitTextToSize(reportContent.clinicalHistory, 170);
      doc.text(clinicalLines, 20, yPos + 8);
      yPos += clinicalLines.length * 7 + 15;
      
      // Add findings
      doc.setFont("helvetica", "bold");
      doc.text("Findings:", 20, yPos);
      doc.setFont("helvetica", "normal");
      const findingsLines = doc.splitTextToSize(reportContent.findings.replace(/\*\*/g, ""), 170);
      doc.text(findingsLines, 20, yPos + 8);
      yPos += findingsLines.length * 7 + 15;
      
      // Add impression
      doc.setFont("helvetica", "bold");
      doc.text("Impression:", 20, yPos);
      doc.setFont("helvetica", "normal");
      doc.text(reportContent.impression, 20, yPos + 8);
      yPos += 20;
      
      // Add signature
      doc.setFont("helvetica", "bold");
      doc.text(`Radiologist Name: ${reportContent.radiologistName}`, 20, yPos);
      doc.text("_____________________________", 20, yPos + 20);
      doc.text("Signature", 20, yPos + 30);
      doc.text(`Date of Report Generation: ${reportContent.reportDate}`, 20, yPos + 40);
      
      // Save the PDF
      doc.save(`Radiology_Report_${patientName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "#eafaf5";
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "";
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...newFiles]);
      setAnalysisComplete(false);
      setAnalysisResults([]);
      setReportGenerated(false);
      setShowReport(false);
    }
  };

  // Calculate age from DOB
  useEffect(() => {
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge.toString());
    }
  }, [dob]);

  return (
  <SidebarProvider>
      <RadiologistAppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 z-10 bg-gray-100">
          {/* Header content remains the same */}
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto min-h-screen bg-gray-50">
          <div className="p-6 rounded-xl shadow-sm border border-gray-200 bg-white">
            <h1 className="text-2xl font-bold mb-6">
              Upload Chest X-Ray Images
            </h1>
            
            <PatientInformationForm 
              radiologistName={radiologistName}
              setRadiologistName={setRadiologistName}
              patientName={patientName}
              setPatientName={setPatientName}
              patientId={patientId}
              setPatientId={setPatientId}
              dob={dob}
              setDob={setDob}
              age={age}
              sex={sex}
              setSex={setSex}
              clinicalHistory={clinicalHistory}
              setClinicalHistory={setClinicalHistory}
              suspectedDisease={suspectedDisease}
              setSuspectedDisease={setSuspectedDisease}
              examDate={examDate}
              setExamDate={setExamDate}
              view={view}
              setView={setView}
            />
            
            <UploadSection 
              triggerFileSelect={triggerFileSelect}
              handleDragOver={handleDragOver}
              handleDragLeave={handleDragLeave}
              handleDrop={handleDrop}
              fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
            />

            {files.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">
                  Selected Files
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <SelectedFileItem
                      key={index}
                      file={file}
                      index={index}
                      removeFile={removeFile}
                      isAnalyzing={isAnalyzing}
                      analysisComplete={analysisComplete}
                      result={analysisResults[index]}
                      isActive={activeTab === index}
                    />
                  ))}
                </div>
                
                <div className="flex justify-end gap-4 mt-8">
                  <button 
                    onClick={() => setFiles([])}
                    className="px-6 py-2 border border-gray-400 rounded-full text-sm font-medium transition-colors duration-300 text-gray-700 bg-gray-50"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={startAnalysis}
                    disabled={isAnalyzing || files.length === 0 || !patientName || !dob || !clinicalHistory}
                    className={`px-6 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300 ${
                      isAnalyzing || !patientName || !dob || !clinicalHistory
                        ? "bg-green-300 cursor-not-allowed" 
                        : "bg-green-400"
                    } text-gray-900`}
                  >
                    {isAnalyzing ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <span>🔍</span>
                        Start Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {analysisComplete && (
              <AnalysisResultsSection 
                analysisResults={analysisResults}
                showReport={showReport}
                setShowReport={setShowReport}
                reportGenerated={reportGenerated}
                reportContent={reportContent}
                generatePDF={generatePDF}
                isGeneratingPDF={isGeneratingPDF}
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
              />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}