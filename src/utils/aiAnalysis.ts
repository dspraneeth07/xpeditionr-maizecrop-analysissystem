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
  // Fungal Diseases
  "common_rust": {
    diseaseName: "Common Rust (Puccinia sorghi)",
    status: "critical",
    affectedArea: 75,
    causes: [
      "Fungal pathogen (Puccinia sorghi)",
      "Cool temperatures (60-70°F)",
      "High humidity (>95%)",
      "Extended leaf wetness periods"
    ],
    prevention: [
      "Plant rust-resistant hybrids",
      "Early planting",
      "Improve field drainage",
      "Maintain proper plant spacing"
    ],
    treatment: {
      medicine: "Azoxystrobin + Propiconazole",
      dosage: "400-600 ml/ha",
      frequency: "14-21 days interval",
      instructions: "Apply before disease reaches 5% leaf area"
    }
  },
  "southern_rust": {
    diseaseName: "Southern Rust (Puccinia polysora)",
    status: "critical",
    affectedArea: 70,
    causes: [
      "Fungal pathogen (Puccinia polysora)",
      "Warm temperatures (80-90°F)",
      "High humidity"
    ],
    prevention: [
      "Resistant varieties",
      "Early planting",
      "Field monitoring"
    ],
    treatment: {
      medicine: "Pyraclostrobin + Metconazole",
      dosage: "500-750 ml/ha",
      frequency: "14 days interval",
      instructions: "Apply at first sign of disease"
    }
  },
  "northern_blight": {
    diseaseName: "Northern Corn Leaf Blight",
    status: "critical",
    affectedArea: 80,
    causes: [
      "Fungal pathogen (Exserohilum turcicum)",
      "Moderate temperatures (64-81°F)",
      "Extended leaf wetness"
    ],
    prevention: [
      "Resistant hybrids",
      "Crop rotation",
      "Residue management"
    ],
    treatment: {
      medicine: "Trifloxystrobin + Prothioconazole",
      dosage: "0.75-1.0 L/ha",
      frequency: "14 days interval",
      instructions: "Apply when disease is <5% on upper leaves"
    }
  },
  // Bacterial Diseases
  "goss_wilt": {
    diseaseName: "Goss's Wilt",
    status: "critical",
    affectedArea: 65,
    causes: [
      "Bacteria (Clavibacter michiganensis)",
      "Plant injury",
      "Warm, humid conditions"
    ],
    prevention: [
      "Resistant hybrids",
      "Crop rotation",
      "Clean equipment"
    ],
    treatment: {
      medicine: "Copper-based bactericide",
      dosage: "2.5-3.0 kg/ha",
      frequency: "7-10 days interval",
      instructions: "Apply preventively during high-risk periods"
    }
  },
  // Viral Diseases
  "maize_dwarf": {
    diseaseName: "Maize Dwarf Mosaic Virus",
    status: "critical",
    affectedArea: 60,
    causes: [
      "MDMV virus",
      "Aphid vectors",
      "Presence of grass hosts"
    ],
    prevention: [
      "Resistant varieties",
      "Weed control",
      "Aphid management"
    ],
    treatment: {
      medicine: "Insecticide for vector control",
      dosage: "As per label",
      frequency: "Monitor aphid population",
      instructions: "Focus on vector control and prevention"
    }
  },
  // Nutritional Disorders
  "nitrogen_deficiency": {
    diseaseName: "Nitrogen Deficiency",
    status: "moderate",
    affectedArea: 45,
    causes: [
      "Poor soil fertility",
      "Leaching",
      "Insufficient fertilization"
    ],
    prevention: [
      "Soil testing",
      "Proper fertilization",
      "Cover crops"
    ],
    treatment: {
      medicine: "Urea or Ammonium Nitrate",
      dosage: "150-200 kg N/ha",
      frequency: "Split application",
      instructions: "Apply based on growth stage and soil tests"
    }
  },
  // Parasitic Diseases
  "downy_mildew": {
    diseaseName: "Downy Mildew",
    status: "critical",
    affectedArea: 70,
    causes: [
      "Fungal-like pathogen",
      "High humidity",
      "Cool temperatures"
    ],
    prevention: [
      "Resistant varieties",
      "Seed treatment",
      "Field drainage"
    ],
    treatment: {
      medicine: "Metalaxyl + Mancozeb",
      dosage: "2.5 kg/ha",
      frequency: "7-14 days interval",
      instructions: "Apply as preventive treatment"
    }
  },
  "healthy": {
    diseaseName: "Healthy Corn Plant",
    status: "normal",
    affectedArea: 0,
    causes: [],
    prevention: [
      "Regular monitoring",
      "Balanced fertilization",
      "Proper irrigation"
    ],
    treatment: {
      medicine: "No treatment needed",
      dosage: "N/A",
      frequency: "Continue monitoring",
      instructions: "Maintain current practices"
    }
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
      throw new Error("Invalid classification results");
    }

    const topResult = results[0];
    console.log("Top result:", topResult);

    if (!('label' in topResult) || !('score' in topResult)) {
      throw new Error("Unexpected result format from classifier");
    }

    let diseaseKey: keyof typeof diseaseMapping = 'healthy';
    const label = topResult.label.toLowerCase();

    // Enhanced disease detection logic
    if (label.includes('rust') || label.includes('brown')) {
      diseaseKey = label.includes('southern') ? 'southern_rust' : 'common_rust';
    } else if (label.includes('blight')) {
      diseaseKey = 'northern_blight';
    } else if (label.includes('wilt')) {
      diseaseKey = 'goss_wilt';
    } else if (label.includes('virus') || label.includes('mosaic')) {
      diseaseKey = 'maize_dwarf';
    } else if (label.includes('mildew')) {
      diseaseKey = 'downy_mildew';
    } else if (label.includes('yellow') || label.includes('pale')) {
      diseaseKey = 'nitrogen_deficiency';
    }

    const mappedResult = diseaseMapping[diseaseKey];
    const confidence = Math.round(topResult.score * 100);

    return {
      ...diseaseMapping.healthy,
      ...mappedResult,
      confidence,
    } as AnalysisResult;

  } catch (error) {
    console.error("Error during image analysis:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};