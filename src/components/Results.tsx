import { CheckCircle, AlertCircle, Download, Bug, Shield, Syringe, Leaf, User, MapPin, Phone, Mail, Share2, Search } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { toast } from "./ui/use-toast";

interface ResultsProps {
  isLoading?: boolean;
  isDetailedView?: boolean;
  formData?: {
    name: string;
    location: string;
    phone: string;
    email?: string;
  };
  data?: {
    searchId: string;
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

export const Results = ({ isLoading, data, formData, onDownloadPDF, isDetailedView }: ResultsProps) => {
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
        return "text-red-500";
      case "moderate":
        return "text-yellow-500";
      case "normal":
        return "text-green-500";
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
    if (percentage > 66) return "bg-gradient-to-r from-red-500 via-red-600 to-red-700";
    if (percentage > 33) return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600";
    return "bg-gradient-to-r from-green-400 via-green-500 to-green-600";
  };

  const StatusIcon = data.status === "critical" ? AlertCircle : CheckCircle;

  const handleShare = async () => {
    if (!data || !formData) return;
    
    const shareText = `
XpeditionR Crop Analysis Report
Search ID: ${data.searchId}
Disease: ${data.diseaseName}
Status: ${data.status.toUpperCase()}
Affected Area: ${data.affectedArea}%

User Details:
Name: ${formData.name}
Location: ${formData.location}
Contact: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}

Disease Information:
${data.causes.length > 0 ? '\nCauses:\n' + data.causes.map(cause => `- ${cause}`).join('\n') : ''}
${data.prevention.length > 0 ? '\nPrevention Steps:\n' + data.prevention.map(step => `- ${step}`).join('\n') : ''}

Treatment:
Medicine: ${data.treatment.medicine}
Dosage: ${data.treatment.dosage}
Frequency: ${data.treatment.frequency}
Instructions: ${data.treatment.instructions}

View full report at: ${window.location.href}
    `.trim();
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'XpeditionR Crop Analysis Report',
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Report copied to clipboard",
          description: "You can now paste and share the report details.",
        });
      }
    } catch (err) {
      console.error("Error sharing report:", err);
      toast({
        variant: "destructive",
        title: "Sharing failed",
        description: "Could not share the report. Try copying the URL manually.",
      });
    }
  };

  const handleCheckOther = () => {
    window.location.href = '/analyze';
  };

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto animate-fade-in print:p-0">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardHeader className={`${getStatusBg(data.status)} border-b py-6`}>
          <div className="flex justify-between items-start">
            <div className="text-left">
              <CardTitle className="flex items-center gap-2 text-2xl mb-2">
                <StatusIcon className={`${getStatusColor(data.status)} animate-pulse h-8 w-8`} />
                {data.diseaseName}
              </CardTitle>
              <CardDescription className="font-semibold text-lg">
                Search ID: {data.searchId}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {formData && (
            <div className="grid md:grid-cols-2 gap-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-inner">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 font-medium">{formData.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">{formData.location}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">{formData.phone}</span>
                </div>
                {formData.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">{formData.email}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="text-left">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(data.status)}`}></span>
                  Status
                </h3>
                <p className={`capitalize ${getStatusColor(data.status)} font-medium`}>
                  {data.status}
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-2">Affected Area</h3>
            <div className="max-w-md mx-auto">
              <div className="relative pt-1">
                <Progress 
                  value={data.affectedArea} 
                  className={`h-3 rounded-full ${getAffectedAreaGradient(data.affectedArea)}`} 
                />
                <span className="text-sm text-gray-600 mt-1 block">
                  {data.affectedArea}% of crop affected
                </span>
              </div>
            </div>
          </div>

          {isDetailedView && (
            <div className="grid md:grid-cols-2 gap-8">
              {data.causes.length > 0 && (
                <Card className="bg-gradient-to-br from-white to-red-50">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Bug className="h-6 w-6 text-red-600" />
                      </div>
                      Causes
                    </h3>
                    <ul className="space-y-3 pl-2">
                      {data.causes.map((cause, index) => (
                        <li key={index} className="flex items-start gap-3 p-2 hover:bg-red-50/50 rounded-lg transition-colors">
                          <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-red-500"></span>
                          <span className="text-gray-700">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {data.prevention.length > 0 && (
                <Card className="bg-gradient-to-br from-white to-green-50">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Shield className="h-6 w-6 text-green-600" />
                      </div>
                      Prevention Steps
                    </h3>
                    <ul className="space-y-3 pl-2">
                      {data.prevention.map((step, index) => (
                        <li key={index} className="flex items-start gap-3 p-2 hover:bg-green-50/50 rounded-lg transition-colors">
                          <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-500"></span>
                          <span className="text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {isDetailedView && data.treatment && (
            <div className="animate-fade-in text-left">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Syringe className="h-5 w-5 text-blue-600" />
                </div>
                Treatment Recommendations
              </h3>
              <Card className="bg-gradient-to-br from-white to-blue-50">
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></span>
                        Medicine
                      </p>
                      <p className="text-gray-700 pl-4">{data.treatment.medicine}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></span>
                        Dosage
                      </p>
                      <p className="text-gray-700 pl-4">{data.treatment.dosage}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></span>
                        Frequency
                      </p>
                      <p className="text-gray-700 pl-4">{data.treatment.frequency}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></span>
                        Instructions
                      </p>
                      <p className="text-gray-700 pl-4">{data.treatment.instructions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 print:hidden">
        <Button 
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-[1.02]" 
          onClick={handleCheckOther}
        >
          <Search className="mr-2 h-5 w-5" />
          Check Other
        </Button>
        
        {isDetailedView && (
          <Button 
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-[1.02]" 
            onClick={onDownloadPDF}
          >
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
        )}
        
        <Button 
          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:scale-[1.02]" 
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share Report
        </Button>
      </div>
    </div>
  );
};