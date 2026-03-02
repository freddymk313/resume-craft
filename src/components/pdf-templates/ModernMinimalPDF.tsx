import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/resumeTypes";
import { PdfEmailIcon, PdfPhoneIcon, PdfLocationIcon, PdfWebsiteIcon, PdfLinkedinIcon } from "./PdfIcons";

const navy = "#1a2e50";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#1a1a1a" },
  header: { marginBottom: 20 },
  name: { fontSize: 24, fontWeight: "bold", color: navy, fontFamily: "Helvetica-Bold", letterSpacing: -0.5 },
  jobTitle: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  contactItem: { fontSize: 8, color: "#6b7280", flexDirection: "row", alignItems: "center", gap: 4 },
  divider: { height: 1, backgroundColor: "#e5e7eb", marginBottom: 16 },
  sectionTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 3, color: "#9ca3af", marginBottom: 8 },
  sectionBlock: { marginBottom: 16 },
  summaryText: { fontSize: 9, color: "#4b5563", lineHeight: 1.6 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  expPosition: { fontSize: 10, fontFamily: "Helvetica-Bold", color: navy },
  expCompany: { fontSize: 9, color: "#6b7280", marginTop: 1 },
  expDate: { fontSize: 8, color: "#9ca3af" },
  expItem: { marginBottom: 10 },
  bulletRow: { flexDirection: "row", paddingLeft: 8, marginTop: 2 },
  bulletDot: { fontSize: 8, color: "#d1d5db", marginRight: 4, marginTop: 1 },
  bulletText: { fontSize: 8, color: "#4b5563", flex: 1, lineHeight: 1.5 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  skillBadge: { fontSize: 8, backgroundColor: "#f3f4f6", color: "#4b5563", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  twoCol: { flexDirection: "row", gap: 24 },
  colHalf: { flex: 1 },
  smallText: { fontSize: 8, color: "#4b5563" },
});

interface Props {
  data: ResumeData;
}

const ModernMinimalPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle || "Job Title"}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <View style={styles.contactItem}><PdfEmailIcon size={8} /><Text style={{ fontSize: 8, color: "#6b7280" }}>{personalInfo.email}</Text></View>}
            {personalInfo.phone && <View style={styles.contactItem}><PdfPhoneIcon size={8} /><Text style={{ fontSize: 8, color: "#6b7280" }}>{personalInfo.phone}</Text></View>}
            {personalInfo.location && <View style={styles.contactItem}><PdfLocationIcon size={8} /><Text style={{ fontSize: 8, color: "#6b7280" }}>{personalInfo.location}</Text></View>}
            {personalInfo.website && <View style={styles.contactItem}><PdfWebsiteIcon size={8} /><Text style={{ fontSize: 8, color: "#6b7280" }}>{personalInfo.website}</Text></View>}
            {personalInfo.linkedin && <View style={styles.contactItem}><PdfLinkedinIcon size={8} /><Text style={{ fontSize: 8, color: "#6b7280" }}>{personalInfo.linkedin}</Text></View>}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Summary */}
        {summary ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {experience.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {experience.map((exp) => (
              <View key={exp.id} style={styles.expItem} wrap={false}>
                <View style={styles.expHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.expPosition}>{exp.position}</Text>
                    <Text style={styles.expCompany}>
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </Text>
                  </View>
                  <Text style={styles.expDate}>
                    {exp.startDate} — {exp.currentJob ? "Present" : exp.endDate}
                  </Text>
                </View>
                {exp.description
                  ? exp.description
                      .split("\n")
                      .filter(Boolean)
                      .map((line, i) => (
                        <View key={i} style={styles.bulletRow}>
                          <Text style={styles.bulletDot}>•</Text>
                          <Text style={styles.bulletText}>{line}</Text>
                        </View>
                      ))
                  : null}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {education.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 8 }} wrap={false}>
                <View style={styles.expHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.expPosition}>{edu.degree}</Text>
                    <Text style={styles.expCompany}>
                      {edu.school}
                      {edu.location ? `, ${edu.location}` : ""}
                    </Text>
                  </View>
                  <Text style={styles.expDate}>
                    {edu.startDate} — {edu.endDate}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
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

        {/* Languages & Certifications */}
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
