import { Leaf } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-800 to-green-900 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center gap-2 animate-fade-up">
          <Leaf className="h-8 w-8 text-xr-yellow animate-wave" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-xr-yellow to-white">
            XpeditionR
          </h1>
        </div>
      </div>
    </header>
  );
};