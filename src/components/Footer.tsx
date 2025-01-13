import { Github, Mail, Phone } from "lucide-react";
import { Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-xr-yellow animate-wave" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-xr-yellow to-white">
                XpeditionR
              </h1>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="mb-2">
              Copyright © {new Date().getFullYear()} Xpedition R Maize Health Advisor
            </p>
            <p className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+917416466619" className="hover:text-xr-yellow transition-colors">
                +91 7416466619
              </a>
            </p>
            <p className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:dspraneeth07@gmail.com" className="hover:text-xr-yellow transition-colors">
                dspraneeth07@gmail.com
              </a>
            </p>
            <p className="flex items-center justify-center gap-2">
              Designed and Developed by Dhadi Sai Praneeth Reddy
              <a
                href="https://github.com/dspraneeth07"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-xr-yellow transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};