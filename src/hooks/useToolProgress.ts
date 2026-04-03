"use client";

import { useEffect, useState } from "react";

const PREFIX = "careerready_";

function getRaw(key: string): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(`${PREFIX}${key}`);
}

function hasProfileField(profile: Record<string, unknown> | null, field: string): boolean {
  if (!profile) return false;
  const val = profile[field];
  if (val === undefined || val === null || val === "") return false;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "object") return Object.keys(val as object).length > 0;
  return true;
}

export interface ToolProgress {
  /** Map of tool href -> whether the user has started it */
  started: Record<string, boolean>;
  /** Number of tools started */
  count: number;
  /** Total tools */
  total: number;
}

export function useToolProgress(): ToolProgress {
  const [started, setStarted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function check() {
      let profile: Record<string, unknown> | null = null;
      try {
        const raw = getRaw("profile");
        if (raw) profile = JSON.parse(raw);
      } catch { /* ignore */ }

      const resumes = getRaw("resumes");
      const interviews = getRaw("interviews");
      const contacts = getRaw("contacts");

      const result: Record<string, boolean> = {
        "/know-yourself": hasProfileField(profile, "skills") || hasProfileField(profile, "brandStatement"),
        "/applications": hasProfileField(profile, "masterApp"),
        "/resumes": !!resumes && resumes !== "[]",
        "/interviews": !!interviews && interviews !== "null",
        "/job-search": hasProfileField(profile, "networkContacts") || hasProfileField(profile, "jobSearchChecklist"),
        "/social-media": hasProfileField(profile, "socialAudit"),
        "/landing-the-job": hasProfileField(profile, "selfEvaluation"),
        "/contact-log": !!contacts && contacts !== "[]",
      };

      setStarted(result);
    }

    check();
    // Re-check when storage changes (from other tabs or after saves)
    window.addEventListener("storage", check);
    // Also poll lightly for same-tab updates
    const interval = setInterval(check, 3000);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(interval);
    };
  }, []);

  const count = Object.values(started).filter(Boolean).length;
  return { started, count, total: 8 };
}
