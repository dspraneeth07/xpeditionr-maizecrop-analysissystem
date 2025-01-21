import { pipeline, PretrainedOptions } from "@huggingface/transformers";
import { allDiseases, DiseaseInfo, DiseaseKey } from "./diseaseDefinitions";

interface AnalysisResult extends DiseaseInfo {
  confidence: number;
}

interface ClassificationResult {
  label: string;
  score: number;
}

const detectDisease = async (imageData: string): Promise<ClassificationResult> => {
  console.log("Loading image classification model...");
  
  try {
    const classifier = await pipeline(
      "image-classification",
      "Xenova/vit-base-patch16-224-in21k-plant-disease",
      { 
        revision: "main"
      } as PretrainedOptions
    );

    console.log("Model loaded successfully, processing image...");
    
    const results = await classifier(imageData, {
      top_k: 1
    });

    console.log("Classification results:", results);

    if (!Array.isArray(results) || results.length === 0) {
      throw new Error("Invalid classification results");
    }

    // Type assertion to handle the classification result
    const firstResult = results[0] as { label: string; score: number };
    
    return {
      label: firstResult.label,
      score: firstResult.score
    };
  } catch (error) {
    console.error("Error in disease detection:", error);
    throw error;
  }
};

const mapModelOutputToDisease = (label: string): DiseaseKey => {
  const normalizedLabel = label.toLowerCase();
  
  // Map model output to our disease definitions
  if (normalizedLabel.includes('rust')) {
    return normalizedLabel.includes('southern') ? 'southern_rust' : 'common_rust';
  }
  
  if (normalizedLabel.includes('blight')) {
    return 'northern_leaf_blight';
  }
  
  if (normalizedLabel.includes('gray') || normalizedLabel.includes('grey')) {
    return 'gray_leaf_spot';
  }
  
  if (normalizedLabel.includes('healthy')) {
    return 'healthy';
  }
  
  // Default to common rust if no clear match
  return 'common_rust';
};

export const analyzeCropImage = async (imageData: string): Promise<AnalysisResult> => {
  try {
    console.log("Starting image analysis...");
    
    const { label, score } = await detectDisease(imageData);
    const diseaseKey = mapModelOutputToDisease(label);
    const diseaseInfo = allDiseases[diseaseKey];
    
    console.log("Analysis completed:", {
      label,
      score,
      diseaseKey,
      diseaseInfo
    });

    return {
      ...diseaseInfo,
      confidence: Math.round(score * 100),
    };
  } catch (error) {
    console.error("Error during image analysis:", error);
    throw error;
  }
};