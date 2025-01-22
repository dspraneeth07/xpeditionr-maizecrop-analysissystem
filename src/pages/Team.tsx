import { Github, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Dhadi Sai Praneeth Reddy",
    role: "Head of Research",
    expertise: "AI/ML, IoT, and Oceanography",
    education: "B.E. in Computer Science, Vasavi College of Engineering",
    github: "github.com/dspraneeth07",
    image: "/placeholder.svg"
  },
  {
    name: "Kasireddy Manideep Reddy",
    role: "Research Member",
    expertise: "IoT, Smart Agriculture, AI-driven analytics",
    education: "B.E. in Computer Science, Vasavi College of Engineering",
    image: "/placeholder.svg"
  },
  {
    name: "Baggari Sahasra Reddy",
    role: "Research Member & Editor",
    expertise: "AI-Assisted Image Processing, Data Preprocessing",
    education: "B.E. in Computer Science, Vardhaman College of Engineering",
    image: "/placeholder.svg"
  },
  {
    name: "Tanishka Kora",
    role: "Research Member",
    expertise: "Deep Learning, Neural Networks",
    education: "B.E. in Computer Science (AI & ML)",
    image: "/placeholder.svg"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="aspect-square rounded-full overflow-hidden mb-4 bg-green-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-green-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-2">{member.expertise}</p>
                <p className="text-sm text-gray-500 mb-4">{member.education}</p>
                {member.github && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={`https://${member.github}`} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;