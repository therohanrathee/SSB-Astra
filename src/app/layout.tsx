import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SSB Astra | Comprehensive Armed Forces Officer Preparation Suite",
  description:
    "India's premier all-in-one preparation platform for SSB aspirants — featuring the new Computerised Stage-1 (CSSS & OPAM) simulator, Stage-2 Psychological batteries (TAT, WAT, SRT), GPE tactical planning, and OLQ analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-military-grid selection:bg-amber-500/20 selection:text-amber-500">
        {children}
      </body>
    </html>
  );
}
