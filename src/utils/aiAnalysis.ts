import { pipeline } from "@huggingface/transformers";
import { allDiseases, DiseaseInfo, DiseaseKey } from "./diseaseDefinitions";

interface AnalysisResult extends DiseaseInfo {
  confidence: number;
}

const detectDisease = (label: string): DiseaseKey => {
  console.log("Detecting disease from label:", label);
  const normalizedLabel = label.toLowerCase();
  
  // Detect fungal diseases
  if (normalizedLabel.includes('rust') || normalizedLabel.includes('brown') || normalizedLabel.includes('spot')) {
    if (normalizedLabel.includes('southern')) return 'southern_rust';
    return 'common_rust';
  }
  
  if (normalizedLabel.includes('blight') || normalizedLabel.includes('lesion')) {
    return 'northern_leaf_blight';
  }
  
  if (normalizedLabel.includes('gray') || normalizedLabel.includes('grey') || normalizedLabel.includes('spot')) {
    return 'gray_leaf_spot';
  }
  
  // Detect bacterial diseases
  if (normalizedLabel.includes('wilt') || normalizedLabel.includes('bacterial')) {
    return 'goss_wilt';
  }
  
  if (normalizedLabel.includes('streak') || normalizedLabel.includes('stripe')) {
    return 'bacterial_leaf_streak';
  }
  
  // Detect viral diseases
  if (normalizedLabel.includes('mosaic') || normalizedLabel.includes('virus') || 
      normalizedLabel.includes('dwarf') || normalizedLabel.includes('yellow')) {
    return 'maize_dwarf';
  }
  
  // Detect nutritional disorders
  if (normalizedLabel.includes('deficiency') || normalizedLabel.includes('nutrient')) {
    if (normalizedLabel.includes('nitrogen') || normalizedLabel.includes('yellow')) {
      return 'nitrogen_deficiency';
    }
    if (normalizedLabel.includes('phosphorus') || normalizedLabel.includes('purple')) {
      return 'phosphorus_deficiency';
    }
    if (normalizedLabel.includes('potassium') || normalizedLabel.includes('brown')) {
      return 'potassium_deficiency';
    }
  }
  
  // Only return healthy if explicitly detected as healthy
  if (normalizedLabel.includes('healthy') && 
      !normalizedLabel.includes('disease') && 
      !normalizedLabel.includes('deficiency')) {
    return 'healthy';
  }
  
  // Default to common rust if no clear match (since it's a common disease)
  return 'common_rust';
};

export const analyzeCropImage = async (imageData: string): Promise<AnalysisResult> => {
  try {
    console.log("Starting image analysis...");
    
    const classifier = await pipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224"
    );
    
    console.log("Model loaded successfully");
    
    const results = await classifier(imageData, {
      topk: 5, // Get top 5 predictions to better detect disease patterns
    });
    
    console.log("Classification results:", results);

    if (!Array.isArray(results) || results.length === 0) {
      throw new Error("Invalid classification results");
    }

    // Analyze top predictions to determine disease
    let diseaseKey: DiseaseKey = 'healthy';
    let highestConfidence = 0;

    for (const result of results) {
      if (!('label' in result) || !('score' in result)) continue;
      
      const detectedDisease = detectDisease(result.label);
      if (detectedDisease !== 'healthy' && result.score > highestConfidence) {
        diseaseKey = detectedDisease;
        highestConfidence = result.score;
      }
    }

    const diseaseInfo = allDiseases[diseaseKey];
    const confidence = Math.round(highestConfidence * 100);

    console.log("Final analysis result:", {
      diseaseKey,
      confidence,
      diseaseInfo
    });

    return {
      ...diseaseInfo,
      confidence,
    };

  } catch (error) {
    console.error("Error during image analysis:", error);
    throw new Error("Failed to analyze image. Please try again.");
  }
};