import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { Phone, Mail, MapPin } from "lucide-react";

interface Props {
  data: ResumeData;
}

const ClassicBordered = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div className="bg-white w-[794px] min-h-[1123px] mx-auto" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div className="min-h-[1123px] mx-[18px] my-[18px] border border-[#2d2d2d]" style={{ padding: "50px 50px 40px 50px" }}>
        <div className="text-center mb-1">
          <h1 className="font-bold uppercase tracking-[0.08em] text-[#1a1a1a]" style={{ fontSize: "38px", lineHeight: 1.1, fontFamily: "'Georgia', serif" }}>
            {getFullName(personalInfo) || "YOUR NAME"}
          </h1>
        </div>
        <div className="text-center mb-5">
          <p className="uppercase tracking-[0.25em] text-[#555]" style={{ fontSize: "14px", fontWeight: 400, fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            {personalInfo.jobTitle || "JOB TITLE"}
          </p>
        </div>

        <div className="border-t-2 border-[#2d2d2d] mb-3" />
        <div className="flex items-center justify-center gap-8 py-2 text-[#333]" style={{ fontSize: "11px" }}>
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={13} strokeWidth={2} /><span>{personalInfo.phone}</span></div>}
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={13} strokeWidth={2} /><span>{personalInfo.location}</span></div>}
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={13} strokeWidth={2} /><span>{personalInfo.email}</span></div>}
        </div>
        <div className="border-t-2 border-[#2d2d2d] mt-3 mb-8" />

        {summary && (
          <div className="mb-7">
            <h2 className="font-bold uppercase text-[#1a1a1a] mb-1" style={{ fontSize: "18px", fontFamily: "'Georgia', serif" }}>ABOUT ME</h2>
            <div className="border-t-2 border-[#2d2d2d] mb-4" />
            <p className="text-[#404040] leading-relaxed text-justify" style={{ fontSize: "11px", lineHeight: "1.65", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{summary}</p>
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-7">
            <h2 className="font-bold uppercase text-[#1a1a1a] mb-1" style={{ fontSize: "18px", fontFamily: "'Georgia', serif" }}>EDUCATION</h2>
            <div className="border-t-2 border-[#2d2d2d] mb-4" />
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex gap-6">
                  <div className="w-[160px] flex-shrink-0">
                    <p className="font-bold text-[#1a1a1a]" style={{ fontSize: "11.5px" }}>{edu.startDate} - {edu.endDate}</p>
                    <p className="text-[#555]" style={{ fontSize: "11px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{edu.school}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#1a1a1a]" style={{ fontSize: "11.5px" }}>{edu.degree}</p>
                    {edu.location && <p className="text-[#555] mt-1" style={{ fontSize: "10.5px", lineHeight: "1.6", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{edu.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-7">
            <h2 className="font-bold uppercase text-[#1a1a1a] mb-1" style={{ fontSize: "18px", fontFamily: "'Georgia', serif" }}>EXPERIENCE</h2>
            <div className="border-t-2 border-[#2d2d2d] mb-4" />
            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="flex gap-6">
                  <div className="w-[160px] flex-shrink-0">
                    <p className="font-bold text-[#1a1a1a]" style={{ fontSize: "11.5px" }}>{exp.startDate} - {exp.currentJob ? "NOW" : exp.endDate}</p>
                    <p className="text-[#555]" style={{ fontSize: "11px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{exp.company}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#1a1a1a]" style={{ fontSize: "11.5px" }}>{exp.position}</p>
                    {exp.description && (
                      <p className="text-[#555] mt-1" style={{ fontSize: "10.5px", lineHeight: "1.6", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                        {exp.description.split("\n").filter(Boolean).join(". ").replace(/^[-•]\s*/gm, "")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-7">
            <h2 className="font-bold uppercase text-[#1a1a1a] mb-1" style={{ fontSize: "18px", fontFamily: "'Georgia', serif" }}>SKILLS</h2>
            <div className="border-t-2 border-[#2d2d2d] mb-4" />
            <div className="grid grid-cols-4 gap-x-6 gap-y-2">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#333] mt-[1px]" style={{ fontSize: "10px" }}>•</span>
                  <span className="text-[#404040]" style={{ fontSize: "11px", fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassicBordered;
