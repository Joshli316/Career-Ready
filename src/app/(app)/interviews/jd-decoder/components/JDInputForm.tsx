"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useToast } from "@/components/ui/Toast";
import { Trash2, Upload } from "lucide-react";
import { extractTextFromFile } from "@/lib/extractTextFromFile";
import type { JDAnalysis } from "../types";

interface JDInputFormProps {
  savedAnalyses: JDAnalysis[];
  onDecode: (jd: string) => void;
  onSelectAnalysis: (analysis: JDAnalysis) => void;
  onDeleteAnalysis: (id: string) => void;
  loading: boolean;
}

export function JDInputForm({
  savedAnalyses,
  onDecode,
  onSelectAnalysis,
  onDeleteAnalysis,
  loading,
}: JDInputFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [jdText, setJdText] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const text = await extractTextFromFile(file);
      setJdText(text);
      toast(t("resumes.aiCoverLetter.fileLoaded").replace("{name}", file.name), "success");
    } catch {
      toast(t("resumes.aiCoverLetter.fileError"), "error");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      {savedAnalyses.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-medium uppercase text-neutral-500">{t("interviews.jdDecoder.savedAnalyses")}</h3>
          <div className="flex flex-wrap gap-2">
            {savedAnalyses.map((a) => (
              <div key={a.id} className="group flex items-center gap-1">
                <button
                  onClick={() => onSelectAnalysis(a)}
                  className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600"
                >
                  {a.jobTitle || t("common.untitled")}{a.company ? ` — ${a.company}` : ""}
                </button>
                <button
                  onClick={() => setDeleteId(a.id)}
                  className="rounded p-2 text-neutral-300 hover:text-red-500"
                  aria-label={`${t("common.delete")} ${a.jobTitle || t("common.untitled")}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div>
        <div className="mb-1.5 flex justify-end">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1 text-xs font-medium text-ai-accent hover:text-purple-700 transition-colors disabled:opacity-50"
          >
            <Upload className="h-3.5 w-3.5" />
            {uploading ? t("resumes.aiCoverLetter.uploading") : t("resumes.aiCoverLetter.uploadFile")}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.txt,.text"
            onChange={handleFileUpload}
            className="hidden"
            aria-label={t("resumes.aiCoverLetter.uploadJd")}
          />
        </div>
        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder={t("interviews.jdDecoder.inputPlaceholder")}
          rows={8}
          maxLength={15000}
          className="w-full min-h-[120px] rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-700 placeholder:text-neutral-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 resize-y"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-400">{jdText.length.toLocaleString()} / 15,000</span>
        <Button
          variant="ai"
          onClick={() => onDecode(jdText)}
          disabled={loading || jdText.trim().length < 50}
        >
          {loading ? t("interviews.jdDecoder.analyzing") : t("interviews.jdDecoder.analyzeButton")}
        </Button>
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        title={t("interviews.jdDecoder.deleteAnalysisTitle")}
        message={t("interviews.jdDecoder.deleteAnalysisConfirm")}
        onConfirm={() => {
          if (deleteId) onDeleteAnalysis(deleteId);
          setDeleteId(null);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
