"use client";

import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SavedIndicatorProps {
  visible: boolean;
}

export function SavedIndicator({ visible }: SavedIndicatorProps) {
  const { t } = useLanguage();

  return (
    <div aria-live="polite" aria-atomic="true" className="flex items-center gap-1.5 text-sm">
      {visible && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 font-medium text-green-700 transition-opacity duration-200">
          <CheckCircle className="h-4 w-4" />
          {t("common.saved")}
        </span>
      )}
    </div>
  );
}
