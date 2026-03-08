import { useNavigate } from "react-router-dom";
import { sampleResumeData, TemplateName } from "@/utils/resumeTypes";
import { saveTemplate, loadResumeData } from "@/utils/storage";
import ModernMinimal from "@/components/templates/ModernMinimal";
import SidebarProfessional from "@/components/templates/SidebarProfessional";
import CreativeAccent from "@/components/templates/CreativeAccent";
import SimpleModel from "@/components/templates/Crown";
import ClassicBordered from "@/components/templates/ClassicBordered";
import CleanProfessional from "@/components/templates/CleanProfessional";
import CorporateClassic from "@/components/templates/CorporateClassic";
import { motion } from "framer-motion";
import {
  FileText, Sparkles, Zap, Eye, Download, Palette, ArrowRight, Check,
  Target, BarChart3, Search, MessageSquare, Shield, ChevronDown, ChevronUp,
  Brain, TrendingUp, Users, Star, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTranslation } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const templates: { id: TemplateName; name: string; description: string; Component: React.FC<{ data: typeof sampleResumeData }> }[] = [
  { id: "modern-minimal", name: "Modern Minimal", description: "Clean, elegant, typography-focused", Component: ModernMinimal },
  { id: "sidebar-professional", name: "Sidebar Professional", description: "Structured sidebar with bold separation", Component: SidebarProfessional },
  { id: "creative-accent", name: "Creative Accent", description: "Bold accents, modern & dynamic", Component: CreativeAccent },
  { id: "simple-accent", name: "Simple Accent", description: "Clean, bold accent styling", Component: SimpleModel },
  { id: "classic-bordered", name: "Classic Bordered", description: "Traditional print-style with border frame", Component: ClassicBordered },
  { id: "clean-professional", name: "Clean Professional", description: "Modern clean layout with blue accents", Component: CleanProfessional },
  { id: "corporate-classic", name: "Corporate Classic", description: "Black & white, bold corporate style", Component: CorporateClassic },
];

const Index = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [role, setRole] = useState("");
  const { t } = useTranslation();

  const stats = [
    { value: "95%", label: t("stat_resume_optimization"), icon: Target },
    { value: "85%", label: t("stat_perfect_fit"), icon: Star },
    { value: "92%", label: t("stat_skill_highlighting"), icon: TrendingUp },
    { value: "90%", label: t("stat_job_ready"), icon: BarChart3 },
  ];

  const features = [
    { icon: Brain, title: t("feature_smart_title"), desc: t("feature_smart_desc") },
    { icon: Search, title: t("feature_keyword_title"), desc: t("feature_keyword_desc") },
    { icon: BarChart3, title: t("feature_analysis_title"), desc: t("feature_analysis_desc") },
    { icon: MessageSquare, title: t("feature_feedback_title"), desc: t("feature_feedback_desc") },
  ];

  const highlights = [
    { icon: Users, title: t("highlight_impression_title"), desc: t("highlight_impression_desc") },
    { icon: Palette, title: t("highlight_skill_title"), desc: t("highlight_skill_desc") },
    { icon: Eye, title: t("highlight_visibility_title"), desc: t("highlight_visibility_desc") },
  ];

  const faqs = [
    { q: t("faq_q1"), a: t("faq_a1") },
    { q: t("faq_q2"), a: t("faq_a2") },
    { q: t("faq_q3"), a: t("faq_a3") },
    { q: t("faq_q4"), a: t("faq_a4") },
  ];

  const handleSelect = (templateId: TemplateName) => {
    saveTemplate(templateId);
    loadResumeData();
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">ResumeAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav_features")}</a>
            <a href="#templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav_templates")}</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav_faq")}</a>
            <button onClick={() => navigate("/dashboard")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("nav_dashboard")}</button>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>{t("nav_sign_in")}</Button>
            <Button size="sm" onClick={() => navigate("/builder")}>
              {t("nav_get_started")} <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              {t("hero_badge")}
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-6">
              {t("hero_title_1")}<br />
              <span className="text-primary">{t("hero_title_2")}</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              {t("hero_desc")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" onClick={() => navigate("/builder")} className="px-8 h-12 text-base font-semibold shadow-elevated">
                {t("hero_cta")} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" })} className="px-8 h-12 text-base">
                {t("hero_view_templates")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center p-6 rounded-2xl bg-card border border-border shadow-card"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="font-display text-3xl font-extrabold text-primary mb-1">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" /> {t("features_badge")}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {t("features_title_1")}<br />{t("features_title_2")}
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            {t("features_desc")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-5 p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-3 gap-6">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center p-6 rounded-2xl bg-card border border-border shadow-card"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <h.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm mb-1.5">{h.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">{t("templates_title")}</h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">{t("templates_desc")}</p>
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
                <div className="relative overflow-hidden bg-muted/40 p-6 flex justify-center items-start h-[280px]">
                  <div
                    className="rounded-lg bg-white shadow-resume overflow-hidden"
                    style={{ transform: "scale(0.32)", transformOrigin: "top center", width: "794px", height: "1123px" }}
                  >
                    <tpl.Component data={sampleResumeData} />
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold shadow-elevated flex items-center gap-2">
                        <Check className="w-4 h-4" /> {t("use_template")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 border-t border-border">
                  <h3 className="font-display font-semibold text-sm mb-0.5">{tpl.name}</h3>
                  <p className="text-xs text-muted-foreground">{tpl.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">{t("faq_title")}</h2>
          <p className="text-muted-foreground text-base">{t("faq_desc")}</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-secondary/30 transition-colors"
              >
                <span className="font-display font-semibold text-sm">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="rounded-3xl bg-primary p-12 md:p-16 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{t("cta_title")}</h2>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-xl mx-auto">{t("cta_desc")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder={t("cta_placeholder")}
              className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
            />
            <Button size="lg" variant="secondary" onClick={() => navigate("/builder")} className="px-6 h-12 text-base font-semibold whitespace-nowrap shrink-0">
              {t("cta_button")} <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">{t("footer_features")}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">{t("footer_ai_agent")}</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">{t("footer_resume_builder")}</a></li>
                <li><a href="#features" className="hover:text-foreground transition-colors">{t("footer_ai_optimizing")}</a></li>
                <li><a href="#templates" className="hover:text-foreground transition-colors">{t("footer_templates")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">{t("footer_blog")}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_latest_news")}</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_hr_advice")}</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_career_tips")}</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">{t("footer_ai_tools")}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_ai_job_tracker")}</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_ai_cover_letter")}</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_ai_job_matcher")}</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm mb-4">{t("footer_info")}</h4>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_help")}</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_privacy")}</span></li>
                <li><span className="hover:text-foreground transition-colors cursor-pointer">{t("footer_terms")}</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <FileText className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold text-sm">ResumeAI</span>
            </div>
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ResumeAI. {t("footer_rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
