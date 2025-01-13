import { Github, Mail, Phone } from "lucide-react";
import { Leaf } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Xpedition R Branding and Contact Details */}
        <div className="text-left">
          <div className="flex items-center gap-2 animate-fade-up">
            <Leaf className="h-8 w-8 text-xr-yellow animate-wave" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-xr-yellow to-white">
              XpeditionR
            </h1>
          </div>
          <p className="text-gray-300 mt-2">
            Empowering research and innovation for a better tomorrow.
          </p>

          {/* Contact Details Below XPEDITION R Logo */}
          <div className="mt-4">
            <h3 className="text-xr-yellow font-bold text-lg underline mb-4">Contact</h3>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+917416466619" className="hover:text-xr-yellow transition-colors">
                +91 7416466619
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:dspraneeth07@gmail.com" className="hover:text-xr-yellow transition-colors">
                dspraneeth07@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Center Section: Team Members */}
        <div className="text-center">
          <div className="bg-green-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-xr-yellow font-bold text-lg underline mb-4">Team</h3>
            <ul className="text-gray-300 font-medium space-y-2">
              <li>Dhadi Sai Praneeth Reddy</li>
              <li>Kasireddy Manideep Reddy</li>
              <li>Baggari Sahasra Reddy</li>
              <li>Kora Tanishka</li>
            </ul>
          </div>
        </div>

        {/* Right Section: India Flag Logo and Made in India */}
        <div className="bg-green-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
          {/* India Flag Logo */}
          <div className="my-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Emblem_of_India_%28Government_Gazette%29.svg/1200px-Emblem_of_India_%28Government_Gazette%29.svg.png"
              alt="India Flag Emblem"
              className="w-18 h-20 mx-auto"
            />
          </div>

          {/* Made in India and Copyright */}
          <p className="text-gray-300">🇮🇳 Made in India</p>
          <p className="text-gray-300 mt-2">
            ©{" "}
            <a
              href="https://www.researchgate.net/lab/XPEDITION-R-RESEARCH-GROUP-Sai-Praneeth-Reddy-Dhadi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xr-yellow hover:text-xr-yellow-dark"
            >
              Xpedition R Research Group
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Section: Credits */}
      <div className="mt-8 border-t pt-4 text-center">
        <p className="text-gray-300">
          Designed and Developed by Dhadi Sai Praneeth Reddy |{" "}
          <a
            href="https://github.com/dspraneeth07"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xr-yellow hover:text-xr-yellow-dark inline-flex items-center"
          >
            <Github className="w-5 h-5" />
            <span className="sr-only">GitHub Profile</span>
          </a>
        </p>
      </div>
    </footer>
  );
};
