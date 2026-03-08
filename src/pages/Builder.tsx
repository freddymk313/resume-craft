import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeData, TemplateName, defaultResumeData, getFullName } from "@/utils/resumeTypes";
import { saveResumeData, loadResumeData, loadTemplate, saveTemplate } from "@/utils/storage";
import ResumeForm from "@/components/ResumeForm";
import PreviewContainer from "@/components/PreviewContainer";
import DownloadButton from "@/components/DownloadButton";
import CVImportModal from "@/components/CVImportModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Edit3, FileText, ChevronDown, Upload } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Builder = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState<TemplateName>("modern-minimal");
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  const [templateOpen, setTemplateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  useEffect(() => {
    setData(loadResumeData());
    setTemplate(loadTemplate());
  }, []);


  const handleChange = useCallback((newData: ResumeData) => {
    setData(newData);
    saveResumeData(newData);
  }, []);

  const handleImportData = useCallback((newData: ResumeData) => {
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
    { id: "professional-dark-sidebar", label: "Dark Pro" },
    { id: "blue-card-professional", label: "Blue Card" },
    { id: "minimalist-engineer", label: "Minimalist" },
  ];

  const currentLabel = templateOptions.find(t => t.id === template)?.label || "Template";
  

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="shrink-0 z-50 bg-card border-b border-border">
        <div className="px-2 sm:px-4 h-12 sm:h-14 flex items-center justify-between gap-1 sm:gap-3">
          {/* Left */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="h-8 w-8 shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <FileText className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-sm">{t("builder_title")}</span>
            </div>
          </div>

          {/* Center — Template Switcher */}
          <div className="relative shrink-0">
            <button
              onClick={() => setTemplateOpen(!templateOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs sm:text-sm font-medium"
            >
              {currentLabel} <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
            </button>
            {templateOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setTemplateOpen(false)} />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-elevated p-1.5 min-w-[180px]">
                  {templateOptions.map((tOpt) => (
                    <button
                      key={tOpt.id}
                      onClick={() => { setTemplate(tOpt.id); saveTemplate(tOpt.id); setTemplateOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        template === tOpt.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {tOpt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" onClick={() => setImportOpen(true)} className="hidden md:flex gap-1.5 text-xs">
              <Upload className="w-3.5 h-3.5" /> {t("builder_import_cv")}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setImportOpen(true)} className="flex md:hidden h-8 w-8">
              <Upload className="w-4 h-4" />
            </Button>
            {/* Mobile toggle */}
            <div className="flex sm:hidden items-center gap-0.5 bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => setMobileView("form")}
                className={`p-1.5 rounded-md transition-all ${mobileView === "form" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setMobileView("preview")}
                className={`p-1.5 rounded-md transition-all ${mobileView === "preview" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
            <DownloadButton fileName={`${getFullName(data.personalInfo) || "resume"}.pdf`} data={data} template={template} />
          </div>
        </div>
      </header>

      {/* Content — Two Panel Layout */}
      <div className="flex-1 flex flex-col sm:flex-row min-h-0">
        {/* Editor Panel — 45% */}
        <div
          className={`sm:w-[45%] shrink-0 border-r border-border overflow-y-auto ${
            mobileView === "preview" ? "hidden sm:block" : "flex-1 min-h-0"
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-[560px] mx-auto pb-20 sm:pb-8">
            <ResumeForm data={data} onChange={handleChange} />
          </div>
        </div>

        {/* Preview Panel — 60% */}
        <div
          className={`flex-1 min-h-0 ${
            mobileView === "form" ? "hidden sm:flex" : "flex"
          }`}
        >
          <PreviewContainer data={data} template={template} />
        </div>
      </div>

      <CVImportModal
        open={importOpen}
        onOpenChange={setImportOpen}
        onDataExtracted={handleImportData}
        hasExistingData={getFullName(data.personalInfo).length > 0 || data.experience.length > 0}
      />
    </div>
  );
};

export default Builder;
