import type { Metadata, Viewport } from "next";
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
  title: {
    default: "Pickleball Cuzzies",
    template: "%s | Pickleball Cuzzies",
  },
  description:
    "A fast, fair, mobile-first pickleball rotation and scoring companion.",
  applicationName: "Pickleball Cuzzies",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020617",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-app-canvas">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-w-80 bg-app-canvas font-sans text-slate-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
