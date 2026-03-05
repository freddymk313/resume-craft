import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeData, TemplateName, defaultResumeData } from "@/utils/resumeTypes";
import { saveResumeData, loadResumeData, loadTemplate, saveTemplate } from "@/utils/storage";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import DownloadButton from "@/components/DownloadButton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Edit3, FileText, ChevronDown } from "lucide-react";

const Builder = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState<TemplateName>("modern-minimal");
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  const [templateOpen, setTemplateOpen] = useState(false);

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
    { id: "simple-accent", label: "Simple" },
    { id: "classic-bordered", label: "Classic" },
    { id: "clean-professional", label: "Clean" },
    { id: "corporate-classic", label: "Corporate" },
  ];

  const currentLabel = templateOptions.find(t => t.id === template)?.label || "Template";

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="shrink-0 z-50 bg-card border-b border-border">
        <div className="px-4 h-14 flex items-center justify-between gap-3">
          {/* Left */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="h-8 w-8 shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <FileText className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-sm">Resume Builder</span>
            </div>
          </div>

          {/* Center — Template Switcher */}
          <div className="relative">
            <button
              onClick={() => setTemplateOpen(!templateOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium"
            >
              {currentLabel} <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            {templateOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setTemplateOpen(false)} />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-elevated p-1.5 min-w-[180px]">
                  {templateOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setTemplate(t.id); saveTemplate(t.id); setTemplateOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        template === t.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Mobile toggle */}
            <div className="flex sm:hidden items-center gap-0.5 bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setMobileView("form")}
                className={`p-2 rounded-md transition-all ${mobileView === "form" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setMobileView("preview")}
                className={`p-2 rounded-md transition-all ${mobileView === "preview" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
            <DownloadButton fileName={`${data.personalInfo.fullName || "resume"}.pdf`} data={data} template={template} />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col sm:flex-row min-h-0">
        {/* Form Panel */}
        <div className={`w-full sm:w-[420px] lg:w-[460px] shrink-0 border-r border-border overflow-y-auto ${mobileView === "preview" ? "hidden sm:block" : ""}`}>
          <div className="p-5 lg:p-6">
            <ResumeForm data={data} onChange={handleChange} />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 overflow-y-auto bg-muted/30 ${mobileView === "form" ? "hidden sm:block" : ""}`}>
          <div className="flex justify-center p-8 lg:p-12">
            <div className="shadow-resume rounded-sm overflow-hidden bg-white" style={{ width: "794px", minHeight: "1123px" }}>
              <ResumePreview data={data} template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
