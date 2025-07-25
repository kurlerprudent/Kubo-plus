import { useState } from "react";
import { API_URLS } from "@/constants/index";

interface AnalysisResult {
  id: number;
  diagnosis: string;
  confidence: number;
  findings: string;
  recommendations: string;
  severity: number;
  heatmapData: any;
  impression: string;
}

interface PatientInfo {
  patientName: string;
  dob: string;
  clinicalHistory: string;
}

export const useAnalysis = (files: File[], patientInfo: PatientInfo) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInputs = (): string | null => {
    if (!files || files.length === 0) {
      return "Please upload at least one file for analysis";
    }

    if (!patientInfo.patientName?.trim()) {
      return "Patient name is required";
    }

    if (!patientInfo.dob?.trim()) {
      return "Date of birth is required";
    }

    if (!patientInfo.clinicalHistory?.trim()) {
      return "Clinical history is required";
    }

    // Validate file types (optional - adjust based on your requirements)
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/dicom",
    ];
    const invalidFiles = files.filter(
      (file) => !allowedTypes.includes(file.type.toLowerCase())
    );

    if (invalidFiles.length > 0) {
      return `Invalid file types detected: ${invalidFiles
        .map((f) => f.name)
        .join(", ")}. Please upload only JPEG, PNG, or DICOM files.`;
    }

    // Validate file sizes (e.g., max 10MB per file)
    const maxSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = files.filter((file) => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      return `Files too large: ${oversizedFiles
        .map((f) => f.name)
        .join(", ")}. Maximum file size is 10MB.`;
    }

    return null;
  };

  const startAnalysis = async (): Promise<AnalysisResult[]> => {
    // Clear previous error
    setError(null);

    // Validate inputs
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      throw new Error(validationError);
    }

    console.log("Starting analysis with patient info:", patientInfo);
    console.log(
      "Files to analyze:",
      files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
    );

    setIsAnalyzing(true);
    setAnalysisComplete(false);

    try {
      // Prepare form data
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append("files", file);
        console.log(`Added file ${index + 1}: ${file.name}`);
      });

      formData.append("patientName", patientInfo.patientName.trim());
      formData.append("dob", patientInfo.dob.trim());
      formData.append("clinicalHistory", patientInfo.clinicalHistory.trim());

      console.log("FormData prepared, sending request...");

      // Make API request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minute timeout

      const response = await fetch(
        "https://rad-backend-9498dddd133c.herokuapp.com/api/v1/rad/analyze",
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
          headers: {
            // Don't set Content-Type header for FormData - browser will set it automatically with boundary
          },
        }
      );

      clearTimeout(timeoutId);

      // Check if request was successful
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
          // If we can't parse the error response, use the default message
          console.warn("Could not parse error response:", parseError);
        }

        throw new Error(errorMessage);
      }

      // Parse response
      let results;
      try {
        results = await response.json();
        console.log("API Response:", results);
      } catch (parseError) {
        console.error("Failed to parse response JSON:", parseError);
        throw new Error("Invalid response format from server");
      }

      // Validate response structure
      if (!results || typeof results !== "object") {
        throw new Error("Invalid response structure from server");
      }

      // Handle different response formats
      let analysisData;
      if (Array.isArray(results)) {
        analysisData = results;
      } else if (results.data && Array.isArray(results.data)) {
        analysisData = results.data;
      } else if (results.results && Array.isArray(results.results)) {
        analysisData = results.results;
      } else {
        // Single result
        analysisData = [results];
      }

      // Process and validate results
      const resultsData: AnalysisResult[] = analysisData.map(
        (result: any, index: number) => {
          if (!result || typeof result !== "object") {
            console.warn(`Invalid result at index ${index}:`, result);
            return {
              id: index,
              diagnosis: "Analysis Error",
              confidence: 0,
              findings: "Unable to process this image",
              recommendations: "Please try uploading the image again",
              severity: 0,
              heatmapData: null,
              impression: "N/A",
            };
          }

          return {
            id: index,
            diagnosis: result.diagnosis || "Analysis Pending",
            confidence: result.confidence
              ? Math.max(0, Math.min(100, Math.round(result.confidence * 100)))
              : 0,
            findings: result.findings || "No findings available",
            recommendations:
              result.recommendations || "No recommendations available",
            severity:
              typeof result.severity === "number"
                ? Math.max(0, result.severity)
                : 0,
            heatmapData: result.heatmapData || null,
            impression: result.impression || "N/A",
          };
        }
      );

      // Ensure we have results for all uploaded files
      if (resultsData.length !== files.length) {
        console.warn(
          `Expected ${files.length} results, got ${resultsData.length}`
        );

        // Fill missing results
        while (resultsData.length < files.length) {
          resultsData.push({
            id: resultsData.length,
            diagnosis: "Processing Error",
            confidence: 0,
            findings: "File could not be processed",
            recommendations: "Please verify file format and try again",
            severity: 0,
            impression: "N/A",
            heatmapData: null,
          });
        }
      }

      console.log("Processed results:", resultsData);

      setAnalysisResults(resultsData);
      setAnalysisComplete(true);
      setActiveTab(0);

      return resultsData;
    } catch (error: any) {
      console.error("Analysis error:", error);

      let errorMessage = "An unexpected error occurred during analysis";

      if (error.name === "AbortError") {
        errorMessage = "Analysis request timed out. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setError(errorMessage);

      // Reset analysis state on error
      setAnalysisComplete(false);
      setAnalysisResults([]);
      setActiveTab(null);

      throw new Error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setAnalysisResults([]);
    setActiveTab(null);
    setError(null);
  };

  return {
    isAnalyzing,
    analysisComplete,
    analysisResults,
    activeTab,
    error,
    setActiveTab,
    startAnalysis,
    resetAnalysis,
  };
};
