import { Button } from "@/components/ui/button";
import { Zap, FileSearch, Microscope } from "lucide-react";

interface AnalysisOptionsProps {
  onOptionSelect: (option: 1 | 2 | 3) => void;
}

const AnalysisOptions = ({ onOptionSelect }: AnalysisOptionsProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-3">
        <Button
          variant="outline"
          className="group p-8 h-auto flex flex-col gap-4 hover:bg-maize-gradient border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-green-500"
          onClick={() => onOptionSelect(1)}
        >
          <Zap className="h-12 w-12 text-green-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
          <div className="space-y-2 text-center">
            <h3 className="font-semibold">Quick Analysis</h3>
            <p className="text-sm text-gray-500">Basic disease detection</p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="group p-8 h-auto flex flex-col gap-4 hover:bg-gradient-to-br from-yellow-100 via-green-100 to-green-200 border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-green-500"
          onClick={() => onOptionSelect(2)}
        >
          <FileSearch className="h-12 w-12 text-green-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
          <div className="space-y-2 text-center">
            <h3 className="font-semibold">Detailed Analysis</h3>
            <p className="text-sm text-gray-500 flex flex-col">
              <span>Comprehensive Report</span>
              <span>with Recommendations</span>
            </p>
          </div>
        </Button>

        <Button
          variant="outline"
          className="group p-8 h-auto flex flex-col gap-4 hover:bg-maize-gradient border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-green-500"
          onClick={() => onOptionSelect(3)}
        >
          <Microscope className="h-12 w-12 text-green-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
          <div className="space-y-2 text-center">
            <h3 className="font-semibold">Quick Test</h3>
            <p className="text-sm text-gray-500">Mock results for testing</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default AnalysisOptions;