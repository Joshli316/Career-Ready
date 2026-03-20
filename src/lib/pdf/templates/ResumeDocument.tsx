import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { Resume } from "@/types/resume";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  contactLine: {
    fontSize: 9,
    color: "#616161",
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#7AB648",
    paddingBottom: 3,
    marginTop: 14,
    marginBottom: 6,
  },
  profileText: {
    fontSize: 10,
    color: "#424242",
    marginBottom: 4,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  expTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  expDates: {
    fontSize: 9,
    color: "#757575",
  },
  expLocation: {
    fontSize: 9,
    color: "#757575",
    marginBottom: 3,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  eduSchool: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
  },
  eduDegree: {
    fontSize: 10,
    color: "#616161",
  },
  skillsText: {
    fontSize: 10,
    color: "#424242",
  },
  expBlock: {
    marginBottom: 8,
  },
});

interface Props {
  resume: Resume;
}

export function ResumeDocument({ resume }: Props) {
  const { content } = resume;
  const ci = content.contactInfo;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{ci.name || "Your Name"}</Text>
          <Text style={styles.contactLine}>
            {[ci.phone, ci.email, ci.linkedin].filter(Boolean).join("  |  ")}
          </Text>
        </View>

        {/* Profile */}
        {content.profileOverview ? (
          <View>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.profileText}>{content.profileOverview}</Text>
          </View>
        ) : null}

        {/* Experience */}
        {content.experience.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Experience</Text>
            {content.experience.map((exp, i) => (
              <View key={i} style={styles.expBlock}>
                <View style={styles.expHeader}>
                  <Text style={styles.expTitle}>
                    {exp.title}
                    {exp.company ? ` | ${exp.company}` : ""}
                  </Text>
                  <Text style={styles.expDates}>{exp.dates}</Text>
                </View>
                {exp.location ? (
                  <Text style={styles.expLocation}>{exp.location}</Text>
                ) : null}
                {exp.bullets
                  .filter((b) => b.trim())
                  .map((bullet, j) => (
                    <View key={j} style={styles.bullet}>
                      <Text style={styles.bulletDot}>{"\u2022"}</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
              </View>
            ))}
          </View>
        ) : null}

        {/* Education */}
        {content.education.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Education</Text>
            {content.education.map((edu, i) => (
              <View key={i} style={styles.eduRow}>
                <View>
                  <Text style={styles.eduSchool}>{edu.school}</Text>
                  {edu.degree ? (
                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                  ) : null}
                </View>
                <Text style={styles.expDates}>{edu.dates}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Skills */}
        {content.skills.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsText}>
              {content.skills.join("  |  ")}
            </Text>
          </View>
        ) : null}

        {/* Certifications */}
        {content.certifications.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <Text style={styles.skillsText}>
              {content.certifications.join("  |  ")}
            </Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
