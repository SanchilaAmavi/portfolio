import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}