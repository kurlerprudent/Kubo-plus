"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Eye, 
  Activity,
  MapPin,
  TrendingUp,
  Clock,
  Stethoscope
} from 'lucide-react';
import { motion } from 'framer-motion';

import { AIAnalysisResult } from "@/lib/api-enhanced";

interface AIAnalysisResultsProps {
  results: AIAnalysisResult[];
  patientInfo: any;
}

export const AIAnalysisResults: React.FC<AIAnalysisResultsProps> = ({
  results,
  patientInfo
}) => {
  const getSeverityColor = (severity: number) => {
    if (severity === 0) return "text-green-600 bg-green-100";
    if (severity <= 2) return "text-yellow-600 bg-yellow-100";
    if (severity <= 3) return "text-orange-600 bg-orange-100";
    return "text-red-600 bg-red-100";
  };

  const getSeverityIcon = (severity: number) => {
    if (severity === 0) return <CheckCircle className="h-4 w-4" />;
    if (severity <= 2) return <Eye className="h-4 w-4" />;
    return <AlertTriangle className="h-4 w-4" />;
  };

  const getSeverityLabel = (severity: number) => {
    if (severity === 0) return "Normal";
    if (severity <= 2) return "Mild Abnormality";
    if (severity <= 3) return "Moderate Concern";
    return "Immediate Attention";
  };

  return (
    <div className="space-y-6">
      {/* AI Summary Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Brain className="h-5 w-5" />
              AI Analysis Summary
              {results.some(r => r.isSimulated) && (
                <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
                  Demo Mode
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Images Analyzed</p>
                  <p className="font-semibold text-blue-800">{results.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Processing Time</p>
                  <p className="font-semibold text-blue-800">
                    {results[0]?.processingTime || "~30"} seconds
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Average Confidence</p>
                  <p className="font-semibold text-blue-800">
                    {Math.round(results.reduce((acc, r) => acc + r.confidence, 0) / results.length)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Individual Results */}
      {results.map((result, index) => (
        <motion.div
          key={result.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-blue-600" />
                  X-ray Analysis #{index + 1}
                </CardTitle>
                <Badge 
                  className={`${getSeverityColor(result.severity)} border-none`}
                >
                  {getSeverityIcon(result.severity)}
                  <span className="ml-1">{getSeverityLabel(result.severity)}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Diagnosis */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Diagnosis
                </h4>
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {result.diagnosis}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-600">Confidence Level:</span>
                  <Progress value={result.confidence} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-gray-800">
                    {result.confidence}%
                  </span>
                </div>
                {result.aiModel && (
                  <p className="text-xs text-gray-500">
                    Model: {result.aiModel}
                  </p>
                )}
              </div>

              {/* Findings */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Clinical Findings
                </h4>
                <p className="text-gray-700 leading-relaxed">{result.findings}</p>
              </div>

              {/* Anatomical Regions (if available) */}
              {result.anatomicalRegions && result.anatomicalRegions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Anatomical Regions Analyzed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.anatomicalRegions.map((region, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Heatmap Data Indicator */}
              {result.heatmapData && result.heatmapData.length > 0 && (
                <Alert className="border-orange-200 bg-orange-50">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Areas of interest detected. Heatmap visualization available in detailed view.
                  </AlertDescription>
                </Alert>
              )}

              {/* Recommendations */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Clinical Recommendations
                </h4>
                <p className="text-blue-700 leading-relaxed">{result.recommendations}</p>
              </div>

              {/* Demo Mode Notice */}
              {result.isSimulated && (
                <Alert className="border-amber-200 bg-amber-50">
                  <Brain className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    This is a demonstration result. In production, this would show real AI analysis 
                    from your integrated machine learning models.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}

      {/* Patient Context */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Analysis Complete - Patient Context
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Patient: <span className="font-medium text-gray-800">{patientInfo.patientName}</span></p>
                <p className="text-gray-600">DOB: <span className="font-medium text-gray-800">{patientInfo.dob}</span></p>
              </div>
              <div>
                <p className="text-gray-600">Clinical History:</p>
                <p className="font-medium text-gray-800">{patientInfo.clinicalHistory}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
