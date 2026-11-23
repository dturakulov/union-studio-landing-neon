import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Sofia_Sans_Extra_Condensed,
} from "next/font/google";
import "./globals.css";

const sofiaCondensed = Sofia_Sans_Extra_Condensed({
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800", "900"],
  variable: "--font-sofia-condensed",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["italic", "normal"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Union Studio — Samarkand | Reels, Podcast, 30+ Fonlar, Syomka va SMM",
  description:
    "Samarqanddagi professional video studiya: 30 dan ortiq fonlar, syomka va montaj, Podcast, Reels va shaxsiy brend hamda SMM xizmatlari. Remotion motion-powered landing.",
  icons: {
    icon: "/studio-union-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      data-lut="editorial"
      className={`${sofiaCondensed.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
