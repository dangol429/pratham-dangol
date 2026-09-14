// Copies the pdf.js worker into /public so the resume viewer can load it from
// a stable URL (/pdf.worker.min.mjs). Runs on postinstall so the file can't
// drift out of sync with the installed pdfjs-dist version, and so a fresh
// `npm ci` on CI/Vercel still produces it.
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const from = join(root, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const to = join(root, "public", "pdf.worker.min.mjs");

try {
  await mkdir(dirname(to), { recursive: true });
  await copyFile(from, to);
  console.log("[copy-pdf-worker] public/pdf.worker.min.mjs updated");
} catch (error) {
  console.warn("[copy-pdf-worker] skipped:", error.message);
}
