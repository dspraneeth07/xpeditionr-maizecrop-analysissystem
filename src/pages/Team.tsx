import { Github, Mail, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const teamMembers = [
  {
    name: "Dhadi Sai Praneeth Reddy",
    role: "Head of Research",
    education: "Bachelor of Engineering in Computer Science and Engineering, Vasavi College of Engineering",
    description: `Dhadi Sai Praneeth Reddy is an accomplished research author in Oceanography, AI/ML, and IoT, dedicated to solving real-world problems through data-driven insights. He specializes in agricultural AI, oceanic data analysis, and intelligent automation. His work focuses on building AI-powered models for crop disease detection, precision farming, and environmental monitoring.

    As a developer, Praneeth has worked on numerous web and AI-based projects, integrating machine learning, computer vision, and IoT to enhance efficiency and accuracy in research-driven applications. His technical expertise spans across Python, JavaScript, AI frameworks, and cloud computing.
    
    Beyond research and technology, Praneeth is also a novelist and motivational writer, inspiring readers through his stories and articles. His vision is to bridge technology and research to create impactful solutions.`,
    expertise: "AI/ML, IoT, and Oceanography",
    github: "github.com/dspraneeth07",
    image: "https://avatars.githubusercontent.com/u/173777305?v=4"
  },
  {
    name: "Kasireddy Manideep Reddy",
    role: "Research Member",
    education: "Bachelor of Engineering in Computer Science and Engineering, Vasavi College of Engineering",
    description: `Kasireddy Manideep Reddy is a dedicated researcher specializing in AI-powered analytics, IoT for smart agriculture, and large-scale data processing. His research focuses on developing AI-driven models to analyze real-time crop data, soil health, and weather patterns.

    With expertise in IoT-based sensor networks, he works on smart irrigation, automated disease detection, and predictive analytics for crop yield improvement. His primary interest lies in integrating AI and IoT technologies to make farming more efficient, cost-effective, and sustainable.
    
    As an AI developer, Manideep has built intelligent systems that process agricultural datasets, providing real-time insights for farmers and researchers. His goal is to apply machine learning and smart computing to revolutionize precision farming.`,
    expertise: "IoT, Smart Agriculture, AI-driven analytics",
    image: "https://media.licdn.com/dms/image/v2/D5603AQEt9bS1afbsqA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1731502775717?e=2147483647&v=beta&t=gnti_yNWagXvsQi8o-bZFk_Vw0miUlMt_1EJdfpPoO4"
  },
  {
    name: "Baggari Sahasra Reddy",
    role: "Research Member & Editor",
    education: "Bachelor of Engineering in Computer Science and Engineering, Vardhaman College of Engineering",
    description: `Baggari Sahasra Reddy specializes in data preprocessing, AI-assisted image processing, and research documentation. Her work focuses on enhancing AI models for plant disease recognition, ensuring high-quality image datasets for training deep learning models.

    As an editor and research analyst, she plays a key role in refining technical documentation, research publications, and scientific reports. Her expertise in content structuring and technical writing ensures that research papers are clear, well-organized, and publication-ready.
    
    Beyond research, Sahasra has contributed to AI-driven agricultural tools, developing strategies to improve data quality, annotation, and preprocessing in image recognition systems. She is passionate about creating a knowledge-driven research ecosystem.`,
    expertise: "AI-Assisted Image Processing, Data Preprocessing",
    image: "/lovable-uploads/2559058d-e548-4f17-976f-89ce4b264208.png"
  },
  {
    name: "Tanishka Kora",
    role: "Research Member",
    education: "Bachelor of Engineering in Computer Science and Engineering (AI & ML)",
    description: `Tanishka Kora is an AI researcher with a focus on deep learning for precision agriculture, specializing in neural networks for crop disease identification and early disease prediction models. She works on developing intelligent AI algorithms that can analyze plant health through computer vision and deep learning.

    Her research aims to create automated agricultural tools that assist farmers in detecting diseases, predicting crop yields, and optimizing agricultural productivity. With expertise in convolutional neural networks (CNNs), TensorFlow, and image-based AI models, Tanishka is working on real-time disease detection systems that integrate with mobile and web platforms.
    
    As a developer, she is committed to building AI solutions that are not only accurate but also accessible to farmers, making AI-driven agriculture a practical reality.`,
    expertise: "Deep Learning, Neural Networks",
    image: "/lovable-uploads/23bb7f88-d956-433e-bd63-898b2363342f.png"
  }
];

const Team = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-6">Meet Our Team</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our multidisciplinary team brings together expertise in AI, Machine Learning, IoT, and scientific research
            to drive innovation in agriculture and sustainability.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-48 h-48 rounded-full border-4 border-green-500 p-1 mx-auto md:mx-0 overflow-hidden">
                      <Avatar className="w-full h-full">
                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-green-600 font-medium mb-3">{member.role}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="h-5 w-5 text-green-600" />
                      <p className="text-sm text-gray-600">{member.education}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Expertise:</strong> {member.expertise}
                    </p>
                    <div className="space-y-3 text-sm text-gray-600">
                      {member.description.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="leading-relaxed">{paragraph.trim()}</p>
                      ))}
                    </div>
                    {member.github && (
                      <div className="mt-4">
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href={`https://${member.github}`} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            GitHub Profile
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;