import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2">
            Copyright © {new Date().getFullYear()} Xpedition R Maize Health Advisor
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
    </footer>
  );
};