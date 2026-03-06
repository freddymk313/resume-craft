import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface Props {
  data: ResumeData;
}

const CreativeAccent = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const accentColor = "hsl(16, 80%, 60%)";

  return (
    <div className="w-full bg-white text-gray-900 p-10" style={{ fontFamily: "var(--font-body)" }}>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-0.5" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
          {getFullName(personalInfo) || "Your Name"}
        </h1>
        <p className="text-base font-medium text-gray-700 mb-4" style={{ fontFamily: "var(--font-display)" }}>{personalInfo.jobTitle || "Job Title"}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" style={{ color: accentColor }} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" style={{ color: accentColor }} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" style={{ color: accentColor }} /> {personalInfo.location}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" style={{ color: accentColor }} /> {personalInfo.website}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" style={{ color: accentColor }} /> {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div className="w-16 h-1 rounded-full mb-6" style={{ backgroundColor: accentColor }} />

      {summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accentColor, fontFamily: "var(--font-display)" }}>Profile</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: accentColor, fontFamily: "var(--font-display)" }}>Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="pl-4 border-l-2" style={{ borderColor: accentColor }}>
                <h3 className="text-sm font-bold text-gray-800">{exp.position}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 font-medium">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                  <span className="text-[10px] text-gray-400">{exp.startDate} — {exp.currentJob ? "Present" : exp.endDate}</span>
                </div>
                {exp.description && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <li key={i} className="text-xs text-gray-600 pl-3 relative">
                        <span className="absolute left-0" style={{ color: accentColor }}>•</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: accentColor, fontFamily: "var(--font-display)" }}>Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="pl-4 border-l-2" style={{ borderColor: accentColor }}>
                <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">{edu.school}{edu.location ? ` · ${edu.location}` : ""}</p>
                  <span className="text-[10px] text-gray-400">{edu.startDate} — {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accentColor, fontFamily: "var(--font-display)" }}>Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full font-medium text-white" style={{ backgroundColor: accentColor }}>{skill}</span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {languages.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accentColor, fontFamily: "var(--font-display)" }}>Languages</h2>
            <p className="text-xs text-gray-600">{languages.join(", ")}</p>
          </div>
        )}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: accentColor, fontFamily: "var(--font-display)" }}>Certifications</h2>
            <p className="text-xs text-gray-600">{certifications.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeAccent;
