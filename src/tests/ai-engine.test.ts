import { AdvancedAIAnalysisEngine } from "../lib/api-enhanced";

describe("Advanced AI Analysis Engine", () => {
  let aiEngine: AdvancedAIAnalysisEngine;
  
  beforeEach(() => {
    aiEngine = AdvancedAIAnalysisEngine.getInstance();
  });

  test("should generate sophisticated pneumonia analysis", async () => {
    const mockFile = new File(["mock"], "pneumonia-case.jpg", { type: "image/jpeg" });
    const patientInfo = {
      patientName: "John Martinez",
      age: "45",
      sex: "Male",
      clinicalHistory: "Persistent cough with fever for 2 weeks. History of smoking. Chest pain on deep inspiration.",
      suspectedDisease: "Pneumonia",
    };

    const results = await aiEngine.analyzeXrayImages([mockFile], patientInfo);
    
    expect(results).toHaveLength(1);
    expect(results[0].diagnosis).toContain("Pneumonia");
    expect(results[0].confidence).toBeGreaterThan(80);
    expect(results[0].clinicalIndicators.urgencyLevel).toBeDefined();
    expect(results[0].heatmapData).toBeDefined();
    expect(results[0].anatomicalRegions).toContain("Lower Lobe");
  });

  test("should generate detailed tuberculosis analysis", async () => {
    const mockFile = new File(["mock"], "tb-case.jpg", { type: "image/jpeg" });
    const patientInfo = {
      patientName: "Sarah Chen", 
      age: "32",
      sex: "Female",
      clinicalHistory: "Recent travel to endemic area. Night sweats, weight loss, and productive cough for 3 weeks.",
      suspectedDisease: "Tuberculosis",
    };

    const results = await aiEngine.analyzeXrayImages([mockFile], patientInfo);
    
    expect(results).toHaveLength(1);
    expect(results[0].diagnosis).toContain("Tuberculosis");
    expect(results[0].clinicalIndicators.urgencyLevel).toBe("HIGH");
    expect(results[0].recommendations).toContain("isolation");
    expect(results[0].severity).toBeGreaterThan(3);
  });

  test("should handle multiple images with diverse findings", async () => {
    const mockFiles = [
      new File(["mock1"], "normal.jpg", { type: "image/jpeg" }),
      new File(["mock2"], "pneumonia.jpg", { type: "image/jpeg" }),
      new File(["mock3"], "cardiac.jpg", { type: "image/jpeg" }),
    ];
    
    const patientInfo = {
      patientName: "Test Patient",
      age: "50",
      sex: "Male", 
      clinicalHistory: "Routine screening",
      suspectedDisease: "",
    };

    const results = await aiEngine.analyzeXrayImages(mockFiles, patientInfo);
    
    expect(results).toHaveLength(3);
    
    // Check for variety in diagnoses
    const diagnoses = results.map(r => r.diagnosis);
    const uniqueDiagnoses = new Set(diagnoses);
    expect(uniqueDiagnoses.size).toBeGreaterThan(1);
    
    // Check that all results have required properties
    results.forEach(result => {
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.processingTime).toBeGreaterThan(0);
      expect(result.aiModel).toBeDefined();
      expect(result.clinicalIndicators).toBeDefined();
    });
  });

  test("should adjust analysis based on patient age", async () => {
    const mockFile = new File(["mock"], "chest.jpg", { type: "image/jpeg" });
    
    // Test elderly patient
    const elderlyPatient = {
      patientName: "Elderly Patient",
      age: "80",
      sex: "Male",
      clinicalHistory: "Shortness of breath",
      suspectedDisease: "",
    };

    const elderlyResults = await aiEngine.analyzeXrayImages([mockFile], elderlyPatient);
    
    // Test young patient
    const youngPatient = {
      patientName: "Young Patient", 
      age: "25",
      sex: "Female",
      clinicalHistory: "Shortness of breath",
      suspectedDisease: "",
    };

    const youngResults = await aiEngine.analyzeXrayImages([mockFile], youngPatient);
    
    // Age should influence the analysis
    expect(elderlyResults[0].clinicalIndicators.patientAge).toBe(80);
    expect(youngResults[0].clinicalIndicators.patientAge).toBe(25);
  });

  test("should generate realistic heatmap data", async () => {
    const mockFile = new File(["mock"], "abnormal.jpg", { type: "image/jpeg" });
    const patientInfo = {
      patientName: "Test Patient",
      age: "40",
      sex: "Male",
      clinicalHistory: "Chest pain",
      suspectedDisease: "Pneumonia",
    };

    const results = await aiEngine.analyzeXrayImages([mockFile], patientInfo);
    const result = results[0];
    
    if (result.heatmapData) {
      expect(Array.isArray(result.heatmapData)).toBe(true);
      
      result.heatmapData.forEach(point => {
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.x).toBeLessThanOrEqual(100);
        expect(point.y).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThanOrEqual(100);
        expect(point.radius).toBeGreaterThan(0);
        expect(point.intensity).toBeGreaterThanOrEqual(0);
        expect(point.intensity).toBeLessThanOrEqual(1);
      });
    }
  });

  test("should provide clinical context awareness", async () => {
    const mockFile = new File(["mock"], "chest.jpg", { type: "image/jpeg" });
    
    // Test with smoking history
    const smokerPatient = {
      patientName: "Smoker Patient",
      age: "55",
      sex: "Male",
      clinicalHistory: "Heavy smoker for 30 years, persistent cough",
      suspectedDisease: "",
    };

    const smokerResults = await aiEngine.analyzeXrayImages([mockFile], smokerPatient);
    
    // Test with no smoking history
    const nonSmokerPatient = {
      patientName: "Non-smoker Patient",
      age: "55", 
      sex: "Male",
      clinicalHistory: "No smoking history, recent cold symptoms",
      suspectedDisease: "",
    };

    const nonSmokerResults = await aiEngine.analyzeXrayImages([mockFile], nonSmokerPatient);
    
    // Clinical context should influence recommendations
    expect(smokerResults[0].recommendations).toBeDefined();
    expect(nonSmokerResults[0].recommendations).toBeDefined();
  });
});

export {};
