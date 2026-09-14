"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { RESUME_PATH } from "@/data/site";
import { EyebrowLabel } from "./EyebrowLabel";
import { LinkArrow } from "./LinkArrow";
import { Pill } from "./Pill";

// "checking" → verifying the file exists before pdf.js ever sees it.
// "rendering" → file is good, canvas is mounting.
type ViewerStatus = "checking" | "rendering" | "ready" | "error";

// pdf.js touches browser-only globals (DOMMatrix, canvas), so the renderer is
// loaded client-side only, never server-rendered.
const PdfCanvas = dynamic(() => import("./PdfCanvas"), {
  ssr: false,
  loading: () => null,
});

export function ResumeViewer() {
  const [status, setStatus] = useState<ViewerStatus>("checking");

  // Handing pdf.js a URL that 404s makes it throw a ResponseException as an
  // unhandled rejection, which takes the whole route down rather than
  // triggering onLoadError. So confirm the file is really there (and really
  // a PDF) before mounting the renderer.
  useEffect(() => {
    let cancelled = false;

    fetch(RESUME_PATH, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        const contentType = res.headers.get("content-type") ?? "";
        setStatus(!res.ok || contentType.includes("text/html") ? "error" : "rendering");
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
          <h1 className="mt-3 text-[clamp(1.75rem,4.5vw,2.25rem)] font-display font-bold tracking-tight text-foreground">
            Pratham Dangol · Resume
          </h1>
        </div>
      </div>

      {/* Rendered page(s). The card frame matches the site's other surfaces;
          everything inside is drawn by us onto <canvas>, no native PDF
          toolbar, sidebar, zoom or page controls. */}
      <div className="mx-auto mt-8 w-full max-w-[800px]">
        <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-surface p-3 sm:p-4">
          {status === "error" ? (
            // No button here; the controls directly below already carry
            // Download / Open in new tab.
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <p className="text-sm leading-relaxed text-muted">
                Can&apos;t preview this file? Download it instead.
              </p>
            </div>
          ) : (
            <div className="relative">
              {status !== "ready" && (
                <div className="flex items-center justify-center py-24">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    Loading resume…
                  </p>
                </div>
              )}

              {/* Only mounted once the file is confirmed present. */}
              {status !== "checking" && (
                <div className={status === "ready" ? "" : "hidden"}>
                  <PdfCanvas
                    file={RESUME_PATH}
                    onReady={() => setStatus("ready")}
                    onFail={() => setStatus("error")}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Our own controls, replacing the browser's native download/print. */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Pill href={RESUME_PATH} external download variant="primary" className="text-xs">
            Download PDF
            <LinkArrow direction="down" />
          </Pill>
          <Pill
            href={RESUME_PATH}
            external
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="text-xs"
          >
            Open in new tab
            <LinkArrow />
          </Pill>
        </div>
      </div>
    </div>
  );
}
