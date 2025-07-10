export interface AnalysisResult {
  id: number;
  diagnosis: string;
  confidence: number;
  findings: string;
  recommendations: string;
  severity: number;
  heatmapData: any[] | null;
}