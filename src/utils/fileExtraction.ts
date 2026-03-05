import * as pdfjsLib from "pdfjs-dist";

// Use CDN worker for pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: any) => item.str)
      .join(" ");
    pages.push(text);
  }

  return pages.join("\n\n");
}

export async function extractTextFromImage(file: File): Promise<string> {
  // Convert image to base64 for the AI to process directly
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // We'll send a marker so the edge function knows it's an image
      resolve(`[IMAGE_BASE64:${reader.result}]`);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    return extractTextFromPDF(file);
  }

  if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
    return extractTextFromImage(file);
  }

  if (ext === "docx" || ext === "doc") {
    // For DOCX, read as text (basic extraction)
    const text = await file.text();
    // DOCX is XML-based, try to extract readable text
    const cleaned = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return cleaned || "Could not extract text from this document format.";
  }

  throw new Error(`Unsupported file type: .${ext}`);
}

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return "File size exceeds 10MB limit";
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  const validExts = ["pdf", "jpg", "jpeg", "png", "webp", "docx", "doc"];
  if (!ext || !validExts.includes(ext)) {
    return `Unsupported file type. Accepted: PDF, DOCX, JPG, PNG`;
  }

  return null;
}
