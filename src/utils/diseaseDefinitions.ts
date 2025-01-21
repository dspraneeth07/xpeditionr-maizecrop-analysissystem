export type DiseaseStatus = "critical" | "moderate" | "normal";

export type DiseaseKey = 
  | "northern_corn_leaf_blight"
  | "southern_corn_leaf_blight"
  | "common_rust"
  | "gray_leaf_spot"
  | "bacterial_leaf_streak"
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
  northern_corn_leaf_blight: {
    diseaseName: "Northern Corn Leaf Blight (Exserohilum turcicum)",
    status: "critical",
    affectedArea: 65,
    causes: [
      "Fungal pathogen Exserohilum turcicum",
      "Cool temperatures (65-80°F)",
      "Prolonged leaf wetness (>6 hours)",
      "High humidity (>90%)"
    ],
    prevention: [
      "Plant resistant hybrids (Ht1, Ht2, or Ht3 genes)",
      "Implement crop rotation with non-host crops",
      "Remove or plow under crop debris",
      "Maintain proper plant spacing for ventilation"
    ],
    treatment: {
      medicine: "Propiconazole or Azoxystrobin fungicide",
      dosage: "Apply 4-6 fl oz/acre of propiconazole or 6-15.5 fl oz/acre of azoxystrobin",
      frequency: "14-21 day intervals as needed",
      instructions: "Apply when disease first appears. Do not apply within 30 days of harvest."
    }
  },
  common_rust: {
    diseaseName: "Common Rust (Puccinia sorghi)",
    status: "critical",
    affectedArea: 70,
    causes: [
      "Fungal pathogen Puccinia sorghi",
      "Moderate temperatures (60-77°F)",
      "High relative humidity (>95%)",
      "Presence of free moisture on leaves"
    ],
    prevention: [
      "Plant rust-resistant hybrids",
      "Early planting to avoid optimal disease conditions",
      "Scout fields regularly",
      "Maintain proper air circulation"
    ],
    treatment: {
      medicine: "Pyraclostrobin + Metconazole mixture",
      dosage: "10-12 fl oz/acre",
      frequency: "Apply at 7-14 day intervals",
      instructions: "Begin applications at first sign of disease. Ensure complete coverage. Do not exceed 2 sequential applications."
    }
  },
  gray_leaf_spot: {
    diseaseName: "Gray Leaf Spot (Cercospora zeae-maydis)",
    status: "critical",
    affectedArea: 60,
    causes: [
      "Fungal pathogen Cercospora zeae-maydis",
      "High humidity (>95%)",
      "Temperatures between 70-85°F",
      "Extended periods of leaf wetness"
    ],
    prevention: [
      "Use resistant hybrids",
      "Rotate with non-host crops for 2 years",
      "Improve field drainage",
      "Practice conservation tillage"
    ],
    treatment: {
      medicine: "Trifloxystrobin + Prothioconazole",
      dosage: "4-5 fl oz/acre",
      frequency: "14-21 day intervals",
      instructions: "Apply when disease first appears. Maximum 2 applications per season. Observe pre-harvest interval of 14 days."
    }
  }
};

export const bacterialDiseases: Record<string, DiseaseInfo> = {
  bacterial_leaf_streak: {
    diseaseName: "Bacterial Leaf Streak (Xanthomonas vasicola)",
    status: "moderate",
    affectedArea: 45,
    causes: [
      "Bacterial pathogen Xanthomonas vasicola pv. vasculorum",
      "Warm temperatures (75-85°F)",
      "High humidity",
      "Overhead irrigation or rain splash"
    ],
    prevention: [
      "Plant tolerant hybrids",
      "Practice crop rotation",
      "Avoid overhead irrigation",
      "Maintain field sanitation"
    ],
    treatment: {
      medicine: "Copper hydroxide bactericide",
      dosage: "1.5-2.0 lbs/acre",
      frequency: "7-10 day intervals",
      instructions: "Apply before severe disease development. Use with sufficient water volume for complete coverage."
    }
  }
};

export const allDiseases = {
  ...fungalDiseases,
  ...bacterialDiseases,
  healthy: {
    diseaseName: "Healthy Corn Plant",
    status: "normal",
    affectedArea: 0,
    causes: [],
    prevention: [
      "Regular crop monitoring",
      "Balanced fertilization program",
      "Proper irrigation management",
      "Integrated pest management practices"
    ],
    treatment: {
      medicine: "No treatment needed",
      dosage: "Not applicable",
      frequency: "Continue monitoring",
      instructions: "Maintain current agricultural practices"
    }
  }
};