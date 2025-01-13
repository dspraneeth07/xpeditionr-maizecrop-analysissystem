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
  "plant": {
    diseaseName: "Common Plant Disease",
    status: "moderate",
    affectedArea: 45,
    causes: [
      "Environmental stress",
      "Nutrient deficiency",
      "Pest infestation",
      "Fungal infection",
      "Poor soil conditions"
    ],
    prevention: [
      "Regular monitoring of plant health",
      "Proper watering schedule",
      "Balanced fertilization",
      "Good air circulation",
      "Clean gardening tools"
    ],
    treatment: {
      medicine: "Neem oil solution",
      dosage: "2-3 tablespoons per gallon of water",
      frequency: "Every 7-14 days",
      instructions: "Apply early morning or late evening. Ensure complete coverage of affected areas."
    },
  },
  "leaf": {
    diseaseName: "Leaf Spot Disease",
    status: "critical",
    affectedArea: 65,
    causes: [
      "Fungal pathogens",
      "High humidity",
      "Poor air circulation",
      "Water splashing",
      "Overcrowded plants"
    ],
    prevention: [
      "Improve air circulation",
      "Avoid overhead watering",
      "Remove infected leaves",
      "Maintain plant spacing",
      "Use disease-resistant varieties"
    ],
    treatment: {
      medicine: "Copper fungicide",
      dosage: "1-2 teaspoons per gallon of water",
      frequency: "Every 7-10 days",
      instructions: "Spray all plant surfaces until thoroughly wet. Apply in dry conditions."
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
      "Practice proper irrigation",
      "Regular soil testing"
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
    affectedArea: 30,
    causes: [
      "Multiple potential factors",
      "Environmental stress",
      "Possible pathogen infection"
    ],
    prevention: [
      "Regular plant inspection",
      "Maintain proper growing conditions",
      "Consult with local agricultural expert"
    ],
    treatment: {
      medicine: "General purpose fungicide/insecticide",
      dosage: "As per product label",
      frequency: "As needed",
      instructions: "Consult with local agricultural expert for specific recommendations"
    },
  }
};

export const analyzeCropImage = async (imageData: string): Promise<AnalysisResult> => {
  try {
    console.log("Starting image analysis...");
    
    const classifier = await pipeline(
      "image-classification",
      "microsoft/resnet-50"
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

    // Get the top result and explicitly type it
    const topResult = results[0] as { label: string; score: number };
    console.log("Top result:", topResult);

    // Map the classification result to our disease categories
    let diseaseKey: keyof typeof diseaseMapping = 'default';
    
    const label = topResult.label.toLowerCase();
    if (label.includes('plant')) {
      diseaseKey = 'plant';
    } else if (label.includes('leaf') || label.includes('foliage')) {
      diseaseKey = 'leaf';
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