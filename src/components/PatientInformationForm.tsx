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
    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 rounded-xl border"
    style={{ backgroundColor: COLORS.background.secondary, borderColor: COLORS.border }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="md:col-span-2">
      <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.text.primary }}>
        Patient Information
      </h2>
    </div>

    <div className="space-y-3">
      <Label htmlFor="patientName" className="font-medium">
        Patient Name
      </Label>
      <Input
        id="patientName"
        value={patientInfo.patientName}
        onChange={(e) => patientInfo.setPatientName(e.target.value)}
        placeholder="John Doe"
        className="bg-white"
      />
    </div>

    <div className="space-y-3">
      <Label htmlFor="patientId" className="font-medium">
        Patient ID
      </Label>
      <Input
        id="patientId"
        value={patientInfo.patientId}
        onChange={(e) => patientInfo.setPatientId(e.target.value)}
        placeholder="ID-12345"
        className="bg-white"
      />
    </div>

    <div className="space-y-3">
      <Label htmlFor="dob" className="font-medium">
        Date of Birth
      </Label>
      <Input
        id="dob"
        type="date"
        value={patientInfo.dob}
        onChange={(e) => patientInfo.setDob(e.target.value)}
        className="bg-white"
      />
    </div>

    <div className="space-y-3">
      <Label className="font-medium block">Age</Label>
      <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-700">
        {patientInfo.age || "N/A"}
      </div>
    </div>

    <div className="space-y-3">
      <Label className="font-medium block">Sex</Label>
      <RadioGroup 
        value={patientInfo.sex} 
        onValueChange={patientInfo.setSex}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female">Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Label htmlFor="other">Other</Label>
        </div>
      </RadioGroup>
    </div>

    <div className="space-y-3 md:col-span-2">
      <Label htmlFor="clinicalHistory" className="font-medium">
        Clinical History
      </Label>
      <Input
        id="clinicalHistory"
        value={patientInfo.clinicalHistory}
        onChange={(e) => patientInfo.setClinicalHistory(e.target.value)}
        placeholder="Patient symptoms and medical history"
        className="bg-white"
      />
    </div>

    <div className="space-y-3">
      <Label htmlFor="suspectedDisease" className="font-medium">
        Suspected Disease
      </Label>
      <Input
        id="suspectedDisease"
        value={patientInfo.suspectedDisease}
        onChange={(e) => patientInfo.setSuspectedDisease(e.target.value)}
        placeholder="Pneumonia"
        className="bg-white"
      />
    </div>

    <div className="space-y-3">
      <Label htmlFor="examDate" className="font-medium">
        Exam Date
      </Label>
      <Input
        id="examDate"
        type="date"
        value={patientInfo.examDate}
        onChange={(e) => patientInfo.setExamDate(e.target.value)}
        className="bg-white"
      />
    </div>

    <div className="space-y-3">
      <Label htmlFor="view" className="font-medium">
        View
      </Label>
      <Input
        id="view"
        value={patientInfo.view}
        onChange={(e) => patientInfo.setView(e.target.value)}
        placeholder="PA"
        className="bg-white"
      />
    </div>

    <div className="space-y-3 md:col-span-2">
      <Label htmlFor="radiologistName" className="font-medium">
        Radiologist Name
      </Label>
      <Input
        id="radiologistName"
        value={patientInfo.radiologistName}
        onChange={(e) => patientInfo.setRadiologistName(e.target.value)}
        placeholder="Dr. Jane Smith"
        className="bg-white"
      />
    </div>
  </motion.div>
);