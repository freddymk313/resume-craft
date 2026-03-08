import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface Props {
  data: ResumeData;
}

const ProfessionalDarkSidebar = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div className="w-full flex min-h-full" style={{ fontFamily: "'Inter', 'Montserrat', sans-serif" }}>
      {/* Sidebar */}
      <div className="w-[33%] text-white p-7 flex flex-col" style={{ backgroundColor: "#1a1a1a" }}>
        {/* Profile Photo Placeholder */}
        <div className="flex justify-center mb-6">
          <div
            className="rounded-full bg-gray-600 flex items-center justify-center text-2xl font-black uppercase"
            style={{ width: 120, height: 120, letterSpacing: "0.05em" }}
          >
            {personalInfo.firstName?.[0] || ""}{personalInfo.lastName?.[0] || ""}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-7">
          <h2
            className="text-xs font-black uppercase mb-3"
            style={{ letterSpacing: "0.15em", fontFamily: "'Montserrat', 'Inter', sans-serif" }}
          >
            Coordonnées
          </h2>
          <div className="space-y-2 text-[11px]">
            {personalInfo.location && (
              <div className="flex items-start gap-2 opacity-90">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-start gap-2 opacity-90">
                <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-start gap-2 opacity-90">
                <Phone className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2 opacity-90">
                <Globe className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-7">
            <h2
              className="text-xs font-black uppercase mb-3"
              style={{ letterSpacing: "0.15em", fontFamily: "'Montserrat', 'Inter', sans-serif" }}
            >
              Langues
            </h2>
            <div className="space-y-1.5 text-[11px] opacity-90">
              {languages.map((lang, i) => (
                <div key={i}>{lang}</div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-7">
            <h2
              className="text-xs font-black uppercase mb-3"
              style={{ letterSpacing: "0.15em", fontFamily: "'Montserrat', 'Inter', sans-serif" }}
            >
              Compétences
            </h2>
            <div className="space-y-1.5 text-[11px] opacity-90">
              {skills.map((skill, i) => (
                <div key={i}>{skill}</div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications as Interests */}
        {certifications.length > 0 && (
          <div>
            <h2
              className="text-xs font-black uppercase mb-3"
              style={{ letterSpacing: "0.15em", fontFamily: "'Montserrat', 'Inter', sans-serif" }}
            >
              Centres d'intérêts
            </h2>
            <div className="space-y-1.5 text-[11px] opacity-90">
              {certifications.map((cert, i) => (
                <div key={i}>{cert}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[67%] bg-white p-8 pt-10">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="leading-none"
            style={{
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "42px",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#1a1a1a",
            }}
          >
            {personalInfo.firstName || "Prénom"}
            <br />
            {personalInfo.lastName || "Nom"}
          </h1>
          <p
            className="mt-2 uppercase tracking-widest text-sm font-semibold"
            style={{ color: "#555", fontFamily: "'Montserrat', 'Inter', sans-serif" }}
          >
            {personalInfo.jobTitle || "Titre du poste"}
          </p>
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-7">
            <h2
              className="text-sm font-black uppercase mb-4"
              style={{
                letterSpacing: "0.12em",
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                color: "#1a1a1a",
              }}
            >
              Expériences professionnelles
            </h2>
            <div className="relative pl-5">
              {/* Timeline line */}
              <div
                className="absolute left-[5px] top-[6px] bottom-0 w-[2px]"
                style={{ backgroundColor: "#d1d5db" }}
              />
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* Timeline dot */}
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#1a1a1a",
                        left: -20,
                        top: 4,
                      }}
                    />
                    <div className="border-l-2 border-transparent pl-1">
                      <h3
                        className="text-[13px] font-bold uppercase"
                        style={{ color: "#1a1a1a", fontFamily: "'Montserrat', 'Inter', sans-serif" }}
                      >
                        {exp.position}
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {exp.company}
                        {exp.location ? `, ${exp.location}` : ""}
                        {" | "}
                        {exp.startDate} - {exp.currentJob ? "Présent" : exp.endDate}
                      </p>
                      {exp.description && (
                        <ul className="mt-2 space-y-1">
                          {exp.description
                            .split("\n")
                            .filter(Boolean)
                            .map((line, i) => (
                              <li
                                key={i}
                                className="text-[11px] text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                              >
                                {line}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {summary && (
          <div className="mb-7">
            <h2
              className="text-sm font-black uppercase mb-3"
              style={{
                letterSpacing: "0.12em",
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                color: "#1a1a1a",
              }}
            >
              Profil
            </h2>
            <p className="text-[11.5px] text-gray-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2
              className="text-sm font-black uppercase mb-4"
              style={{
                letterSpacing: "0.12em",
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                color: "#1a1a1a",
              }}
            >
              Formations
            </h2>
            <div className="relative pl-5">
              <div
                className="absolute left-[5px] top-[6px] bottom-0 w-[2px]"
                style={{ backgroundColor: "#d1d5db" }}
              />
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    <div
                      className="absolute rounded-full"
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#1a1a1a",
                        left: -20,
                        top: 4,
                      }}
                    />
                    <h3
                      className="text-[13px] font-bold uppercase"
                      style={{ color: "#1a1a1a", fontFamily: "'Montserrat', 'Inter', sans-serif" }}
                    >
                      {edu.degree}
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {edu.school}
                      {edu.location ? `, ${edu.location}` : ""}
                      {" | "}
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDarkSidebar;
