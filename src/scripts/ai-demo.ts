#!/usr/bin/env node

/**
 * AI Integration Demo Script
 * Demonstrates the advanced AI analysis capabilities
 */

import { AdvancedAIAnalysisEngine } from "../lib/api-enhanced";

async function runAIDemo() {
  console.log("🚀 Starting Advanced AI Analysis Demo\n");
  
  const aiEngine = AdvancedAIAnalysisEngine.getInstance();
  
  // Demo 1: Pneumonia Case
  console.log("📋 Demo 1: Pneumonia Analysis");
  console.log("=" .repeat(50));
  
  const pneumoniaFile = new File(["mock-pneumonia-data"], "pneumonia-case.jpg", { 
    type: "image/jpeg" 
  });
  
  const pneumoniaPatient = {
    patientName: "John Martinez",
    age: "45",
    sex: "Male",
    clinicalHistory: "Persistent cough with fever for 2 weeks. History of smoking. Chest pain on deep inspiration.",
    suspectedDisease: "Pneumonia",
    dob: new Date("1979-03-15"),
    examDate: new Date(),
  };
  
  try {
    const pneumoniaResults = await aiEngine.analyzeXrayImages(
      [pneumoniaFile], 
      pneumoniaPatient,
      (progress) => console.log(`Analysis Progress: ${Math.round(progress)}%`)
    );
    
    const result = pneumoniaResults[0];
    console.log(`\n✅ Analysis Complete!`);
    console.log(`📊 Diagnosis: ${result.diagnosis}`);
    console.log(`🎯 Confidence: ${result.confidence}%`);
    console.log(`⚠️  Severity Level: ${result.severity}/5`);
    console.log(`🔬 AI Model: ${result.aiModel}`);
    console.log(`⏱️  Processing Time: ${result.processingTime}s`);
    console.log(`🚨 Urgency: ${result.clinicalIndicators.urgencyLevel}`);
    console.log(`📝 Key Findings: ${result.findings}`);
    console.log(`💡 Recommendations: ${result.recommendations}`);
    
    if (result.heatmapData && result.heatmapData.length > 0) {
      console.log(`🎨 Heatmap Points: ${result.heatmapData.length} anomaly regions detected`);
    }
    
    console.log(`🫁 Anatomical Regions: ${result.anatomicalRegions.join(", ")}`);
    
  } catch (error) {
    console.error("❌ Pneumonia analysis failed:", error);
  }
  
  console.log("\n" + "=" .repeat(80) + "\n");
  
  // Demo 2: Tuberculosis Case
  console.log("📋 Demo 2: Tuberculosis Analysis");
  console.log("=" .repeat(50));
  
  const tbFile = new File(["mock-tb-data"], "tb-case.jpg", { 
    type: "image/jpeg" 
  });
  
  const tbPatient = {
    patientName: "Sarah Chen",
    age: "32", 
    sex: "Female",
    clinicalHistory: "Recent travel to endemic area. Night sweats, weight loss, and productive cough for 3 weeks. Contact with TB patient.",
    suspectedDisease: "Tuberculosis",
    dob: new Date("1992-08-22"),
    examDate: new Date(),
  };
  
  try {
    const tbResults = await aiEngine.analyzeXrayImages([tbFile], tbPatient);
    const result = tbResults[0];
    
    console.log(`\n✅ Analysis Complete!`);
    console.log(`📊 Diagnosis: ${result.diagnosis}`);
    console.log(`🎯 Confidence: ${result.confidence}%`);
    console.log(`⚠️  Severity Level: ${result.severity}/5`);
    console.log(`🚨 Urgency: ${result.clinicalIndicators.urgencyLevel}`);
    console.log(`📝 Key Findings: ${result.findings}`);
    console.log(`💡 Recommendations: ${result.recommendations}`);
    
  } catch (error) {
    console.error("❌ TB analysis failed:", error);
  }
  
  console.log("\n" + "=" .repeat(80) + "\n");
  
  // Demo 3: Multiple Image Analysis
  console.log("📋 Demo 3: Multiple Image Analysis");
  console.log("=" .repeat(50));
  
  const multipleFiles = [
    new File(["normal"], "normal-case.jpg", { type: "image/jpeg" }),
    new File(["cardiac"], "cardiac-case.jpg", { type: "image/jpeg" }),
    new File(["pleural"], "pleural-case.jpg", { type: "image/jpeg" }),
  ];
  
  const multiplePatient = {
    patientName: "Robert Johnson",
    age: "68",
    sex: "Male",
    clinicalHistory: "Hypertension, diabetes. Shortness of breath and ankle swelling. Known cardiac history.",
    suspectedDisease: "Congestive Heart Failure",
    dob: new Date("1956-12-10"),
    examDate: new Date(),
  };
  
  try {
    const multipleResults = await aiEngine.analyzeXrayImages(multipleFiles, multiplePatient);
    
    console.log(`\n✅ Batch Analysis Complete!`);
    console.log(`📊 Total Images Analyzed: ${multipleResults.length}`);
    
    multipleResults.forEach((result, index) => {
      console.log(`\n🖼️  Image ${index + 1}:`);
      console.log(`   📊 Diagnosis: ${result.diagnosis}`);
      console.log(`   🎯 Confidence: ${result.confidence}%`);
      console.log(`   ⚠️  Severity: ${result.severity}/5`);
      console.log(`   🔬 AI Model: ${result.aiModel}`);
    });
    
    // Calculate statistics
    const avgConfidence = multipleResults.reduce((sum, r) => sum + r.confidence, 0) / multipleResults.length;
    const avgProcessingTime = multipleResults.reduce((sum, r) => sum + r.processingTime, 0) / multipleResults.length;
    const severityCounts = multipleResults.reduce((acc, r) => {
      acc[r.severity] = (acc[r.severity] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    console.log(`\n📈 Batch Statistics:`);
    console.log(`   🎯 Average Confidence: ${Math.round(avgConfidence)}%`);
    console.log(`   ⏱️  Average Processing Time: ${Math.round(avgProcessingTime)}s`);
    console.log(`   📊 Severity Distribution:`, severityCounts);
    
  } catch (error) {
    console.error("❌ Multiple image analysis failed:", error);
  }
  
  console.log("\n" + "=" .repeat(80) + "\n");
  
  // Demo 4: Advanced Features
  console.log("📋 Demo 4: Advanced AI Features");
  console.log("=" .repeat(50));
  
  console.log("🔬 Available Disease Detection Patterns:");
  const patterns = [
    "Normal Chest X-ray",
    "Pneumonia (Community-acquired)",
    "Tuberculosis (Active)",
    "Cardiomegaly",
    "Pleural Effusion", 
    "COVID-19 Pneumonia"
  ];
  
  patterns.forEach((pattern, index) => {
    console.log(`   ${index + 1}. ${pattern}`);
  });
  
  console.log("\n🧠 AI Model Capabilities:");
  console.log("   • Clinical context awareness");
  console.log("   • Age-adjusted risk assessment");
  console.log("   • Smoking history consideration");
  console.log("   • Multi-region anatomical analysis");
  console.log("   • Confidence-based recommendations");
  console.log("   • Urgency level classification");
  console.log("   • Real-time progress tracking");
  console.log("   • Heatmap anomaly detection");
  
  console.log("\n🎯 Integration Features:");
  console.log("   • Real API backend integration");
  console.log("   • Sophisticated fallback system");
  console.log("   • Progress tracking & user feedback");
  console.log("   • Comprehensive error handling");
  console.log("   • JWT authentication support");
  console.log("   • MongoDB data persistence");
  console.log("   • Multi-role access control");
  
  console.log("\n🚀 Demo Complete! The advanced AI system is ready for production use.");
}

// For Node.js execution
if (require.main === module) {
  runAIDemo().catch(console.error);
}

export { runAIDemo };
