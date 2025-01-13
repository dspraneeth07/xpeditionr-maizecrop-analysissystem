import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (element: HTMLElement, results: any) => {
  try {
    console.log("Starting PDF generation...");
    
    // Capture the results component as an image
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Add header with logo and title
    pdf.setFontSize(24);
    pdf.setTextColor(40, 167, 69); // Green color
    pdf.text("Crop Health Analysis Report", 20, 20);

    // Add timestamp and metadata
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100); // Gray color
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);
    pdf.text(`Disease: ${results.diseaseName}`, 20, 40);
    pdf.text(`Confidence: ${results.confidence}%`, 20, 50);
    pdf.text(`Status: ${results.status.toUpperCase()}`, 20, 60);

    // Add the captured image
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 20, 70, pdfWidth - 40, pdfHeight - 40);

    // Add footer
    pdf.setFontSize(10);
    pdf.setTextColor(150, 150, 150);
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.text("© 2024 Crop Analysis System. All rights reserved.", 20, pageHeight - 10);

    // Save the PDF
    pdf.save(`crop-health-report-${Date.now()}.pdf`);
    console.log("PDF generated successfully");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF report");
  }
};