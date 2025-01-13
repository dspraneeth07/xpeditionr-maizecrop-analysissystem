export interface DiseaseInfo {
  diseaseName: string;
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
  // Add more fungal diseases...
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
  // Add more bacterial diseases...
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
  },
  // Add more viral diseases...
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
  // Add more nutritional disorders...
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