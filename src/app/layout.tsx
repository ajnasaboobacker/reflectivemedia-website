import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Reflective Media | Digital Marketing & Video Production Agency",
  description: "Reflective Media is a premium video production and digital marketing agency. We shape cinematic narratives and engineer high-performance ad campaigns to scale your brand.",
  keywords: ["video production", "digital marketing", "media agency", "creative agency", "brand strategy", "performance marketing", "los angeles production"],
  authors: [{ name: "Reflective Media Team" }],
  openGraph: {
    title: "Reflective Media | Digital Marketing & Video Production Agency",
    description: "Reflective Media is a premium video production and digital marketing agency. We shape cinematic narratives and engineer high-performance ad campaigns to scale your brand.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syne.variable} antialiased bg-agency-black text-foreground overflow-x-hidden`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
