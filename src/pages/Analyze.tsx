import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Results } from "@/components/Results";
import { analyzeCropImage } from "@/utils/aiAnalysis";
import { generatePDF } from "@/utils/pdfGenerator";
import AnalysisForm from "@/components/AnalysisForm";
import AnalysisOptions from "@/components/AnalysisOptions";

const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `XR-${timestamp}-${randomStr}`.toUpperCase();
};

const mockResults = {
  searchId: generateUniqueId(),
  diseaseName: "Maize Rust",
  confidence: 25.49,
  status: "critical" as const,
  affectedArea: 30,
  causes: [
    "Fungal infection (Puccinia spp.)",
    "High humidity levels in the field",
    "Overcrowded planting leading to poor air circulation"
  ],
  prevention: [
    "Ensure proper ventilation between plants",
    "Avoid waterlogging in the fields",
    "Rotate crops regularly to reduce fungal build-up"
  ],
  treatment: {
    medicine: "Azoxystrobin",
    dosage: "2.5 ml per liter of water",
    frequency: "Every 10 days until symptoms subside",
    instructions: "Apply in the early morning or evening to avoid direct sunlight. Use a sprayer for even coverage on all affected leaves."
  }
};

const Analyze = () => {
  const [selectedOption, setSelectedOption] = useState<1 | 2 | 3 | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
  });
  const { toast } = useToast();

  const handleOptionSelect = (option: 1 | 2 | 3) => {
    setSelectedOption(option);
    console.log(`Selected analysis option: ${option}`);
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // If quick test option is selected, show mock results immediately
    if (selectedOption === 3) {
      setResults(mockResults);
      toast({
        title: "Analysis Complete",
        description: "Your mock test results are ready to view.",
      });
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreview("");
    setResults(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast({
        variant: "destructive",
        title: "Missing image",
        description: "Please upload an image of your crop.",
      });
      return;
    }

    if (!formData.name || !formData.location || !formData.phone) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setAnalyzing(true);
    try {
      if (selectedOption === 3) {
        const resultsWithId = {
          ...mockResults,
          searchId: generateUniqueId(),
        };
        setResults(resultsWithId);
        toast({
          title: "Analysis Complete",
          description: "Your mock test results are ready to view.",
        });
      } else {
        const analysisResults = await analyzeCropImage(preview);
        const resultsWithId = {
          ...analysisResults,
          searchId: generateUniqueId(),
        };
        setResults(resultsWithId);
        toast({
          title: "Analysis Complete",
          description: selectedOption === 2 
            ? "Your detailed crop analysis report is ready to view."
            : "Your crop analysis is ready to view.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Failed to analyze the image. Please try again.",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!resultsRef.current || !results) return;
    
    try {
      await generatePDF(resultsRef.current, results);
      toast({
        title: "Success",
        description: "PDF report has been generated and downloaded.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "PDF Generation Failed",
        description: "Failed to generate PDF report. Please try again.",
      });
    }
  };

  const renderContent = () => {
    if (!selectedOption) {
      return <AnalysisOptions onOptionSelect={handleOptionSelect} />;
    }

    if (!analyzing && !results) {
      return (
        <AnalysisForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          preview={preview}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          isSubmitting={analyzing}
        />
      );
    }

    return (
      <div ref={resultsRef}>
        <Results 
          isLoading={analyzing} 
          data={results} 
          onDownloadPDF={handleDownloadPDF}
          isDetailedView={selectedOption === 2 || selectedOption === 3}
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-900 animate-fade-in">
        {!selectedOption 
          ? "Choose Analysis Type" 
          : selectedOption === 1 
            ? "Quick Crop Analysis"
            : selectedOption === 2
              ? "Detailed Crop Analysis"
              : "Quick Test Analysis"
        }
      </h1>

      {renderContent()}
    </div>
  );
};

export default Analyze;
