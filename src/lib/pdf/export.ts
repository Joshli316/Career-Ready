"use client";

import { pdf } from "@react-pdf/renderer";
import { createElement } from "react";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportPdf(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ReactElement<any>,
  filename: string
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blob = await pdf(component as any).toBlob();
  downloadBlob(blob, filename);
}
