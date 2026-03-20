"use client";

import { useCallback, useState } from "react";
import type { Resume, CoverLetter } from "@/types/resume";

export function usePdfExport() {
  const [exporting, setExporting] = useState(false);

  const exportResume = useCallback(async (resume: Resume) => {
    setExporting(true);
    try {
      const { exportPdf } = await import("@/lib/pdf/export");
      const { ResumeDocument } = await import(
        "@/lib/pdf/templates/ResumeDocument"
      );
      const { createElement } = await import("react");
      await exportPdf(
        createElement(ResumeDocument, { resume }),
        `${resume.title || "Resume"}.pdf`
      );
    } finally {
      setExporting(false);
    }
  }, []);

  const exportCoverLetter = useCallback(
    async (
      letter: CoverLetter,
      sender?: { name?: string; phone?: string; email?: string }
    ) => {
      setExporting(true);
      try {
        const { exportPdf } = await import("@/lib/pdf/export");
        const { CoverLetterDocument } = await import(
          "@/lib/pdf/templates/CoverLetterDocument"
        );
        const { createElement } = await import("react");
        await exportPdf(
          createElement(CoverLetterDocument, {
            letter,
            senderName: sender?.name,
            senderPhone: sender?.phone,
            senderEmail: sender?.email,
          }),
          `Cover Letter - ${letter.title || "Untitled"}.pdf`
        );
      } finally {
        setExporting(false);
      }
    },
    []
  );

  const exportThankYou = useCallback(
    async (data: {
      interviewer: string;
      company: string;
      position: string;
      body: string;
      senderName?: string;
      senderPhone?: string;
      senderEmail?: string;
    }) => {
      setExporting(true);
      try {
        const { exportPdf } = await import("@/lib/pdf/export");
        const { ThankYouDocument } = await import(
          "@/lib/pdf/templates/ThankYouDocument"
        );
        const { createElement } = await import("react");
        await exportPdf(
          createElement(ThankYouDocument, data),
          `Thank You - ${data.company || "Note"}.pdf`
        );
      } finally {
        setExporting(false);
      }
    },
    []
  );

  return { exportResume, exportCoverLetter, exportThankYou, exporting };
}
