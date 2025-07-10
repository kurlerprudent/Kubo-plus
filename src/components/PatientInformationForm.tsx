import { CalendarIcon, Clipboard, Stethoscope, User, AlertTriangle, ScanSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface PatientInfoProps {
  radiologistName: string;
  setRadiologistName: (value: string) => void;
  patientName: string;
  setPatientName: (value: string) => void;
  patientId: string;
  setPatientId: (value: string) => void;
  dob: string;
  setDob: (value: string) => void;
  age: string;
  sex: string;
  setSex: (value: string) => void;
  clinicalHistory: string;
  setClinicalHistory: (value: string) => void;
  suspectedDisease: string;
  setSuspectedDisease: (value: string) => void;
  examDate: string;
  setExamDate: (value: string) => void;
  view: string;
  setView: (value: string) => void;
}

export function PatientInformationForm({
  radiologistName,
  setRadiologistName,
  patientName,
  setPatientName,
  patientId,
  setPatientId,
  dob,
  setDob,
  age,
  sex,
  setSex,
  clinicalHistory,
  setClinicalHistory,
  suspectedDisease,
  setSuspectedDisease,
  examDate,
  setExamDate,
  view,
  setView
}: PatientInfoProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
            <p className="text-xs mt-1 text-gray-500">
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
                className="w-full justify-start text-left font-normal bg-white"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {examDate ? format(new Date(examDate), "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
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
  );
}