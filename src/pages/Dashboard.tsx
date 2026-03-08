import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  FileText, Plus, MoreHorizontal, Clock, TrendingUp, Eye, Download,
  BarChart3, Target, Star, ArrowRight
} from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

const mockResumes = [
  { id: 1, name: "Product Designer Resume", template: "Modern Minimal", updated: "2 hours ago", score: 92, views: 48 },
  { id: 2, name: "Frontend Developer CV", template: "Sidebar Professional", updated: "1 day ago", score: 87, views: 124 },
  { id: 3, name: "Marketing Manager", template: "Creative Accent", updated: "3 days ago", score: 78, views: 36 },
];

const mockJobs = [
  { id: 1, title: "Senior Product Designer", company: "Google", match: 95, location: "New York, NY" },
  { id: 2, title: "UX Designer", company: "Spotify", match: 88, location: "Remote" },
  { id: 3, title: "Design Lead", company: "Stripe", match: 82, location: "San Francisco, CA" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const quickStats = [
    { icon: FileText, label: t("dashboard_resumes"), value: "3", change: t("dashboard_stat_resumes_change") },
    { icon: Eye, label: t("dashboard_total_views"), value: "208", change: t("dashboard_stat_views_change") },
    { icon: Target, label: t("dashboard_avg_score"), value: "86%", change: t("dashboard_stat_score_change") },
    { icon: Download, label: t("dashboard_downloads"), value: "12", change: t("dashboard_stat_downloads_change") },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">{t("dashboard_welcome")}</h1>
            <p className="text-sm text-muted-foreground mt-1">{t("dashboard_subtitle")}</p>
          </div>
          <Button onClick={() => navigate("/builder")} className="gap-1.5 shrink-0">
            <Plus className="w-4 h-4" /> {t("dashboard_create_new")}
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-xl p-5 shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="font-display text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-base">{t("dashboard_recent")}</h2>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                {t("dashboard_view_all")} <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {mockResumes.map((resume, i) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  onClick={() => navigate("/builder")}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:shadow-elevated transition-all duration-200 cursor-pointer group"
                >
                  <div className="w-12 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-sm group-hover:text-primary transition-colors">{resume.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{resume.template} · <Clock className="w-3 h-3 inline" /> {resume.updated}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">{t("dashboard_score")}</p>
                      <p className={`text-sm font-bold ${resume.score >= 90 ? "text-green-600" : resume.score >= 80 ? "text-primary" : "text-amber-600"}`}>{resume.score}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">{t("dashboard_views")}</p>
                      <p className="text-sm font-semibold">{resume.views}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-base">{t("dashboard_top_jobs")}</h2>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                {t("dashboard_view_all")} <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="space-y-3">
              {mockJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="bg-card border border-border rounded-xl p-4 hover:shadow-elevated transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display font-semibold text-sm">{job.title}</h3>
                      <p className="text-xs text-muted-foreground">{job.company} · {job.location}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      job.match >= 90 ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                    }`}>
                      {job.match}% {t("dashboard_match")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
