import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Results } from "@/components/Results";

const Analyze = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
  });
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file.",
        });
      }
    }
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
    // Simulated API call
    setTimeout(() => {
      setResults({
        diseaseName: "Northern Corn Leaf Blight",
        confidence: 95,
        status: "moderate",
        affectedArea: 30,
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
          instructions:
            "Apply during early morning or late evening. Ensure complete coverage of leaves. Repeat application if symptoms persist.",
        },
      });
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-900">
        Analyze Your Crop
      </h1>

      {!analyzing && !results ? (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {preview ? (
                <div className="space-y-4">
                  <img src={preview} alt="Preview" className="max-h-64 mx-auto" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImage(null);
                      setPreview("");
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center gap-4">
                    <label className="cursor-pointer">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        capture="environment"
                      />
                      <Button type="button" variant="outline">
                        <Camera className="mr-2" />
                        Capture Image
                      </Button>
                    </label>
                    <label className="cursor-pointer">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button type="button" variant="outline">
                        <Upload className="mr-2" />
                        Upload Image
                      </Button>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Drag and drop an image here or click to upload
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-xr-green hover:bg-green-600">
            Analyze My Crop
          </Button>
        </form>
      ) : (
        <Results isLoading={analyzing} data={results} />
      )}
    </div>
  );
};

export default Analyze;
