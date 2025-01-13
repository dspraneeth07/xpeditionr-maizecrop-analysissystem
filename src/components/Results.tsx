import { CheckCircle, AlertCircle, Download, Bug, Shield, Syringe, Leaf } from "lucide-react";
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

  const getAffectedAreaGradient = (percentage: number) => {
    if (percentage > 66) return "bg-gradient-to-r from-red-500 to-red-600";
    if (percentage > 33) return "bg-gradient-to-r from-yellow-400 to-yellow-500";
    return "bg-gradient-to-r from-green-400 to-green-500";
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
                  <Progress 
                    value={data.affectedArea} 
                    className={`h-2 ${getAffectedAreaGradient(data.affectedArea)}`} 
                  />
                  <span className="text-sm text-gray-600 mt-1 inline-block">
                    {data.affectedArea}% of crop affected
                  </span>
                </div>
              </div>
            </div>

            {isDetailedView && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="p-2 bg-red-100 rounded-full shadow-lg transform hover:scale-110 transition-transform">
                      <Bug className="h-5 w-5 text-red-600" />
                    </div>
                    Causes
                  </h3>
                  <ul className="list-none pl-5 space-y-2">
                    {data.causes.map((cause, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-red-400"></span>
                        <span className="text-gray-700">{cause}</span>
                      </li>
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
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <div className="p-2 bg-green-100 rounded-full shadow-lg transform hover:scale-110 transition-transform">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    Prevention Steps
                  </h3>
                  <ul className="list-none pl-5 space-y-2">
                    {data.prevention.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="inline-block w-2 h-2 mt-2 rounded-full bg-green-400"></span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="animate-fade-in">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="p-2 bg-blue-100 rounded-full shadow-lg transform hover:scale-110 transition-transform">
                    <Syringe className="h-5 w-5 text-blue-600" />
                  </div>
                  Treatment Recommendations
                </h3>
                <Card className="bg-gradient-to-br from-white to-blue-50">
                  <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <p className="font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          Medicine
                        </p>
                        <p className="text-gray-700 pl-4">{data.treatment.medicine}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          Dosage
                        </p>
                        <p className="text-gray-700 pl-4">{data.treatment.dosage}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          Frequency
                        </p>
                        <p className="text-gray-700 pl-4">{data.treatment.frequency}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-medium flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          Instructions
                        </p>
                        <p className="text-gray-700 pl-4">{data.treatment.instructions}</p>
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
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-[1.02] animate-fade-in" 
          onClick={onDownloadPDF}
        >
          <Download className="mr-2" />
          Download Detailed PDF Report
        </Button>
      )}
    </div>
  );
};