import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/resumeTypes";
import { PdfEmailIcon, PdfPhoneIcon, PdfLocationIcon, PdfWebsiteIcon, PdfLinkedinIcon } from "./PdfIcons";

const navy = "#1a2e50";

const styles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", fontSize: 11 },
  sidebar: { width: "35%", backgroundColor: navy, padding: 28, color: "#ffffff" },
  main: { width: "65%", padding: 36 },
  name: { fontSize: 20, fontFamily: "Helvetica-Bold", color: "#ffffff", marginBottom: 3 },
  jobTitle: { fontSize: 11, color: "#ffffff", opacity: 0.7, marginBottom: 24 },
  sidebarSection: { marginBottom: 20 },
  sidebarTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 3, color: "#ffffff", opacity: 0.5, marginBottom: 10 },
  contactItem: { fontSize: 9, color: "#ffffff", opacity: 0.85, marginBottom: 7, flexDirection: "row", alignItems: "center", gap: 5 },
  skillItem: { fontSize: 9, color: "#ffffff", opacity: 0.85, marginBottom: 5, paddingLeft: 10 },
  skillDot: { position: "absolute", left: 0, top: 4, width: 4, height: 4, borderRadius: 2, backgroundColor: "#ffffff", opacity: 0.4 },
  sidebarSmall: { fontSize: 9.5, color: "#ffffff", opacity: 0.85, lineHeight: 1.5 },
  mainSection: { marginBottom: 22 },
  sectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 3, color: "#9ca3af", marginBottom: 10 },
  summaryText: { fontSize: 10.5, color: "#4b5563", lineHeight: 1.55 },
  expItem: { marginBottom: 14 },
  expRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  expPosition: { fontSize: 12, fontFamily: "Helvetica-Bold", color: navy },
  expCompany: { fontSize: 9.5, color: "#6b7280", marginTop: 2 },
  expDate: { fontSize: 8.5, color: "#9ca3af" },
  bulletRow: { flexDirection: "row", paddingLeft: 8, marginTop: 3 },
  bulletDot: { fontSize: 10, color: "#d1d5db", marginRight: 6 },
  bulletText: { fontSize: 10, color: "#4b5563", flex: 1, lineHeight: 1.5 },
});

interface Props { data: ResumeData }

const SidebarProfessionalPDF = ({ data }: Props) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;
  const skillsList = skills.split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.sidebar}>
          <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personalInfo.jobTitle || "Job Title"}</Text>

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {personalInfo.email && <View style={styles.contactItem}><PdfEmailIcon size={9} color="#ffffff" /><Text>{personalInfo.email}</Text></View>}
            {personalInfo.phone && <View style={styles.contactItem}><PdfPhoneIcon size={9} color="#ffffff" /><Text>{personalInfo.phone}</Text></View>}
            {personalInfo.location && <View style={styles.contactItem}><PdfLocationIcon size={9} color="#ffffff" /><Text>{personalInfo.location}</Text></View>}
            {personalInfo.website && <View style={styles.contactItem}><PdfWebsiteIcon size={9} color="#ffffff" /><Text>{personalInfo.website}</Text></View>}
            {personalInfo.linkedin && <View style={styles.contactItem}><PdfLinkedinIcon size={9} color="#ffffff" /><Text>{personalInfo.linkedin}</Text></View>}
          </View>

          {skillsList.length > 0 ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {skillsList.map((skill, i) => (
                <View key={i} style={{ position: "relative" }}>
                  <View style={styles.skillDot} />
                  <Text style={styles.skillItem}>{skill}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {languages ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Languages</Text>
              <Text style={styles.sidebarSmall}>{languages}</Text>
            </View>
          ) : null}

          {certifications ? (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>Certifications</Text>
              <Text style={styles.sidebarSmall}>{certifications}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.main}>
          {summary ? (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.summaryText}>{summary}</Text>
            </View>
          ) : null}

          {experience.length > 0 ? (
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp) => (
                <View key={exp.id} style={styles.expItem} wrap={false}>
                  <View style={styles.expRow}>
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
            <View style={styles.mainSection}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 12 }} wrap={false}>
                  <View style={styles.expRow}>
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
        </View>
      </Page>
    </Document>
  );
};

export default SidebarProfessionalPDF;
