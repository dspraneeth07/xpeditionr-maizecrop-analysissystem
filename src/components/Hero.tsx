import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-maize-gradient">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up text-green-900">
          Empowering Indian Farmers with Technology
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-up text-green-800">
          Xpedition R Maize Health Advisor uses cutting-edge AI to analyze crop health and deliver actionable insights to ensure high yields and reduced losses.
        </p>
        <Button
          onClick={() => navigate("/analyze")}
          size="lg"
          className="bg-xr-green hover:bg-green-600 text-white animate-fade-up"
        >
          Start Crop Analysis
        </Button>
      </div>
    </div>
  );
};