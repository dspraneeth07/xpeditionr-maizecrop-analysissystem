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
  "common_rust": {
    diseaseName: "Common Rust (Puccinia sorghi)",
    status: "critical",
    affectedArea: 75,
    causes: [
      "Fungal pathogen (Puccinia sorghi)",
      "Cool temperatures (60-70°F)",
      "High humidity (>95%)",
      "Extended leaf wetness periods",
      "Poor air circulation"
    ],
    prevention: [
      "Plant rust-resistant hybrids",
      "Early planting to avoid optimal disease conditions",
      "Improve field drainage",
      "Maintain proper plant spacing",
      "Regular field monitoring",
      "Crop rotation with non-host crops",
      "Remove volunteer corn plants",
      "Balanced fertilization program"
    ],
    treatment: {
      medicine: "Azoxystrobin + Propiconazole fungicide",
      dosage: "400-600 ml/ha",
      frequency: "Apply at first sign of disease, repeat after 14-21 days if needed",
      instructions: "Apply before disease reaches 5% of leaf area. Ensure complete coverage. Observe pre-harvest interval of 30 days."
    }
  },
  "northern_blight": {
    diseaseName: "Northern Corn Leaf Blight",
    status: "critical",
    affectedArea: 80,
    causes: [
      "Fungal pathogen (Exserohilum turcicum)",
      "Moderate temperatures (64-81°F)",
      "Extended periods of leaf wetness",
      "High humidity",
      "Previous crop debris"
    ],
    prevention: [
      "Use resistant hybrids",
      "Implement crop rotation",
      "Practice deep plowing",
      "Remove crop debris",
      "Improve air circulation",
      "Avoid overhead irrigation",
      "Monitor disease forecasting systems",
      "Maintain balanced soil fertility"
    ],
    treatment: {
      medicine: "Pyraclostrobin + Metconazole",
      dosage: "0.75-1.0 L/ha",
      frequency: "Apply at disease onset, repeat after 14 days if conditions favor disease",
      instructions: "Apply when disease is less than 5% on upper leaves. Use higher rates under severe disease pressure."
    }
  },
  "gray_leaf_spot": {
    diseaseName: "Gray Leaf Spot",
    status: "moderate",
    affectedArea: 60,
    causes: [
      "Fungal pathogen (Cercospora zeae-maydis)",
      "High humidity (>95%)",
      "Temperatures between 70-90°F",
      "Continuous corn cultivation",
      "Conservation tillage practices"
    ],
    prevention: [
      "Plant resistant hybrids",
      "Rotate with non-host crops",
      "Improve air circulation",
      "Reduce surface residue",
      "Avoid susceptible hybrids in high-risk areas",
      "Scout fields regularly",
      "Time planting to avoid optimal conditions",
      "Maintain proper soil fertility"
    ],
    treatment: {
      medicine: "Trifloxystrobin + Prothioconazole",
      dosage: "300-400 ml/ha",
      frequency: "Apply at first symptoms, repeat after 21 days if needed",
      instructions: "Best results when applied before disease establishment. Ensure thorough coverage of all leaf surfaces."
    }
  },
  "ear_rot": {
    diseaseName: "Fusarium Ear Rot",
    status: "critical",
    affectedArea: 85,
    causes: [
      "Fungal pathogen (Fusarium verticillioides)",
      "High temperatures",
      "Drought stress",
      "Insect damage",
      "Rain during silking"
    ],
    prevention: [
      "Select resistant hybrids",
      "Avoid mechanical injury",
      "Control insects",
      "Harvest early",
      "Proper drying and storage",
      "Maintain optimal plant density",
      "Avoid plant stress",
      "Practice good sanitation"
    ],
    treatment: {
      medicine: "Fludioxonil + Mefenoxam seed treatment",
      dosage: "100g/100kg of seeds",
      frequency: "Preventive seed treatment before planting",
      instructions: "Treat seeds before planting. Monitor moisture levels during storage. Remove infected ears promptly."
    }
  },
  "healthy": {
    diseaseName: "Healthy Corn Plant",
    status: "normal",
    affectedArea: 0,
    causes: [],
    prevention: [
      "Maintain balanced fertilization",
      "Regular monitoring",
      "Proper irrigation management",
      "Integrated pest management",
      "Soil testing",
      "Crop rotation",
      "Proper plant spacing",
      "Timely weed control"
    ],
    treatment: {
      medicine: "No treatment needed",
      dosage: "N/A",
      frequency: "Continue regular monitoring",
      instructions: "Maintain current agricultural practices and preventive measures"
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

    if (!Array.isArray(results) || results.length === 0) {
      throw new Error("Invalid classification results");
    }

    const topResult = results[0];
    console.log("Top result:", topResult);

    // Map visual features to diseases
    let diseaseKey: keyof typeof diseaseMapping = 'healthy';
    const label = topResult.label.toLowerCase();

    if (label.includes('rust') || label.includes('brown') || label.includes('spot')) {
      diseaseKey = 'common_rust';
    } else if (label.includes('blight') || label.includes('lesion')) {
      diseaseKey = 'northern_blight';
    } else if (label.includes('gray') || label.includes('grey') || label.includes('streak')) {
      diseaseKey = 'gray_leaf_spot';
    } else if (label.includes('rot') || label.includes('fungus')) {
      diseaseKey = 'ear_rot';
    } else if (label.includes('healthy') || label.includes('normal')) {
      diseaseKey = 'healthy';
    }

    const mappedResult = diseaseMapping[diseaseKey];
    const confidence = Math.round((topResult.score as number) * 100);

    return {
      ...diseaseMapping.healthy, // Default values
      ...mappedResult,
      confidence,
    } as AnalysisResult;

  } catch (error) {
    console.error("Error during image analysis:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};