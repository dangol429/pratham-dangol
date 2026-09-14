import type { Metadata } from "next";
import { ResumeViewer } from "@/components/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume — Pratham Dangol",
  description: "Resume for Pratham Dangol, frontend developer.",
};

export default function ResumePage() {
  return <ResumeViewer />;
}
