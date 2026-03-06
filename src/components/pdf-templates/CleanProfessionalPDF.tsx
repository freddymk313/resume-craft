import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { HEADING_FONT, BODY_FONT } from "./pdfFonts";
import { PdfPhoneIcon, PdfLocationIcon, PdfEmailIcon, PdfWebsiteIcon } from "./PdfIcons";

const ACCENT = "#c8dce6";

const styles = StyleSheet.create({
  page: { backgroundColor: "#ffffff", paddingTop: 44, paddingBottom: 36, paddingHorizontal: 48 },
  name: { fontSize: 32, fontFamily: HEADING_FONT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 5, color: "#1a1a1a" },
  jobTitle: { fontSize: 14, fontFamily: BODY_FONT, color: "#666666", marginTop: 3, marginBottom: 16 },
  contactRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#f3f3f3", paddingVertical: 6, paddingHorizontal: 10, gap: 12, marginBottom: 24 },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  contactText: { fontSize: 9.5, fontFamily: BODY_FONT, color: "#333333" },
  contactDot: { fontSize: 9, color: "#999999" },
  sectionTitleBar: { backgroundColor: ACCENT, paddingVertical: 4, paddingHorizontal: 10, marginBottom: 1 },
  sectionTitleText: { fontSize: 11.5, fontFamily: HEADING_FONT, fontWeight: 700, textTransform: "uppercase", color: "#1a1a1a", letterSpacing: 0.5 },
  sectionDivider: { borderTopWidth: 1.5, borderTopColor: "#1a1a1a", marginBottom: 10 },
  section: { marginBottom: 16 },
  bodyText: { fontSize: 10, fontFamily: BODY_FONT, color: "#333333", lineHeight: 1.7 },
  eduRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  eduLeft: { flex: 1 },
  eduSchool: { fontSize: 10.5, fontFamily: HEADING_FONT, fontWeight: 700, color: "#1a1a1a" },
  eduDegree: { fontSize: 9.5, fontFamily: BODY_FONT, color: "#555555", marginTop: 1 },
  eduDate: { fontSize: 10, fontFamily: BODY_FONT, color: "#333333" },
  expBlock: { marginBottom: 14 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  expTitle: { fontSize: 10.5, fontFamily: HEADING_FONT, fontWeight: 700, color: "#1a1a1a", flex: 1 },
  expDate: { fontSize: 10, fontFamily: HEADING_FONT, fontWeight: 700, color: "#333333" },
  expDesc: { fontSize: 9.5, fontFamily: BODY_FONT, color: "#333333", lineHeight: 1.7, marginBottom: 4 },
  bulletRow: { flexDirection: "row", gap: 5, marginBottom: 2, paddingLeft: 4 },
  bulletDot: { fontSize: 9.5, color: "#333333" },
  bulletText: { fontSize: 9.5, fontFamily: BODY_FONT, color: "#333333", flex: 1, lineHeight: 1.6 },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap" },
  skillItem: { width: "33.3%", flexDirection: "row", alignItems: "flex-start", gap: 4, marginBottom: 5 },
  skillText: { fontSize: 9.5, fontFamily: BODY_FONT, color: "#333333" },
  bottomLine: { borderTopWidth: 0.75, borderTopColor: "#1a1a1a", marginTop: "auto" },
});

const SectionHeader = ({ title }: { title: string }) => (
  <View>
    <View style={styles.sectionTitleBar}><Text style={styles.sectionTitleText}>{title}</Text></View>
    <View style={styles.sectionDivider} />
  </View>
);

interface Props { data: ResumeData }

const CleanProfessionalPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills } = data;

  const contactItems: { icon: React.ReactNode; text: string }[] = [];
  if (personalInfo.phone) contactItems.push({ icon: <PdfPhoneIcon size={8} color="#333" />, text: personalInfo.phone });
  if (personalInfo.location) contactItems.push({ icon: <PdfLocationIcon size={8} color="#333" />, text: personalInfo.location });
  if (personalInfo.website) contactItems.push({ icon: <PdfWebsiteIcon size={8} color="#333" />, text: personalInfo.website });
  if (personalInfo.email) contactItems.push({ icon: <PdfEmailIcon size={8} color="#333" />, text: personalInfo.email });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{getFullName(personalInfo) || "YOUR NAME"}</Text>
        <Text style={styles.jobTitle}>{personalInfo.jobTitle || "Job Title"}</Text>

        <View style={styles.contactRow}>
          {contactItems.map((item, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              {i > 0 && <Text style={styles.contactDot}>•</Text>}
              <View style={styles.contactItem}>{item.icon}<Text style={styles.contactText}>{item.text}</Text></View>
            </View>
          ))}
        </View>

        {summary && <View style={styles.section}><SectionHeader title="ABOUT ME" /><Text style={styles.bodyText}>{summary}</Text></View>}

        {education.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="EDUCATION" />
            {education.map((edu) => (
              <View key={edu.id} style={styles.eduRow} wrap={false}>
                <View style={styles.eduLeft}>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                </View>
                <Text style={styles.eduDate}>{edu.startDate}–{edu.endDate}</Text>
              </View>
            ))}
          </View>
        )}

        {skills.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="SKILL" />
            <View style={styles.skillsGrid}>
              {skills.map((skill, i) => (
                <View key={i} style={styles.skillItem}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {experience.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title="WORK EXPERIENCE" />
            {experience.map((exp) => {
              const lines = exp.description ? exp.description.split("\n").filter(Boolean) : [];
              const bullets = lines.filter(l => /^[-•]/.test(l.trim()));
              const paragraphs = lines.filter(l => !/^[-•]/.test(l.trim()));
              return (
                <View key={exp.id} style={styles.expBlock} wrap={false}>
                  <View style={styles.expHeader}>
                    <Text style={styles.expTitle}>{exp.company} – {exp.position}</Text>
                    <Text style={styles.expDate}>{exp.startDate}–{exp.currentJob ? "NOW" : exp.endDate}</Text>
                  </View>
                  {paragraphs.length > 0 && <Text style={styles.expDesc}>{paragraphs.join(" ")}</Text>}
                  {bullets.map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{line.replace(/^[-•]\s*/, "")}</Text>
                    </View>
                  ))}
                  {bullets.length === 0 && paragraphs.length === 0 && exp.description && <Text style={styles.expDesc}>{exp.description}</Text>}
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.bottomLine} />
      </Page>
    </Document>
  );
};

export default CleanProfessionalPDF;
