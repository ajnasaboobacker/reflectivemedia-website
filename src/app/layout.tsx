import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

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
  metadataBase: new URL("https://reflectivemedia.agency"),
  title: "Reflective Media | Digital Marketing & Video Production Agency",
  description: "Reflective Media is a premium video production and digital marketing agency. We shape cinematic narratives and engineer high-performance ad campaigns to scale your brand.",
  keywords: ["video production", "digital marketing", "media agency", "creative agency", "brand strategy", "performance marketing", "los angeles production"],
  authors: [{ name: "Reflective Media Team" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Reflective Media | Digital Marketing & Video Production Agency",
    description: "Reflective Media is a premium video production and digital marketing agency. We shape cinematic narratives and engineer high-performance ad campaigns to scale your brand.",
    type: "website",
    locale: "en_US",
    siteName: "Reflective Media",
    images: [
      {
        url: "/assets/reflective_Media_Final_Logo_White_PNG.png",
        width: 1200,
        height: 630,
        alt: "Reflective Media Logo",
      },
    ],
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
