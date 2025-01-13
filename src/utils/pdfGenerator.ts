import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (element: HTMLElement, results: any) => {
  try {
    console.log("Starting PDF generation...");
    
    // Add print-specific styles to hide buttons
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        button { display: none !important; }
      }
    `;
    document.head.appendChild(style);
    
    // Create PDF with custom formatting
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add header with title
    pdf.setFontSize(24);
    pdf.setTextColor(40, 167, 69); // Green color
    pdf.text("XpeditionR Crop Analysis Report", 20, 20);

    // Add timestamp and metadata
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100); // Gray color
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
    pdf.text(`Report ID: ${results.searchId}`, 20, 40);

    // Add user details section with proper spacing
    pdf.setTextColor(60, 60, 60);
    pdf.text("User Information:", 20, 55);
    if (results.formData) {
      pdf.text(`Name: ${results.formData.name}`, 25, 65);
      pdf.text(`Location: ${results.formData.location}`, 25, 75);
      pdf.text(`Contact: ${results.formData.phone}`, 25, 85);
      if (results.formData.email) {
        pdf.text(`Email: ${results.formData.email}`, 25, 95);
      }
    }

    // Add disease information
    pdf.text("Disease Information:", 20, 110);
    pdf.text(`Disease Name: ${results.diseaseName}`, 25, 120);
    pdf.text(`Status: ${results.status.toUpperCase()}`, 25, 130);
    pdf.text(`Affected Area: ${results.affectedArea}%`, 25, 140);

    // Add causes section
    pdf.text("Causes:", 20, 155);
    results.causes.forEach((cause: string, index: number) => {
      pdf.text(`• ${cause}`, 25, 165 + (index * 10));
    });

    // Add prevention section
    const preventionStartY = 165 + (results.causes.length * 10) + 10;
    pdf.text("Prevention Steps:", 20, preventionStartY);
    results.prevention.forEach((step: string, index: number) => {
      pdf.text(`• ${step}`, 25, preventionStartY + 10 + (index * 10));
    });

    // Add treatment section
    const treatmentStartY = preventionStartY + (results.prevention.length * 10) + 20;
    pdf.text("Treatment:", 20, treatmentStartY);
    pdf.text(`Medicine: ${results.treatment.medicine}`, 25, treatmentStartY + 10);
    pdf.text(`Dosage: ${results.treatment.dosage}`, 25, treatmentStartY + 20);
    pdf.text(`Frequency: ${results.treatment.frequency}`, 25, treatmentStartY + 30);
    pdf.text(`Instructions: ${results.treatment.instructions}`, 25, treatmentStartY + 40);

    // Add footer
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    pdf.text("© 2024 XpeditionR Crop Analysis System", 20, pageHeight - 10);

    // Remove the temporary style element
    document.head.removeChild(style);

    // Save the PDF
    pdf.save(`XpeditionR-Report-${results.searchId}.pdf`);
    console.log("PDF generated successfully");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF report");
  }
};