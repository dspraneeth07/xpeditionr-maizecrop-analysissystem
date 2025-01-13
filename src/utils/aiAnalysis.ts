import { pipeline, ImageClassificationOutput } from "@huggingface/transformers";

interface AnalysisResult {
  diseaseName: string;
  confidence: number;
  status: "critical" | "moderate" | "normal";
  affectedArea: number;
  causes: string[];
  prevention: string[];
  treatment: {
    medicine: string;
    dosage: string;
    frequency: string;
    instructions: string;
  };
}

const diseaseMapping: Record<string, Partial<AnalysisResult>> = {
  "northern_leaf_blight": {
    diseaseName: "Northern Leaf Blight",
    status: "critical",
    affectedArea: 75,
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
    treatment: {
      medicine: "Propiconazole",
      dosage: "500ml/hectare",
      frequency: "Every 14 days",
      instructions: "Apply during early morning or late evening",
    },
  },
  "common_rust": {
    diseaseName: "Common Rust",
    status: "moderate",
    affectedArea: 45,
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
    treatment: {
      medicine: "Azoxystrobin",
      dosage: "300ml/hectare",
      frequency: "Every 10-14 days",
      instructions: "Apply before disease pressure becomes severe",
    },
  },
  "healthy": {
    diseaseName: "Healthy Plant",
    status: "normal",
    affectedArea: 0,
    causes: [],
    prevention: [
      "Continue regular monitoring",
      "Maintain good agricultural practices",
      "Follow recommended fertilization schedule",
    ],
    treatment: {
      medicine: "None required",
      dosage: "N/A",
      frequency: "N/A",
      instructions: "Continue regular maintenance",
    },
  },
};

export const analyzeCropImage = async (imageData: string): Promise<AnalysisResult> => {
  try {
    console.log("Starting image analysis...");
    
    const classifier = await pipeline("image-classification", "Xenova/maize-disease-detection");
    
    console.log("Running classification...");
    const results = await classifier(imageData);
    console.log("Classification results:", results);

    if (!Array.isArray(results) || results.length === 0) {
      throw new Error("No results from classification");
    }

    const topResult = results[0] as { label: string; score: number };
    const mappedResult = diseaseMapping[topResult.label] || diseaseMapping.healthy;

    return {
      ...mappedResult,
      diseaseName: mappedResult.diseaseName || "Unknown Disease",
      confidence: Math.round(topResult.score * 100),
      status: mappedResult.status || "normal",
      affectedArea: mappedResult.affectedArea || 0,
      causes: mappedResult.causes || [],
      prevention: mappedResult.prevention || [],
      treatment: mappedResult.treatment || {
        medicine: "Unknown",
        dosage: "Unknown",
        frequency: "Unknown",
        instructions: "Please consult an agricultural expert",
      },
    } as AnalysisResult;
  } catch (error) {
    console.error("Error during image analysis:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};