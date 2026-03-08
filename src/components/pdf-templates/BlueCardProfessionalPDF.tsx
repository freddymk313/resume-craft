import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/utils/resumeTypes";
import { PdfEmailIcon, PdfPhoneIcon, PdfLocationIcon, PdfWebsiteIcon } from "./PdfIcons";
import "./pdfFonts";

const BLUE = "#1e40af";

const s = StyleSheet.create({
  page: { padding: 28, fontFamily: "OpenSans", fontSize: 10.5, backgroundColor: "#ffffff" },
  row: { flexDirection: "row", gap: 8 },
  card: { borderWidth: 2, borderColor: BLUE, borderRadius: 10, padding: 12 },
  sectionTitle: { fontFamily: "Montserrat", fontWeight: 700, fontSize: 13, color: BLUE, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 },
  name: { fontFamily: "Montserrat", fontWeight: 700, fontSize: 28, color: BLUE, textTransform: "uppercase", lineHeight: 1.1 },
  jobTitle: { fontFamily: "Montserrat", fontWeight: 600, fontSize: 11, color: "#374151", textTransform: "uppercase", letterSpacing: 2, marginTop: 4 },
  contactRow: { flexDirection: "row", alignItems: "center", gap: 7, marginBottom: 5 },
  contactText: { fontSize: 9.5, color: "#374151" },
  subTitle: { fontFamily: "Montserrat", fontWeight: 700, fontSize: 11, color: "#111827", textTransform: "uppercase", marginBottom: 2 },
  blueSubTitle: { fontFamily: "Montserrat", fontWeight: 700, fontSize: 11, color: BLUE, textTransform: "uppercase", marginBottom: 2 },
  meta: { fontSize: 9.5, color: "#6b7280", marginTop: 1 },
  dateMeta: { fontSize: 9, color: "#9ca3af", marginTop: 1 },
  body: { fontSize: 10, color: "#374151", lineHeight: 1.5, marginTop: 3 },
  smallBody: { fontSize: 10, color: "#374151", marginBottom: 2 },
  initialsBox: { width: 90, height: 90, borderRadius: 8, backgroundColor: "#e5e7eb", justifyContent: "center", alignItems: "center" },
  initialsText: { fontFamily: "Montserrat", fontWeight: 700, fontSize: 24, color: BLUE },
  labelBold: { fontFamily: "Montserrat", fontWeight: 700, fontSize: 10, color: "#111827", textTransform: "uppercase", marginBottom: 3, marginTop: 6 },
});

const BlueCardProfessionalPDF = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, languages, certifications } = data;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={[s.row, { marginBottom: 8 }]}>
          {/* Photo */}
          <View style={[s.card, { justifyContent: "center", alignItems: "center" }]}>
            <View style={s.initialsBox}>
              <Text style={s.initialsText}>
                {personalInfo.firstName?.[0] || ""}{personalInfo.lastName?.[0] || ""}
              </Text>
            </View>
          </View>

          {/* Name */}
          <View style={[s.card, { flex: 1, justifyContent: "center" }]}>
            <Text style={s.name}>
              {personalInfo.firstName || "PRÉNOM"}{"\n"}{personalInfo.lastName || "NOM"}
            </Text>
            <Text style={s.jobTitle}>{personalInfo.jobTitle || "Titre du poste"}</Text>
          </View>

          {/* Contact */}
          <View style={[s.card, { justifyContent: "center" }]}>
            {personalInfo.email && (
              <View style={s.contactRow}>
                <PdfEmailIcon color={BLUE} size={10} />
                <Text style={s.contactText}>{personalInfo.email}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={s.contactRow}>
                <PdfPhoneIcon color={BLUE} size={10} />
                <Text style={s.contactText}>{personalInfo.phone}</Text>
              </View>
            )}
            {personalInfo.website && (
              <View style={s.contactRow}>
                <PdfWebsiteIcon color={BLUE} size={10} />
                <Text style={s.contactText}>{personalInfo.website}</Text>
              </View>
            )}
            {personalInfo.location && (
              <View style={s.contactRow}>
                <PdfLocationIcon color={BLUE} size={10} />
                <Text style={s.contactText}>{personalInfo.location}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Summary */}
        {summary ? (
          <View style={[s.card, { marginBottom: 8 }]}>
            <Text style={s.sectionTitle}>À Propos</Text>
            <Text style={s.body}>{summary}</Text>
          </View>
        ) : null}

        {/* Two Column */}
        <View style={[s.row, { marginBottom: 8 }]}>
          {/* Left */}
          <View style={{ width: "38%", gap: 8 }}>
            {education.length > 0 && (
              <View style={s.card}>
                <Text style={s.sectionTitle}>Formation</Text>
                {education.map((edu) => (
                  <View key={edu.id} style={{ marginBottom: 6 }} wrap={false}>
                    <Text style={s.subTitle}>{edu.degree}</Text>
                    <Text style={s.meta}>{edu.school}</Text>
                    <Text style={s.dateMeta}>{edu.startDate} - {edu.endDate}</Text>
                  </View>
                ))}
              </View>
            )}
            {skills.length > 0 && (
              <View style={s.card}>
                <Text style={s.sectionTitle}>Compétences</Text>
                <Text style={s.labelBold}>Logiciels Maîtrisés</Text>
                {skills.map((skill, i) => (
                  <Text key={i} style={s.smallBody}>{skill}</Text>
                ))}
                {languages.length > 0 && (
                  <>
                    <Text style={s.labelBold}>Langues Parlées</Text>
                    {languages.map((lang, i) => (
                      <Text key={i} style={s.smallBody}>{lang}</Text>
                    ))}
                  </>
                )}
              </View>
            )}
          </View>

          {/* Right — Expérience */}
          <View style={{ width: "62%" }}>
            {experience.length > 0 && (
              <View style={[s.card, { height: "100%" }]}>
                <Text style={s.sectionTitle}>Expérience</Text>
                {experience.map((exp) => (
                  <View key={exp.id} style={{ marginBottom: 8 }} wrap={false}>
                    <Text style={s.blueSubTitle}>{exp.position}</Text>
                    <Text style={s.meta}>
                      {exp.company}{exp.location ? `, ${exp.location}` : ""} | {exp.startDate} - {exp.currentJob ? "Présent" : exp.endDate}
                    </Text>
                    {exp.description ? (
                      <Text style={s.body}>
                        {exp.description.split("\n").filter(Boolean).join(" ")}
                      </Text>
                    ) : null}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Bottom */}
        {certifications.length > 0 && (
          <View style={[s.row]}>
            <View style={[s.card, { flex: 1 }]}>
              <Text style={s.sectionTitle}>Expertise</Text>
              {certifications.map((cert, i) => (
                <Text key={i} style={s.smallBody}>{cert}</Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default BlueCardProfessionalPDF;
