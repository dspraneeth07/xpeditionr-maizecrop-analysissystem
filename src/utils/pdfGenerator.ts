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

    // Add title
    pdf.setFontSize(20);
    pdf.text("Maize Health Analysis Report", 20, 20);

    // Add timestamp
    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    // Add the captured image
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 20, 40, pdfWidth - 40, pdfHeight - 40);

    // Save the PDF
    pdf.save(`maize-health-report-${Date.now()}.pdf`);
    console.log("PDF generated successfully");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF report");
  }
};