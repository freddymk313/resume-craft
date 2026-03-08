import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface Props {
  data: ResumeData;
}

const BLUE = "#1e40af";
const BORDER = `2px solid ${BLUE}`;

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="font-black uppercase mb-3"
    style={{
      fontSize: "14px",
      letterSpacing: "0.08em",
      color: BLUE,
      fontFamily: "'Inter', sans-serif",
    }}
  >
    {children}
  </h2>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`rounded-xl p-4 ${className}`}
    style={{ border: BORDER }}
  >
    {children}
  </div>
);

const BlueCardProfessional = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <div
      className="w-full bg-white"
      style={{ fontFamily: "'Inter', sans-serif", padding: "28px", minHeight: "1123px" }}
    >
      {/* Header Row: Photo + Name + Contact */}
      <div className="flex gap-3 mb-3" style={{ minHeight: "140px" }}>
        {/* Photo Card */}
        <Card className="flex items-center justify-center shrink-0" >
          <div
            className="rounded-lg bg-gray-200 flex items-center justify-center text-xl font-black uppercase overflow-hidden"
            style={{ width: 110, height: 110, color: BLUE }}
          >
            {personalInfo.firstName?.[0] || ""}{personalInfo.lastName?.[0] || ""}
          </div>
        </Card>

        {/* Name Card */}
        <Card className="flex-1 flex flex-col justify-center">
          <h1
            className="leading-none font-black uppercase"
            style={{
              fontSize: "32px",
              letterSpacing: "-0.01em",
              color: BLUE,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {personalInfo.firstName || "PRÉNOM"}
            <br />
            {personalInfo.lastName || "NOM"}
          </h1>
          <p
            className="mt-1.5 uppercase tracking-widest font-semibold"
            style={{ fontSize: "13px", color: "#374151" }}
          >
            {personalInfo.jobTitle || "Titre du poste"}
          </p>
        </Card>

        {/* Contact Card */}
        <Card className="shrink-0 flex flex-col justify-center" >
          <div className="space-y-2.5 text-[11px]" style={{ color: "#374151" }}>
            {personalInfo.email && (
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: BLUE }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: BLUE }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2.5">
                <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: BLUE }} />
                <span>{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: BLUE }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* À Propos */}
      {summary && (
        <Card className="mb-3">
          <SectionTitle>À Propos</SectionTitle>
          <p className="text-[11.5px] leading-relaxed" style={{ color: "#374151" }}>
            {summary}
          </p>
        </Card>
      )}

      {/* Two Column: Formation+Compétences | Expérience */}
      <div className="flex gap-3 mb-3">
        {/* Left Column */}
        <div className="w-[38%] flex flex-col gap-3">
          {/* Formation */}
          {education.length > 0 && (
            <Card>
              <SectionTitle>Formation</SectionTitle>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-[12px] font-bold uppercase" style={{ color: "#111827" }}>
                      {edu.degree}
                    </h3>
                    <p className="text-[11px]" style={{ color: "#6b7280" }}>{edu.school}</p>
                    <p className="text-[10.5px]" style={{ color: "#9ca3af" }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Compétences */}
          {skills.length > 0 && (
            <Card>
              <SectionTitle>Compétences</SectionTitle>
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold uppercase mb-1" style={{ color: "#111827" }}>
                  Logiciels Maîtrisés
                </h4>
                {skills.map((skill, i) => (
                  <p key={i} className="text-[11px]" style={{ color: "#374151" }}>{skill}</p>
                ))}
              </div>
              {languages.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-[11px] font-bold uppercase mb-1" style={{ color: "#111827" }}>
                    Langues Parlées
                  </h4>
                  {languages.map((lang, i) => (
                    <p key={i} className="text-[11px]" style={{ color: "#374151" }}>{lang}</p>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Right Column — Expérience */}
        <div className="w-[62%]">
          {experience.length > 0 && (
            <Card className="h-full">
              <SectionTitle>Expérience</SectionTitle>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <h3 className="text-[12px] font-bold uppercase" style={{ color: BLUE }}>
                      {exp.position}
                    </h3>
                    <p className="text-[11px] mt-0.5" style={{ color: "#6b7280" }}>
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                      {" | "}
                      {exp.startDate} - {exp.currentJob ? "Présent" : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: "#374151" }}>
                        {exp.description.split("\n").filter(Boolean).join(" ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Row: Expertise + Centres d'intérêts */}
      <div className="flex gap-3">
        {certifications.length > 0 && (
          <Card className="flex-1">
            <SectionTitle>Expertise</SectionTitle>
            <div className="space-y-1">
              {certifications.map((cert, i) => (
                <p key={i} className="text-[11px]" style={{ color: "#374151" }}>{cert}</p>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlueCardProfessional;
