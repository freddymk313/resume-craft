import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeData, TemplateName, defaultResumeData } from "@/utils/resumeTypes";
import { saveResumeData, loadResumeData, loadTemplate, saveTemplate } from "@/utils/storage";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import DownloadButton from "@/components/DownloadButton";
import CVImportModal from "@/components/CVImportModal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Edit3, FileText, ChevronDown, ChevronLeft, ChevronRight, Upload } from "lucide-react";

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

const Builder = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState<TemplateName>("modern-minimal");
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  const [templateOpen, setTemplateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [previewScale, setPreviewScale] = useState(0.75);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const resumeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setData(loadResumeData());
    setTemplate(loadTemplate());
  }, []);

  // Calculate scale based on container width
  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth;
        const padding = 80; // 40px each side
        const availableWidth = containerWidth - padding;
        const scale = Math.min(availableWidth / A4_WIDTH, 0.85);
        setPreviewScale(Math.max(scale, 0.4));
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Detect total pages from content height
  useEffect(() => {
    const checkPages = () => {
      if (resumeContentRef.current) {
        const contentHeight = resumeContentRef.current.scrollHeight;
        const pages = Math.max(1, Math.ceil(contentHeight / A4_HEIGHT));
        setTotalPages(pages);
        if (currentPage > pages) setCurrentPage(pages);
      }
    };
    checkPages();
    const observer = new MutationObserver(checkPages);
    if (resumeContentRef.current) {
      observer.observe(resumeContentRef.current, { childList: true, subtree: true, characterData: true });
    }
    return () => observer.disconnect();
  }, [data, template, currentPage]);

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
  ];

  const currentLabel = templateOptions.find(t => t.id === template)?.label || "Template";

  const pageOffset = -(currentPage - 1) * A4_HEIGHT;

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
            <Button variant="outline" size="sm" onClick={() => setImportOpen(true)} className="hidden sm:flex gap-1.5 text-xs">
              <Upload className="w-3.5 h-3.5" /> Import CV
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setImportOpen(true)} className="flex sm:hidden h-8 w-8">
              <Upload className="w-4 h-4" />
            </Button>
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

      {/* Content — Two Panel Layout */}
      <div className="flex-1 flex flex-col sm:flex-row min-h-0">
        {/* Editor Panel — 45% */}
        <div
          className={`w-full sm:w-[45%] shrink-0 border-r border-border overflow-y-auto ${
            mobileView === "preview" ? "hidden sm:block" : ""
          }`}
        >
          <div className="p-6 lg:p-8 max-w-[560px] mx-auto">
            <ResumeForm data={data} onChange={handleChange} />
          </div>
        </div>

        {/* Preview Panel — 55% */}
        <div
          ref={previewContainerRef}
          className={`flex-1 overflow-hidden bg-muted/50 relative ${
            mobileView === "form" ? "hidden sm:flex" : "flex"
          } items-start justify-center`}
        >
          {/* Scaled A4 Preview */}
          <div className="flex-1 flex items-start justify-center overflow-y-auto h-full py-10 px-5">
            <div
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: "top center",
                width: `${A4_WIDTH}px`,
                minHeight: `${A4_HEIGHT}px`,
                flexShrink: 0,
              }}
            >
              {/* A4 page with clip for current page */}
              <div
                className="bg-white rounded-md overflow-hidden"
                style={{
                  width: `${A4_WIDTH}px`,
                  height: `${A4_HEIGHT}px`,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  ref={resumeContentRef}
                  style={{
                    transform: `translateY(${pageOffset}px)`,
                    transition: "transform 0.3s ease",
                  }}
                >
                  <ResumePreview data={data} template={template} />
                </div>
              </div>
            </div>
          </div>

          {/* Page Navigation */}
          {totalPages > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-1 bg-card/95 backdrop-blur-sm border border-border rounded-full shadow-elevated px-1.5 py-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="p-1.5 rounded-full hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium px-2 tabular-nums text-foreground">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="p-1.5 rounded-full hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CVImportModal
        open={importOpen}
        onOpenChange={setImportOpen}
        onDataExtracted={handleImportData}
        hasExistingData={data.personalInfo.fullName.length > 0 || data.experience.length > 0}
      />
    </div>
  );
};

export default Builder;
