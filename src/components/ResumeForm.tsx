import { ResumeData, Experience, Education } from "@/utils/resumeTypes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const Section = ({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors"
      >
        <span className="font-display font-semibold text-sm">{title}</span>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div className="p-4 space-y-3">{children}</div>}
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <Label className="text-xs text-muted-foreground">{label}</Label>
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
    <div className="space-y-4">
      <Section title="Personal Information">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Full Name">
            <Input value={data.personalInfo.fullName} onChange={(e) => update("personalInfo.fullName", e.target.value)} placeholder="Sophie Martin" />
          </Field>
          <Field label="Job Title">
            <Input value={data.personalInfo.jobTitle} onChange={(e) => update("personalInfo.jobTitle", e.target.value)} placeholder="Product Designer" />
          </Field>
          <Field label="Email">
            <Input value={data.personalInfo.email} onChange={(e) => update("personalInfo.email", e.target.value)} placeholder="email@example.com" />
          </Field>
          <Field label="Phone">
            <Input value={data.personalInfo.phone} onChange={(e) => update("personalInfo.phone", e.target.value)} placeholder="+33 6 12 34 56 78" />
          </Field>
          <Field label="Location">
            <Input value={data.personalInfo.location} onChange={(e) => update("personalInfo.location", e.target.value)} placeholder="Paris, France" />
          </Field>
          <Field label="Website">
            <Input value={data.personalInfo.website} onChange={(e) => update("personalInfo.website", e.target.value)} placeholder="mywebsite.com" />
          </Field>
        </div>
        <Field label="LinkedIn">
          <Input value={data.personalInfo.linkedin} onChange={(e) => update("personalInfo.linkedin", e.target.value)} placeholder="linkedin.com/in/username" />
        </Field>
      </Section>

      <Section title="Professional Summary">
        <Textarea
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          placeholder="Write a brief professional summary..."
          rows={4}
        />
      </Section>

      <Section title="Work Experience">
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-3 bg-secondary/30 rounded-lg space-y-3 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Position">
                  <Input value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} placeholder="Senior Designer" />
                </Field>
                <Field label="Company">
                  <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} placeholder="TechCorp" />
                </Field>
                <Field label="Location">
                  <Input value={exp.location} onChange={(e) => updateExperience(exp.id, "location", e.target.value)} placeholder="Paris" />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Start">
                    <Input value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} placeholder="2022-01" />
                  </Field>
                  <Field label="End">
                    <Input value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} placeholder="2024-01" disabled={exp.currentJob} />
                  </Field>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.currentJob}
                  onCheckedChange={(checked) => updateExperience(exp.id, "currentJob", !!checked)}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-xs text-muted-foreground">Current position</Label>
              </div>
              <Field label="Description (one item per line)">
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  placeholder="Led design for the core product&#10;Managed a team of 3 designers"
                  rows={3}
                />
              </Field>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addExperience} className="w-full gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Experience
          </Button>
        </div>
      </Section>

      <Section title="Education">
        <div className="space-y-4">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-3 bg-secondary/30 rounded-lg space-y-3 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Degree">
                  <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} placeholder="Master in Design" />
                </Field>
                <Field label="School">
                  <Input value={edu.school} onChange={(e) => updateEducation(edu.id, "school", e.target.value)} placeholder="Design School" />
                </Field>
                <Field label="Location">
                  <Input value={edu.location} onChange={(e) => updateEducation(edu.id, "location", e.target.value)} placeholder="Nantes, France" />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Start">
                    <Input value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} placeholder="2015-09" />
                  </Field>
                  <Field label="End">
                    <Input value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} placeholder="2019-06" />
                  </Field>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addEducation} className="w-full gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Education
          </Button>
        </div>
      </Section>

      <Section title="Skills">
        <Field label="Comma-separated skills">
          <Input
            value={data.skills}
            onChange={(e) => onChange({ ...data, skills: e.target.value })}
            placeholder="Figma, React, TypeScript, Design Systems"
          />
        </Field>
      </Section>

      <Section title="Languages & Certifications" defaultOpen={false}>
        <Field label="Languages">
          <Input
            value={data.languages}
            onChange={(e) => onChange({ ...data, languages: e.target.value })}
            placeholder="French (Native), English (Fluent)"
          />
        </Field>
        <Field label="Certifications">
          <Input
            value={data.certifications}
            onChange={(e) => onChange({ ...data, certifications: e.target.value })}
            placeholder="Google UX Design Certificate"
          />
        </Field>
      </Section>
    </div>
  );
};

export default ResumeForm;
