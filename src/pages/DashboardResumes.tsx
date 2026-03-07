import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, Plus, Clock, MoreHorizontal, Download, Trash2, Copy, Eye } from "lucide-react";

const resumes = [
  { id: 1, name: "Product Designer Resume", template: "Modern Minimal", updated: "2 hours ago", score: 92, downloads: 5 },
  { id: 2, name: "Frontend Developer CV", template: "Sidebar Professional", updated: "1 day ago", score: 87, downloads: 3 },
  { id: 3, name: "Marketing Manager", template: "Creative Accent", updated: "3 days ago", score: 78, downloads: 2 },
  { id: 4, name: "Data Analyst Resume", template: "Corporate Classic", updated: "1 week ago", score: 85, downloads: 8 },
];

const DashboardResumes = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">My Resumes</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage and edit all your resumes in one place.</p>
          </div>
          <Button onClick={() => navigate("/builder")} className="gap-1.5">
            <Plus className="w-4 h-4" /> New Resume
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Create New Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/builder")}
            className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 min-h-[200px]"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary" />
            </div>
            <p className="font-display font-semibold text-sm">Create New Resume</p>
            <p className="text-xs text-muted-foreground text-center">Start from scratch or import your CV</p>
          </motion.div>

          {/* Resume Cards */}
          {resumes.map((resume, i) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.05 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-200 group cursor-pointer"
              onClick={() => navigate("/builder")}
            >
              <div className="h-32 bg-muted/50 flex items-center justify-center relative">
                <FileText className="w-10 h-10 text-muted-foreground/40" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="p-1.5 rounded-lg bg-card/90 hover:bg-card shadow-sm" onClick={(e) => e.stopPropagation()}>
                    <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-card/90 hover:bg-card shadow-sm" onClick={(e) => e.stopPropagation()}>
                    <Download className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded-lg bg-card/90 hover:bg-destructive/10 shadow-sm" onClick={(e) => e.stopPropagation()}>
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-sm mb-0.5 group-hover:text-primary transition-colors">{resume.name}</h3>
                <p className="text-xs text-muted-foreground">{resume.template}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {resume.updated}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    resume.score >= 90 ? "bg-green-100 text-green-700" : resume.score >= 80 ? "bg-primary/10 text-primary" : "bg-amber-100 text-amber-700"
                  }`}>
                    {resume.score}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardResumes;
