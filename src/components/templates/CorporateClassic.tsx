import { ResumeData } from "@/utils/resumeTypes";

interface Props {
  data: ResumeData;
}

const CorporateClassic = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="bg-white text-black" style={{ width: "794px", minHeight: "1123px", fontFamily: "'Open Sans', sans-serif", padding: "56px 64px 48px" }}>
      {/* Name */}
      <h1
        className="text-center font-bold uppercase"
        style={{ fontSize: "38px", letterSpacing: "6px", fontFamily: "'Montserrat', sans-serif", lineHeight: 1.15 }}
      >
        {personalInfo.fullName || "YOUR NAME"}
      </h1>

      {/* Contact */}
      <div className="text-center mt-2" style={{ fontSize: "11.5px", color: "#444", lineHeight: 1.7 }}>
        {(personalInfo.phone || personalInfo.email || personalInfo.website) && (
          <div>
            {[personalInfo.phone, personalInfo.email, personalInfo.website].filter(Boolean).join(" · ")}
          </div>
        )}
        {personalInfo.location && <div>{personalInfo.location}</div>}
      </div>

      {/* Thick black divider */}
      <div className="mt-5" style={{ height: "3px", backgroundColor: "#000" }} />

      {/* Summary / Job Title section */}
      {(personalInfo.jobTitle || summary) && (
        <>
          <h2
            className="text-center font-bold uppercase mt-6"
            style={{ fontSize: "14px", letterSpacing: "1.5px", fontFamily: "'Montserrat', sans-serif" }}
          >
            {personalInfo.jobTitle || "Professional Summary"}
          </h2>
          {summary && (
            <p className="mt-3" style={{ fontSize: "11.5px", lineHeight: 1.65, color: "#333", textAlign: "justify" }}>
              {summary}
            </p>
          )}
        </>
      )}

      {/* Thin divider */}
      {skillsList.length > 0 && <div className="mt-5" style={{ height: "1.5px", backgroundColor: "#ccc" }} />}

      {/* Skills */}
      {skillsList.length > 0 && (
        <>
          <h2
            className="text-center font-bold uppercase mt-5"
            style={{ fontSize: "14px", letterSpacing: "1.5px", fontFamily: "'Montserrat', sans-serif" }}
          >
            Strengths and Expertise
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-y-1 text-center" style={{ fontSize: "11.5px", color: "#333" }}>
            {skillsList.map((skill, i) => (
              <div key={i}>{skill}</div>
            ))}
          </div>
        </>
      )}

      {/* Thin divider */}
      {experience.length > 0 && <div className="mt-5" style={{ height: "1.5px", backgroundColor: "#ccc" }} />}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <h2
            className="text-center font-bold uppercase mt-5"
            style={{ fontSize: "14px", letterSpacing: "1.5px", fontFamily: "'Montserrat', sans-serif" }}
          >
            Professional Experience
          </h2>
          {experience.map((exp) => {
            const bullets = exp.description?.split("\n").filter(Boolean) || [];
            return (
              <div key={exp.id} className="mt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold" style={{ fontSize: "12px" }}>{exp.company}</div>
                    <div className="font-bold" style={{ fontSize: "12px" }}>{exp.position}</div>
                  </div>
                  <div className="text-right shrink-0 ml-4" style={{ fontSize: "11px", color: "#333" }}>
                    {exp.startDate} - {exp.currentJob ? "Present" : exp.endDate}
                  </div>
                </div>
                {bullets.length > 0 && (
                  <ul className="mt-2 ml-4" style={{ fontSize: "11.5px", lineHeight: 1.6, color: "#333" }}>
                    {bullets.map((line, i) => (
                      <li key={i} className="list-disc ml-1 pl-1">{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Thin divider */}
      {education.length > 0 && <div className="mt-5" style={{ height: "1.5px", backgroundColor: "#ccc" }} />}

      {/* Education */}
      {education.length > 0 && (
        <>
          <h2
            className="text-center font-bold uppercase mt-5"
            style={{ fontSize: "14px", letterSpacing: "1.5px", fontFamily: "'Montserrat', sans-serif" }}
          >
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mt-3">
              <div className="font-bold" style={{ fontSize: "12px" }}>{edu.school}</div>
              <div style={{ fontSize: "11.5px", color: "#333" }}>{edu.degree}</div>
            </div>
          ))}
        </>
      )}

      {/* Thin divider */}
      {(languages || certifications) && <div className="mt-5" style={{ height: "1.5px", backgroundColor: "#ccc" }} />}

      {/* Languages & Certifications */}
      {languages && (
        <div className="mt-4">
          <h2
            className="text-center font-bold uppercase"
            style={{ fontSize: "14px", letterSpacing: "1.5px", fontFamily: "'Montserrat', sans-serif" }}
          >
            Languages
          </h2>
          <p className="mt-2 text-center" style={{ fontSize: "11.5px", color: "#333" }}>{languages}</p>
        </div>
      )}

      {certifications && (
        <div className="mt-4">
          <h2
            className="text-center font-bold uppercase"
            style={{ fontSize: "14px", letterSpacing: "1.5px", fontFamily: "'Montserrat', sans-serif" }}
          >
            Certifications
          </h2>
          <p className="mt-2 text-center" style={{ fontSize: "11.5px", color: "#333" }}>{certifications}</p>
        </div>
      )}

      {/* References */}
      <div className="mt-6" style={{ height: "1.5px", backgroundColor: "#ccc" }} />
      <p className="mt-4" style={{ fontSize: "11px", color: "#555" }}>References are available on request.</p>
    </div>
  );
};

export default CorporateClassic;
