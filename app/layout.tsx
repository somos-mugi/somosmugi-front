import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "SomosMugi — Ideas que se hacen presentes",
  description: "Estudio creativo para marcas que quieren conectar de verdad.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preload" as="image" href="/mugi/idle/mugi-idle.webp" type="image/webp" />
        <link rel="preload" as="image" href="/mugi/laugh/mugi-laugh-sheet.webp" type="image/webp" />
      </head>
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
