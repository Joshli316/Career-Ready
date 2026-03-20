import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    lineHeight: 1.6,
  },
  date: {
    marginBottom: 20,
    color: "#616161",
  },
  greeting: {
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: "justify",
  },
  closing: {
    marginTop: 20,
  },
  signature: {
    marginTop: 24,
    fontFamily: "Helvetica-Bold",
  },
});

interface Props {
  interviewer: string;
  company: string;
  position: string;
  body: string;
  senderName?: string;
  senderPhone?: string;
  senderEmail?: string;
}

export function ThankYouDocument({
  interviewer,
  company,
  position,
  body,
  senderName,
  senderPhone,
  senderEmail,
}: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.date}>{today}</Text>
        <Text style={styles.greeting}>
          Dear {interviewer || "Hiring Manager"},
        </Text>
        <Text style={styles.paragraph}>
          Thank you for meeting with me today. It was a pleasure to learn more
          about the {position || "position"} role and the team at{" "}
          {company || "your company"}.
        </Text>
        {body ? <Text style={styles.paragraph}>{body}</Text> : null}
        <Text style={styles.paragraph}>
          Please do not hesitate to contact me if I can provide additional
          information. I look forward to hearing from you about the next steps
          in the hiring process.
        </Text>
        <Text style={styles.closing}>Best Regards,</Text>
        <Text style={styles.signature}>
          {senderName || "[Your Name]"}
        </Text>
        {senderPhone ? (
          <Text style={{ fontSize: 10, color: "#616161" }}>
            {senderPhone}
          </Text>
        ) : null}
        {senderEmail ? (
          <Text style={{ fontSize: 10, color: "#616161" }}>
            {senderEmail}
          </Text>
        ) : null}
      </Page>
    </Document>
  );
}
