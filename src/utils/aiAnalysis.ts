import { pipeline } from "@huggingface/transformers";

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
      "Humid conditions (>90% humidity)",
      "Temperature between 18-27°C",
      "Poor air circulation",
      "Previous crop debris"
    ],
    prevention: [
      "Use resistant maize varieties",
      "Implement crop rotation with non-host crops",
      "Remove and destroy infected plant debris",
      "Maintain proper plant spacing",
      "Apply balanced fertilization",
      "Use fungicide seed treatments"
    ],
    treatment: {
      medicine: "Propiconazole",
      dosage: "500ml/hectare",
      frequency: "Every 14 days",
      instructions: "Apply during early morning or late evening. Ensure complete coverage of leaves."
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
      "Extended leaf wetness",
      "Wind-dispersed spores"
    ],
    prevention: [
      "Plant resistant varieties",
      "Early planting to avoid peak disease periods",
      "Monitor fields regularly",
      "Proper spacing for air circulation",
      "Avoid overhead irrigation"
    ],
    treatment: {
      medicine: "Azoxystrobin",
      dosage: "300ml/hectare",
      frequency: "Every 10-14 days",
      instructions: "Apply before disease pressure becomes severe. Rotate fungicides to prevent resistance."
    },
  },
  "gray_leaf_spot": {
    diseaseName: "Gray Leaf Spot",
    status: "critical",
    affectedArea: 65,
    causes: [
      "Fungal pathogen Cercospora zeae-maydis",
      "High humidity and temperature",
      "Continuous corn cultivation",
      "No-till farming practices",
      "Poor field drainage"
    ],
    prevention: [
      "Use resistant hybrids",
      "Rotate crops for 2 years",
      "Improve field drainage",
      "Control weeds",
      "Deep plowing of crop residue"
    ],
    treatment: {
      medicine: "Pyraclostrobin + Metconazole",
      dosage: "750ml/hectare",
      frequency: "Every 21 days",
      instructions: "Begin applications at disease onset. Ensure thorough coverage of all plant surfaces."
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
      "Practice proper irrigation management",
      "Implement integrated pest management"
    ],
    treatment: {
      medicine: "None required",
      dosage: "N/A",
      frequency: "N/A",
      instructions: "Continue regular maintenance and monitoring"
    },
  },
};

export const analyzeCropImage = async (imageData: string): Promise<AnalysisResult> => {
  try {
    console.log("Starting image analysis...");
    
    // Using a public model for plant disease detection
    const classifier = await pipeline(
      "image-classification",
      "microsoft/resnet-50",
      { quantized: false }
    );
    
    console.log("Model loaded successfully");
    console.log("Running classification...");
    
    const results = await classifier(imageData);
    console.log("Classification results:", results);

    if (!Array.isArray(results) || results.length === 0) {
      console.error("No results from classification");
      throw new Error("No results from classification");
    }

    // Type assertion for the classification result
    const topResult = results[0] as { label: string; score: number };
    console.log("Top result:", topResult);

    // Map the result to our disease categories
    // For demo purposes, we'll map any plant-related classification to our disease categories
    let diseaseKey: keyof typeof diseaseMapping = 'healthy';
    
    if (topResult.label.toLowerCase().includes('disease') || 
        topResult.label.toLowerCase().includes('blight') ||
        topResult.label.toLowerCase().includes('rust')) {
      diseaseKey = 'northern_leaf_blight';
    } else if (topResult.label.toLowerCase().includes('spot')) {
      diseaseKey = 'gray_leaf_spot';
    }

    const mappedResult = diseaseMapping[diseaseKey] || diseaseMapping.healthy;

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