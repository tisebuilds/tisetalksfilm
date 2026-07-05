import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const vcrOsdMono = localFont({
  src: "./fonts/VCR_OSD_MONO_1.001.ttf",
  variable: "--font-vcr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tise Talks Film",
  description: "Film criticism and diary from Tise, powered by Letterboxd.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} ${vcrOsdMono.variable} antialiased`}
    >
      <body className="min-h-dvh bg-[#b0b0b0] text-white">{children}</body>
    </html>
  );
}
