import { Book, Globe, Database, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Globe,
    title: "Global Impact",
    description: "Bridging research with practical applications in agriculture and sustainability worldwide."
  },
  {
    icon: Database,
    title: "AI & ML Innovation",
    description: "Leveraging cutting-edge technology for precision agriculture and crop health management."
  },
  {
    icon: Book,
    title: "Research Publication",
    description: "Supporting undergraduate research through platforms like Zenodo, arXiv, and SSRN."
  },
  {
    icon: Leaf,
    title: "Sustainable Solutions",
    description: "Developing IoT-based monitoring systems for smart agriculture."
  }
];

const About = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-6">About Xpedition R Research Group</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are dedicated to pioneering research in AI, Machine Learning, and IoT to solve real-world problems
            in agriculture and environmental sustainability.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Our Approach</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Research-Driven Innovation</h3>
              <p className="text-gray-600">
                We bridge academic research with practical applications, focusing on precision agriculture
                and real-time disease detection using advanced AI models and IoT systems.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Open Knowledge Exchange</h3>
              <p className="text-gray-600">
                Our commitment to open-access research and innovation drives us to share our findings
                and collaborate with researchers worldwide.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;