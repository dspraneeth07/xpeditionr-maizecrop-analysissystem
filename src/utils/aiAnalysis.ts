import { pipeline } from "@huggingface/transformers";

interface AnalysisResult {
  disease: string;
  confidence: number;
  status: string;
  affectedArea: string;
  causes: string[];
  prevention: string[];
  treatment: string[];
}

const diseaseMapping: Record<string, Partial<AnalysisResult>> = {
  "northern_leaf_blight": {
    disease: "Northern Leaf Blight",
    status: "Severe",
    affectedArea: "Leaves",
    causes: [
      "Fungal pathogen Exserohilum turcicum",
      "Humid conditions",
      "Temperature between 18-27°C",
    ],
    prevention: [
      "Use resistant maize varieties",
      "Crop rotation",
      "Remove infected plant debris",
      "Maintain proper plant spacing",
    ],
    treatment: [
      "Apply fungicides at early stages",
      "Remove heavily infected leaves",
      "Improve field drainage",
    ],
  },
  "common_rust": {
    disease: "Common Rust",
    status: "Moderate",
    affectedArea: "Leaves and Stems",
    causes: [
      "Fungal pathogen Puccinia sorghi",
      "Cool temperatures (16-23°C)",
      "High humidity",
    ],
    prevention: [
      "Plant resistant varieties",
      "Early planting",
      "Monitor fields regularly",
      "Proper spacing for air circulation",
    ],
    treatment: [
      "Apply fungicides when symptoms appear",
      "Remove infected plants",
      "Maintain field hygiene",
    ],
  },
  "healthy": {
    disease: "Healthy Plant",
    status: "Good",
    affectedArea: "None",
    causes: [],
    prevention: [
      "Continue regular monitoring",
      "Maintain good agricultural practices",
      "Follow recommended fertilization schedule",
    ],
    treatment: [],
  },
};

export const analyzeCropImage = async (imageData: string): Promise<AnalysisResult> => {
  try {
    console.log("Starting image analysis...");
    
    // Initialize the image classification pipeline
    const classifier = await pipeline("image-classification", "Xenova/maize-disease-detection");
    
    // Remove the data URL prefix to get just the base64 data
    const base64Data = imageData.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
    
    // Convert base64 to Uint8Array
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    console.log("Running classification...");
    const results = await classifier(binaryData);
    console.log("Classification results:", results);

    if (!results || results.length === 0) {
      throw new Error("No results from classification");
    }

    const topResult = results[0];
    const mappedResult = diseaseMapping[topResult.label] || diseaseMapping.healthy;

    return {
      ...mappedResult,
      confidence: topResult.score * 100,
      disease: mappedResult.disease || "Unknown",
      status: mappedResult.status || "Unknown",
      affectedArea: mappedResult.affectedArea || "Unknown",
      causes: mappedResult.causes || [],
      prevention: mappedResult.prevention || [],
      treatment: mappedResult.treatment || [],
    } as AnalysisResult;
  } catch (error) {
    console.error("Error during image analysis:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};