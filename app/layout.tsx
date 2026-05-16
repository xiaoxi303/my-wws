import type { Metadata } from "next";
import { Archivo_Black, Inter_Tight } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";
import MangoSplineBackground from "@/components/MangoSplineBackground";
import FloatingNav from "@/components/FloatingNav";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap"
});

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "NULLFORM Studio",
    template: "%s | NULLFORM Studio"
  },
  description:
    "A monochrome creative portfolio built with Next.js, GSAP, Three.js, and Lenis.",
  metadataBase: new URL("https://nullform.studio")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${archivoBlack.variable}`}
    >
      <body>
        <LanguageProvider>
          <SmoothScroll />
          <MangoSplineBackground />
          <CustomCursor />
          <FloatingNav />
          <PageTransition>{children}</PageTransition>
        </LanguageProvider>
      </body>
    </html>
  );
}
