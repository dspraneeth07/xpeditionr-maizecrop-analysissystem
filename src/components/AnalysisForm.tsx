import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";

interface FormData {
  name: string;
  location: string;
  phone: string;
  email: string;
}

interface AnalysisFormProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  preview: string;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
  isSubmitting: boolean;
}

const AnalysisForm = ({
  formData,
  onInputChange,
  onSubmit,
  preview,
  onImageUpload,
  onImageRemove,
  isSubmitting,
}: AnalysisFormProps) => {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-4">
        <ImageUpload
          preview={preview}
          onImageUpload={onImageUpload}
          onImageRemove={onImageRemove}
        />

        <div className="grid gap-4">
          <div className="animate-fade-in">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              className="transition-all duration-300 focus:scale-[1.01]"
            />
          </div>
          <div className="animate-fade-in">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={onInputChange}
              required
              className="transition-all duration-300 focus:scale-[1.01]"
            />
          </div>
          <div className="animate-fade-in">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={onInputChange}
              required
              className="transition-all duration-300 focus:scale-[1.01]"
            />
          </div>
          <div className="animate-fade-in">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              className="transition-all duration-300 focus:scale-[1.01]"
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-[1.02]"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Analyzing..." : "Analyze My Crop"}
      </Button>
    </form>
  );
};

export default AnalysisForm;