import { CheckCircle, AlertCircle, Download } from "lucide-react";
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
}

export const Results = ({ isLoading, data }: ResultsProps) => {
  if (isLoading) {
    return (
      <div className="text-center space-y-4 p-8">
        <Progress value={33} className="w-full max-w-xs mx-auto" />
        <p className="text-lg">Analyzing your crop... Please wait.</p>
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

  const StatusIcon = data.status === "critical" ? AlertCircle : CheckCircle;

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StatusIcon className={getStatusColor(data.status)} />
            {data.diseaseName}
          </CardTitle>
          <CardDescription>
            Confidence Level: {data.confidence}%
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Status</h3>
              <p className={`capitalize ${getStatusColor(data.status)}`}>
                {data.status}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Affected Area</h3>
              <p>{data.affectedArea}% of crop affected</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Causes</h3>
              <ul className="list-disc pl-5">
                {data.causes.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Prevention Steps</h3>
              <ul className="list-disc pl-5">
                {data.prevention.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Treatment Recommendations</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>
                  <strong>Medicine:</strong> {data.treatment.medicine}
                </p>
                <p>
                  <strong>Dosage:</strong> {data.treatment.dosage}
                </p>
                <p>
                  <strong>Frequency:</strong> {data.treatment.frequency}
                </p>
                <p>
                  <strong>Instructions:</strong> {data.treatment.instructions}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full" onClick={() => {/* TODO: Implement PDF generation */}}>
        <Download className="mr-2" />
        Download PDF Report
      </Button>
    </div>
  );
};