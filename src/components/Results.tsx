import { CheckCircle, AlertCircle, Download, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";

interface ResultsProps {
  isLoading?: boolean;
  isDetailedView?: boolean;
  data?: {
    diseaseName: string;
    confidence: number;
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
  };
  onDownloadPDF?: () => void;
}

export const Results = ({ isLoading, data, onDownloadPDF, isDetailedView }: ResultsProps) => {
  if (isLoading) {
    return (
      <div className="text-center space-y-4 p-8 animate-fade-in">
        <Progress value={33} className="w-full max-w-xs mx-auto" />
        <div className="flex items-center justify-center gap-2">
          <Leaf className="animate-spin text-green-500" />
          <p className="text-lg">
            {isDetailedView 
              ? "Performing detailed analysis of your crop..." 
              : "Analyzing your crop..."
            } Please wait.
          </p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-xr-red";
      case "moderate":
        return "text-xr-yellow";
      case "normal":
        return "text-xr-green";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-50";
      case "moderate":
        return "bg-yellow-50";
      case "normal":
        return "bg-green-50";
      default:
        return "bg-gray-50";
    }
  };

  const StatusIcon = data.status === "critical" ? AlertCircle : CheckCircle;

  return (
    <div className="space-y-6 p-4 animate-fade-in">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className={`${getStatusBg(data.status)} border-b`}>
          <CardTitle className="flex items-center gap-2">
            <StatusIcon className={`${getStatusColor(data.status)} animate-pulse`} />
            {data.diseaseName}
          </CardTitle>
          <CardDescription>
            Confidence Level: {data.confidence}%
            <Progress 
              value={data.confidence} 
              className={`mt-2 ${data.confidence > 70 ? "bg-green-500" : "bg-yellow-500"}`}
            />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="animate-fade-in">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(data.status)}`}></span>
                  Status
                </h3>
                <p className={`capitalize ${getStatusColor(data.status)} font-medium`}>
                  {data.status}
                </p>
              </div>
              <div className="animate-fade-in">
                <h3 className="font-semibold mb-2">Affected Area</h3>
                <div className="relative pt-1">
                  <Progress value={data.affectedArea} className="h-2" />
                  <span className="text-sm text-gray-600 mt-1 inline-block">
                    {data.affectedArea}% of crop affected
                  </span>
                </div>
              </div>
            </div>

            {isDetailedView && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="font-semibold mb-2">Causes</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.causes.map((cause, index) => (
                      <li key={index} className="text-gray-700">{cause}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {isDetailedView && (
            <>
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="font-semibold mb-2">Prevention Steps</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.prevention.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="animate-fade-in">
                <h3 className="font-semibold mb-2">Treatment Recommendations</h3>
                <Card className="bg-gray-50">
                  <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="font-medium">Medicine</p>
                        <p className="text-gray-700">{data.treatment.medicine}</p>
                      </div>
                      <div>
                        <p className="font-medium">Dosage</p>
                        <p className="text-gray-700">{data.treatment.dosage}</p>
                      </div>
                      <div>
                        <p className="font-medium">Frequency</p>
                        <p className="text-gray-700">{data.treatment.frequency}</p>
                      </div>
                      <div>
                        <p className="font-medium">Instructions</p>
                        <p className="text-gray-700">{data.treatment.instructions}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {isDetailedView && (
        <Button 
          className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-[1.02] animate-fade-in" 
          onClick={onDownloadPDF}
        >
          <Download className="mr-2" />
          Download Detailed PDF Report
        </Button>
      )}
    </div>
  );
};