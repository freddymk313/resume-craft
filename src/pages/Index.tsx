import { useNavigate } from "react-router-dom";
import { sampleResumeData, TemplateName } from "@/utils/resumeTypes";
import { saveTemplate, saveResumeData, loadResumeData } from "@/utils/storage";
import ModernMinimal from "@/components/templates/ModernMinimal";
import SidebarProfessional from "@/components/templates/SidebarProfessional";
import CreativeAccent from "@/components/templates/CreativeAccent";
import { motion } from "framer-motion";
import { FileText, Sparkles } from "lucide-react";
import SimpleModel from "@/components/templates/Crown";
import ClassicBordered from "@/components/templates/ClassicBordered";

const templates: { id: TemplateName; name: string; description: string; Component: React.FC<{ data: typeof sampleResumeData }> }[] = [
  { id: "modern-minimal", name: "Modern Minimal", description: "Clean, elegant, typography-focused", Component: ModernMinimal },
  { id: "sidebar-professional", name: "Sidebar Professional", description: "Structured sidebar with bold separation", Component: SidebarProfessional },
  { id: "creative-accent", name: "Creative Accent", description: "Bold accents, modern & dynamic", Component: CreativeAccent },
  { id: "simple-accent", name: "Simple Accent", description: "Clean, bold accent styling", Component: SimpleModel },
  { id: "classic-bordered", name: "Classic Bordered", description: "Traditional print-style with border frame", Component: ClassicBordered },
];

const Index = () => {
  const navigate = useNavigate();

  const handleSelect = (templateId: TemplateName) => {
    saveTemplate(templateId);
    // Load existing data or keep defaults
    const existing = loadResumeData();
    if (!existing.personalInfo.fullName) {
      // No data yet, don't overwrite
    }
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Free · No signup · 100% client-side
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-4">
              Build your resume<br />
              <span className="text-accent">in minutes</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Choose a premium template, fill in your details, preview live, and download as PDF. All data stays in your browser.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Templates */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center gap-2 mb-8">
          <FileText className="w-5 h-5 text-accent" />
          <h2 className="font-display text-xl font-bold">Choose a Template</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                className="group cursor-pointer rounded-xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleSelect(tpl.id)}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-muted/30 p-4 flex justify-center">
                  <div className="w-[280px] h-[360px] overflow-hidden rounded-md bg-white shadow-sm" style={{ transform: "scale(0.35)", transformOrigin: "top center", width: "794px", height: "1123px" }}>
                    <tpl.Component data={sampleResumeData} />
                  </div>
                </div>
                {/* Info */}
                <div className="p-4 border-t border-border">
                  <h3 className="font-display font-semibold text-sm mb-0.5">{tpl.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{tpl.description}</p>
                  <div className="text-xs font-medium text-accent group-hover:underline">
                    Use this template →
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
