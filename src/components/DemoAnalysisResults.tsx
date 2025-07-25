import React from 'react';
import { AIAnalysisResult } from "@/lib/api-enhanced";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Activity, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Brain,
  Clock,
  Heart,
  Stethoscope,
  RefreshCw
} from "lucide-react";

interface DemoAnalysisResultsProps {
  results: AIAnalysisResult[];
  activeTab: number | null;
  onTabChange: (index: number) => void;
  onReset: () => void;
}

export const DemoAnalysisResults: React.FC<DemoAnalysisResultsProps> = ({
  results,
  activeTab,
  onTabChange,
  onReset
}) => {
  const getSeverityColor = (severity: number) => {
    if (severity === 0) return "text-green-600 bg-green-100 border-green-200";
    if (severity <= 2) return "text-yellow-600 bg-yellow-100 border-yellow-200";
    if (severity <= 3) return "text-orange-600 bg-orange-100 border-orange-200";
    return "text-red-600 bg-red-100 border-red-200";
  };

  const getSeverityIcon = (severity: number) => {
    if (severity === 0) return <CheckCircle className="h-4 w-4" />;
    if (severity <= 2) return <AlertTriangle className="h-4 w-4" />;
    return <XCircle className="h-4 w-4" />;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'LOW': return "text-green-700 bg-green-100";
      case 'MEDIUM': return "text-yellow-700 bg-yellow-100";
      case 'HIGH': return "text-orange-700 bg-orange-100";
      case 'CRITICAL': return "text-red-700 bg-red-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Analysis Results
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab?.toString()} onValueChange={(value) => onTabChange(parseInt(value))}>
          <TabsList className="grid w-full grid-cols-auto gap-1">
            {results.map((_, index) => (
              <TabsTrigger key={index} value={index.toString()} className="text-sm">
                Image {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {results.map((result, index) => (
            <TabsContent key={index} value={index.toString()} className="mt-6 space-y-4">
              {/* Quick Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{result.diagnosis}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getSeverityColor(result.severity)}>
                        {getSeverityIcon(result.severity)}
                        <span className="ml-1">Severity {result.severity}/5</span>
                      </Badge>
                      <Badge className={getUrgencyColor(result.clinicalIndicators.urgencyLevel)}>
                        {result.clinicalIndicators.urgencyLevel}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Confidence</span>
                      <span className="text-sm font-bold text-blue-600">{result.confidence}%</span>
                    </div>
                    <Progress value={result.confidence} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="text-gray-600">{result.aiModel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-600">{result.processingTime}s</span>
                    </div>
                  </div>

                  {result.isSimulated && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <Activity className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700 text-sm">
                        Demo simulation - Real AI analysis available with backend
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              {/* Clinical Findings */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    Clinical Findings
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">
                    {result.findings}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-gray-600" />
                    Recommendations
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm leading-relaxed">
                    {result.recommendations}
                  </p>
                </div>

                {/* Anatomical Regions */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Anatomical Regions Analyzed</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.anatomicalRegions.map((region, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Clinical Indicators */}
                {result.clinicalIndicators && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      Clinical Indicators
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Heart Size</span>
                          <span className="font-medium">{result.clinicalIndicators.heartSize}%</span>
                        </div>
                        <Progress value={result.clinicalIndicators.heartSize} className="h-1" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Lung Opacity</span>
                          <span className="font-medium">{result.clinicalIndicators.lungOpacity}%</span>
                        </div>
                        <Progress value={result.clinicalIndicators.lungOpacity} className="h-1" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Abnormality Score</span>
                          <span className="font-medium">{result.clinicalIndicators.abnormalityScore}%</span>
                        </div>
                        <Progress value={result.clinicalIndicators.abnormalityScore} className="h-1" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Patient Age</span>
                          <span className="font-medium">{result.clinicalIndicators.patientAge} years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Heatmap Data */}
                {result.heatmapData && result.heatmapData.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Anomaly Detection</h4>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      🎨 {result.heatmapData.length} anomaly regions detected. 
                      Heatmap visualization shows areas of interest for clinical review.
                    </p>
                  </div>
                )}

                {/* Technical Metadata */}
                {result.metadata && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Technical Details</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <div>
                        <span className="block font-medium">Image Quality</span>
                        <span>{result.metadata.imageQuality}%</span>
                      </div>
                      <div>
                        <span className="block font-medium">Contrast</span>
                        <span>{result.metadata.contrast}%</span>
                      </div>
                      <div>
                        <span className="block font-medium">Positioning</span>
                        <span>{result.metadata.positioning}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
