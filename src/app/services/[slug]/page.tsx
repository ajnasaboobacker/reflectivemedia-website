import ServicePageClient from "./ServicePageClient";
import type { Metadata } from "next";

// Next.js static params generation for pre-rendered paths
export function generateStaticParams() {
  return [
    { slug: "media-production" },
    { slug: "branding-design" },
    { slug: "digital-marketing" },
    { slug: "podcasting" },
    { slug: "advertising-strategy" },
    { slug: "ai-video-production" },
    { slug: "web-app-development" },
    { slug: "film-production" },
  ];
}

// Dynamic metadata generation for individual service pages (SEO Best Practice)
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const titleMap: Record<string, string> = {
    "media-production": "Media Production & Cinematic Video | Reflective Media",
    "branding-design": "Branding & Distinct Visual Identity | Reflective Media",
    "digital-marketing": "Data-Driven Digital Marketing & Growth | Reflective Media",
    "podcasting": "End-to-End Podcast Production | Reflective Media",
    "advertising-strategy": "Strategic Campaigns & Direct Copywriting | Reflective Media",
    "ai-video-production": "AI Video Production & Automated Reels | Reflective Media",
    "web-app-development": "Bespoke Web & App Development | Reflective Media",
    "film-production": "Cinematic Film Production & VFX | Reflective Media",
  };
  const descMap: Record<string, string> = {
    "media-production": "High-quality video production, commercial shoots, and photography designed to capture attention and elevate your brand presence.",
    "branding-design": "Crafting distinctive brand visual identities, logos, and custom packaging systems that build long-term customer loyalty.",
    "digital-marketing": "Accelerating traffic and lead generation through SEO, SEM, growth campaigns, and performance marketing.",
    "podcasting": "Broadcast-quality podcast setups, multi-mic recording, audio editing, and SEO distribution.",
    "advertising-strategy": "Psychology-focused campaign blueprints, copywriting, and funnel conversion optimization.",
    "ai-video-production": "Scaling visual output using AI avatar pipelines, voice cloning, and modern automated templates.",
    "web-app-development": "Designing high-performance web applications, responsive sites, and custom API systems.",
    "film-production": "Theatrical-grade cinematic productions, scriptwriting, VFX, soundscapes, and color grading.",
  };

  const title = titleMap[slug] || "Reflective Media Services";
  const description = descMap[slug] || "Premium marketing and media capabilities.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/services/${slug}`,
    },
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ServicePage({ params }: PageProps) {
  return <ServicePageClient slug={params.slug} />;
}
