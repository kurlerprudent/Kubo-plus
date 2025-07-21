import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { COLORS } from "@/constants/colors";
import { usePatientInfo } from "@/hooks/usePatientInfo";
import { motion } from "framer-motion";

interface PatientInformationFormProps {
  patientInfo: ReturnType<typeof usePatientInfo>;
}

export const PatientInformationForm = ({ patientInfo }: PatientInformationFormProps) => (
  <motion.div 
    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-8 rounded-2xl border"
    style={{ 
      backgroundColor: COLORS.background.secondary, 
      borderColor: COLORS.border,
      boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.08)"
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {/* Form Header */}
    <div className="md:col-span-2 mb-2">
      <h2 className="text-xl font-bold tracking-tight" style={{ color: COLORS.text.primary }}>
        PATIENT INFORMATION
      </h2>
      <div className="h-1 w-16 bg-blue-500 mt-2 rounded-full"></div>
      <p className="mt-3 text-slate-500 text-sm max-w-2xl">
        Complete all required fields to proceed with the diagnostic analysis. 
        Fields marked with <span className="text-red-500">*</span> are mandatory.
      </p>
    </div>

    {/* Personal Information Group */}
    <div className="md:col-span-2">
      <h3 className="font-semibold text-slate-700 mb-4 flex items-center">
        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</span>
        Personal Information
      </h3>
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="patientName" className="font-semibold flex">
        Full Name <span className="text-red-500 ml-1">*</span>
      </Label>
      <Input
        id="patientName"
        value={patientInfo.patientName}
        onChange={(e) => patientInfo.setPatientName(e.target.value)}
        placeholder="Johnathan Doe"
        className="bg-white border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="patientId" className="font-semibold flex">
        Patient ID <span className="text-red-500 ml-1">*</span>
      </Label>
      <Input
        id="patientId"
        value={patientInfo.patientId}
        onChange={(e) => patientInfo.setPatientId(e.target.value)}
        placeholder="ID-12345"
        className="bg-white border-slate-300 font-mono"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="dob" className="font-semibold flex">
        Date of Birth <span className="text-red-500 ml-1">*</span>
      </Label>
      <Input
        id="dob"
        type="date"
        value={patientInfo.dob}
        onChange={(e) => patientInfo.setDob(e.target.value)}
        className="bg-white border-slate-300"
      />
    </div>

    <div className="space-y-2">
      <Label className="font-semibold">Calculated Age</Label>
      <div className="px-4 py-3 bg-blue-50 rounded-lg text-blue-800 font-medium border border-blue-100">
        {patientInfo.age ? `${patientInfo.age} years` : "Enter date of birth"}
      </div>
    </div>

    {/* Demographic Information Group */}
    <div className="md:col-span-2 mt-4">
      <h3 className="font-semibold text-slate-700 mb-4 flex items-center">
        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</span>
        Demographic Information
      </h3>
    </div>
    
    <div className="space-y-3 md:col-span-2">
      <Label className="font-semibold block mb-2">Gender</Label>
      <RadioGroup 
        value={patientInfo.sex} 
        onValueChange={patientInfo.setSex}
        className="flex flex-wrap gap-4"
      >
        {[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" }
        ].map((option) => (
          <div key={option.value} className="flex items-center">
            <RadioGroupItem 
              value={option.value} 
              id={option.value}
              className="text-blue-600 border-slate-400 h-5 w-5"
            />
            <Label 
              htmlFor={option.value} 
              className="ml-2 font-medium text-slate-700 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>

    {/* Clinical Information Group */}
    <div className="md:col-span-2 mt-4">
      <h3 className="font-semibold text-slate-700 mb-4 flex items-center">
        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</span>
        Clinical Information
      </h3>
    </div>
    
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="clinicalHistory" className="font-semibold">
        Clinical History
      </Label>
      <Input
        id="clinicalHistory"
        value={patientInfo.clinicalHistory}
        onChange={(e) => patientInfo.setClinicalHistory(e.target.value)}
        placeholder="Patient symptoms, medical history, and relevant notes"
        className="bg-white border-slate-300"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="suspectedDisease" className="font-semibold">
        Suspected Condition
      </Label>
      <Input
        id="suspectedDisease"
        value={patientInfo.suspectedDisease}
        onChange={(e) => patientInfo.setSuspectedDisease(e.target.value)}
        placeholder="Pneumonia, Tuberculosis, etc."
        className="bg-white border-slate-300"
      />
    </div>

    {/* Examination Details Group */}
    <div className="md:col-span-2 mt-4">
      <h3 className="font-semibold text-slate-700 mb-4 flex items-center">
        <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">4</span>
        Examination Details
      </h3>
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="examDate" className="font-semibold flex">
        Exam Date <span className="text-red-500 ml-1">*</span>
      </Label>
      <Input
        id="examDate"
        type="date"
        value={patientInfo.examDate}
        onChange={(e) => patientInfo.setExamDate(e.target.value)}
        className="bg-white border-slate-300"
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="view" className="font-semibold">
        Imaging View
      </Label>
      <Input
        id="view"
        value={patientInfo.view}
        onChange={(e) => patientInfo.setView(e.target.value)}
        placeholder="PA, Lateral, etc."
        className="bg-white border-slate-300"
      />
    </div>

    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="radiologistName" className="font-semibold">
        Referring Radiologist
      </Label>
      <Input
        id="radiologistName"
        value={patientInfo.radiologistName}
        onChange={(e) => patientInfo.setRadiologistName(e.target.value)}
        placeholder="Dr. Jane Smith"
        className="bg-white border-slate-300"
      />
    </div>
  </motion.div>
);