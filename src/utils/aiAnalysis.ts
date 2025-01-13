import { pipeline } from "@huggingface/transformers";

let classifier: any = null;

export const initializeModel = async () => {
  if (!classifier) {
    classifier = await pipeline(
      "image-classification",
      "Xenova/crop-disease-detection"
    );
  }
  return classifier;
};

export const analyzeCropImage = async (imageUrl: string) => {
  try {
    const model = await initializeModel();
    const results = await model(imageUrl);
    
    // Map the model output to our application's format
    const diseaseMapping: { [key: string]: any } = {
      "northern_leaf_blight": {
        diseaseName: "Northern Corn Leaf Blight",
        status: "moderate",
        causes: [
          "Fungal infection (Exserohilum turcicum)",
          "High humidity conditions",
          "Poor air circulation",
        ],
        prevention: [
          "Rotate crops with non-host plants",
          "Remove crop debris after harvest",
          "Improve field drainage",
          "Use resistant maize varieties",
        ],
        treatment: {
          medicine: "Propiconazole",
          dosage: "1.5-2 ml/liter of water",
          frequency: "Every 7-14 days",
          instructions: "Apply during early morning or late evening. Ensure complete coverage of leaves. Repeat application if symptoms persist.",
        }
      },
      // Add more disease mappings as needed
    };

    const topResult = results[0];
    const mappedDisease = diseaseMapping[topResult.label] || {
      diseaseName: topResult.label,
      status: "unknown",
      causes: ["Unknown cause"],
      prevention: ["Consult an agricultural expert"],
      treatment: {
        medicine: "Consult expert",
        dosage: "N/A",
        frequency: "N/A",
        instructions: "Please consult an agricultural expert for proper diagnosis and treatment."
      }
    };

    return {
      ...mappedDisease,
      confidence: Math.round(topResult.score * 100),
      affectedArea: Math.round(topResult.score * 100 * 0.8), // Estimate affected area
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw new Error("Failed to analyze image");
  }
};