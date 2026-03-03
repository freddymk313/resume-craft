import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/resumeTypes";
import { PdfEmailIcon, PdfPhoneIcon, PdfLocationIcon, PdfWebsiteIcon, PdfLinkedinIcon } from "./PdfIcons";

const navy = "#1a2e50";
const gray600 = "#4b5563";
const gray400 = "#9ca3af";
const gray200 = "#e5e7eb";

const styles = StyleSheet.create({
  page: { padding: 44, fontFamily: "Helvetica", fontSize: 11, color: "#1f2937" },
  header: { marginBottom: 24 },
  name: { fontSize: 28, fontWeight: "bold", color: navy, fontFamily: "Helvetica-Bold", letterSpacing: -0.5 },
  jobTitle: { fontSize: 14, color: gray400, marginTop: 3 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 14, marginTop: 10 },
  contactItem: { fontSize: 9, color: gray600, flexDirection: "row", alignItems: "center", gap: 5 },
  divider: { height: 1, backgroundColor: gray200, marginBottom: 22 },
  sectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 3, color: gray400, marginBottom: 10 },
  sectionBlock: { marginBottom: 22 },
  summaryText: { fontSize: 10.5, color: gray600, lineHeight: 1.55 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  expPosition: { fontSize: 12, fontFamily: "Helvetica-Bold", color: navy },
  expCompany: { fontSize: 10, color: gray600, marginTop: 2 },
  expDate: { fontSize: 9, color: gray400 },
  expItem: { marginBottom: 14 },
  bulletRow: { flexDirection: "row", paddingLeft: 8, marginTop: 3 },
  bulletDot: { fontSize: 10, color: gray200, marginRight: 6, marginTop: 0 },
  bulletText: { fontSize: 10, color: gray600, flex: 1, lineHeight: 1.5 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  skillBadge: { fontSize: 9, backgroundColor: "#f3f4f6", color: gray600, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  twoCol: { flexDirection: "row", gap: 28 },
  colHalf: { flex: 1 },
  smallText: { fontSize: 10, color: gray600, lineHeight: 1.5 },
});

interface Props { data: ResumeData }

const ModernMinimalPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle || "Job Title"}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <View style={styles.contactItem}><PdfEmailIcon size={9} /><Text>{personalInfo.email}</Text></View>}
            {personalInfo.phone && <View style={styles.contactItem}><PdfPhoneIcon size={9} /><Text>{personalInfo.phone}</Text></View>}
            {personalInfo.location && <View style={styles.contactItem}><PdfLocationIcon size={9} /><Text>{personalInfo.location}</Text></View>}
            {personalInfo.website && <View style={styles.contactItem}><PdfWebsiteIcon size={9} /><Text>{personalInfo.website}</Text></View>}
            {personalInfo.linkedin && <View style={styles.contactItem}><PdfLinkedinIcon size={9} /><Text>{personalInfo.linkedin}</Text></View>}
          </View>
        </View>

        <View style={styles.divider} />

        {summary ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {experience.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.expItem} wrap={false}>
                <View style={styles.expHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.expPosition}>{exp.position}</Text>
                    <Text style={styles.expCompany}>{exp.company}{exp.location ? `, ${exp.location}` : ""}</Text>
                  </View>
                  <Text style={styles.expDate}>{exp.startDate} — {exp.currentJob ? "Present" : exp.endDate}</Text>
                </View>
                {exp.description?.split("\n").filter(Boolean).map((line, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{line}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ) : null}

        {education.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 12 }} wrap={false}>
                <View style={styles.expHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.expPosition}>{edu.degree}</Text>
                    <Text style={styles.expCompany}>{edu.school}{edu.location ? `, ${edu.location}` : ""}</Text>
                  </View>
                  <Text style={styles.expDate}>{edu.startDate} — {edu.endDate}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {skillsList.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {skillsList.map((skill, i) => (
                <Text key={i} style={styles.skillBadge}>{skill}</Text>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.twoCol}>
          {languages ? (
            <View style={styles.colHalf}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <Text style={styles.smallText}>{languages}</Text>
            </View>
          ) : null}
          {certifications ? (
            <View style={styles.colHalf}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              <Text style={styles.smallText}>{certifications}</Text>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};

export default ModernMinimalPDF;
