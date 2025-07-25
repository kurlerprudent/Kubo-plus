"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, Activity, Brain, Zap, Target, ChevronRight, Users, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAnalysis } from "@/hooks/useAnalysis";
import { AnalysisControls } from "@/components/AnalysisControls";
import { DemoAnalysisResults } from "@/components/DemoAnalysisResults";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const SAMPLE_PATIENTS = [
  {
    name: "John Martinez",
    age: 45,
    sex: "Male",
    clinicalHistory: "Persistent cough with fever for 2 weeks. History of smoking. Chest pain on deep inspiration. Recent weight loss and night sweats.",
    suspectedDisease: "Pneumonia or TB",
  },
  {
    name: "Sarah Chen",
    age: 32,
    sex: "Female", 
    clinicalHistory: "Recent travel to endemic area. Night sweats, weight loss, and productive cough for 3 weeks. Contact with TB patient.",
    suspectedDisease: "Tuberculosis",
  },
  {
    name: "Robert Johnson",
    age: 68,
    sex: "Male",
    clinicalHistory: "Hypertension, diabetes. Shortness of breath and ankle swelling. Known cardiac history. Exercise intolerance.",
    suspectedDisease: "Congestive Heart Failure",
  },
  {
    name: "Maria Rodriguez",
    age: 28,
    sex: "Female",
    clinicalHistory: "Recent COVID-19 infection. Persistent dry cough and fatigue. Breathing difficulties during exertion.",
    suspectedDisease: "Post-COVID complications",
  },
];

export default function AIDemoPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [patientInfo, setPatientInfo] = useState({
    patientName: "",
    patientId: "",
    age: "",
    sex: "",
    dob: null as Date | null,
    clinicalHistory: "",
    suspectedDisease: "",
    examDate: new Date(),
    view: "PA",
    radiologistName: "",
  });

  const {
    isAnalyzing,
    analysisComplete,
    analysisResults,
    activeTab,
    setActiveTab,
    startAnalysis,
    resetAnalysis,
    uploadProgress,
    analysisProgress,
    currentStage,
    error,
    analysisStats,
    validateInputs,
  } = useAnalysis(files, patientInfo);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    
    // Validate file types
    const validFiles = uploadedFiles.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      return validTypes.includes(file.type);
    });
    
    if (validFiles.length !== uploadedFiles.length) {
      toast.error("Some files were skipped. Only JPEG and PNG files are supported.");
    }
    
    setFiles(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      toast.success(`${validFiles.length} file(s) added successfully`);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    toast.info("File removed");
  };

  const loadSamplePatient = (patient: typeof SAMPLE_PATIENTS[0]) => {
    setPatientInfo(prev => ({
      ...prev,
      patientName: patient.name,
      age: patient.age.toString(),
      sex: patient.sex,
      clinicalHistory: patient.clinicalHistory,
      suspectedDisease: patient.suspectedDisease,
      patientId: `DEMO_${Date.now()}`,
      radiologistName: "Dr. AI Assistant",
    }));
    
    toast.success(`Loaded patient data for ${patient.name}`);
  };

  const handleAnalysisStart = async () => {
    const errors = validateInputs();
    if (errors.length > 0) {
      toast.error(`Please fix the following: ${errors.join(', ')}`);
      return;
    }
    
    try {
      await startAnalysis();
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Analysis failed. Please try again.");
    }
  };

  const getStageDescription = () => {
    switch (currentStage) {
      case 'uploading': return 'Uploading X-ray images to secure servers...';
      case 'processing': return 'Processing images and extracting features...';
      case 'analyzing': return 'Running advanced AI analysis algorithms...';
      case 'complete': return 'Analysis completed successfully!';
      case 'error': return 'An error occurred during analysis.';
      default: return 'Ready to start analysis';
    }
  };

  const clearAllData = () => {
    setFiles([]);
    setPatientInfo({
      patientName: "",
      patientId: "",
      age: "",
      sex: "",
      dob: null,
      clinicalHistory: "",
      suspectedDisease: "",
      examDate: new Date(),
      view: "PA",
      radiologistName: "",
    });
    resetAnalysis();
    toast.info("All data cleared");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Brain className="h-10 w-10 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">
                AI-Powered Medical Analysis
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Experience cutting-edge medical AI that analyzes chest X-rays with expert-level accuracy. 
              Our advanced system provides detailed diagnostic insights, anatomical mapping, and clinical recommendations 
              in real-time.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Brain className="h-4 w-4 text-blue-600" />
                6 AI Models
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Target className="h-4 w-4 text-green-600" />
                96%+ Accuracy
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                Real-time Analysis
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Activity className="h-4 w-4 text-purple-600" />
                Clinical Integration
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Stethoscope className="h-4 w-4 text-red-600" />
                FDA-Ready
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left Column: Input Forms */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={clearAllData} className="flex-1">
                Clear All Data
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('/ai-test', '_blank')}
                className="flex-1"
              >
                <Users className="h-4 w-4 mr-2" />
                Test Accounts
              </Button>
            </div>

            {/* Quick Sample Patients */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Quick Demo Patients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">
                  Load pre-configured patient data for faster testing:
                </p>
                <div className="grid gap-2">
                  {SAMPLE_PATIENTS.map((patient, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="justify-between h-auto p-3 border border-gray-200 hover:border-blue-300"
                      onClick={() => loadSamplePatient(patient)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm">{patient.name}</div>
                        <div className="text-xs text-gray-500">
                          {patient.age}yo {patient.sex} • {patient.suspectedDisease}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patient Information */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientName" className="text-sm font-medium text-gray-800">Patient Name *</Label>
                    <Input
                      id="patientName"
                      value={patientInfo.patientName}
                      onChange={(e) => setPatientInfo(prev => ({ ...prev, patientName: e.target.value }))}
                      placeholder="Enter patient name"
                      className="mt-1 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientId" className="text-sm font-medium text-gray-800">Patient ID</Label>
                    <Input
                      id="patientId"
                      value={patientInfo.patientId}
                      onChange={(e) => setPatientInfo(prev => ({ ...prev, patientId: e.target.value }))}
                      placeholder="Auto-generated"
                      className="mt-1 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-sm font-medium text-gray-800">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="Age"
                      className="mt-1 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sex" className="text-sm font-medium text-gray-800">Sex</Label>
                    <Select 
                      value={patientInfo.sex} 
                      onValueChange={(value) => setPatientInfo(prev => ({ ...prev, sex: value }))}
                    >
                      <SelectTrigger className="mt-1 text-gray-900">
                        <SelectValue placeholder="Select" className="text-gray-900" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male" className="text-gray-900">Male</SelectItem>
                        <SelectItem value="Female" className="text-gray-900">Female</SelectItem>
                        <SelectItem value="Other" className="text-gray-900">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-800">Date of Birth *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1 text-gray-900",
                            !patientInfo.dob && "text-gray-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {patientInfo.dob ? format(patientInfo.dob, "MMM dd, yyyy") : "Pick date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={patientInfo.dob || undefined}
                          onSelect={(date) => setPatientInfo(prev => ({ ...prev, dob: date || null }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label htmlFor="clinicalHistory" className="text-sm font-medium text-gray-800">Clinical History *</Label>
                  <Textarea
                    id="clinicalHistory"
                    value={patientInfo.clinicalHistory}
                    onChange={(e) => setPatientInfo(prev => ({ ...prev, clinicalHistory: e.target.value }))}
                    placeholder="Enter symptoms, medical history, and relevant clinical information..."
                    rows={4}
                    className="mt-1 text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <div>
                  <Label htmlFor="suspectedDisease" className="text-sm font-medium text-gray-800">Suspected Disease/Condition</Label>
                  <Input
                    id="suspectedDisease"
                    value={patientInfo.suspectedDisease}
                    onChange={(e) => setPatientInfo(prev => ({ ...prev, suspectedDisease: e.target.value }))}
                    placeholder="e.g., Pneumonia, Tuberculosis, etc."
                    className="mt-1 text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="view" className="text-sm font-medium text-gray-800">X-ray View</Label>
                    <Select 
                      value={patientInfo.view} 
                      onValueChange={(value) => setPatientInfo(prev => ({ ...prev, view: value }))}
                    >
                      <SelectTrigger className="mt-1 text-gray-900">
                        <SelectValue className="text-gray-900" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PA" className="text-gray-900">PA (Posterior-Anterior)</SelectItem>
                        <SelectItem value="AP" className="text-gray-900">AP (Anterior-Posterior)</SelectItem>
                        <SelectItem value="Lateral" className="text-gray-900">Lateral</SelectItem>
                        <SelectItem value="Oblique" className="text-gray-900">Oblique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="radiologistName" className="text-sm font-medium text-gray-800">Radiologist</Label>
                    <Input
                      id="radiologistName"
                      value={patientInfo.radiologistName}
                      onChange={(e) => setPatientInfo(prev => ({ ...prev, radiologistName: e.target.value }))}
                      placeholder="Dr. AI Assistant"
                      className="mt-1 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <AnalysisControls
              files={files}
              onFileUpload={handleFileUpload}
              onRemoveFile={removeFile}
              onStartAnalysis={handleAnalysisStart}
              isAnalyzing={isAnalyzing}
              uploadProgress={uploadProgress}
              analysisProgress={analysisProgress}
              currentStage={currentStage}
            />
          </div>

          {/* Right Column: Results & Progress */}
          <div className="space-y-6">
            {/* Analysis Progress */}
            {(isAnalyzing || currentStage !== 'idle') && (
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600 animate-pulse" />
                    Analysis Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Upload Progress</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analysis Progress</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                  </div>
                  
                  <div className="text-sm text-gray-700 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
                      {getStageDescription()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Analysis Statistics */}
            {analysisStats && (
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Analysis Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-gray-800">Images Analyzed</div>
                      <div className="text-2xl font-bold text-blue-600">{analysisStats.totalImages}</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-gray-800">Avg. Confidence</div>
                      <div className="text-2xl font-bold text-green-600">{analysisStats.averageConfidence}%</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium text-gray-800">Processing Time</div>
                      <div className="text-2xl font-bold text-orange-600">{analysisStats.averageProcessingTime}s</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-gray-800">AI Models</div>
                      <div className="text-2xl font-bold text-purple-600">{analysisStats.aiModelsUsed.length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Results */}
            {analysisComplete && analysisResults.length > 0 ? (
              <DemoAnalysisResults
                results={analysisResults}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onReset={resetAnalysis}
              />
            ) : !isAnalyzing && currentStage === 'idle' && (
              <Card className="shadow-sm">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Brain className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ready for AI Analysis
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Upload X-ray images and provide patient information to begin advanced AI analysis
                  </p>
                  <div className="text-sm text-gray-600">
                    Supported formats: JPEG, PNG • Max size: 50MB per file
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
