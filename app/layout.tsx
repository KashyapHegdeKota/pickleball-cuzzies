import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";
  const title = "Pickleball Cuzzies";
  const description =
    "A fast, fair, mobile-first pickleball rotation and scoring companion.";

  return {
    title: { default: title, template: "%s | Pickleball Cuzzies" },
    description,
    applicationName: title,
    openGraph: {
      type: "website",
      title,
      description,
      images: [
        {
          url: new URL("/og.png", origin).toString(),
          width: 1731,
          height: 909,
          alt: "Pickleball Cuzzies — fair games and fast rotations",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/og.png", origin).toString()],
    },
  };
}

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
