import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';

interface ReportPreviewProps {
  reportContent: any;
  radiologistName: string;
  patientName: string;
  patientId: string;
  dob: string;
  age: string;
  sex: string;
  examDate: string;
  view: string;
  suspectedDisease: string;
  clinicalHistory: string;
  isTyping: boolean;
  isGeneratingPDF: boolean;
  generatePDF: () => void;
}

export function ReportPreview({
  reportContent,
  radiologistName,
  patientName,
  patientId,
  dob,
  age,
  sex,
  examDate,
  view,
  suspectedDisease,
  clinicalHistory,
  isTyping,
  isGeneratingPDF,
  generatePDF
}: ReportPreviewProps) {
  return (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 bg-white rounded-xl p-6 border border-gray-300 shadow-sm"
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            Radiology Report
          </h2>
          <p className="text-sm text-gray-500">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-semibold">
            {radiologistName}
          </div>
          <div className="text-sm text-gray-500">
            Board Certified Radiologist
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="font-semibold mb-2">
            Patient Information
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div><span className="font-medium">Name:</span> {patientName}</div>
            <div><span className="font-medium">ID:</span> {patientId || 'N/A'}</div>
            <div><span className="font-medium">DOB:</span> {dob} ({age} years)</div>
            <div><span className="font-medium">Sex:</span> {sex === 'male' ? 'Male' : 'Female'}</div>
            <div><span className="font-medium">Exam Date:</span> {examDate}</div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">
            Clinical History
          </h3>
          <p className="text-sm text-gray-600">
            {clinicalHistory || "N/A"}
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">
            Exam Details
          </h3>
          <div className="space-y-1 text-sm text-gray-600">
            <div><span className="font-medium">Modality:</span> Chest X-Ray (CXR)</div>
            <div><span className="font-medium">View:</span> {view}</div>
            <div><span className="font-medium">Suspected Condition:</span> {suspectedDisease || "N/A"}</div>
          </div>
        </div>
      </div>
      
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <span className="bg-gray-200 p-1 rounded">📋</span>
        Clinical Indication
      </h3>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm">{clinicalHistory || "N/A"}</p>
      </div>

      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <span className="bg-gray-200 p-1 rounded">🔍</span>
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

      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <span className="bg-gray-200 p-1 rounded">⚠️</span>
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
            <div className="font-semibold">
              Radiologist
            </div>
            <p className="text-gray-600">
              {reportContent.radiologistName}
            </p>
            <p className="mt-2 text-gray-600">
              Date: {reportContent.reportDate}
            </p>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="h-16 w-48 bg-gray-100 flex items-center justify-center rounded-lg mb-2">
              <p className="text-xs text-gray-500">Digital Signature</p>
            </div>
            <p className="text-xs text-gray-500">
              Board Certified Radiologist
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t flex justify-end">
        <button 
          onClick={generatePDF}
          disabled={isGeneratingPDF}
          className={`px-6 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-colors duration-300 ${
            isGeneratingPDF ? "opacity-70 cursor-not-allowed bg-green-300" : "bg-green-400"
          } text-gray-900`}
        >
          {isGeneratingPDF ? (
            <>
              <span className="animate-spin">⏳</span>
              Preparing PDF...
            </>
          ) : (
            <>
              <span>⬇️</span>
              Download Full Report
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}