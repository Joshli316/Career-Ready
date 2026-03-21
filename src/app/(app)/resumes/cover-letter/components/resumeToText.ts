import type { Resume } from "@/types/resume";

export function resumeToText(resume: Resume): string {
  const c = resume.content;
  const lines: string[] = [];

  if (c.contactInfo.name) lines.push(c.contactInfo.name);
  const contactParts = [c.contactInfo.phone, c.contactInfo.email, c.contactInfo.linkedin].filter(Boolean);
  if (contactParts.length) lines.push(contactParts.join(" | "));

  if (c.profileOverview) {
    lines.push("", "PROFILE", c.profileOverview);
  }

  if (c.experience.length > 0) {
    lines.push("", "EXPERIENCE");
    for (const exp of c.experience) {
      const header = [exp.title, exp.company].filter(Boolean).join(" | ");
      if (header) lines.push(`${header} — ${exp.dates}`);
      if (exp.location) lines.push(exp.location);
      for (const b of exp.bullets.filter(Boolean)) {
        lines.push(`• ${b}`);
      }
    }
  }

  if (c.education.length > 0) {
    lines.push("", "EDUCATION");
    for (const edu of c.education) {
      lines.push(`${edu.school} — ${edu.degree} (${edu.dates})`);
    }
  }

  if (c.skills.length > 0) {
    lines.push("", "SKILLS", c.skills.join(", "));
  }

  return lines.join("\n");
}
