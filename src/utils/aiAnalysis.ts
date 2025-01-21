import { pipeline, PretrainedOptions } from "@huggingface/transformers";
import { allDiseases, DiseaseKey, DiseaseInfo } from "./diseaseDefinitions";

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
      "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
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

    const firstResult = results[0] as ClassificationResult;
    
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
  if (normalizedLabel.includes('blight')) {
    return 'northern_corn_leaf_blight';
  }
  
  if (normalizedLabel.includes('rust')) {
    return 'common_rust';
  }

  if (normalizedLabel.includes('spot')) {
    return 'gray_leaf_spot';
  }

  if (normalizedLabel.includes('streak')) {
    return 'bacterial_leaf_streak';
  }
  
  if (normalizedLabel.includes('healthy') || normalizedLabel.includes('normal')) {
    return 'healthy';
  }
  
  // If no clear match is found, return unknown
  return 'unknown';
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