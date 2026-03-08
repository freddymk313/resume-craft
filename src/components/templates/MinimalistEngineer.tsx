import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface Props {
  data: ResumeData;
}

const formatDate = (d: string) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return m ? `${m}/${y}` : y;
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[15px] font-black tracking-[0.15em] uppercase mb-4">{children}</h2>
);

const TimelineItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-3">
    {/* timeline track */}
    <div className="flex flex-col items-center pt-[5px]">
      <div className="w-[10px] h-[10px] rounded-full border-[1.5px] border-neutral-800 shrink-0" />
      <div className="w-[1.5px] flex-1 bg-neutral-300 mt-[2px]" />
    </div>
    <div className="pb-5 flex-1">{children}</div>
  </div>
);

const MinimalistEngineer = ({ data }: Props) => {
  const fullName = getFullName(data.personalInfo);
  const [firstName, ...lastParts] = fullName.split(" ");
  const lastName = lastParts.join(" ");

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-neutral-900 font-['Inter',sans-serif] text-[10.5px] leading-[1.55]">
      {/* === HEADER === */}
      <div className="flex justify-between items-start px-[56px] pt-[48px]">
        {/* Left: name */}
        <div>
          <div className="w-[1.5px] h-[40px] bg-neutral-400 mb-3 ml-1" />
          <h1 className="text-[36px] font-black tracking-[0.06em] uppercase leading-[1.05]">
            {firstName || "PRÉNOM"}
          </h1>
          <p className="text-[28px] font-light tracking-[0.12em] uppercase leading-[1.1] mt-[-2px]">
            {lastName || "NOM"}
          </p>
          <div className="w-[1.5px] h-[28px] bg-neutral-400 mt-3 ml-1" />
        </div>

        {/* Right: circular photo placeholder */}
        <div className="w-[140px] h-[140px] rounded-full bg-neutral-200 overflow-hidden shrink-0 flex items-center justify-center">
          {fullName ? (
            <span className="text-[40px] font-bold text-neutral-400 uppercase select-none">
              {data.personalInfo.firstName?.[0]}{data.personalInfo.lastName?.[0]}
            </span>
          ) : (
            <span className="text-[40px] font-bold text-neutral-300">?</span>
          )}
        </div>
      </div>

      {/* === BODY: two columns === */}
      <div className="flex px-[56px] pt-[28px] gap-[40px]">
        {/* LEFT COLUMN — ~35% */}
        <div className="w-[34%] shrink-0">
          {/* Contact */}
          <SectionTitle>Contact</SectionTitle>
          <div className="space-y-[6px] text-[10px] mb-8">
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-[12px] h-[12px] text-neutral-500" strokeWidth={1.5} />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-[12px] h-[12px] text-neutral-500" strokeWidth={1.5} />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-[12px] h-[12px] text-neutral-500" strokeWidth={1.5} />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-[12px] h-[12px] text-neutral-500" strokeWidth={1.5} />
                <span>{data.personalInfo.website}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-[12px] h-[12px] text-neutral-500" strokeWidth={1.5} />
                <span>{data.personalInfo.linkedin}</span>
              </div>
            )}
          </div>

          {/* Formation */}
          {data.education.length > 0 && (
            <>
              <SectionTitle>Formation</SectionTitle>
              <div className="mb-8">
                {data.education.map((edu) => (
                  <TimelineItem key={edu.id}>
                    <p className="font-bold text-[10px] uppercase leading-tight">{edu.degree}</p>
                    <p className="text-[9.5px] text-neutral-500">
                      {formatDate(edu.startDate)}{edu.endDate ? ` - ${formatDate(edu.endDate)}` : ""}
                    </p>
                    <p className="text-[9.5px] text-neutral-600">{edu.school}</p>
                  </TimelineItem>
                ))}
              </div>
            </>
          )}

          {/* Compétences */}
          {data.skills.length > 0 && (
            <>
              <SectionTitle>Compétences</SectionTitle>
              <ul className="list-disc list-outside pl-4 space-y-[3px] text-[10px] mb-8">
                {data.skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {/* Langues */}
          {data.languages.length > 0 && (
            <>
              <SectionTitle>Langues</SectionTitle>
              <ul className="list-disc list-outside pl-4 space-y-[3px] text-[10px]">
                {data.languages.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* RIGHT COLUMN — ~65% */}
        <div className="flex-1">
          {/* Profil */}
          {data.summary && (
            <div className="mb-8">
              <SectionTitle>Profil</SectionTitle>
              <p className="text-[10.5px] leading-[1.6] text-neutral-700 text-justify">{data.summary}</p>
            </div>
          )}

          {/* Expériences */}
          {data.experience.length > 0 && (
            <>
              <SectionTitle>Expériences Professionnelles</SectionTitle>
              <div>
                {data.experience.map((exp) => (
                  <TimelineItem key={exp.id}>
                    <p className="font-bold text-[10.5px] uppercase leading-tight">
                      {exp.position}{exp.company ? ` - ${exp.company}` : ""}
                    </p>
                    <p className="text-[9.5px] text-neutral-500 mb-1">
                      {formatDate(exp.startDate)} - {exp.currentJob ? "Aujourd'hui" : formatDate(exp.endDate)}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-outside pl-4 space-y-[2px] text-[10px] text-neutral-700">
                        {exp.description.split("\n").filter(Boolean).map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </TimelineItem>
                ))}
              </div>
            </>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="mt-4">
              <SectionTitle>Certifications</SectionTitle>
              <ul className="list-disc list-outside pl-4 space-y-[3px] text-[10px]">
                {data.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistEngineer;
