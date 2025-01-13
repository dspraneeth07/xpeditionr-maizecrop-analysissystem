import { Hero } from "@/components/Hero";
import { About } from "@/components/About";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <About />
    </div>
  );
};

export default Index;