import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { COLORS } from "@/constants/colors";

interface ReportPanelProps {
  showReport: boolean;
  setShowReport: (show: boolean) => void;
  reportContent: any;
  isGeneratingPDF: boolean;
  isTyping: boolean;
  onGeneratePDF: () => void;
  patientInfo: any;
}

export const ReportPanel = ({
  showReport,
  setShowReport,
  reportContent,
  isGeneratingPDF,
  isTyping,
  onGeneratePDF,
  patientInfo,
}: ReportPanelProps) => {
  console.log(reportContent);
  return (
    <motion.div
      className={`mt-8 border rounded-xl overflow-hidden transition-all duration-300 ${
        showReport ? "block" : "hidden"
      }`}
      style={{
        backgroundColor: COLORS.background.primary,
        borderColor: COLORS.border,
      }}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: showReport ? "auto" : 0, opacity: showReport ? 1 : 0 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-xl font-bold"
            style={{ color: COLORS.text.primary }}
          >
            Radiology Report
          </h2>
          <Button
            onClick={onGeneratePDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2"
            style={{
              backgroundColor: COLORS.accent.primary,
              color: "white",
            }}
          >
            {isGeneratingPDF ? (
              "Generating..."
            ) : (
              <>
                <Download size={16} />
                Download PDF
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <h3
              className="text-sm font-medium uppercase tracking-wider mb-2"
              style={{ color: COLORS.text.secondary }}
            >
              Patient Details
            </h3>
            <div className="space-y-1 text-primary">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {patientInfo.patientName || "N/A"}
              </p>
              <p>
                <span className="font-medium">ID:</span>{" "}
                {patientInfo.patientId || "N/A"}
              </p>
              <p>
                <span className="font-medium">DOB:</span>{" "}
                {patientInfo.dob || "N/A"}
              </p>
              <p>
                <span className="font-medium">Age/Sex:</span>{" "}
                {patientInfo.age || "N/A"}/{patientInfo.sex}
              </p>
            </div>
          </div>

          <div className="text-primary">
            <h3
              className="text-sm font-medium uppercase tracking-wider mb-2"
              style={{ color: COLORS.text.secondary }}
            >
              Exam Details
            </h3>
            <div className="space-y-1">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {patientInfo.examDate}
              </p>
              <p>
                <span className="font-medium">View:</span> {patientInfo.view}
              </p>
              <p>
                <span className="font-medium">Suspected:</span>{" "}
                {patientInfo.suspectedDisease}
              </p>
            </div>
          </div>

          <div className="text-primary">
            <h3
              className="text-sm font-medium uppercase tracking-wider mb-2"
              style={{ color: COLORS.text.secondary }}
            >
              Radiologist
            </h3>
            <p>{patientInfo.radiologistName}</p>
          </div>
        </div>

        <div className="border-t pt-6" style={{ borderColor: COLORS.border }}>
          <h3
            className="text-md font-semibold mb-3"
            style={{ color: COLORS.text.primary }}
          >
            Clinical History
          </h3>
          <p className="mb-6" style={{ color: COLORS.text.secondary }}>
            {patientInfo.clinicalHistory || "No clinical history provided."}
          </p>

          <h3
            className="text-md font-semibold mb-3"
            style={{ color: COLORS.text.primary }}
          >
            Findings
          </h3>
          <div
            className="mb-6 p-4 rounded-lg"
            style={{ backgroundColor: COLORS.background.secondary }}
          >
            {isTyping ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            ) : (
              <p style={{ color: COLORS.text.secondary }}>
                {reportContent?.findings || "Analysis in progress..."}
              </p>
            )}
          </div>

          <h3
            className="text-md font-semibold mb-3"
            style={{ color: COLORS.text.primary }}
          >
            Impression
          </h3>
          <div
            className="p-4 rounded-lg"
            style={{ backgroundColor: COLORS.background.secondary }}
          >
            {isTyping ? (
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            ) : (
              <p className="font-medium" style={{ color: COLORS.text.primary }}>
                {reportContent?.impression || "Analysis in progress..."}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
