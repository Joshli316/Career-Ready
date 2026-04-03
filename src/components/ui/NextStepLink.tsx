"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface NextStepLinkProps {
  href: string;
  labelKey: string;
}

export function NextStepLink({ href, labelKey }: NextStepLinkProps) {
  const { t } = useLanguage();

  return (
    <div className="mt-8 flex justify-end border-t border-neutral-150 pt-6">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-lg bg-primary-50 px-5 py-3 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
      >
        {t("common.nextStep")}: {t(labelKey)}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
