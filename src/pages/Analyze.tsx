import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Analyze = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-xr-beige p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Analyze Your Crop</h1>
        <p className="mb-8">This feature is coming soon!</p>
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="bg-white hover:bg-gray-100"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default Analyze;