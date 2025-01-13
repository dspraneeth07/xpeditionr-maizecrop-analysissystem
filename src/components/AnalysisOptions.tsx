import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, FileSpreadsheet } from "lucide-react";

interface AnalysisOptionsProps {
  onOptionSelect: (option: 1 | 2) => void;
}

const AnalysisOptions = ({ onOptionSelect }: AnalysisOptionsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="text-xr-green" />
            Quick Analysis
          </CardTitle>
          <CardDescription>
            Standard crop analysis with basic disease detection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => onOptionSelect(1)}
            className="w-full bg-xr-green hover:bg-green-600"
          >
            Start Quick Analysis
          </Button>
        </CardContent>
      </Card>

      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="text-xr-green" />
            Detailed Analysis
          </CardTitle>
          <CardDescription>
            Comprehensive analysis with detailed report and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => onOptionSelect(2)}
            className="w-full bg-xr-green hover:bg-green-600"
          >
            Start Detailed Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisOptions;