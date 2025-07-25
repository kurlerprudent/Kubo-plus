import { useState } from "react";
import jsPDF from "jspdf";
import { API_URLS } from "@/constants";

export const useReportPDF = () => {
  const [reportContent, setReportContent] = useState<any>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const generateReportContent = (analysisResults: any[], patientInfo: any) => {
    const content = {
      patientName: patientInfo.patientName,
      patientId: patientInfo.patientId,
      examDate: patientInfo.examDate,
      view: patientInfo.view,
      clinicalHistory: patientInfo.clinicalHistory,
      radiologistName: patientInfo.radiologistName,
      findings: analysisResults[0]?.findings || "",
      impression: analysisResults[0]?.impression,
      reportDate: new Date().toISOString().split("T")[0],
    };

    setReportContent(content);
    return content;
  };

  const generatePDF = async (content: any) => {
    setIsGeneratingPDF(true);

    try {
      // Real API integration would look like:
      // const response = await fetch(API_URLS.GENERATE_REPORT, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(content)
      // });
      //
      // const pdfBlob = await response.blob();
      // const url = window.URL.createObjectURL(pdfBlob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `Report_${content.patientName.replace(/\s+/g, '_')}.pdf`;
      // a.click();

      // Simulated PDF generation
      const doc = new jsPDF();
      doc.text("RADIOLOGY REPORT", 105, 20, { align: "center" });
      doc.save(`Report_${content.patientName.replace(/\s+/g, "_")}.pdf`);

      return true;
    } catch (error) {
      throw error;
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const simulateTypingEffect = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  };

  return {
    reportContent,
    isGeneratingPDF,
    isTyping,
    generateReportContent,
    generatePDF,
    simulateTypingEffect,
  };
};
