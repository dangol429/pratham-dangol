import type { Metadata } from "next";
import { ResumeViewer } from "@/components/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume for Pratham Dangol, frontend developer.",
};

export default function ResumePage() {
  return <ResumeViewer />;
}
