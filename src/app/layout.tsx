import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { IntroScreen } from "@/components/IntroScreen";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

// General Sans (Fontshare), self-hosted so there's no CDN round-trip or
// font-swap flash. Ships 400-700 only; 700 is its heaviest weight, which is
// why titles use font-bold rather than font-extrabold (800 would be
// synthesised and read blobby).
const generalSans = localFont({
  variable: "--font-general-sans",
  display: "swap",
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Pratham Dangol - Frontend Developer",
    // Child routes set a bare title ("Resume") and get the name appended.
    template: "%s / Pratham Dangol",
  },
  description:
    "Frontend developer with 3+ years building production React and TypeScript interfaces, from real-time features to fully tested UI. Remote from Nepal, open to roles and contracts.",
  openGraph: {
    title: "Pratham Dangol - Frontend Developer",
    description:
      "Frontend developer with 3+ years building production React and TypeScript interfaces. Remote from Nepal, open to roles and contracts.",
    siteName: "Pratham Dangol",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${generalSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <IntroScreen />
          <SmoothScroll />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main-content" className="pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
