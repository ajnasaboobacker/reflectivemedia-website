"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroParallax from "@/components/HeroParallax";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";

// Dynamically import GlassBackground with SSR disabled (Canvas relies on window/WebGL)
const GlassBackground = dynamic(() => import("@/components/GlassBackground"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-agency-black z-0" />,
});

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Reflective Media",
    "image": "https://reflectivemedia.agency/assets/reflective_Media_Final_Logo_White_PNG.png",
    "@id": "https://reflectivemedia.agency/#organization",
    "url": "https://reflectivemedia.agency",
    "telephone": "+13235550199",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Studio 404, Carbon Blvd",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "postalCode": "90028",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.0928,
      "longitude": -118.3287
    }
  };

  return (
    <main className="relative bg-agency-black w-full min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 3D Morphing Glass Background Canvas */}
      <GlassBackground />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Agency Sections */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Section 1: Hero Zoom Parallax Portal */}
        <HeroParallax />

        {/* Section 2: Narrative Reveal & Stats */}
        <AboutSection />

        {/* Section 3: Glassmorphism Service Cards */}
        <ServicesSection />

        {/* Section 4: Asymmetrical Work Showcase */}
        <WorkSection />

        {/* Section 5: Glassmorphism Contact Form & Footer */}
        <ContactSection />
      </div>
    </main>
  );
}
