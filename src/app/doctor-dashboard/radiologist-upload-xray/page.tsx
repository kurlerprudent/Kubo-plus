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
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UploadCloud, X, ScanSearch, Activity, HeartPulse, Search, Download, User, Stethoscope, Calendar, Clipboard, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import Rside from "@/components/header-right-side";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Typewriter } from 'react-simple-typewriter';
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import jsPDF from "jspdf";

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
        <header 
          className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 z-10"
          style={{ backgroundColor: colors.background2 }}
        >
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/radiologist/dashboard" 
                  className="hover:text-[#00FF9C]"
                  style={{ color: colors.textColor }}
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage style={{ color: colors.textColor }}>
                  Upload X-Ray
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search cases..."
                className="sm:hidden md:flex pl-10 pr-4 py-2 rounded-full bg-white/70 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm w-48 transition-all duration-300 hover:w-52"
              />
            </div>
            
            <Rside />
          </div>
        </header>

        <div 
          className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto min-h-screen"
          style={{ backgroundColor: colors.background1 }}
        >
          <div 
            className="p-6 rounded-xl shadow-sm border border-[#e0e0e0]"
            style={{ backgroundColor: colors.background3 }}
          >
            <h1 
              className="text-2xl font-bold mb-6"
              style={{ color: colors.textColor }}
            >
              Upload Chest X-Ray Images
            </h1>
            
            {/* Patient Information Form */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textColor }}>
                <User className="h-5 w-5" />
                Patient Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="radiologist" className="flex items-center gap-1 mb-1">
                    <Stethoscope className="h-4 w-4" />
                    Radiologist
                  </Label>
                  <Input 
                    id="radiologist"
                    value={radiologistName}
                    onChange={(e) => setRadiologistName(e.target.value)}
                    className="bg-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="patient" className="flex items-center gap-1 mb-1">
                    <User className="h-4 w-4" />
                    Patient Name
                  </Label>
                  <Input 
                    id="patient"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="bg-white"
                    placeholder="Full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="patientId" className="flex items-center gap-1 mb-1">
                    <User className="h-4 w-4" />
                    Patient ID
                  </Label>
                  <Input 
                    id="patientId"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="bg-white"
                    placeholder="Optional"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dob" className="flex items-center gap-1 mb-1">
                    <CalendarIcon className="h-4 w-4" />
                    Date of Birth
                  </Label>
                  <Input 
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="bg-white"
                    required
                  />
                  {age && (
                    <p className="text-xs mt-1" style={{ color: colors.textColorSecondary }}>
                      Age: {age} years
                    </p>
                  )}
                </div>
                
                <div>
                  <Label className="flex items-center gap-1 mb-1">
                    <User className="h-4 w-4" />
                    Sex
                  </Label>
                  <RadioGroup 
                    value={sex} 
                    onValueChange={setSex}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="history" className="flex items-center gap-1 mb-1">
                    <Clipboard className="h-4 w-4" />
                    Clinical History
                  </Label>
                  <Textarea 
                    id="history"
                    value={clinicalHistory}
                    onChange={(e) => setClinicalHistory(e.target.value)}
                    className="bg-white min-h-[80px]"
                    placeholder="Patient symptoms, medical history, etc."
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="suspected" className="flex items-center gap-1 mb-1">
                    <AlertTriangle className="h-4 w-4" />
                    Suspected Condition
                  </Label>
                  <Input 
                    id="suspected"
                    value={suspectedDisease}
                    onChange={(e) => setSuspectedDisease(e.target.value)}
                    className="bg-white"
                    placeholder="e.g., Pneumonia"
                  />
                </div>
                
                <div>
                  <Label htmlFor="examDate" className="flex items-center gap-1 mb-1">
                    <CalendarIcon className="h-4 w-4" />
                    Exam Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white",
                          !examDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {examDate ? format(new Date(examDate), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={new Date(examDate)}
                        onSelect={(date) => date && setExamDate(date.toISOString().split('T')[0])}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="view" className="flex items-center gap-1 mb-1">
                    <ScanSearch className="h-4 w-4" />
                    View
                  </Label>
                  <RadioGroup 
                    value={view} 
                    onValueChange={setView}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="PA" id="pa" />
                      <Label htmlFor="pa">PA</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AP" id="ap" />
                      <Label htmlFor="ap">AP</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Lateral" id="lateral" />
                      <Label htmlFor="lateral">Lateral</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            {/* Upload Section - Redesigned */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textColor }}>
                <UploadCloud className="h-5 w-5" />
                Upload X-Ray Images
              </h2>
              
              <div 
                className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 group hover:border-[#00FF9C] relative overflow-hidden"
                style={{ borderColor: colors.textColorSecondary }}
                onClick={triggerFileSelect}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f0fdf4] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <UploadCloud className="mx-auto h-12 w-12 mb-3" style={{ color: colors.textColorSecondary }} />
                  </motion.div>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.dcm"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    ref={fileInputRef}
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300 border"
                    style={{ 
                      borderColor: colors.textColorSecondary,
                      color: colors.textColor,
                      backgroundColor: 'transparent'
                    }}
                  >
                    <UploadCloud className="h-4 w-4" />
                    Select DICOM/JPEG Files
                  </label>
                  <p 
                    className="mt-2 text-sm"
                    style={{ color: colors.textColorSecondary }}
                  >
                    or drag and drop files here
                  </p>
                  <p className="text-xs mt-1" style={{ color: colors.textColorSecondary }}>
                    Supports .dcm, .jpg, .png files
                  </p>
                </div>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-6">
                <h2 
                  className="text-lg font-semibold"
                  style={{ color: colors.textColor }}
                >
                  Selected Files
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <div 
                      key={index} 
                      className={`rounded-xl overflow-hidden border transition-all duration-300 ${
                        activeTab === index 
                          ? "ring-2 ring-[#00FF9C] border-transparent" 
                          : "border-[#e0e0e0]"
                      }`}
                    >
                      <div 
                        className="p-4 flex flex-col"
                        style={{ backgroundColor: colors.background2 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 truncate">
                            <span 
                              className="text-sm font-medium truncate"
                              style={{ color: colors.textColor }}
                            >
                              {file.name}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-[#ff6b6b] hover:text-[#ff5252] transition-colors"
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
                              
                              {/* Heatmap Overlay */}
                              {analysisComplete && analysisResults[index]?.heatmapData && (
                                <div className="absolute inset-0">
                                  {analysisResults[index].heatmapData.map((point: any, i: number) => (
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
                                <ScanSearch className="h-12 w-12 mx-auto mb-2" style={{ color: colors.textColorSecondary }} />
                                <p style={{ color: colors.textColorSecondary }}>DICOM File</p>
                              </div>
                            </div>
                          )}
                          
                          {analysisComplete && (
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.7)]">
                              <div className="absolute bottom-2 left-2 right-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-semibold text-white">
                                    {analysisResults[index]?.diagnosis}
                                  </span>
                                  <span 
                                    className={`text-xs px-2 py-1 rounded-full ${
                                      analysisResults[index]?.diagnosis === "Normal" 
                                        ? "bg-green-500" 
                                        : "bg-red-500"
                                    } text-white`}
                                  >
                                    {analysisResults[index]?.confidence}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {isAnalyzing && index === activeTab && (
                          <div className="mt-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 3.5, ease: "easeInOut" }}
                              className="h-1.5 rounded-full"
                              style={{ backgroundColor: colors.primaryBtn }}
                            />
                            <div className="flex justify-between mt-1">
                              <span className="text-xs" style={{ color: colors.textColorSecondary }}>
                                Analyzing...
                              </span>
                              <span className="text-xs" style={{ color: colors.textColorSecondary }}>
                                AI Processing
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end gap-4 mt-8">
                  <button 
                    onClick={() => setFiles([])}
                    className="px-6 py-2 border rounded-full text-sm font-medium transition-colors duration-300"
                    style={{ 
                      borderColor: colors.textColorSecondary,
                      color: colors.textColor,
                      backgroundColor: colors.background2
                    }}
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={startAnalysis}
                    disabled={isAnalyzing || files.length === 0 || !patientName || !dob || !clinicalHistory}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300 disabled:opacity-70",
                      !patientName || !dob || !clinicalHistory ? "opacity-70 cursor-not-allowed" : ""
                    )}
                    style={{ 
                      backgroundColor: isAnalyzing ? colors.primaryBtnHover : colors.primaryBtn,
                      color: colors.textColor
                    }}
                  >
                    {isAnalyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Activity className="h-4 w-4" />
                        </motion.div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <ScanSearch className="h-4 w-4" />
                        Start Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {analysisComplete && (
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 pt-6 border-t"
                  style={{ borderColor: colors.textColorSecondary }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 
                      className="text-xl font-bold flex items-center gap-2"
                      style={{ color: colors.textColor }}
                    >
                      <HeartPulse className="h-5 w-5" />
                      Analysis Results
                    </h2>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setShowReport(!showReport)}
                        className="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-300"
                        style={{ 
                          borderColor: colors.textColorSecondary,
                          color: colors.textColor,
                          backgroundColor: colors.background2
                        }}
                      >
                        {showReport ? "Hide Report" : "View Report"}
                      </button>
                      
                      {reportGenerated && reportContent && (
                        <button 
                          onClick={generatePDF}
                          disabled={isGeneratingPDF}
                          className={cn(
                            "px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1 transition-colors duration-300",
                            isGeneratingPDF ? "opacity-70 cursor-not-allowed" : ""
                          )}
                          style={{ 
                            backgroundColor: colors.primaryBtn,
                            color: colors.textColor
                          }}
                        >
                          {isGeneratingPDF ? (
                            <>
                              <Activity className="h-4 w-4 animate-spin" />
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
                        }`}
                        style={{ backgroundColor: colors.background2 }}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold" style={{ color: colors.textColor }}>
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
                          <p className="text-sm mb-1 flex items-center gap-1" style={{ color: colors.textColor }}>
                            <Clipboard className="h-4 w-4" />
                            Findings:
                          </p>
                          <p className="text-sm" style={{ color: colors.textColorSecondary }}>
                            {result.findings}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm mb-1 flex items-center gap-1" style={{ color: colors.textColor }}>
                            <AlertTriangle className="h-4 w-4" />
                            Recommendations:
                          </p>
                          <p className="text-sm" style={{ color: colors.textColorSecondary }}>
                            {result.recommendations}
                          </p>
                        </div>
                        
                        {result.diagnosis !== "Normal" && (
                          <div className="mt-4">
                            <p className="text-sm mb-2 flex items-center gap-1" style={{ color: colors.textColor }}>
                              <Activity className="h-4 w-4" />
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
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h2 className="text-2xl font-bold" style={{ color: colors.textColor }}>
                            Radiology Report
                          </h2>
                          <p className="text-sm" style={{ color: colors.textColorSecondary }}>
                            Generated on {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-semibold" style={{ color: colors.textColor }}>
                            {radiologistName}
                          </div>
                          <div className="text-sm" style={{ color: colors.textColorSecondary }}>
                            Board Certified Radiologist
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                          <h3 className="font-semibold mb-2" style={{ color: colors.textColor }}>
                            Patient Information
                          </h3>
                          <div className="space-y-1 text-sm" style={{ color: colors.textColorSecondary }}>
                            <div><span className="font-medium">Name:</span> {patientName}</div>
                            <div><span className="font-medium">ID:</span> {patientId || 'N/A'}</div>
                            <div><span className="font-medium">DOB:</span> {dob} ({age} years)</div>
                            <div><span className="font-medium">Sex:</span> {sex === 'male' ? 'Male' : 'Female'}</div>
                            <div><span className="font-medium">Exam Date:</span> {examDate}</div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-2" style={{ color: colors.textColor }}>
                            Clinical History
                          </h3>
                          <p className="text-sm" style={{ color: colors.textColorSecondary }}>
                            {clinicalHistory || "N/A"}
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-2" style={{ color: colors.textColor }}>
                            Exam Details
                          </h3>
                          <div className="space-y-1 text-sm" style={{ color: colors.textColorSecondary }}>
                            <div><span className="font-medium">Modality:</span> Chest X-Ray (CXR)</div>
                            <div><span className="font-medium">View:</span> {view}</div>
                            <div><span className="font-medium">Suspected Condition:</span> {suspectedDisease || "N/A"}</div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textColor }}>
                        <Clipboard className="h-5 w-5" />
                        Clinical Indication
                      </h3>
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm">{clinicalHistory || "N/A"}</p>
                      </div>

                      <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textColor }}>
                        <Activity className="h-5 w-5" />
                        Findings
                      </h3>
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg whitespace-pre-wrap min-h-[200px]">
                        {isTyping ? (
                          <div className="text-sm">
                            <Typewriter
                              words={[reportContent.findings]}
                              loop={1}
                              typeSpeed={50}
                              cursor
                              cursorStyle="_"
                            />
                          </div>
                        ) : (
                          <div 
                            className="text-sm" 
                            dangerouslySetInnerHTML={{ 
                              __html: reportContent.findings.replace(/\*\*/g, "") 
                            }} 
                          />
                        )}
                      </div>

                      <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: colors.textColor }}>
                        <AlertTriangle className="h-5 w-5" />
                        Impression
                      </h3>
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        {isTyping ? (
                          <p className="text-sm">
                            <Typewriter
                              words={[reportContent.impression]}
                              loop={1}
                              typeSpeed={50}
                              cursor
                              cursorStyle="_"
                            />
                          </p>
                        ) : (
                          <p className="text-sm">{reportContent.impression}</p>
                        )}
                      </div>
                      
                      <div className="pt-4 border-t text-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold" style={{ color: colors.textColor }}>
                              Radiologist
                            </div>
                            <p style={{ color: colors.textColorSecondary }}>
                              {reportContent.radiologistName}
                            </p>
                            <p className="mt-2" style={{ color: colors.textColorSecondary }}>
                              Date: {reportContent.reportDate}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end">
                            <div className="h-16 w-48 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
                              <p className="text-xs text-gray-500">Digital Signature</p>
                            </div>
                            <p className="text-xs" style={{ color: colors.textColorSecondary }}>
                              Board Certified Radiologist
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 pt-4 border-t flex justify-end">
                        <button 
                          onClick={generatePDF}
                          disabled={isGeneratingPDF}
                          className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300",
                            isGeneratingPDF ? "opacity-70 cursor-not-allowed" : ""
                          )}
                          style={{ 
                            backgroundColor: colors.primaryBtn,
                            color: colors.textColor
                          }}
                        >
                          {isGeneratingPDF ? (
                            <>
                              <Activity className="h-4 w-4 animate-spin" />
                              Preparing PDF...
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4" />
                              Download Full Report
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}