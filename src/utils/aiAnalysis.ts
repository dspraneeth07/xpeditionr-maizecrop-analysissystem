import { pipeline } from "@huggingface/transformers";
import { allDiseases, DiseaseInfo } from "./diseaseDefinitions";

interface AnalysisResult extends DiseaseInfo {
  confidence: number;
}

const detectDisease = (label: string): keyof typeof allDiseases => {
  const normalizedLabel = label.toLowerCase();
  
  if (normalizedLabel.includes('healthy')) return 'healthy';
  
  // Detect fungal diseases
  if (normalizedLabel.includes('rust')) {
    return normalizedLabel.includes('southern') ? 'southern_rust' : 'common_rust';
  }
  if (normalizedLabel.includes('blight')) return 'northern_blight';
  if (normalizedLabel.includes('spot')) return 'gray_leaf_spot';
  
  // Detect bacterial diseases
  if (normalizedLabel.includes('wilt')) return 'goss_wilt';
  if (normalizedLabel.includes('streak')) return 'bacterial_leaf_streak';
  
  // Detect viral diseases
  if (normalizedLabel.includes('mosaic')) return 'maize_dwarf';
  if (normalizedLabel.includes('virus')) return 'maize_dwarf';
  
  // Detect nutritional disorders
  if (normalizedLabel.includes('deficiency')) {
    if (normalizedLabel.includes('nitrogen')) return 'nitrogen_deficiency';
    if (normalizedLabel.includes('phosphorus')) return 'phosphorus_deficiency';
    if (normalizedLabel.includes('potassium')) return 'potassium_deficiency';
  }
  
  return 'healthy';
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
    
    if (!('label' in topResult) || !('score' in topResult)) {
      throw new Error("Unexpected result format from classifier");
    }

    const diseaseKey = detectDisease(topResult.label);
    const confidence = Math.round(topResult.score * 100);

    return {
      ...allDiseases[diseaseKey],
      confidence,
    };

  } catch (error) {
    console.error("Error during image analysis:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};