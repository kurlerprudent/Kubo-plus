import { usePatientInfo } from "@/hooks/usePatientInfo";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useAnalysis } from "../hooks/useAnalysis";
import { useReportPDF } from "@/hooks/useReportPDF";
import { PatientInformationForm } from "@/components/PatientInformationForm";
import { FileUploadDropzone } from "@/components/FileUploadDropzone";
import { FileList } from "@/components/FileList";
import { AnalysisControls } from "@/components/AnalysisControls";
import { ReportPanel } from "@/components/ReportPanel";
import { COLORS } from "@/constants/colors";
import { useState } from "react";
import { useRouter } from "next/navigation";

type DemoViewerProps = {
  onStepChange?: (step: number) => void;
};

const DemoViewer = ({ onStepChange }: DemoViewerProps) => {
  const router = useRouter();
  const [showReport, setShowReport] = useState(false);

  // Hooks for state management
  const patientInfo = usePatientInfo();
  const fileUpload = useFileUpload();
  const analysis = useAnalysis(fileUpload.files, patientInfo);
  const reportPDF = useReportPDF();

  // Form validation
  const isValidPatientInfo =
    patientInfo.patientName !== "" &&
    patientInfo.dob !== "" &&
    patientInfo.clinicalHistory !== "";

  const startAnalysis = async () => {
    try {
      const results = await analysis.startAnalysis();

      // Generate report content
      const reportContent = reportPDF.generateReportContent(
        results,
        patientInfo
      );

      // Show report after short delay
      setTimeout(() => {
        setShowReport(true);
        reportPDF.simulateTypingEffect();
      }, 500);
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  const generatePDF = async () => {
    try {
      await reportPDF.generatePDF(reportPDF.reportContent!);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };
  return (
    <div
      className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto min-h-screen"
      style={{ backgroundColor: COLORS.background.primary }}
    >
      <div
        className="p-6 rounded-xl shadow-sm border"
        style={{
          backgroundColor: COLORS.background.primary,
          borderColor: COLORS.border,
        }}
      >
        <h1
          className="text-2xl font-bold mb-6"
          style={{ color: COLORS.text.primary }}
        >
          Upload Chest X-Ray Images
        </h1>

        <PatientInformationForm patientInfo={patientInfo} />

        <FileUploadDropzone
          isDragging={fileUpload.isDragging}
          triggerFileSelect={fileUpload.triggerFileSelect}
          handleDragOver={fileUpload.handleDragOver}
          handleDragLeave={fileUpload.handleDragLeave}
          handleDrop={fileUpload.handleDrop}
        />

        <input
          type="file"
          ref={fileUpload.fileInputRef}
          onChange={(e) => fileUpload.handleFileSelect(e.target.files)}
          multiple
          accept=".jpg,.jpeg,.png,.dcm"
          className="hidden"
        />

        {fileUpload.files.length > 0 && (
          <>
            <FileList
              files={fileUpload.files}
              removeFile={fileUpload.removeFile}
              isAnalyzing={analysis.isAnalyzing}
              analysisComplete={analysis.analysisComplete}
              analysisResults={analysis.analysisResults}
              activeTab={analysis.activeTab}
              setActiveTab={analysis.setActiveTab}
            />

            <AnalysisControls
              filesCount={fileUpload.files.length}
              isAnalyzing={analysis.isAnalyzing}
              isValidPatientInfo={isValidPatientInfo}
              onClearAll={fileUpload.clearAllFiles}
              onStartAnalysis={startAnalysis}
            />
          </>
        )}

        <ReportPanel
          showReport={showReport}
          setShowReport={setShowReport}
          reportContent={reportPDF.reportContent}
          isGeneratingPDF={reportPDF.isGeneratingPDF}
          isTyping={reportPDF.isTyping}
          onGeneratePDF={generatePDF}
          patientInfo={patientInfo}
        />
      </div>
    </div>
  );
};

export default DemoViewer;
