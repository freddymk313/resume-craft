import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeData, TemplateName, defaultResumeData } from "@/utils/resumeTypes";
import { saveResumeData, loadResumeData, loadTemplate, saveTemplate } from "@/utils/storage";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import DownloadButton from "@/components/DownloadButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Edit3 } from "lucide-react";

const Builder = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState<TemplateName>("modern-minimal");
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");

  useEffect(() => {
    setData(loadResumeData());
    setTemplate(loadTemplate());
  }, []);

  const handleChange = useCallback((newData: ResumeData) => {
    setData(newData);
    saveResumeData(newData);
  }, []);

  const templateOptions: { id: TemplateName; label: string }[] = [
    { id: "modern-minimal", label: "Minimal" },
    { id: "sidebar-professional", label: "Sidebar" },
    { id: "creative-accent", label: "Creative" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="font-display font-bold text-sm hidden sm:block">Resume Builder</h1>
          </div>

          {/* Template switcher */}
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5">
            {templateOptions.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTemplate(t.id); saveTemplate(t.id); }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  template === t.id ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile toggle */}
            <div className="flex sm:hidden items-center gap-1 bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setMobileView("form")}
                className={`p-1.5 rounded-md transition-all ${mobileView === "form" ? "bg-card shadow-sm" : ""}`}
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileView("preview")}
                className={`p-1.5 rounded-md transition-all ${mobileView === "preview" ? "bg-card shadow-sm" : ""}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <DownloadButton fileName={`${data.personalInfo.fullName || "resume"}.pdf`} data={data} template={template} />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row">
        {/* Form */}
        <div className={`w-full sm:w-[40%] p-4 sm:p-6 sm:h-[calc(100vh-3.5rem)] sm:overflow-y-auto ${mobileView === "preview" ? "hidden sm:block" : ""}`}>
          <ResumeForm data={data} onChange={handleChange} />
        </div>

        {/* Preview */}
        <div className={`w-full sm:w-[60%] bg-muted/30 sm:h-[calc(100vh-3.5rem)] sm:overflow-y-auto flex justify-center p-4 sm:p-8 ${mobileView === "form" ? "hidden sm:flex" : ""}`}>
          <div className="shadow-resume rounded-sm overflow-hidden" style={{ width: "794px" }}>
            <ResumePreview data={data} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
