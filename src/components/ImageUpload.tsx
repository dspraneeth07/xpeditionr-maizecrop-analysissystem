import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadProps {
  preview: string;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
}

const ImageUpload = ({ preview, onImageUpload, onImageRemove }: ImageUploadProps) => {
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        onImageUpload(file);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file.",
        });
      }
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-all duration-300 hover:border-primary">
      {preview ? (
        <div className="space-y-4 animate-fade-in">
          <img 
            src={preview} 
            alt="Preview" 
            className="max-h-64 mx-auto rounded-lg shadow-md transition-transform hover:scale-105"
          />
          <Button
            type="button"
            variant="outline"
            onClick={onImageRemove}
            className="animate-fade-in"
          >
            Remove Image
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            <label className="cursor-pointer">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                capture="environment"
              />
              <Button type="button" variant="outline" className="animate-fade-in">
                <Camera className="mr-2" />
                Capture Image
              </Button>
            </label>
            <label className="cursor-pointer">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button type="button" variant="outline" className="animate-fade-in">
                <Upload className="mr-2" />
                Upload Image
              </Button>
            </label>
          </div>
          <p className="text-sm text-gray-500 animate-fade-in">
            Drag and drop an image here or click to upload
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;