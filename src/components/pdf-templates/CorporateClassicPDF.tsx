import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/resumeTypes";
import { HEADING_FONT, BODY_FONT } from "./pdfFonts";

const styles = StyleSheet.create({
  page: { padding: "56 64 48 64", fontFamily: BODY_FONT, fontSize: 11.5, color: "#1a1a1a" },
  name: { fontSize: 34, fontFamily: HEADING_FONT, fontWeight: 700, textAlign: "center", textTransform: "uppercase", letterSpacing: 6 },
  contactRow: { textAlign: "center", fontSize: 11, color: "#444", marginTop: 6, lineHeight: 1.7 },
  thickDivider: { height: 3, backgroundColor: "#000", marginTop: 18 },
  thinDivider: { height: 1.5, backgroundColor: "#cccccc", marginTop: 18 },
  sectionTitle: { fontSize: 14, fontFamily: HEADING_FONT, fontWeight: 700, textAlign: "center", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 18 },
  summary: { fontSize: 11.5, lineHeight: 1.65, color: "#333", marginTop: 10, textAlign: "justify" },
  skillsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10, gap: 0 },
  skillItem: { width: "33.33%", textAlign: "center", fontSize: 11.5, color: "#333", paddingVertical: 2 },
  expBlock: { marginTop: 14 },
  expHeader: { flexDirection: "row", justifyContent: "space-between" },
  expLeft: {},
  expCompany: { fontSize: 12, fontWeight: 700, fontFamily: HEADING_FONT },
  expPosition: { fontSize: 12, fontWeight: 700, fontFamily: HEADING_FONT },
  expDate: { fontSize: 11, color: "#333", textAlign: "right" },
  bulletRow: { flexDirection: "row", marginTop: 3, paddingLeft: 14 },
  bulletDot: { fontSize: 11, marginRight: 6, color: "#333" },
  bulletText: { fontSize: 11.5, color: "#333", flex: 1, lineHeight: 1.6 },
  eduBlock: { marginTop: 10 },
  eduSchool: { fontSize: 12, fontWeight: 700, fontFamily: HEADING_FONT },
  eduDegree: { fontSize: 11.5, color: "#333" },
  smallText: { fontSize: 11.5, color: "#333", textAlign: "center", marginTop: 8 },
  refText: { fontSize: 11, color: "#555", marginTop: 14 },
});

interface Props { data: ResumeData }

const CorporateClassicPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);
  const contact = [personalInfo.phone, personalInfo.email, personalInfo.website].filter(Boolean).join(" · ");

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.name}>{personalInfo.fullName || "YOUR NAME"}</Text>
        <View style={styles.contactRow}>
          {contact && <Text>{contact}</Text>}
          {personalInfo.location && <Text>{personalInfo.location}</Text>}
        </View>

        <View style={styles.thickDivider} />

        {(personalInfo.jobTitle || summary) && (
          <View>
            <Text style={styles.sectionTitle}>{personalInfo.jobTitle || "Professional Summary"}</Text>
            {summary && <Text style={styles.summary}>{summary}</Text>}
          </View>
        )}

        {skillsList.length > 0 && (
          <View>
            <View style={styles.thinDivider} />
            <Text style={styles.sectionTitle}>Strengths and Expertise</Text>
            <View style={styles.skillsGrid}>
              {skillsList.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {experience.length > 0 && (
          <View>
            <View style={styles.thinDivider} />
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((exp) => {
              const bullets = exp.description?.split("\n").filter(Boolean) || [];
              return (
                <View key={exp.id} style={styles.expBlock} wrap={false}>
                  <View style={styles.expHeader}>
                    <View style={styles.expLeft}>
                      <Text style={styles.expCompany}>{exp.company}</Text>
                      <Text style={styles.expPosition}>{exp.position}</Text>
                    </View>
                    <Text style={styles.expDate}>{exp.startDate} - {exp.currentJob ? "Present" : exp.endDate}</Text>
                  </View>
                  {bullets.map((line, i) => (
                    <View key={i} style={styles.bulletRow}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{line}</Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        )}

        {education.length > 0 && (
          <View>
            <View style={styles.thinDivider} />
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.eduBlock} wrap={false}>
                <Text style={styles.eduSchool}>{edu.school}</Text>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}

        {languages && (
          <View>
            <View style={styles.thinDivider} />
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.smallText}>{languages}</Text>
          </View>
        )}

        {certifications && (
          <View>
            <View style={styles.thinDivider} />
            <Text style={styles.sectionTitle}>Certifications</Text>
            <Text style={styles.smallText}>{certifications}</Text>
          </View>
        )}

        <View style={styles.thinDivider} />
        <Text style={styles.refText}>References are available on request.</Text>
      </Page>
    </Document>
  );
};

export default CorporateClassicPDF;
