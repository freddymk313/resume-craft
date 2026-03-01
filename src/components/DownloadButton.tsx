import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ResumeData, TemplateName } from "@/utils/resumeTypes";
import ModernMinimalPDF from "./pdf-templates/ModernMinimalPDF";
import SidebarProfessionalPDF from "./pdf-templates/SidebarProfessionalPDF";
import CreativeAccentPDF from "./pdf-templates/CreativeAccentPDF";

interface Props {
  fileName?: string;
  data: ResumeData;
  template: TemplateName;
}

const pdfComponents = {
  "modern-minimal": ModernMinimalPDF,
  "sidebar-professional": SidebarProfessionalPDF,
  "creative-accent": CreativeAccentPDF,
};

const DownloadButton = ({ fileName = "resume.pdf", data, template }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const PDFComponent = pdfComponents[template];
      const blob = await pdf(<PDFComponent data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={loading} className="gap-2">
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      {loading ? "Generating..." : "Download PDF"}
    </Button>
  );
};

export default DownloadButton;
