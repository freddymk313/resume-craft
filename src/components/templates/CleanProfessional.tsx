import { ResumeData } from "@/utils/resumeTypes";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

interface Props {
  data: ResumeData;
}

const ACCENT = "#c8dce6"; // light blue for section title backgrounds

const SectionTitle = ({ children }: { children: string }) => (
  <div className="mb-4">
    <div className="px-3 py-[5px] mb-[2px]" style={{ backgroundColor: ACCENT }}>
      <h2
        className="font-bold uppercase tracking-wide text-[#1a1a1a]"
        style={{ fontSize: "13px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
      >
        {children}
      </h2>
    </div>
    <div className="border-t-[2px] border-[#1a1a1a]" />
  </div>
);

const CleanProfessional = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const skillsList = skills ? skills.split(",").map((s) => s.trim()).filter(Boolean) : [];

  // 3-column distribution for skills
  const cols = 3;
  const skillColumns: string[][] = Array.from({ length: cols }, () => []);
  skillsList.forEach((s, i) => skillColumns[i % cols].push(s));

  return (
    <div
      className="bg-white w-[794px] min-h-[1123px] mx-auto"
      style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
    >
      <div style={{ padding: "48px 52px 40px 52px" }}>
        {/* NAME */}
        <h1
          className="font-bold uppercase tracking-[0.18em] text-[#1a1a1a]"
          style={{ fontSize: "36px", lineHeight: 1.15, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          {personalInfo.fullName || "YOUR NAME"}
        </h1>

        {/* JOB TITLE */}
        <p
          className="text-[#666] mt-1 mb-5"
          style={{ fontSize: "16px", fontWeight: 400, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          {personalInfo.jobTitle || "Job Title"}
        </p>

        {/* CONTACT ROW */}
        <div
          className="flex items-center flex-wrap gap-x-4 gap-y-1 py-2 px-3 text-[#333] mb-8"
          style={{ fontSize: "10.5px", backgroundColor: "#f3f3f3", borderRadius: 0 }}
        >
          {personalInfo.phone && (
            <div className="flex items-center gap-[6px]">
              <Phone size={11} strokeWidth={2} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.phone && personalInfo.location && <span className="text-[#999]">•</span>}
          {personalInfo.location && (
            <div className="flex items-center gap-[6px]">
              <MapPin size={11} strokeWidth={2} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.location && personalInfo.website && <span className="text-[#999]">•</span>}
          {personalInfo.website && (
            <div className="flex items-center gap-[6px]">
              <Globe size={11} strokeWidth={2} />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {(personalInfo.website || personalInfo.location) && personalInfo.email && <span className="text-[#999]">•</span>}
          {personalInfo.email && (
            <div className="flex items-center gap-[6px]">
              <Mail size={11} strokeWidth={2} />
              <span>{personalInfo.email}</span>
            </div>
          )}
        </div>

        {/* ABOUT ME */}
        {summary && (
          <div className="mb-6">
            <SectionTitle>ABOUT ME</SectionTitle>
            <p
              className="text-[#333] leading-relaxed"
              style={{ fontSize: "11px", lineHeight: "1.7" }}
            >
              {summary}
            </p>
          </div>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <div className="mb-6">
            <SectionTitle>EDUCATION</SectionTitle>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[#1a1a1a]" style={{ fontSize: "11.5px" }}>
                      {edu.school}
                    </p>
                    <p className="text-[#555]" style={{ fontSize: "10.5px" }}>
                      {edu.degree}
                    </p>
                  </div>
                  <p className="text-[#333] flex-shrink-0 ml-4" style={{ fontSize: "11px" }}>
                    {edu.startDate}–{edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILL */}
        {skillsList.length > 0 && (
          <div className="mb-6">
            <SectionTitle>SKILL</SectionTitle>
            <div className="grid grid-cols-3 gap-x-8 gap-y-[6px] mt-2">
              {skillsList.map((skill, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#333]" style={{ fontSize: "10px", lineHeight: "1.6" }}>•</span>
                  <span className="text-[#333]" style={{ fontSize: "11px", lineHeight: "1.5" }}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {experience.length > 0 && (
          <div className="mb-6">
            <SectionTitle>WORK EXPERIENCE</SectionTitle>
            <div className="space-y-6">
              {experience.map((exp) => {
                const descLines = exp.description ? exp.description.split("\n").filter(Boolean) : [];
                const bulletLines = descLines.filter(l => /^[-•]/.test(l.trim()));
                const paragraphLines = descLines.filter(l => !/^[-•]/.test(l.trim()));

                return (
                  <div key={exp.id}>
                    {/* Title row */}
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-bold text-[#1a1a1a]" style={{ fontSize: "11.5px" }}>
                        {exp.company} – {exp.position}
                      </p>
                      <p className="text-[#333] flex-shrink-0 ml-4 font-bold" style={{ fontSize: "11px" }}>
                        {exp.startDate}–{exp.currentJob ? "NOW" : exp.endDate}
                      </p>
                    </div>
                    {/* Description paragraph */}
                    {paragraphLines.length > 0 && (
                      <p className="text-[#333] mb-2" style={{ fontSize: "10.5px", lineHeight: "1.7" }}>
                        {paragraphLines.join(" ")}
                      </p>
                    )}
                    {/* Bullet points */}
                    {bulletLines.length > 0 && (
                      <ul className="mt-1 space-y-[2px]">
                        {bulletLines.map((line, i) => (
                          <li key={i} className="flex items-start gap-2 text-[#333]" style={{ fontSize: "10.5px", lineHeight: "1.6" }}>
                            <span className="mt-[1px]">•</span>
                            <span>{line.replace(/^[-•]\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* If no bullets but has description, show as paragraph */}
                    {bulletLines.length === 0 && paragraphLines.length === 0 && exp.description && (
                      <p className="text-[#333]" style={{ fontSize: "10.5px", lineHeight: "1.7" }}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom border line */}
      <div className="mx-[52px] border-t border-[#1a1a1a]" />
    </div>
  );
};

export default CleanProfessional;
