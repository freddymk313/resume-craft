import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ResumeData, TemplateName } from "@/utils/resumeTypes";
import { useTranslation } from "@/contexts/LanguageContext";
import ModernMinimalPDF from "./pdf-templates/ModernMinimalPDF";
import SidebarProfessionalPDF from "./pdf-templates/SidebarProfessionalPDF";
import CreativeAccentPDF from "./pdf-templates/CreativeAccentPDF";
import ClassicBorderedPDF from "./pdf-templates/ClassicBorderedPDF";
import CleanProfessionalPDF from "./pdf-templates/CleanProfessionalPDF";
import CorporateClassicPDF from "./pdf-templates/CorporateClassicPDF";
import ProfessionalDarkSidebarPDF from "./pdf-templates/ProfessionalDarkSidebarPDF";
import BlueCardProfessionalPDF from "./pdf-templates/BlueCardProfessionalPDF";
import MinimalistEngineerPDF from "./pdf-templates/MinimalistEngineerPDF";

interface Props {
  fileName?: string;
  data: ResumeData;
  template: TemplateName;
}

const pdfComponents: Record<string, React.FC<{ data: ResumeData }>> = {
  "modern-minimal": ModernMinimalPDF,
  "sidebar-professional": SidebarProfessionalPDF,
  "creative-accent": CreativeAccentPDF,
  "classic-bordered": ClassicBorderedPDF,
  "clean-professional": CleanProfessionalPDF,
  "corporate-classic": CorporateClassicPDF,
  "professional-dark-sidebar": ProfessionalDarkSidebarPDF,
  "blue-card-professional": BlueCardProfessionalPDF,
  "minimalist-engineer": MinimalistEngineerPDF,
};

const DownloadButton = ({ fileName = "resume.pdf", data, template }: Props) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
      {loading ? t("builder_generating") : t("builder_download_pdf")}
    </Button>
  );
};

export default DownloadButton;
