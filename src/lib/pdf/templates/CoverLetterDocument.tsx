import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { CoverLetter } from "@/types/resume";

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
  recipient: {
    marginBottom: 20,
  },
  recipientLine: {
    fontSize: 11,
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
  letter: CoverLetter;
  senderName?: string;
  senderPhone?: string;
  senderEmail?: string;
}

export function CoverLetterDocument({
  letter,
  senderName,
  senderPhone,
  senderEmail,
}: Props) {
  const c = letter.content;
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.date}>{today}</Text>

        <View style={styles.recipient}>
          {c.recipientName ? (
            <Text style={styles.recipientLine}>{c.recipientName}</Text>
          ) : null}
          {c.recipientTitle ? (
            <Text style={styles.recipientLine}>{c.recipientTitle}</Text>
          ) : null}
          {c.company ? (
            <Text style={styles.recipientLine}>{c.company}</Text>
          ) : null}
          {c.address ? (
            <Text style={styles.recipientLine}>{c.address}</Text>
          ) : null}
        </View>

        <Text style={styles.greeting}>
          Dear {c.recipientName || "Hiring Manager"},
        </Text>

        {c.opening ? <Text style={styles.paragraph}>{c.opening}</Text> : null}
        {c.body ? <Text style={styles.paragraph}>{c.body}</Text> : null}
        {c.closing ? <Text style={styles.paragraph}>{c.closing}</Text> : null}

        <Text style={styles.closing}>Sincerely,</Text>
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
