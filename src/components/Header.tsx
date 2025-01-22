import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-800 to-green-900 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 animate-fade-up">
            <Leaf className="h-8 w-8 text-xr-yellow animate-wave" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-xr-yellow to-white">
              XpeditionR
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white hover:text-xr-yellow transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-xr-yellow transition-colors">
              About
            </Link>
            <Link to="/team" className="text-white hover:text-xr-yellow transition-colors">
              Team
            </Link>
            <Link to="/contact" className="text-white hover:text-xr-yellow transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};