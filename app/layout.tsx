import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollReveal from "@/components/providers/ScrollReveal";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanchila Amavi | Electronics & Telecommunication Engineer",
  description: "Electronics and Telecommunication Engineering undergraduate at KDU.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${syne.variable}`}>
      <body className="antialiased">
        {/* Fixed top rail — single source of truth for scroll progress.
            (Navbar.tsx no longer renders its own copy of this — see the
            fixed Navbar.tsx from the previous pass.) */}
        <ScrollProgressBar />

        {/* Magnetic dot + ring cursor, fine-pointer devices only */}
        <CustomCursor />

        {/* Powers .reveal / .reveal-stagger / .section-scroll-rail /
            .parallax-layer / .scroll-fade-line across every section.
            Renders nothing — just attaches observers. */}
        <ScrollReveal />

        {children}
      </body>
    </html>
  );
}