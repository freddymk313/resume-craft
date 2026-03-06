import { ResumeData, Experience, Education } from "@/utils/resumeTypes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const Section = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 300);
      return () => clearTimeout(timer);
    } else {
      if (contentRef.current) setHeight(contentRef.current.scrollHeight);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/40 transition-colors"
      >
        <span className="font-display font-semibold text-sm text-foreground">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </button>
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ height: height !== undefined ? `${height}px` : 'auto' }}
      >
        <div className="px-5 pb-5 pt-1 space-y-4">{children}</div>
      </div>
    </div>
  );
};

const Field = ({ label, children, fullWidth = false }: { label: string; children: React.ReactNode; fullWidth?: boolean }) => (
  <div className={`space-y-1.5 ${fullWidth ? "col-span-2" : ""}`}>
    <Label className="text-[13px] font-medium text-foreground/70">{label}</Label>
    {children}
  </div>
);

const ResumeForm = ({ data, onChange }: Props) => {
  const update = (path: string, value: string | boolean) => {
    const newData = JSON.parse(JSON.stringify(data)) as ResumeData;
    const keys = path.split(".");
    let obj: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    onChange(newData);
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { id: Date.now().toString(), company: "", position: "", location: "", startDate: "", endDate: "", currentJob: false, description: "" },
      ],
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((e) => e.id !== id) });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    onChange({
      ...data,
      experience: data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        { id: Date.now().toString(), school: "", degree: "", location: "", startDate: "", endDate: "" },
      ],
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((e) => e.id !== id) });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    });
  };

  return (
    <div className="space-y-5">
      {/* Personal Information */}
      <Section title="Personal Information">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name" fullWidth>
            <Input value={data.personalInfo.fullName} onChange={(e) => update("personalInfo.fullName", e.target.value)} placeholder="Sophie Martin" />
          </Field>
          <Field label="Job Title" fullWidth>
            <Input value={data.personalInfo.jobTitle} onChange={(e) => update("personalInfo.jobTitle", e.target.value)} placeholder="Product Designer" />
          </Field>
          <Field label="Email">
            <Input type="email" value={data.personalInfo.email} onChange={(e) => update("personalInfo.email", e.target.value)} placeholder="email@example.com" />
          </Field>
          <Field label="Phone">
            <Input value={data.personalInfo.phone} onChange={(e) => update("personalInfo.phone", e.target.value)} placeholder="+33 6 12 34 56 78" />
          </Field>
          <Field label="Location" fullWidth>
            <Input value={data.personalInfo.location} onChange={(e) => update("personalInfo.location", e.target.value)} placeholder="Paris, France" />
          </Field>
          <Field label="Website">
            <Input value={data.personalInfo.website} onChange={(e) => update("personalInfo.website", e.target.value)} placeholder="mywebsite.com" />
          </Field>
          <Field label="LinkedIn">
            <Input value={data.personalInfo.linkedin} onChange={(e) => update("personalInfo.linkedin", e.target.value)} placeholder="linkedin.com/in/username" />
          </Field>
        </div>
      </Section>

      {/* Professional Summary */}
      <Section title="Professional Summary">
        <Textarea
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          placeholder="Write a brief summary highlighting your key qualifications, experience, and career goals..."
          rows={5}
          className="min-h-[120px] resize-y leading-relaxed"
        />
      </Section>

      {/* Work Experience */}
      <Section title="Work Experience">
        <div className="space-y-4">
          {data.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 bg-secondary/30 rounded-xl border border-border/50 space-y-4 relative group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Experience {index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Position">
                  <Input value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} placeholder="Senior Designer" autoFocus={!exp.position} />
                </Field>
                <Field label="Company">
                  <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="TechCorp" />
                </Field>
                <Field label="Location">
                  <Input value={exp.location} onChange={(e) => updateExperience(exp.id, "location", e.target.value)} placeholder="Paris, France" />
                </Field>
                <div /> {/* spacer */}
                <Field label="Start Date">
                  <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} placeholder="Jan 2022" />
                </Field>
                <Field label="End Date">
                  <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} placeholder="Present" disabled={exp.currentJob} />
                </Field>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.currentJob}
                  onCheckedChange={(checked) => updateExperience(exp.id, "currentJob", !!checked)}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-xs text-muted-foreground cursor-pointer">I currently work here</Label>
              </div>
              <Field label="Description" fullWidth>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements (one per line)..."
                  rows={3}
                  className="resize-y leading-relaxed"
                />
              </Field>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addExperience} className="w-full gap-1.5 h-10 rounded-lg border-dashed">
            <Plus className="w-4 h-4" /> Add Experience
          </Button>
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={edu.id} className="p-4 bg-secondary/30 rounded-xl border border-border/50 space-y-4 relative group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Education {index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Degree">
                  <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Master in Design" autoFocus={!edu.degree} />
                </Field>
                <Field label="School">
                  <Input value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} placeholder="Design School" />
                </Field>
                <Field label="Location" fullWidth>
                  <Input value={edu.location} onChange={(e) => updateEducation(edu.id, "location", e.target.value)} placeholder="Nantes, France" />
                </Field>
                <Field label="Start Date">
                  <Input value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} placeholder="Sep 2015" />
                </Field>
                <Field label="End Date">
                  <Input value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} placeholder="Jun 2019" />
                </Field>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addEducation} className="w-full gap-1.5 h-10 rounded-lg border-dashed">
            <Plus className="w-4 h-4" /> Add Education
          </Button>
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <Field label="List your key skills (comma-separated)" fullWidth>
          <Input
            value={data.skills}
            onChange={(e) => onChange({ ...data, skills: e.target.value })}
            placeholder="Figma, React, TypeScript, Design Systems"
          />
        </Field>
      </Section>

      {/* Languages & Certifications */}
      <Section title="Languages & Certifications" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Languages" fullWidth>
            <Input
              value={data.languages}
              onChange={(e) => onChange({ ...data, languages: e.target.value })}
              placeholder="French (Native), English (Fluent)"
            />
          </Field>
          <Field label="Certifications" fullWidth>
            <Input
              value={data.certifications}
              onChange={(e) => onChange({ ...data, certifications: e.target.value })}
              placeholder="Google UX Design Certificate"
            />
          </Field>
        </div>
      </Section>
    </div>
  );
};

export default ResumeForm;
