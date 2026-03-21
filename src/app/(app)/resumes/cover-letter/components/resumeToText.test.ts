import { describe, it, expect } from "vitest";
import { resumeToText } from "./resumeToText";
import type { Resume } from "@/types/resume";

function makeResume(overrides: Partial<Resume["content"]> = {}): Resume {
  return {
    id: "test-1",
    title: "Test Resume",
    template: "chronological",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    content: {
      contactInfo: { name: "", phone: "", email: "" },
      profileOverview: "",
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      ...overrides,
    },
  };
}

describe("resumeToText", () => {
  it("returns name on first line when contactInfo.name is set", () => {
    const resume = makeResume({ contactInfo: { name: "Jane Doe", phone: "", email: "" } });
    const text = resumeToText(resume);
    expect(text.split("\n")[0]).toBe("Jane Doe");
  });

  it("returns contact parts joined with ' | '", () => {
    const resume = makeResume({
      contactInfo: { name: "Jane Doe", phone: "555-1234", email: "jane@example.com", linkedin: "linkedin.com/in/jane" },
    });
    const text = resumeToText(resume);
    expect(text).toContain("555-1234 | jane@example.com | linkedin.com/in/jane");
  });

  it("includes PROFILE section when profileOverview is set", () => {
    const resume = makeResume({ profileOverview: "Experienced developer." });
    const text = resumeToText(resume);
    expect(text).toContain("PROFILE");
    expect(text).toContain("Experienced developer.");
  });

  it("includes EXPERIENCE section with title, company, dates, location, and bullets", () => {
    const resume = makeResume({
      experience: [
        {
          title: "Software Engineer",
          company: "Acme Corp",
          dates: "2020-2023",
          location: "San Francisco, CA",
          bullets: ["Built APIs", "Led team of 5"],
        },
      ],
    });
    const text = resumeToText(resume);
    expect(text).toContain("EXPERIENCE");
    expect(text).toContain("Software Engineer | Acme Corp — 2020-2023");
    expect(text).toContain("San Francisco, CA");
    expect(text).toContain("• Built APIs");
    expect(text).toContain("• Led team of 5");
  });

  it("includes EDUCATION section with school, degree, dates", () => {
    const resume = makeResume({
      education: [
        { school: "MIT", degree: "BS Computer Science", dates: "2016-2020", location: "Cambridge, MA" },
      ],
    });
    const text = resumeToText(resume);
    expect(text).toContain("EDUCATION");
    expect(text).toContain("MIT — BS Computer Science (2016-2020)");
  });

  it("includes SKILLS section as comma-separated list", () => {
    const resume = makeResume({ skills: ["TypeScript", "React", "Node.js"] });
    const text = resumeToText(resume);
    expect(text).toContain("SKILLS");
    expect(text).toContain("TypeScript, React, Node.js");
  });

  it("returns empty-ish string for a resume with no content", () => {
    const resume = makeResume();
    const text = resumeToText(resume);
    expect(text.trim()).toBe("");
  });

  it("handles multiple experience entries", () => {
    const resume = makeResume({
      experience: [
        { title: "Engineer", company: "A", dates: "2022-2023", location: "", bullets: ["Task A"] },
        { title: "Intern", company: "B", dates: "2021-2022", location: "", bullets: ["Task B"] },
      ],
    });
    const text = resumeToText(resume);
    expect(text).toContain("Engineer | A — 2022-2023");
    expect(text).toContain("Intern | B — 2021-2022");
    expect(text).toContain("• Task A");
    expect(text).toContain("• Task B");
  });

  it("filters out empty bullets", () => {
    const resume = makeResume({
      experience: [
        { title: "Dev", company: "Co", dates: "2023", location: "", bullets: ["Real bullet", "", "  ", "Another"] },
      ],
    });
    const text = resumeToText(resume);
    // The filter(Boolean) removes empty strings; whitespace-only strings pass Boolean but that's current behavior
    expect(text).not.toContain("• \n");
    expect(text).toContain("• Real bullet");
    expect(text).toContain("• Another");
    // Empty string "" is filtered out by Boolean
    const bulletLines = text.split("\n").filter((l) => l.startsWith("•"));
    // "" is falsy so filtered, "  " is truthy so kept, plus "Real bullet" and "Another" = 3
    expect(bulletLines.length).toBe(3);
  });
});
