import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/resumeTypes";

const styles = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 40, paddingHorizontal: 50, fontFamily: "Helvetica", backgroundColor: "#ffffff" },
  header: { marginBottom: 25, textAlign: "right", paddingRight: 10 },
  firstName: { fontSize: 26, fontFamily: "Helvetica", letterSpacing: 8, textTransform: "uppercase", color: "#1a1a1a" },
  lastName: { fontSize: 26, fontFamily: "Helvetica-Bold", letterSpacing: 4, textTransform: "uppercase", marginTop: 4, color: "#1a1a1a" },
  jobTitle: { fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#737373", marginTop: 8 },
  headerDivider: { borderTopWidth: 1, borderTopColor: "#262626", marginBottom: 30 },
  container: { flexDirection: "row", gap: 30 },
  sidebar: { width: "35%", borderRightWidth: 1, borderRightColor: "#262626", paddingRight: 20 },
  mainContent: { width: "65%", paddingLeft: 10 },
  sectionBlock: { marginBottom: 25 },
  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", letterSpacing: 2, textTransform: "uppercase", color: "#1a1a1a", marginBottom: 12 },
  contactText: { fontSize: 9, color: "#404040", lineHeight: 1.4 },
  educationItem: { marginBottom: 15 },
  eduSchool: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#1a1a1a" },
  eduDegree: { fontSize: 9, color: "#737373", marginTop: 2 },
  eduDate: { fontSize: 8, color: "#a3a3a3", marginTop: 2 },
  skillItem: { fontSize: 9, color: "#404040", marginBottom: 5, flexDirection: "row", alignItems: "center" },
  summaryText: { fontSize: 9, color: "#404040", lineHeight: 1.6, textAlign: "justify" },
  experienceItem: { marginBottom: 20 },
  expHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  expPosition: { fontSize: 10, fontFamily: "Helvetica-Bold", textTransform: "uppercase", color: "#1a1a1a" },
  expDate: { fontSize: 8, color: "#a3a3a3", textTransform: "uppercase" },
  expCompany: { fontSize: 9, color: "#737373", fontFamily: "Helvetica-Bold", marginTop: 2 },
  bulletRow: { flexDirection: "row", marginTop: 4, paddingLeft: 5 },
  bulletDot: { width: 10, fontSize: 9, color: "#d1d5db" },
  bulletText: { flex: 1, fontSize: 9, color: "#404040", lineHeight: 1.4 },
});

interface Props { data: ResumeData }

const SimpleModelPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  const firstName = personalInfo.firstName || "";
  const lastName = personalInfo.lastName || "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.firstName}>{firstName.split("").join(" ")}</Text>
          <Text style={styles.lastName}>{lastName.split("").join(" ")}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>
        </View>

        <View style={styles.headerDivider} />

        <View style={styles.container}>
          <View style={styles.sidebar}>
            <View style={styles.sectionBlock}>
              {personalInfo.phone && <Text style={styles.contactText}>{personalInfo.phone}</Text>}
              {personalInfo.email && <Text style={styles.contactText}>{personalInfo.email}</Text>}
              {personalInfo.location && <Text style={styles.contactText}>{personalInfo.location}</Text>}
              {personalInfo.linkedin && <Text style={styles.contactText}>{personalInfo.linkedin}</Text>}
              {personalInfo.website && <Text style={styles.contactText}>{personalInfo.website}</Text>}
            </View>

            {education.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>EDUCATION</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.eduSchool}>{edu.school}</Text>
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                    <Text style={styles.eduDate}>{edu.startDate} — {edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}

            {skills.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>SKILLS</Text>
                {skills.map((skill, i) => <Text key={i} style={styles.skillItem}>• {skill}</Text>)}
              </View>
            )}

            {languages.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>LANGUAGES</Text>
                <Text style={styles.contactText}>{languages.join(", ")}</Text>
              </View>
            )}
          </View>

          <View style={styles.mainContent}>
            {summary && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>PROFILE</Text>
                <Text style={styles.summaryText}>{summary}</Text>
              </View>
            )}

            {experience.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem} wrap={false}>
                    <View style={styles.expHeader}>
                      <Text style={styles.expPosition}>{exp.position}</Text>
                      <Text style={styles.expDate}>{exp.startDate} — {exp.currentJob ? "Present" : exp.endDate}</Text>
                    </View>
                    <Text style={styles.expCompany}>{exp.company}{exp.location ? ` | ${exp.location}` : ""}</Text>
                    {exp.description && exp.description.split("\n").filter(Boolean).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line.replace(/^[-•]\s*/, "")}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {certifications.length > 0 && (
              <View style={styles.sectionBlock}>
                <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
                <Text style={styles.summaryText}>{certifications.join(", ")}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SimpleModelPDF;
