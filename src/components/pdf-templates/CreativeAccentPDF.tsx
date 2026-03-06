import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { PdfEmailIcon, PdfPhoneIcon, PdfLocationIcon, PdfWebsiteIcon, PdfLinkedinIcon } from "./PdfIcons";
import { HEADING_FONT, BODY_FONT } from "./pdfFonts";

const accent = "#e07548";
const gray700 = "#374151";
const gray500 = "#6b7280";
const gray400 = "#9ca3af";

const styles = StyleSheet.create({
  page: { padding: 44, fontFamily: BODY_FONT, fontSize: 12, color: "#1f2937" },
  header: { marginBottom: 20 },
  name: { fontSize: 32, fontFamily: HEADING_FONT, fontWeight: 700, color: accent, letterSpacing: -0.5 },
  jobTitle: { fontSize: 16, color: gray700, fontFamily: HEADING_FONT, fontWeight: 600, marginTop: 4 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 12 },
  contactItem: { fontSize: 10, color: gray500, flexDirection: "row", alignItems: "center", gap: 5 },
  accentBar: { width: 52, height: 3, backgroundColor: accent, borderRadius: 2, marginBottom: 26 },
  sectionTitle: { fontSize: 14, fontFamily: HEADING_FONT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: accent, marginBottom: 12 },
  sectionBlock: { marginBottom: 26 },
  summaryText: { fontSize: 11.5, color: gray700, lineHeight: 1.6 },
  expItem: { marginBottom: 18, paddingLeft: 12, borderLeftWidth: 2, borderLeftColor: accent },
  expPosition: { fontSize: 14, fontFamily: HEADING_FONT, fontWeight: 700, color: "#1f2937" },
  expRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2 },
  expCompany: { fontSize: 11, color: gray500, fontWeight: 600 },
  expDate: { fontSize: 10, color: gray400 },
  bulletRow: { flexDirection: "row", paddingLeft: 8, marginTop: 4 },
  bulletDot: { fontSize: 11, color: accent, marginRight: 6 },
  bulletText: { fontSize: 11.5, color: gray700, flex: 1, lineHeight: 1.55 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  skillBadge: { fontSize: 10, backgroundColor: accent, color: "#ffffff", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  twoCol: { flexDirection: "row", gap: 28 },
  colHalf: { flex: 1 },
  smallText: { fontSize: 11, color: gray700, lineHeight: 1.55 },
});

interface Props { data: ResumeData }

const CreativeAccentPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.name}>{getFullName(personalInfo) || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle || "Job Title"}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <View style={styles.contactItem}><PdfEmailIcon size={9} /><Text>{personalInfo.email}</Text></View>}
            {personalInfo.phone && <View style={styles.contactItem}><PdfPhoneIcon size={9} /><Text>{personalInfo.phone}</Text></View>}
            {personalInfo.location && <View style={styles.contactItem}><PdfLocationIcon size={9} /><Text>{personalInfo.location}</Text></View>}
            {personalInfo.website && <View style={styles.contactItem}><PdfWebsiteIcon size={9} /><Text>{personalInfo.website}</Text></View>}
            {personalInfo.linkedin && <View style={styles.contactItem}><PdfLinkedinIcon size={9} /><Text>{personalInfo.linkedin}</Text></View>}
          </View>
        </View>

        <View style={styles.accentBar} />

        {summary ? <View style={styles.sectionBlock}><Text style={styles.sectionTitle}>Profile</Text><Text style={styles.summaryText}>{summary}</Text></View> : null}

        {experience.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.expItem} wrap={false}>
                <Text style={styles.expPosition}>{exp.position}</Text>
                <View style={styles.expRow}>
                  <Text style={styles.expCompany}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</Text>
                  <Text style={styles.expDate}>{exp.startDate} — {exp.currentJob ? "Present" : exp.endDate}</Text>
                </View>
                {exp.description?.split("\n").filter(Boolean).map((line, i) => (
                  <View key={i} style={styles.bulletRow}><Text style={styles.bulletDot}>•</Text><Text style={styles.bulletText}>{line}</Text></View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ ...styles.expItem, marginBottom: 12 }} wrap={false}>
                <Text style={styles.expPosition}>{edu.degree}</Text>
                <View style={styles.expRow}>
                  <Text style={styles.expCompany}>{edu.school}{edu.location ? ` · ${edu.location}` : ""}</Text>
                  <Text style={styles.expDate}>{edu.startDate} — {edu.endDate}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {skills.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>{skills.map((skill, i) => <Text key={i} style={styles.skillBadge}>{skill}</Text>)}</View>
          </View>
        ) : null}

        <View style={styles.twoCol}>
          {languages.length > 0 ? <View style={styles.colHalf}><Text style={styles.sectionTitle}>Languages</Text><Text style={styles.smallText}>{languages.join(", ")}</Text></View> : null}
          {certifications.length > 0 ? <View style={styles.colHalf}><Text style={styles.sectionTitle}>Certifications</Text><Text style={styles.smallText}>{certifications.join(", ")}</Text></View> : null}
        </View>
      </Page>
    </Document>
  );
};

export default CreativeAccentPDF;
