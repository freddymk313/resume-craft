import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface Props {
  data: ResumeData;
}

const SidebarProfessional = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="w-full bg-white text-gray-900 flex min-h-full" style={{ fontFamily: "var(--font-body)" }}>
      <div className="w-[35%] p-6 text-white" style={{ backgroundColor: "hsl(222, 67%, 22%)" }}>
        <div className="mb-8">
          <h1 className="text-xl font-bold leading-tight mb-1" style={{ fontFamily: "var(--font-display)" }}>
            {getFullName(personalInfo) || "Your Name"}
          </h1>
          <p className="text-sm opacity-70" style={{ fontFamily: "var(--font-display)" }}>{personalInfo.jobTitle || "Job Title"}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest opacity-50 mb-3">Contact</h2>
          <div className="space-y-2 text-xs">
            {personalInfo.email && <div className="flex items-center gap-2 opacity-80"><Mail className="w-3 h-3 shrink-0" /> <span className="break-all">{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-2 opacity-80"><Phone className="w-3 h-3 shrink-0" /> {personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-2 opacity-80"><MapPin className="w-3 h-3 shrink-0" /> {personalInfo.location}</div>}
            {personalInfo.website && <div className="flex items-center gap-2 opacity-80"><Globe className="w-3 h-3 shrink-0" /> <span className="break-all">{personalInfo.website}</span></div>}
            {personalInfo.linkedin && <div className="flex items-center gap-2 opacity-80"><Linkedin className="w-3 h-3 shrink-0" /> <span className="break-all">{personalInfo.linkedin}</span></div>}
          </div>
        </div>

        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest opacity-50 mb-3">Skills</h2>
            <div className="space-y-1.5">
              {skills.map((skill, i) => (
                <div key={i} className="text-xs opacity-80 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white opacity-40 shrink-0" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {languages.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest opacity-50 mb-3">Languages</h2>
            <p className="text-xs opacity-80 leading-relaxed">{languages.join(", ")}</p>
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-widest opacity-50 mb-3">Certifications</h2>
            <p className="text-xs opacity-80 leading-relaxed">{certifications.join(", ")}</p>
          </div>
        )}
      </div>

      <div className="w-[65%] p-8">
        {summary && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "var(--font-display)" }}>About</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "var(--font-display)" }}>Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-sm font-semibold" style={{ color: "hsl(222, 67%, 22%)" }}>{exp.position}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                    <span className="text-[10px] text-gray-400">{exp.startDate} — {exp.currentJob ? "Present" : exp.endDate}</span>
                  </div>
                  {exp.description && (
                    <ul className="mt-1.5 space-y-0.5">
                      {exp.description.split("\n").filter(Boolean).map((line, i) => (
                        <li key={i} className="text-xs text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-300">{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "var(--font-display)" }}>Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="text-sm font-semibold" style={{ color: "hsl(222, 67%, 22%)" }}>{edu.degree}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{edu.school}{edu.location ? `, ${edu.location}` : ""}</p>
                    <span className="text-[10px] text-gray-400">{edu.startDate} — {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarProfessional;
