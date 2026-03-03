import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/resumeTypes";
import { HEADING_FONT, BODY_FONT } from "./pdfFonts";
import { PdfPhoneIcon, PdfLocationIcon, PdfEmailIcon } from "./PdfIcons";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 18,
  },
  border: {
    border: "1pt solid #2d2d2d",
    padding: "44pt 44pt 36pt 44pt",
    flex: 1,
  },
  // Header
  nameBlock: {
    textAlign: "center",
    marginBottom: 2,
  },
  name: {
    fontSize: 34,
    fontFamily: HEADING_FONT,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#1a1a1a",
  },
  jobTitle: {
    fontSize: 13,
    fontFamily: BODY_FONT,
    textTransform: "uppercase",
    letterSpacing: 5,
    color: "#555555",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 16,
  },
  dividerThick: {
    borderTopWidth: 2,
    borderTopColor: "#2d2d2d",
  },
  dividerThin: {
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
  },
  // Contact row
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 28,
    paddingVertical: 8,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  contactText: {
    fontSize: 10,
    fontFamily: BODY_FONT,
    color: "#333333",
  },
  // Sections
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: HEADING_FONT,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  sectionDivider: {
    borderTopWidth: 2,
    borderTopColor: "#2d2d2d",
    marginBottom: 10,
  },
  // About
  aboutText: {
    fontSize: 10.5,
    fontFamily: BODY_FONT,
    color: "#404040",
    lineHeight: 1.65,
    textAlign: "justify",
  },
  // Two-column row
  entryRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  entryLeft: {
    width: "28%",
    paddingRight: 12,
  },
  entryRight: {
    width: "72%",
  },
  entryDate: {
    fontSize: 10.5,
    fontFamily: HEADING_FONT,
    fontWeight: 700,
    color: "#1a1a1a",
  },
  entrySubtitle: {
    fontSize: 10,
    fontFamily: BODY_FONT,
    color: "#555555",
    marginTop: 2,
  },
  entryTitle: {
    fontSize: 10.5,
    fontFamily: HEADING_FONT,
    fontWeight: 700,
    color: "#1a1a1a",
  },
  entryDesc: {
    fontSize: 10,
    fontFamily: BODY_FONT,
    color: "#555555",
    lineHeight: 1.6,
    marginTop: 3,
  },
  // Skills grid
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillItem: {
    width: "25%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
    marginBottom: 6,
  },
  skillBullet: {
    fontSize: 10,
    color: "#333333",
  },
  skillText: {
    fontSize: 10,
    fontFamily: BODY_FONT,
    color: "#404040",
  },
});

interface Props {
  data: ResumeData;
}

const ClassicBorderedPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const skillsList = skills ? skills.split(",").map((s) => s.trim()).filter(Boolean) : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.border}>
          {/* Name */}
          <View style={styles.nameBlock}>
            <Text style={styles.name}>{personalInfo.fullName || "YOUR NAME"}</Text>
          </View>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle || "JOB TITLE"}</Text>

          {/* Divider */}
          <View style={styles.dividerThick} />

          {/* Contact row */}
          <View style={styles.contactRow}>
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <PdfPhoneIcon size={9} color="#2d2d2d" />
                <Text style={styles.contactText}>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <PdfLocationIcon size={9} color="#2d2d2d" />
                <Text style={styles.contactText}>{personalInfo.location}</Text>
              </View>
            )}
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <PdfEmailIcon size={9} color="#2d2d2d" />
                <Text style={styles.contactText}>{personalInfo.email}</Text>
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.dividerThick} />

          {/* ABOUT ME */}
          {summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>ABOUT ME</Text>
              <View style={styles.sectionDivider} />
              <Text style={styles.aboutText}>{summary}</Text>
            </View>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              <View style={styles.sectionDivider} />
              {education.map((edu) => (
                <View key={edu.id} style={styles.entryRow} wrap={false}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryDate}>{edu.startDate} - {edu.endDate}</Text>
                    <Text style={styles.entrySubtitle}>{edu.school}</Text>
                  </View>
                  <View style={styles.entryRight}>
                    <Text style={styles.entryTitle}>{edu.degree}</Text>
                    {edu.location && <Text style={styles.entryDesc}>{edu.location}</Text>}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>EXPERIENCE</Text>
              <View style={styles.sectionDivider} />
              {experience.map((exp) => (
                <View key={exp.id} style={styles.entryRow} wrap={false}>
                  <View style={styles.entryLeft}>
                    <Text style={styles.entryDate}>{exp.startDate} - {exp.currentJob ? "NOW" : exp.endDate}</Text>
                    <Text style={styles.entrySubtitle}>{exp.company}</Text>
                  </View>
                  <View style={styles.entryRight}>
                    <Text style={styles.entryTitle}>{exp.position}</Text>
                    {exp.description && (
                      <Text style={styles.entryDesc}>
                        {exp.description.split("\n").filter(Boolean).map(l => l.replace(/^[-•]\s*/, "")).join(". ")}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* SKILLS */}
          {skillsList.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>SKILLS</Text>
              <View style={styles.sectionDivider} />
              <View style={styles.skillsGrid}>
                {skillsList.map((skill, i) => (
                  <View key={i} style={styles.skillItem}>
                    <Text style={styles.skillBullet}>•</Text>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ClassicBorderedPDF;
