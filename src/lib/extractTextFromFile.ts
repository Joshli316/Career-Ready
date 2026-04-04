export async function extractTextFromFile(file: File): Promise<string> {
  if (file.name.endsWith(".pdf")) {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const pages: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .filter((item): item is Extract<typeof item, { str: string }> => "str" in item)
        .map((item) => item.str)
        .join(" ");
      pages.push(text);
    }
    return pages.join("\n\n");
  }

  // .txt or other text files
  return file.text();
}
