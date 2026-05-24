import { Printer, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

interface TopBarProps {
  fullName: string;
}

export function TopBar({ fullName }: TopBarProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    const fileName = fullName 
      ? `${fullName.trim().replace(/\s+/g, '_')}_resume.pdf` 
      : 'resume.pdf';
      
    const element = document.getElementById("resume-preview-container");
    if (!element) return;
    
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfHeight;
      let xOffset = 0;

      if (pdfHeight > pageHeight) {
        finalHeight = pageHeight;
        finalWidth = (canvas.width * finalHeight) / canvas.height;
        xOffset = (pdfWidth - finalWidth) / 2;
      }

      pdf.addImage(imgData, "PNG", xOffset, 0, finalWidth, finalHeight);

      // Add clickable links over the image
      const links = element.querySelectorAll("a");
      const containerRect = element.getBoundingClientRect();
      const scaleX = finalWidth / containerRect.width;
      const scaleY = finalHeight / containerRect.height;

      links.forEach((link) => {
        const rect = link.getBoundingClientRect();
        const x = xOffset + (rect.left - containerRect.left) * scaleX;
        const y = (rect.top - containerRect.top) * scaleY;
        const width = rect.width * scaleX;
        const height = rect.height * scaleY;

        // pdf.link adds a clickable area in the PDF
        pdf.link(x, y, width, height, { url: link.href });
      });

      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <header className="print:hidden sticky top-0 z-50 bg-[#121212] border-b border-white/5 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-white">ATS Resume Architect</h1>
      </div>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded text-sm font-bold transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)] disabled:opacity-75 disabled:cursor-wait"
      >
        {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Printer size={18} />}
        {isGenerating ? "GENERATING PDF..." : "EXPORT TO PDF"}
      </button>
    </header>
  );
}
