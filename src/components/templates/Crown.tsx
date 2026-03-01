import { ResumeData } from "@/utils/resumeTypes";
import { Phone, Mail, MapPin, Globe, Linkedin } from "lucide-react";

interface Props {
  data: ResumeData;
}

const SimpleModel = ({ data }: Props) => {
  // On extrait les données selon la structure de TON app
  const { personalInfo, summary, experience, education, skills, languages } = data;

  // Logique pour séparer le nom/prénom pour le design spécifique (Light / Bold)
  const nameParts = personalInfo.fullName ? personalInfo.fullName.trim().split(" ") : ["NOM", "PRENOM"];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const contacts = [
    { icon: <Phone size={14} />, text: personalInfo.phone },
    { icon: <Mail size={14} />, text: personalInfo.email },
    { icon: <MapPin size={14} />, text: personalInfo.location },
    { icon: <Linkedin size={14} />, text: personalInfo.linkedin },
    { icon: <Globe size={14} />, text: personalInfo.website },
  ].filter((c) => c.text);

  return (
    <div
      className="bg-white w-[794px] mx-auto shadow-lg"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header - Identique à ton design */}
      <header className="pt-14 pb-10 px-16 text-right">
        <h1 className="font-light tracking-[0.45em] text-4xl leading-tight text-[#1a1a1a] uppercase">
          {firstName.split("").join(" ")}
        </h1>
        <h1 className="font-bold tracking-[0.20em] text-4xl leading-tight mt-1 text-[#1a1a1a] uppercase">
          {lastName.split("").join(" ")}
        </h1>
      </header>

      <div className="mx-16 border-t border-[#262626]" />

      {/* Body Container */}
      <div className="relative px-16 pt-10 pb-12">
        <div className="flex w-full">
          {/* Colonne Gauche */}
          <div className="w-[240px] pr-10 border-r border-[#262626]">
            {contacts.length > 0 && (
              <div className="space-y-3 mb-10">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-[#404040]">
                    <span className="text-[#1a1a1a] mt-0.5">{c.icon}</span>
                    <span className="break-all">{c.text}</span>
                  </div>
                ))}
              </div>
            )}

            {education && education.length > 0 && (
              <div className="mb-10">
                <SectionHeading>EDUCATION</SectionHeading>
                <div className="mt-5 space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="mb-4">
                      <p className="text-sm font-semibold text-[#1a1a1a]">
                        {edu.school}
                      </p>
                      <p className="text-sm text-[#737373]">{edu.degree}</p>
                      <p className="text-sm text-[#737373]">
                        {edu.startDate} - {edu.endDate || "Présent"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills && (
              <div className="mb-10">
                <SectionHeading>SKILLS</SectionHeading>
                <ul className="mt-5 space-y-2 text-sm text-[#404040]">
                  {skills.split(",").map((s, i) => (
                    <li key={i}>{s.trim()}</li>
                  ))}
                </ul>
              </div>
            )}

            {languages && (
              <div>
                <SectionHeading>LANGUAGES</SectionHeading>
                <p className="mt-5 text-sm text-[#404040] leading-relaxed">
                  {languages}
                </p>
              </div>
            )}
          </div>

          {/* Colonne Droite */}
          <div className="flex-1 pl-10">
            {summary && (
              <div className="mb-10">
                <SectionHeading>PROFILE</SectionHeading>
                <p className="mt-5 text-sm leading-relaxed text-[#404040] text-justify">
                  {summary}
                </p>
              </div>
            )}

            {experience && experience.length > 0 && (
              <div className="w-full">
                <SectionHeading>WORK EXPERIENCE</SectionHeading>
                <div className="mt-5 space-y-8">
                  {experience.map((exp) => (
                    <div key={exp.id} className="mb-6 break-inside-avoid">
                      <div>
                        <p className="text-sm font-bold uppercase text-[#1a1a1a]">
                          {exp.position}
                        </p>
                        <p className="text-sm text-[#737373]">
                          {exp.company} | {exp.startDate} - {exp.currentJob ? "Présent" : exp.endDate}
                        </p>
                      </div>
                      <div className="text-sm mt-2 text-[#404040] leading-relaxed">
                        <div className="mt-3 space-y-2">
                          {exp.description
                            ?.split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm leading-relaxed">
                                <span className="mt-[2px]">•</span>
                                <span>{line.replace(/^[-•]\s*/, "")}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bold text-base tracking-widest uppercase text-[#1a1a1a]">
    {children}
  </h2>
);

export default SimpleModel;