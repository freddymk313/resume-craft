import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { PdfEmailIcon, PdfPhoneIcon, PdfLocationIcon, PdfWebsiteIcon, PdfLinkedinIcon } from "./PdfIcons";
import "./pdfFonts";
import { HEADING_FONT, BODY_FONT } from "./pdfFonts";

interface Props {
  data: ResumeData;
}

const DARK = "#171717";
const GREY = "#737373";
const LIGHT_GREY = "#d4d4d4";

const s = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: "#fff", fontFamily: BODY_FONT, fontSize: 10, color: DARK, paddingBottom: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: 44, paddingTop: 40 },
  nameBlock: {},
  decoLine: { width: 1.5, height: 32, backgroundColor: "#a3a3a3", marginBottom: 8, marginLeft: 2 },
  decoLine2: { width: 1.5, height: 22, backgroundColor: "#a3a3a3", marginTop: 8, marginLeft: 2 },
  firstName: { fontFamily: HEADING_FONT, fontWeight: 700, fontSize: 30, letterSpacing: 2, textTransform: "uppercase" },
  lastName: { fontFamily: HEADING_FONT, fontWeight: 400, fontSize: 24, letterSpacing: 3.5, textTransform: "uppercase", marginTop: -2 },
  photoCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: "#e5e5e5", justifyContent: "center", alignItems: "center" },
  initials: { fontFamily: HEADING_FONT, fontWeight: 700, fontSize: 34, color: "#a3a3a3", textTransform: "uppercase" },
  body: { flexDirection: "row", paddingHorizontal: 44, paddingTop: 22, gap: 32 },
  left: { width: "34%" },
  right: { flex: 1 },
  sectionTitle: { fontFamily: HEADING_FONT, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 },
  contactRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 5 },
  contactText: { fontSize: 9.5 },
  timelineWrap: { flexDirection: "row", gap: 8, marginBottom: 12 },
  track: { alignItems: "center", paddingTop: 3 },
  node: { width: 8, height: 8, borderRadius: 4, borderWidth: 1.2, borderColor: DARK },
  line: { width: 1.2, flex: 1, backgroundColor: LIGHT_GREY, marginTop: 2 },
  entryContent: { flex: 1 },
  entryTitle: { fontFamily: HEADING_FONT, fontWeight: 700, fontSize: 10, textTransform: "uppercase", marginBottom: 1 },
  entryDate: { fontSize: 9, color: GREY, marginBottom: 2 },
  entrySchool: { fontSize: 9, color: "#525252" },
  bullet: { flexDirection: "row", gap: 5, marginBottom: 2 },
  bulletDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: DARK, marginTop: 4 },
  bulletText: { fontSize: 9.5, color: "#404040", flex: 1, lineHeight: 1.5 },
  listItem: { flexDirection: "row", gap: 5, marginBottom: 2 },
  listDot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: DARK, marginTop: 4 },
  listText: { fontSize: 9.5, flex: 1 },
  summaryText: { fontSize: 10, color: "#404040", lineHeight: 1.6, textAlign: "justify", marginBottom: 16 },
  sectionGap: { marginBottom: 16 },
});

const formatDate = (d: string) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  return m ? `${m}/${y}` : y;
};

const TimelineEntry = ({ children }: { children: React.ReactNode }) => (
  <View style={s.timelineWrap} wrap={false}>
    <View style={s.track}>
      <View style={s.node} />
      <View style={s.line} />
    </View>
    <View style={s.entryContent}>{children}</View>
  </View>
);

const MinimalistEngineerPDF = ({ data }: Props) => {
  const fullName = getFullName(data.personalInfo);
  const [firstName, ...lastParts] = fullName.split(" ");
  const lastName = lastParts.join(" ");

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View style={s.nameBlock}>
            <View style={s.decoLine} />
            <Text style={s.firstName}>{firstName || "PRÉNOM"}</Text>
            <Text style={s.lastName}>{lastName || "NOM"}</Text>
            <View style={s.decoLine2} />
          </View>
          <View style={s.photoCircle}>
            <Text style={s.initials}>
              {(data.personalInfo.firstName?.[0] || "") + (data.personalInfo.lastName?.[0] || "")}
            </Text>
          </View>
        </View>

        {/* Body */}
        <View style={s.body}>
          {/* LEFT */}
          <View style={s.left}>
            {/* Contact */}
            <Text style={s.sectionTitle}>Contact</Text>
            <View style={s.sectionGap}>
              {data.personalInfo.phone ? (
                <View style={s.contactRow}>
                  <PdfPhoneIcon size={10} color={GREY} />
                  <Text style={s.contactText}>{data.personalInfo.phone}</Text>
                </View>
              ) : null}
              {data.personalInfo.email ? (
                <View style={s.contactRow}>
                  <PdfEmailIcon size={10} color={GREY} />
                  <Text style={s.contactText}>{data.personalInfo.email}</Text>
                </View>
              ) : null}
              {data.personalInfo.location ? (
                <View style={s.contactRow}>
                  <PdfLocationIcon size={10} color={GREY} />
                  <Text style={s.contactText}>{data.personalInfo.location}</Text>
                </View>
              ) : null}
              {data.personalInfo.website ? (
                <View style={s.contactRow}>
                  <PdfWebsiteIcon size={10} color={GREY} />
                  <Text style={s.contactText}>{data.personalInfo.website}</Text>
                </View>
              ) : null}
              {data.personalInfo.linkedin ? (
                <View style={s.contactRow}>
                  <PdfLinkedinIcon size={10} color={GREY} />
                  <Text style={s.contactText}>{data.personalInfo.linkedin}</Text>
                </View>
              ) : null}
            </View>

            {/* Formation */}
            {data.education.length > 0 && (
              <>
                <Text style={s.sectionTitle}>Formation</Text>
                <View style={s.sectionGap}>
                  {data.education.map((edu) => (
                    <TimelineEntry key={edu.id}>
                      <Text style={s.entryTitle}>{edu.degree}</Text>
                      <Text style={s.entryDate}>
                        {formatDate(edu.startDate)}{edu.endDate ? ` - ${formatDate(edu.endDate)}` : ""}
                      </Text>
                      <Text style={s.entrySchool}>{edu.school}</Text>
                    </TimelineEntry>
                  ))}
                </View>
              </>
            )}

            {/* Compétences */}
            {data.skills.length > 0 && (
              <>
                <Text style={s.sectionTitle}>Compétences</Text>
                <View style={s.sectionGap}>
                  {data.skills.map((sk, i) => (
                    <View key={i} style={s.listItem}>
                      <View style={s.listDot} />
                      <Text style={s.listText}>{sk}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Langues */}
            {data.languages.length > 0 && (
              <>
                <Text style={s.sectionTitle}>Langues</Text>
                <View style={s.sectionGap}>
                  {data.languages.map((l, i) => (
                    <View key={i} style={s.listItem}>
                      <View style={s.listDot} />
                      <Text style={s.listText}>{l}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* RIGHT */}
          <View style={s.right}>
            {/* Profil */}
            {data.summary ? (
              <>
                <Text style={s.sectionTitle}>Profil</Text>
                <Text style={s.summaryText}>{data.summary}</Text>
              </>
            ) : null}

            {/* Expériences */}
            {data.experience.length > 0 && (
              <>
                <Text style={s.sectionTitle}>Expériences Professionnelles</Text>
                {data.experience.map((exp) => (
                  <TimelineEntry key={exp.id}>
                    <Text style={s.entryTitle}>
                      {exp.position}{exp.company ? ` - ${exp.company}` : ""}
                    </Text>
                    <Text style={s.entryDate}>
                      {formatDate(exp.startDate)} - {exp.currentJob ? "Aujourd'hui" : formatDate(exp.endDate)}
                    </Text>
                    {exp.description ? exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <View key={i} style={s.bullet}>
                        <View style={s.bulletDot} />
                        <Text style={s.bulletText}>{line}</Text>
                      </View>
                    )) : null}
                  </TimelineEntry>
                ))}
              </>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <>
                <Text style={{ ...s.sectionTitle, marginTop: 8 }}>Certifications</Text>
                {data.certifications.map((c, i) => (
                  <View key={i} style={s.listItem}>
                    <View style={s.listDot} />
                    <Text style={s.listText}>{c}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MinimalistEngineerPDF;
