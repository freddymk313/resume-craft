import { ResumeData } from "@/utils/resumeTypes";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface Props {
  data: ResumeData;
}

const ModernMinimal = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="w-full bg-white text-gray-900 p-10 font-body" style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold tracking-tight mb-1"
          style={{ fontFamily: "var(--font-display)", color: "hsl(222, 67%, 22%)" }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg text-gray-500 mb-4" style={{ fontFamily: "var(--font-display)" }}>
          {personalInfo.jobTitle || "Job Title"}
        </p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" /> {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" /> {personalInfo.linkedin}
            </span>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 mb-6" />

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Profile
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: "hsl(222, 67%, 22%)" }}>{exp.position}</h3>
                    <p className="text-sm text-gray-500">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {exp.startDate} — {exp.currentJob ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <li key={i} className="text-xs text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-300">
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

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: "hsl(222, 67%, 22%)" }}>{edu.degree}</h3>
                  <p className="text-sm text-gray-500">{edu.school}{edu.location ? `, ${edu.location}` : ""}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skillsList.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((skill, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {languages && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Languages
            </h2>
            <p className="text-xs text-gray-600">{languages}</p>
          </div>
        )}
        {certifications && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: "var(--font-display)" }}>
              Certifications
            </h2>
            <p className="text-xs text-gray-600">{certifications}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernMinimal;
