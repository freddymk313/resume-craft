import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/resumeTypes";

const accent = "#e07548";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 10, color: "#1a1a1a" },
  header: { marginBottom: 16 },
  name: { fontSize: 28, fontFamily: "Helvetica-Bold", color: accent, letterSpacing: -0.5 },
  jobTitle: { fontSize: 12, color: "#374151", fontFamily: "Helvetica-Bold", marginTop: 2 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 },
  contactItem: { fontSize: 8, color: "#6b7280" },
  accentBar: { width: 48, height: 3, backgroundColor: accent, borderRadius: 2, marginBottom: 16 },
  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1, color: accent, marginBottom: 8 },
  sectionBlock: { marginBottom: 16 },
  summaryText: { fontSize: 9, color: "#4b5563", lineHeight: 1.6 },
  expItem: { marginBottom: 10, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: accent },
  expPosition: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#1f2937" },
  expRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 1 },
  expCompany: { fontSize: 8, color: "#6b7280", fontFamily: "Helvetica-Bold" },
  expDate: { fontSize: 7, color: "#9ca3af" },
  bulletRow: { flexDirection: "row", paddingLeft: 8, marginTop: 2 },
  bulletDot: { fontSize: 8, color: accent, marginRight: 4, marginTop: 1 },
  bulletText: { fontSize: 8, color: "#4b5563", flex: 1, lineHeight: 1.5 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  skillBadge: { fontSize: 8, backgroundColor: accent, color: "#ffffff", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  twoCol: { flexDirection: "row", gap: 24 },
  colHalf: { flex: 1 },
  smallText: { fontSize: 8, color: "#4b5563" },
});

interface Props {
  data: ResumeData;
}

const CreativeAccentPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle || "Job Title"}</Text>
          <View style={styles.contactRow}>
            {personalInfo.email && <Text style={styles.contactItem}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactItem}>{personalInfo.phone}</Text>}
            {personalInfo.location && <Text style={styles.contactItem}>{personalInfo.location}</Text>}
            {personalInfo.website && <Text style={styles.contactItem}>{personalInfo.website}</Text>}
            {personalInfo.linkedin && <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>}
          </View>
        </View>

        <View style={styles.accentBar} />

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
                <Text style={styles.expPosition}>{exp.position}</Text>
                <View style={styles.expRow}>
                  <Text style={styles.expCompany}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                  </Text>
                  <Text style={styles.expDate}>
                    {exp.startDate} — {exp.currentJob ? "Present" : exp.endDate}
                  </Text>
                </View>
                {exp.description
                  ? exp.description.split("\n").filter(Boolean).map((line, i) => (
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

        {education.length > 0 ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ ...styles.expItem, marginBottom: 8 }} wrap={false}>
                <Text style={styles.expPosition}>{edu.degree}</Text>
                <View style={styles.expRow}>
                  <Text style={styles.expCompany}>
                    {edu.school}{edu.location ? ` · ${edu.location}` : ""}
                  </Text>
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

export default CreativeAccentPDF;
