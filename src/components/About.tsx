import { Card } from "./ui/card";
import { Leaf, Upload, FileText, Download } from "lucide-react";

const steps = [
  {
    icon: Leaf,
    title: "Choose your crop",
    description: "Select maize from our supported crops list",
  },
  {
    icon: Upload,
    title: "Upload Image",
    description: "Upload or capture an image of your crop",
  },
  {
    icon: FileText,
    title: "Enter Details",
    description: "Provide your contact information",
  },
  {
    icon: Download,
    title: "Get Results",
    description: "Receive detailed analysis and recommendations",
  },
];

export const About = () => {
  return (
    <section className="py-16 bg-xr-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-green-900">Our Mission</h2>
          <p className="text-lg text-green-800">
            Our mission is to leverage technology to revolutionize crop health management. The Xpedition R team is dedicated to empowering farmers with tools to diagnose crop diseases accurately, enabling informed decisions for better farming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="mb-4 flex justify-center">
                <step.icon className="w-12 h-12 text-xr-green animate-wave" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};