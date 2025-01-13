import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (resultsElement: HTMLElement, data: any) => {
  try {
    const canvas = await html2canvas(resultsElement);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Add title
    pdf.setFontSize(20);
    pdf.text('Crop Analysis Report', 20, 20);

    // Add timestamp
    pdf.setFontSize(10);
    pdf.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    // Add the screenshot of results
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 20, 40, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save('crop-analysis-report.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};