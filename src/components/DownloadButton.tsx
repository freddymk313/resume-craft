import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/utils/generatePDF";
import { useState } from "react";

interface Props {
  fileName?: string;
}

const DownloadButton = ({ fileName = "resume.pdf" }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      await generatePDF("resume-preview", fileName);
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
