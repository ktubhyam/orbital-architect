import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
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
  title: "Orbital Architect — Quantum Chemistry Puzzle Game",
  description: "Build atoms by filling electron orbitals following real quantum mechanical rules. Master the Aufbau Principle, Pauli Exclusion, and Hund's Rule.",
  keywords: ["chemistry", "quantum mechanics", "electron configuration", "puzzle game", "education", "orbital"],
  openGraph: {
    title: "Orbital Architect",
    description: "Build atoms by filling electron orbitals. A quantum chemistry puzzle game.",
    type: "website",
    siteName: "Orbital Architect",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbital Architect",
    description: "Build atoms by filling electron orbitals. A quantum chemistry puzzle game.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
