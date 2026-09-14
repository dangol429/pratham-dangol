"use client";

import { useEffect, useState } from "react";
import { RESUME_PATH } from "@/data/site";
import { EyebrowLabel } from "./EyebrowLabel";
import { Pill } from "./Pill";

type ViewerStatus = "loading" | "ready" | "error";

// Some mobile browsers refuse to render inline PDFs and never fire onError
// either — they just show an empty frame. If nothing has loaded by this
// point, fall back to the download prompt.
const LOAD_TIMEOUT_MS = 4000;

export function ResumeViewer() {
  const [status, setStatus] = useState<ViewerStatus>("loading");

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = setTimeout(() => setStatus("error"), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, [status]);

  // An iframe pointed at a missing file still fires onLoad — it just renders
  // the app's own 404 page nested inside the frame. Check the file is really
  // there (and really a PDF) so we show the download fallback instead.
  useEffect(() => {
    let cancelled = false;

    fetch(RESUME_PATH, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const contentType = res.headers.get("content-type") ?? "";
        if (!res.ok || contentType.includes("text/html")) setStatus("error");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-content px-6 pt-4 pb-16 md:pb-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <EyebrowLabel>Resume</EyebrowLabel>
          <h1 className="mt-3 text-[clamp(1.75rem,4.5vw,2.25rem)] font-sans font-extrabold tracking-tight text-foreground">
            Pratham Dangol — Resume
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Pill href={RESUME_PATH} external download variant="primary" className="text-xs">
            Download
          </Pill>
          <Pill
            href={RESUME_PATH}
            external
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="text-xs"
          >
            Open in new tab ↗
          </Pill>
        </div>
      </div>

      <div
        className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-ink"
        style={{ height: "clamp(480px, 76vh, 1100px)" }}
      >
        {status === "error" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
            <p className="text-sm leading-relaxed text-white/70">
              Can&apos;t preview this file? Download it instead.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Pill href={RESUME_PATH} external download variant="primary" className="text-xs">
                Download resume
              </Pill>
              <Pill
                href={RESUME_PATH}
                external
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="border-white/30 text-xs text-white hover:border-white/60"
              >
                Open in new tab ↗
              </Pill>
            </div>
          </div>
        ) : (
          <>
            {status === "loading" && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <p className="font-mono text-xs uppercase tracking-widest text-white/50">
                  Loading resume…
                </p>
              </div>
            )}

            <iframe
              src={RESUME_PATH}
              title="Pratham Dangol — Resume"
              className="h-full w-full"
              onLoad={() => setStatus("ready")}
              onError={() => setStatus("error")}
            />
          </>
        )}
      </div>

      <p className="mt-4 font-mono text-xs text-muted">
        Trouble viewing?{" "}
        <a
          href={RESUME_PATH}
          download
          className="underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Download the PDF
        </a>
        .
      </p>
    </div>
  );
}
