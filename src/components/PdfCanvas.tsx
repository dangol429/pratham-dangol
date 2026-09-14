"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Served from /public (copied there by scripts/copy-pdf-worker.mjs) so the
// worker URL is stable and bundler-independent.
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PdfCanvasProps {
  file: string;
  onReady: () => void;
  onFail: () => void;
}

export default function PdfCanvas({ file, onReady, onFail }: PdfCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState(0);

  // Track the container width so each page re-renders at the right scale on
  // resize — canvas output is raster, so without this it would blur or clip.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const next = Math.round(entries[0].contentRect.width);
      if (next > 0) setWidth(next);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => {
          setPageCount(numPages);
          onReady();
        }}
        onLoadError={onFail}
        onSourceError={onFail}
        loading=""
        error=""
        noData=""
      >
        {/* Multiple pages stack vertically as a continuous scroll — no
            paginated controls. */}
        {Array.from({ length: pageCount }, (_, i) => (
          <div key={i} className={i > 0 ? "mt-4" : ""}>
            <Page
              pageNumber={i + 1}
              width={width ?? undefined}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading=""
              error=""
              devicePixelRatio={
                typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio || 1, 2)
              }
              className="[&>canvas]:!h-auto [&>canvas]:!w-full [&>canvas]:block"
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
