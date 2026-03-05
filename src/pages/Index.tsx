import { useNavigate } from "react-router-dom";
import { sampleResumeData, TemplateName } from "@/utils/resumeTypes";
import { saveTemplate, loadResumeData } from "@/utils/storage";
import ModernMinimal from "@/components/templates/ModernMinimal";
import SidebarProfessional from "@/components/templates/SidebarProfessional";
import CreativeAccent from "@/components/templates/CreativeAccent";
import { motion } from "framer-motion";
import { FileText, Sparkles, Zap, Eye, Download, Palette, ArrowRight, Check } from "lucide-react";
import SimpleModel from "@/components/templates/Crown";
import ClassicBordered from "@/components/templates/ClassicBordered";
import CleanProfessional from "@/components/templates/CleanProfessional";
import CorporateClassic from "@/components/templates/CorporateClassic";
import { Button } from "@/components/ui/button";

const templates: { id: TemplateName; name: string; description: string; Component: React.FC<{ data: typeof sampleResumeData }> }[] = [
  { id: "modern-minimal", name: "Modern Minimal", description: "Clean, elegant, typography-focused", Component: ModernMinimal },
  { id: "sidebar-professional", name: "Sidebar Professional", description: "Structured sidebar with bold separation", Component: SidebarProfessional },
  { id: "creative-accent", name: "Creative Accent", description: "Bold accents, modern & dynamic", Component: CreativeAccent },
  { id: "simple-accent", name: "Simple Accent", description: "Clean, bold accent styling", Component: SimpleModel },
  { id: "classic-bordered", name: "Classic Bordered", description: "Traditional print-style with border frame", Component: ClassicBordered },
  { id: "clean-professional", name: "Clean Professional", description: "Modern clean layout with blue accents", Component: CleanProfessional },
  { id: "corporate-classic", name: "Corporate Classic", description: "Black & white, bold corporate style", Component: CorporateClassic },
];

const features = [
  { icon: Eye, title: "Live Preview", desc: "See changes in real-time as you type — no delays, no refreshing." },
  { icon: Palette, title: "7 Premium Templates", desc: "Professional designs crafted for every industry and style." },
  { icon: Download, title: "PDF Export", desc: "Download pixel-perfect PDFs ready for any application." },
  { icon: Zap, title: "100% Private", desc: "All data stays in your browser. Nothing is sent to any server." },
];

const Index = () => {
  const navigate = useNavigate();

  const handleSelect = (templateId: TemplateName) => {
    saveTemplate(templateId);
    loadResumeData();
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">ResumeBuilder</span>
          </div>
          <Button onClick={() => navigate("/builder")} size="sm">
            Get Started <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Free · No signup · 100% client-side
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Build a resume that<br />
              <span className="text-primary">gets you hired</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Choose from premium templates, fill in your details with live preview, and download a pixel-perfect PDF. All data stays in your browser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" onClick={() => navigate("/builder")} className="px-8 h-12 text-base font-semibold shadow-elevated">
                Create Your Resume <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })} className="px-8 h-12 text-base">
                Browse Templates
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-card border border-border shadow-card"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">Choose Your Template</h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">Every template is optimized for ATS systems and designed by professionals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div
                className="group cursor-pointer rounded-2xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleSelect(tpl.id)}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-muted/40 p-6 flex justify-center items-start h-[280px]">
                  <div
                    className="rounded-lg bg-white shadow-resume overflow-hidden"
                    style={{
                      transform: "scale(0.32)",
                      transformOrigin: "top center",
                      width: "794px",
                      height: "1123px",
                    }}
                  >
                    <tpl.Component data={sampleResumeData} />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-elevated flex items-center gap-2">
                        <Check className="w-4 h-4" /> Use Template
                      </div>
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5 border-t border-border">
                  <h3 className="font-display font-semibold text-sm mb-0.5">{tpl.name}</h3>
                  <p className="text-xs text-muted-foreground">{tpl.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-primary p-12 md:p-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to build your resume?</h2>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-xl mx-auto">It takes less than 5 minutes. No signup, no payment, no data collection.</p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/builder")} className="px-8 h-12 text-base font-semibold">
            Start Building Now <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <FileText className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-sm">ResumeBuilder</span>
          </div>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ResumeBuilder. Free and open-source.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
