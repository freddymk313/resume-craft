import { Document, Page, View, Text, StyleSheet, Circle, Svg } from "@react-pdf/renderer";
import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { PdfEmailIcon, PdfPhoneIcon, PdfLocationIcon, PdfWebsiteIcon } from "./PdfIcons";
import { HEADING_FONT, BODY_FONT } from "./pdfFonts";

const dark = "#1a1a1a";

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: BODY_FONT, fontSize: 11 },
  sidebar: { width: "33%", backgroundColor: dark, padding: 24, color: "#ffffff" },
  main: { width: "67%", padding: 32, paddingTop: 40, backgroundColor: "#ffffff" },
  // Sidebar
  avatarContainer: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#444444", alignItems: "center", justifyContent: "center" },
  avatarText: { fontSize: 28, fontFamily: HEADING_FONT, fontWeight: 700, color: "#ffffff" },
  sidebarSectionTitle: { fontSize: 10, fontFamily: HEADING_FONT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#ffffff", marginBottom: 10 },
  sidebarSection: { marginBottom: 18 },
  contactItem: { fontSize: 9.5, color: "#ffffff", opacity: 0.9, marginBottom: 6, flexDirection: "row", alignItems: "center", gap: 5 },
  sidebarItem: { fontSize: 9.5, color: "#ffffff", opacity: 0.9, marginBottom: 4 },
  // Main
  nameText: { fontSize: 36, fontFamily: HEADING_FONT, fontWeight: 700, textTransform: "uppercase", color: dark, lineHeight: 1.05, letterSpacing: -0.5 },
  jobTitle: { fontSize: 11, fontFamily: HEADING_FONT, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: "#555555", marginTop: 6, marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontFamily: HEADING_FONT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: dark, marginBottom: 12 },
  mainSection: { marginBottom: 20 },
  // Timeline
  timelineEntry: { flexDirection: "row", marginBottom: 14 },
  timelineDotCol: { width: 16, alignItems: "center", paddingTop: 3 },
  timelineLine: { width: 2, backgroundColor: "#d1d5db", flexGrow: 1, marginTop: 2 },
  timelineContent: { flex: 1, paddingLeft: 6 },
  entryTitle: { fontSize: 11, fontFamily: HEADING_FONT, fontWeight: 700, textTransform: "uppercase", color: dark },
  entryMeta: { fontSize: 9, color: "#888888", marginTop: 2 },
  bulletRow: { flexDirection: "row", paddingLeft: 6, marginTop: 3 },
  bulletDot: { fontSize: 10, color: "#999999", marginRight: 4 },
  bulletText: { fontSize: 10, color: "#444444", flex: 1, lineHeight: 1.5 },
  summaryText: { fontSize: 10, color: "#444444", lineHeight: 1.6 },
});

interface Props { data: ResumeData }

const TimelineDot = () => (
  <Svg width={10} height={10}>
    <Circle cx={5} cy={5} r={5} fill={dark} />
  </Svg>
);

const ProfessionalDarkSidebarPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const initials = `${personalInfo.firstName?.[0] || ""}${personalInfo.lastName?.[0] || ""}`;

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </View>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Coordonnées</Text>
            {personalInfo.location && <View style={styles.contactItem}><PdfLocationIcon size={8} color="#ffffff" /><Text>{personalInfo.location}</Text></View>}
            {personalInfo.email && <View style={styles.contactItem}><PdfEmailIcon size={8} color="#ffffff" /><Text>{personalInfo.email}</Text></View>}
            {personalInfo.phone && <View style={styles.contactItem}><PdfPhoneIcon size={8} color="#ffffff" /><Text>{personalInfo.phone}</Text></View>}
            {personalInfo.website && <View style={styles.contactItem}><PdfWebsiteIcon size={8} color="#ffffff" /><Text>{personalInfo.website}</Text></View>}
          </View>

          {languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Langues</Text>
              {languages.map((lang, i) => <Text key={i} style={styles.sidebarItem}>{lang}</Text>)}
            </View>
          )}

          {skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Compétences</Text>
              {skills.map((skill, i) => <Text key={i} style={styles.sidebarItem}>{skill}</Text>)}
            </View>
          )}

          {certifications.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>Centres d'intérêts</Text>
              {certifications.map((c, i) => <Text key={i} style={styles.sidebarItem}>{c}</Text>)}
            </View>
          )}
        </View>

        {/* Main */}
        <View style={styles.main}>
          <Text style={styles.nameText}>{personalInfo.firstName || "Prénom"}{"\n"}{personalInfo.lastName || "Nom"}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle || "Titre du poste"}</Text>

          {experience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>Expériences professionnelles</Text>
              {experience.map((exp, idx) => (
                <View key={exp.id} style={styles.timelineEntry} wrap={false}>
                  <View style={styles.timelineDotCol}>
                    <TimelineDot />
                    {idx < experience.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.entryTitle}>{exp.position}</Text>
                    <Text style={styles.entryMeta}>
                      {exp.company}{exp.location ? `, ${exp.location}` : ""} | {exp.startDate} - {exp.currentJob ? "Présent" : exp.endDate}
                    </Text>
                    {exp.description?.split("\n").filter(Boolean).map((line, i) => (
                      <View key={i} style={styles.bulletRow}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {summary && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>Profil</Text>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          )}

          {education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>Formations</Text>
              {education.map((edu, idx) => (
                <View key={edu.id} style={styles.timelineEntry} wrap={false}>
                  <View style={styles.timelineDotCol}>
                    <TimelineDot />
                    {idx < education.length - 1 && <View style={styles.timelineLine} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.entryTitle}>{edu.degree}</Text>
                    <Text style={styles.entryMeta}>
                      {edu.school}{edu.location ? `, ${edu.location}` : ""} | {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default ProfessionalDarkSidebarPDF;
