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
    "name": "Reflective Media Productions",
    "image": "https://www.reflectivemediaproductions.com/assets/reflective_Media_Final_Logo_White_PNG.png",
    "@id": "https://www.reflectivemediaproductions.com/#organization",
    "url": "https://www.reflectivemediaproductions.com",
    "telephone": "+971567648993",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Abu Dhabi",
      "addressCountry": "AE"
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
      <div className="relative z-10 w-full">
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
