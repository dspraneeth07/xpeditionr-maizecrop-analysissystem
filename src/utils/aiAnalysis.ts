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
  "leaf_blight": {
    diseaseName: "Leaf Blight Disease",
    status: "critical",
    affectedArea: 75,
    causes: [
      "Fungal pathogen (Helminthosporium sp.)",
      "High humidity conditions",
      "Poor air circulation",
      "Extended leaf wetness",
      "Nutrient deficiency",
      "Stressed plants"
    ],
    prevention: [
      "Use disease-resistant varieties",
      "Implement crop rotation with non-host crops",
      "Maintain proper plant spacing",
      "Ensure good drainage in fields",
      "Remove and destroy infected plant debris",
      "Apply balanced fertilization",
      "Monitor humidity levels",
      "Use drip irrigation instead of overhead watering"
    ],
    treatment: {
      medicine: "Propiconazole + Difenoconazole fungicide",
      dosage: "1.5-2 ml per liter of water",
      frequency: "Every 14 days until symptoms improve",
      instructions: "Apply early morning or late evening. Ensure complete coverage of foliage. Stop application 14 days before harvest."
    },
  },
  "powdery_mildew": {
    diseaseName: "Powdery Mildew",
    status: "moderate",
    affectedArea: 55,
    causes: [
      "Fungal infection (Erysiphe sp.)",
      "Warm, dry conditions",
      "Poor air circulation",
      "High relative humidity",
      "Dense canopy",
      "Overcrowding of plants"
    ],
    prevention: [
      "Plant resistant varieties",
      "Increase plant spacing",
      "Prune to improve air circulation",
      "Avoid overhead irrigation",
      "Remove infected plant parts",
      "Maintain proper soil fertility",
      "Use companion planting",
      "Regular monitoring of plants"
    ],
    treatment: {
      medicine: "Sulfur-based fungicide or Azoxystrobin",
      dosage: "2-3 g per liter of water",
      frequency: "Every 7-10 days",
      instructions: "Apply at first sign of infection. Do not apply sulfur when temperatures exceed 85°F (29°C)."
    },
  },
  "bacterial_spot": {
    diseaseName: "Bacterial Spot Disease",
    status: "critical",
    affectedArea: 80,
    causes: [
      "Bacterial infection (Xanthomonas sp.)",
      "Warm, wet weather",
      "Splashing water",
      "Contaminated seeds",
      "Poor sanitation",
      "Mechanical injury"
    ],
    prevention: [
      "Use certified disease-free seeds",
      "Practice crop rotation",
      "Avoid overhead irrigation",
      "Maintain field sanitation",
      "Remove infected plants",
      "Clean tools between uses",
      "Improve air circulation",
      "Monitor weather conditions"
    ],
    treatment: {
      medicine: "Copper-based bactericide + Mancozeb",
      dosage: "2.5-3 g per liter of water",
      frequency: "Every 5-7 days during severe infection",
      instructions: "Apply before disease development. Alternate with other approved bactericides to prevent resistance."
    },
  },
  "rust": {
    diseaseName: "Rust Disease",
    status: "moderate",
    affectedArea: 60,
    causes: [
      "Fungal pathogen (Puccinia sp.)",
      "High humidity",
      "Moderate temperatures",
      "Poor air circulation",
      "Presence of alternate hosts",
      "Extended dew periods"
    ],
    prevention: [
      "Plant resistant varieties",
      "Remove alternate host plants",
      "Improve air circulation",
      "Avoid overhead irrigation",
      "Space plants properly",
      "Regular monitoring",
      "Maintain proper nutrition",
      "Time planting to avoid disease-favorable conditions"
    ],
    treatment: {
      medicine: "Tebuconazole or Trifloxystrobin fungicide",
      dosage: "1-1.5 ml per liter of water",
      frequency: "Every 10-14 days",
      instructions: "Begin applications at first sign of disease. Rotate fungicides to prevent resistance development."
    },
  },
  "healthy": {
    diseaseName: "Healthy Plant",
    status: "normal",
    affectedArea: 0,
    causes: [],
    prevention: [
      "Continue regular monitoring",
      "Maintain balanced fertilization",
      "Practice proper irrigation",
      "Implement integrated pest management",
      "Keep good air circulation",
      "Regular soil testing",
      "Proper pruning practices",
      "Maintain field sanitation"
    ],
    treatment: {
      medicine: "No treatment needed",
      dosage: "N/A",
      frequency: "N/A",
      instructions: "Continue regular maintenance and monitoring"
    },
  },
  "default": {
    diseaseName: "Unknown Condition",
    status: "moderate",
    affectedArea: 40,
    causes: [
      "Multiple potential factors",
      "Environmental stress",
      "Possible pathogen infection",
      "Nutrient imbalance",
      "Water management issues"
    ],
    prevention: [
      "Regular plant inspection",
      "Maintain proper growing conditions",
      "Balanced fertilization program",
      "Proper irrigation management",
      "Integrated pest management",
      "Consult with agricultural expert",
      "Document symptoms and progression",
      "Take soil and tissue samples for analysis"
    ],
    treatment: {
      medicine: "Broad-spectrum fungicide/bactericide",
      dosage: "As per product label",
      frequency: "Based on severity and product guidelines",
      instructions: "Consult with agricultural expert for specific recommendations. Monitor response to treatment."
    },
  }
};

export const analyzeCropImage = async (imageData: string): Promise<AnalysisResult> => {
  try {
    console.log("Starting image analysis...");
    
    const classifier = await pipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224"
    );
    
    console.log("Model loaded successfully");
    console.log("Running classification...");
    
    const results = await classifier(imageData);
    console.log("Classification results:", results);

    if (!Array.isArray(results)) {
      console.error("Unexpected results format");
      throw new Error("Unexpected results format");
    }

    if (results.length === 0) {
      console.error("No results from classification");
      throw new Error("No results from classification");
    }

    const topResult = results[0] as { label: string; score: number };
    console.log("Top result:", topResult);

    // Map the classification result to our disease categories
    let diseaseKey: keyof typeof diseaseMapping = 'default';
    
    const label = topResult.label.toLowerCase();
    if (label.includes('blight') || label.includes('lesion')) {
      diseaseKey = 'leaf_blight';
    } else if (label.includes('mildew') || label.includes('white')) {
      diseaseKey = 'powdery_mildew';
    } else if (label.includes('spot') || label.includes('bacterial')) {
      diseaseKey = 'bacterial_spot';
    } else if (label.includes('rust') || label.includes('brown')) {
      diseaseKey = 'rust';
    } else if (label.includes('healthy') || label.includes('normal')) {
      diseaseKey = 'healthy';
    }

    const mappedResult = diseaseMapping[diseaseKey];

    return {
      ...diseaseMapping.default,
      ...mappedResult,
      confidence: Math.round(topResult.score * 100),
    } as AnalysisResult;

  } catch (error) {
    console.error("Error during image analysis:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};