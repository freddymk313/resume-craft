import { ResumeData, Experience, Education } from "@/utils/resumeTypes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TagInput from "@/components/TagInput";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

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

const EntryHeader = ({ title, isOpen, onToggle, onRemove }: { title: string; isOpen: boolean; onToggle: () => void; onRemove: () => void }) => (
  <div className="flex items-center justify-between">
    <button onClick={onToggle} className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
      {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
      {title}
    </button>
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
      onClick={onRemove}
    >
      <Trash2 className="w-3.5 h-3.5" />
    </Button>
  </div>
);

const Field = ({ label, children, fullWidth = false }: { label: string; children: React.ReactNode; fullWidth?: boolean }) => (
  <div className={`space-y-1.5 ${fullWidth ? "col-span-2" : ""}`}>
    <Label className="text-[13px] font-medium text-foreground/70">{label}</Label>
    {children}
  </div>
);

const ResumeForm = ({ data, onChange }: Props) => {
  const [openEntries, setOpenEntries] = useState<Record<string, boolean>>({});
  const { t } = useTranslation();

  const toggleEntry = (id: string) => {
    setOpenEntries(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const isEntryOpen = (id: string) => openEntries[id] !== false;

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
    const id = Date.now().toString();
    setOpenEntries(prev => ({ ...prev, [id]: true }));
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { id, company: "", position: "", location: "", startDate: "", endDate: "", currentJob: false, description: "" },
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
    const id = Date.now().toString();
    setOpenEntries(prev => ({ ...prev, [id]: true }));
    onChange({
      ...data,
      education: [
        ...data.education,
        { id, school: "", degree: "", location: "", startDate: "", endDate: "" },
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

  const getExpTitle = (exp: Experience) => {
    if (exp.position && exp.company) return `${exp.position} ${t("exp_at")} ${exp.company}`;
    if (exp.position) return exp.position;
    if (exp.company) return exp.company;
    return t("new_experience");
  };

  const getEduTitle = (edu: Education) => {
    if (edu.degree && edu.school) return `${edu.degree} ${t("edu_dash")} ${edu.school}`;
    if (edu.degree) return edu.degree;
    if (edu.school) return edu.school;
    return t("new_education");
  };

  return (
    <div className="space-y-5">
      <Section title={t("form_personal_info")}>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t("form_first_name")}>
            <Input value={data.personalInfo.firstName} onChange={(e) => update("personalInfo.firstName", e.target.value)} placeholder="Sophie" />
          </Field>
          <Field label={t("form_last_name")}>
            <Input value={data.personalInfo.lastName} onChange={(e) => update("personalInfo.lastName", e.target.value)} placeholder="Martin" />
          </Field>
          <Field label={t("form_job_title")} fullWidth>
            <Input value={data.personalInfo.jobTitle} onChange={(e) => update("personalInfo.jobTitle", e.target.value)} placeholder="Product Designer" />
          </Field>
          <Field label={t("form_email")}>
            <Input type="email" value={data.personalInfo.email} onChange={(e) => update("personalInfo.email", e.target.value)} placeholder="email@example.com" />
          </Field>
          <Field label={t("form_phone")}>
            <Input value={data.personalInfo.phone} onChange={(e) => update("personalInfo.phone", e.target.value)} placeholder="+33 6 12 34 56 78" />
          </Field>
          <Field label={t("form_location")} fullWidth>
            <Input value={data.personalInfo.location} onChange={(e) => update("personalInfo.location", e.target.value)} placeholder="Paris, France" />
          </Field>
          <Field label={t("form_website")}>
            <Input value={data.personalInfo.website} onChange={(e) => update("personalInfo.website", e.target.value)} placeholder="mywebsite.com" />
          </Field>
          <Field label={t("form_linkedin")}>
            <Input value={data.personalInfo.linkedin} onChange={(e) => update("personalInfo.linkedin", e.target.value)} placeholder="linkedin.com/in/username" />
          </Field>
        </div>
      </Section>

      <Section title={t("form_summary")}>
        <Textarea
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          placeholder={t("form_summary_placeholder")}
          rows={5}
          className="min-h-[120px] resize-y leading-relaxed"
        />
      </Section>

      <Section title={t("form_experience")}>
        <div className="space-y-3">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-4 bg-secondary/30 rounded-xl border border-border/50 space-y-3 relative group">
              <EntryHeader
                title={getExpTitle(exp)}
                isOpen={isEntryOpen(exp.id)}
                onToggle={() => toggleEntry(exp.id)}
                onRemove={() => removeExperience(exp.id)}
              />
              {isEntryOpen(exp.id) && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label={t("form_position")}>
                      <Input value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} placeholder="Senior Designer" autoFocus={!exp.position} />
                    </Field>
                    <Field label={t("form_company")}>
                      <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="TechCorp" />
                    </Field>
                    <Field label={t("form_location")}>
                      <Input value={exp.location} onChange={(e) => updateExperience(exp.id, "location", e.target.value)} placeholder="Paris, France" />
                    </Field>
                    <div />
                    <Field label={t("form_start_date")}>
                      <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} placeholder="Jan 2022" />
                    </Field>
                    <Field label={t("form_end_date")}>
                      <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} placeholder="Present" disabled={exp.currentJob} />
                    </Field>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.currentJob}
                      onCheckedChange={(checked) => updateExperience(exp.id, "currentJob", !!checked)}
                    />
                    <Label htmlFor={`current-${exp.id}`} className="text-xs text-muted-foreground cursor-pointer">{t("form_current_job")}</Label>
                  </div>
                  <Field label={t("form_description")} fullWidth>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder={t("form_description_placeholder")}
                      rows={3}
                      className="resize-y leading-relaxed"
                    />
                  </Field>
                </div>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addExperience} className="w-full gap-1.5 h-10 rounded-lg border-dashed">
            <Plus className="w-4 h-4" /> {t("form_add_experience")}
          </Button>
        </div>
      </Section>

      <Section title={t("form_education")}>
        <div className="space-y-3">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-4 bg-secondary/30 rounded-xl border border-border/50 space-y-3 relative group">
              <EntryHeader
                title={getEduTitle(edu)}
                isOpen={isEntryOpen(edu.id)}
                onToggle={() => toggleEntry(edu.id)}
                onRemove={() => removeEducation(edu.id)}
              />
              {isEntryOpen(edu.id) && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label={t("form_degree")}>
                      <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Master in Design" autoFocus={!edu.degree} />
                    </Field>
                    <Field label={t("form_school")}>
                      <Input value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} placeholder="Design School" />
                    </Field>
                    <Field label={t("form_location")} fullWidth>
                      <Input value={edu.location} onChange={(e) => updateEducation(edu.id, "location", e.target.value)} placeholder="Nantes, France" />
                    </Field>
                    <Field label={t("form_start_date")}>
                      <Input value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} placeholder="Sep 2015" />
                    </Field>
                    <Field label={t("form_end_date")}>
                      <Input value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} placeholder="Jun 2019" />
                    </Field>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addEducation} className="w-full gap-1.5 h-10 rounded-lg border-dashed">
            <Plus className="w-4 h-4" /> {t("form_add_education")}
          </Button>
        </div>
      </Section>

      <Section title={t("form_skills")}>
        <Field label={t("form_skills_label")} fullWidth>
          <TagInput
            value={data.skills}
            onChange={(skills) => onChange({ ...data, skills })}
            placeholder="e.g. Figma, React, TypeScript..."
          />
        </Field>
      </Section>

      <Section title={t("form_languages")} defaultOpen={false}>
        <Field label={t("form_languages_label")} fullWidth>
          <TagInput
            value={data.languages}
            onChange={(languages) => onChange({ ...data, languages })}
            placeholder="e.g. French (Native), English (Fluent)..."
          />
        </Field>
      </Section>

      <Section title={t("form_certifications")} defaultOpen={false}>
        <Field label={t("form_certifications_label")} fullWidth>
          <TagInput
            value={data.certifications}
            onChange={(certifications) => onChange({ ...data, certifications })}
            placeholder="e.g. Google UX Design Certificate..."
          />
        </Field>
      </Section>
    </div>
  );
};

export default ResumeForm;
