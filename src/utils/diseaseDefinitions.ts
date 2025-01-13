export type DiseaseStatus = "critical" | "moderate" | "normal";

export type DiseaseKey = 
  | "common_rust"
  | "southern_rust"
  | "northern_leaf_blight"
  | "gray_leaf_spot"
  | "goss_wilt"
  | "bacterial_leaf_streak"
  | "maize_dwarf"
  | "nitrogen_deficiency"
  | "phosphorus_deficiency"
  | "potassium_deficiency"
  | "healthy";

export interface DiseaseInfo {
  diseaseName: string;
  status: DiseaseStatus;
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

export const fungalDiseases: Record<string, DiseaseInfo> = {
  common_rust: {
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
  southern_rust: {
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
  northern_leaf_blight: {
    diseaseName: "Northern Corn Leaf Blight",
    status: "critical",
    affectedArea: 65,
    causes: [
      "Fungal pathogen (Exserohilum turcicum)",
      "Cool, moist conditions",
      "Poor air circulation"
    ],
    prevention: [
      "Resistant hybrids",
      "Crop rotation",
      "Residue management"
    ],
    treatment: {
      medicine: "Triazole fungicides",
      dosage: "300-400 ml/ha",
      frequency: "10-14 days interval",
      instructions: "Apply when disease first appears"
    }
  },
  gray_leaf_spot: {
    diseaseName: "Gray Leaf Spot",
    status: "critical",
    affectedArea: 60,
    causes: [
      "Fungal pathogen (Cercospora zeae-maydis)",
      "High humidity",
      "Warm temperatures"
    ],
    prevention: [
      "Resistant varieties",
      "Crop rotation",
      "Improved air circulation"
    ],
    treatment: {
      medicine: "Strobilurin fungicides",
      dosage: "350-500 ml/ha",
      frequency: "14-21 days interval",
      instructions: "Apply preventively in high-risk areas"
    }
  }
};

export const bacterialDiseases: Record<string, DiseaseInfo> = {
  goss_wilt: {
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
  bacterial_leaf_streak: {
    diseaseName: "Bacterial Leaf Streak",
    status: "critical",
    affectedArea: 55,
    causes: [
      "Xanthomonas vasicola",
      "High humidity",
      "Leaf wetness"
    ],
    prevention: [
      "Resistant varieties",
      "Proper irrigation",
      "Field sanitation"
    ],
    treatment: {
      medicine: "Copper hydroxide",
      dosage: "2.0-2.5 kg/ha",
      frequency: "7-14 days interval",
      instructions: "Apply early in disease development"
    }
  }
};

export const viralDiseases: Record<string, DiseaseInfo> = {
  maize_dwarf: {
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
  }
};

export const nutritionalDisorders: Record<string, DiseaseInfo> = {
  nitrogen_deficiency: {
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
  phosphorus_deficiency: {
    diseaseName: "Phosphorus Deficiency",
    status: "moderate",
    affectedArea: 40,
    causes: [
      "Low soil pH",
      "Cool soil temperatures",
      "Poor root development"
    ],
    prevention: [
      "Soil pH management",
      "Band application",
      "Starter fertilizers"
    ],
    treatment: {
      medicine: "Triple superphosphate",
      dosage: "60-80 kg P2O5/ha",
      frequency: "Pre-plant application",
      instructions: "Apply in bands near seed placement"
    }
  },
  potassium_deficiency: {
    diseaseName: "Potassium Deficiency",
    status: "moderate",
    affectedArea: 35,
    causes: [
      "Sandy soils",
      "High rainfall",
      "Soil compaction"
    ],
    prevention: [
      "Regular soil testing",
      "Balanced fertilization",
      "Proper tillage"
    ],
    treatment: {
      medicine: "Potassium chloride",
      dosage: "100-120 kg K2O/ha",
      frequency: "Split application",
      instructions: "Apply based on soil test results"
    }
  }
};

export const allDiseases = {
  ...fungalDiseases,
  ...bacterialDiseases,
  ...viralDiseases,
  ...nutritionalDisorders,
  healthy: {
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