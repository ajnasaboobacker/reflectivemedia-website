"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  Camera, Palette, TrendingUp, Mic, Target, Sparkles, Code, Film,
  ArrowLeft, CheckCircle2, ArrowUpRight, LucideIcon
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { 
  AnimatedBackground, FilmGrain, Vignette, FilmGrainFilters 
} from "@/components/Hyperframes";
import {
  MediaProductionGraphic,
  BrandingDesignGraphic,
  DigitalMarketingGraphic,
  PodcastingGraphic,
  AdvertisingStrategyGraphic,
  AiVideoProductionGraphic,
  WebDevGraphic,
  FilmProductionGraphic
} from "./ServiceGraphics";
import gsap from "gsap";

interface ServiceDetail {
  num: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  stats: { label: string; value: string }[];
  process: { step: string; title: string; desc: string }[];
  deliverables: { title: string; desc: string }[];
  relatedProjects: { title: string; category: string; desc: string; image: string; color: string }[];
}

const SERVICES_DETAILS: Record<string, ServiceDetail> = {
  "media-production": {
    num: "01",
    title: "Media Production",
    icon: Camera,
    desc: "Capturing the essence of your brand through cinematic visuals and premium creative assets. We combine high-end cinematography, professional photography, and strategic lighting to produce content that tells a story and demands attention.",
    stats: [
      { label: "Video Clarity", value: "4K HDR" },
      { label: "View Duration Boost", value: "+45%" },
      { label: "Audience Retention", value: "2.4x" }
    ],
    process: [
      { step: "01", title: "Visual Conception", desc: "Collaborative brainstorming, moodboards, and scriptwriting tailored to match your brand identity." },
      { step: "02", title: "Cinematic Capture", desc: "Filming on location or in-studio with top-tier cinema cameras, pro lighting, and expert direction." },
      { step: "03", title: "Creative Post", desc: "Seamless editing, cinematic color grading, sound design, and custom graphics." },
      { step: "04", title: "Multi-Format Export", desc: "Final delivery optimized for web, social feeds, commercial broadcasting, and large screens." }
    ],
    deliverables: [
      { title: "Brand Commercials", desc: "Cinematic promotional videos designed for maximum visual impact." },
      { title: "Corporate Photography", desc: "Premium headshots, office visuals, and operational captures." },
      { title: "Social Video Kits", desc: "Vertical reels, shorts, and tiktok templates shot with cinema quality." },
      { title: "Event Aftermovies", desc: "Energetic and emotional recaps of corporate summits, launches, or weddings." }
    ],
    relatedProjects: [
      {
        title: "Sarco Jewellery",
        category: "Campaign Photography & Visuals",
        desc: "Premium visual assets and campaign photography showcasing gold bars and luxurious jewellery items.",
        image: "/assets/projects/sarco_jewellery.png",
        color: "from-[#b38f00]/20 via-transparent to-black",
      },
      {
        title: "Convention Centre",
        category: "Event Venue Marketing & Video Assets",
        desc: "High-end corporate brochures and cinematic walkthrough packages designed for wedding and conference spaces.",
        image: "/assets/projects/convention_centre.png",
        color: "from-[#8a1c14]/20 via-transparent to-black",
      },
      {
        title: "Natya Institute",
        category: "Promotional Reels & Campaign Strategy",
        desc: "Vibrant reels and campaign strategies capturing the elegance and history of classical Indian dance admissions.",
        image: "/assets/projects/natya_institute.png",
        color: "from-[#5b2c6f]/20 via-transparent to-black",
      }
    ]
  },
  "branding-design": {
    num: "02",
    title: "Branding & Design",
    icon: Palette,
    desc: "Crafting iconic brand systems that establish immediate credibility and build long-term loyalty. We don't just design logos; we build holistic visual languages that span typography, color theory, digital layouts, and tangible packaging.",
    stats: [
      { label: "Brand Recall Rate", value: "+85%" },
      { label: "Design Consistency Check", value: "100%" },
      { label: "Market Launch Ready", value: "3 Weeks" }
    ],
    process: [
      { step: "01", title: "Discovery & Audits", desc: "Analyzing target demographics, competitor landscapes, and company values." },
      { step: "02", title: "Identity Scaffolding", desc: "Iterating logo marks, defining typography scales, and developing unique color palettes." },
      { step: "03", title: "Collateral System", desc: "Designing business stationery, packaging mockups, social kits, and apparel templates." },
      { step: "04", title: "Brand Guidelines", desc: "Compiling a comprehensive identity bible with usage instructions for consistency." }
    ],
    deliverables: [
      { title: "Visual Identity Kits", desc: "Unique logo variations, typography guides, and curated color palettes." },
      { title: "Premium Packaging", desc: "Custom box, wrapper, and label designs optimized for high shelf appeal." },
      { title: "Digital Brand Systems", desc: "Tailored vectors, iconography sets, and digital layout specifications." },
      { title: "Marketing Collateral", desc: "Corporate presentations, brochures, banners, and offline print assets." }
    ],
    relatedProjects: [
      {
        title: "Sarco Jewellery",
        category: "Campaign Photography & Visuals",
        desc: "Premium visual assets and campaign photography showcasing gold bars and luxurious jewellery items.",
        image: "/assets/projects/sarco_jewellery.png",
        color: "from-[#b38f00]/20 via-transparent to-black",
      },
      {
        title: "Theja Ayurveda",
        category: "Creative Campaign & Visual Design",
        desc: "Digital identity and campaigns for Abu Dhabi's leading ayurvedic treatment centre, connecting ancient healing with modern lifestyles.",
        image: "/assets/projects/theja_ayurveda.png",
        color: "from-[#2e6f40]/20 via-transparent to-black",
      },
      {
        title: "Karemah Dates",
        category: "Premium Packaging & Social Design",
        desc: "Sophisticated packaging assets and social media visual strategies highlighting premium quality dates.",
        image: "/assets/projects/karemah_dates.png",
        color: "from-[#7c3f00]/20 via-transparent to-black",
      }
    ]
  },
  "digital-marketing": {
    num: "03",
    title: "Digital Marketing",
    icon: TrendingUp,
    desc: "Accelerating brand growth through highly optimized performance marketing, data-driven SEO strategy, and high-impact social media setups. We analyze user behaviors and campaign telemetry to constantly scale sales, leads, and engagement.",
    stats: [
      { label: "Customer Acquisition Cost", value: "-30%" },
      { label: "Search Ranking Visibility", value: "3x" },
      { label: "Return on Ad Spend", value: "4.8x" }
    ],
    process: [
      { step: "01", title: "Target Identification", desc: "Auditing current funnels, tracking installations, and mapping user intent profiles." },
      { step: "02", title: "Ad Creative Sync", desc: "Aligning text copies, videos, and visual assets specifically to audience segments." },
      { step: "03", title: "Omnichannel Launch", desc: "Activating campaigns across Google, Meta, TikTok, and relevant search directories." },
      { step: "04", title: "Telemetry & Scaling", desc: "A/B testing ad groups, scaling winning creatives, and re-allocating budgets." }
    ],
    deliverables: [
      { title: "SEO Strategy & Auditing", desc: "Comprehensive on-page, off-page, and technical indexation optimization." },
      { title: "Lead Generation Funnels", desc: "Landing pages and automation flows built for high email/phone captures." },
      { title: "Paid Ads Management", desc: "Fully managed search, display, and social media campaigns." },
      { title: "Analytics Reporting", desc: "Live client dashboards showcasing metrics, conversions, and traffic attribution." }
    ],
    relatedProjects: [
      {
        title: "Tatheer Hotels",
        category: "Web Optimization & Performance Marketing",
        desc: "Smart hotel booking interface designs and campaigns to optimize bookings and drive performance marketing.",
        image: "/assets/projects/tatheer_hotels.png",
        color: "from-[#1c4e80]/20 via-transparent to-black",
      },
      {
        title: "Theja Ayurveda",
        category: "Creative Campaign & Visual Design",
        desc: "Digital identity and campaigns for Abu Dhabi's leading ayurvedic treatment centre.",
        image: "/assets/projects/theja_ayurveda.png",
        color: "from-[#2e6f40]/20 via-transparent to-black",
      },
      {
        title: "Natya Institute",
        category: "Promotional Reels & Campaign Strategy",
        desc: "Vibrant reels and campaign strategies capturing the elegance and history of classical Indian dance admissions.",
        image: "/assets/projects/natya_institute.png",
        color: "from-[#5b2c6f]/20 via-transparent to-black",
      }
    ]
  },
  "podcasting": {
    num: "04",
    title: "Podcasting",
    icon: Mic,
    desc: "Launch, produce, and scale your brand's voice on all major audio platforms. We provide end-to-end audio engineering, multi-microphone video setups, script layout, and audio-first SEO distribution to establish you as an industry authority.",
    stats: [
      { label: "Audio Fidelity", value: "Broadcast" },
      { label: "Listeners Reach Growth", value: "+120%" },
      { label: "Content Recycle Rate", value: "8 in 1" }
    ],
    process: [
      { step: "01", title: "Show Concepting", desc: "Establishing show formats, naming, logo art, intro scripts, and musical themes." },
      { step: "02", title: "Studio Recording", desc: "Recording with high-end microphones, multi-cam video angles, and live switching." },
      { step: "03", title: "Audio & Video Edit", desc: "Removing filler words, balancing acoustics, adding subtitles, and exporting clips." },
      { step: "04", title: "Host Distribution", desc: "Deploying to Spotify, Apple, Google, and generating show transcripts for SEO." }
    ],
    deliverables: [
      { title: "Broadcast Audio Mastering", desc: "Crystal clear audio levels optimized for car speakers and high-end headphones." },
      { title: "Video Podcast Packages", desc: "Full-length horizontal video episodes and short vertical teaser clips." },
      { title: "Show Notes & Transcripts", desc: "Keyword-rich summaries and complete scripts for SEO enhancement." },
      { title: "Podcast Artwork Suite", desc: "Eye-catching cover art, banner cards, and social guest overlays." }
    ],
    relatedProjects: [
      {
        title: "Theja Ayurveda",
        category: "Creative Campaign & Visual Design",
        desc: "Digital identity and campaigns for Abu Dhabi's leading ayurvedic treatment centre.",
        image: "/assets/projects/theja_ayurveda.png",
        color: "from-[#2e6f40]/20 via-transparent to-black",
      },
      {
        title: "Natya Institute",
        category: "Promotional Reels & Campaign Strategy",
        desc: "Vibrant reels and campaign strategies capturing the elegance and history of classical Indian dance admissions.",
        image: "/assets/projects/natya_institute.png",
        color: "from-[#5b2c6f]/20 via-transparent to-black",
      }
    ]
  },
  "advertising-strategy": {
    num: "05",
    title: "Advertising & Strategy",
    icon: Target,
    desc: "Unlocking maximum advertising return by mapping consumer psychology and executing targeted messaging campaigns. We consult on positioning, pricing strategies, funnel designs, and direct response copywriting that triggers customer actions.",
    stats: [
      { label: "Conversion Rate Uplift", value: "+40%" },
      { label: "Ad Relevance Score", value: "9.5/10" },
      { label: "Strategic Clarity", value: "Verified" }
    ],
    process: [
      { step: "01", title: "Funnel Analysis", desc: "Deep diving into customer touchpoints, drop-off spots, and competitors' frameworks." },
      { step: "02", title: "Positioning Overhaul", desc: "Crafting a unique value proposition (UVP) that makes pricing comparisons irrelevant." },
      { step: "03", title: "Direct Copywriting", desc: "Drafting high-conversion headlines, landing page copy, and ad copies." },
      { step: "04", title: "Campaign Calibration", desc: "Configuring analytical tracking pixels, custom events, and baseline tests." }
    ],
    deliverables: [
      { title: "Positioning Blueprints", desc: "Strategic mapping detailing exact demographic hooks and brand messaging styles." },
      { title: "Direct Response Copy", desc: "High-conversion scripts for video ads, emails, and landing pages." },
      { title: "Funnel Wireframes", desc: "UX blueprints structured specifically to guide users toward purchasing." },
      { title: "Ad Account Audits", desc: "Actionable evaluations of current ad configurations to instantly stop waste." }
    ],
    relatedProjects: [
      {
        title: "Tatheer Hotels",
        category: "Web Optimization & Performance Marketing",
        desc: "Smart hotel booking interface designs and campaigns to optimize bookings and drive performance marketing.",
        image: "/assets/projects/tatheer_hotels.png",
        color: "from-[#1c4e80]/20 via-transparent to-black",
      },
      {
        title: "Theja Ayurveda",
        category: "Creative Campaign & Visual Design",
        desc: "Digital identity and campaigns for Abu Dhabi's leading ayurvedic treatment centre.",
        image: "/assets/projects/theja_ayurveda.png",
        color: "from-[#2e6f40]/20 via-transparent to-black",
      }
    ]
  },
  "ai-video-production": {
    num: "06",
    title: "AI Video Production",
    icon: Sparkles,
    desc: "Scale your video output by 10x using advanced AI video pipelines. We use cutting-edge generation technologies, voice cloning, localized content cloning, and template automation to deploy highly engaging visuals at a fraction of standard production costs.",
    stats: [
      { label: "Production Turnaround", value: "-80%" },
      { label: "Creative Variations Scaled", value: "100+" },
      { label: "Cost Efficiency", value: "3.5x Savings" }
    ],
    process: [
      { step: "01", title: "Model Calibration", desc: "Training AI avatars, setting up custom voice clones, and fine-tuning branding parameters." },
      { step: "02", title: "Automated Scripting", desc: "Generating high-intent ad hook options based on historical ad performance data." },
      { step: "03", title: "Pipeline Render", desc: "Generating high-fidelity digital models, animated backgrounds, and dynamic captions." },
      { step: "04", title: "Creative Variations", desc: "Exporting multiple aspect ratios, language translations, and hooks for testing." }
    ],
    deliverables: [
      { title: "AI Avatar Ads", desc: "Highly persuasive, natural-speaking presenter ads generated automatically." },
      { title: "Voice Cloning & Dubbing", desc: "Instantly translate your videos into multiple languages in your own voice." },
      { title: "Dynamic Product Promos", desc: "Stunning 3D product reels animated from static images using generative AI." },
      { title: "Bulk Ad Hook Generation", desc: "Dozens of custom video openings generated to test across social media feeds." }
    ],
    relatedProjects: [
      {
        title: "Convention Centre",
        category: "Event Venue Marketing & Video Assets",
        desc: "High-end corporate brochures and cinematic walkthrough packages designed for wedding and conference spaces.",
        image: "/assets/projects/convention_centre.png",
        color: "from-[#8a1c14]/20 via-transparent to-black",
      },
      {
        title: "Natya Institute",
        category: "Promotional Reels & Campaign Strategy",
        desc: "Vibrant reels and campaign strategies capturing the elegance and history of classical Indian dance admissions.",
        image: "/assets/projects/natya_institute.png",
        color: "from-[#5b2c6f]/20 via-transparent to-black",
      }
    ]
  },
  "web-app-development": {
    num: "07",
    title: "Web & App Development",
    icon: Code,
    desc: "Designing and developing high-performance, responsive websites and mobile applications with bespoke UI/UX layouts. We prioritize load times, semantic accessibility, search visibility, and smooth animations using technologies like React, Next.js, and Three.js.",
    stats: [
      { label: "Lighthouse Performance", value: "98+" },
      { label: "Server Load Speed", value: "<150ms" },
      { label: "Conversion Flow Increase", value: "+28%" }
    ],
    process: [
      { step: "01", title: "UX Wireframing", desc: "Mapping user journeys, interaction pathways, and information hierarchies." },
      { step: "02", title: "High-Fidelity Design", desc: "Creating sleek glassmorphism designs, dark-mode variations, and vector systems." },
      { step: "03", title: "Bespoke Code", desc: "Writing clean, modular React/Next.js files with Tailwind and GSAP animations." },
      { step: "04", title: "SEO & Speed Audit", desc: "Setting schema.org JSON-LD data, optimizing images, and deploying to Vercel/AWS." }
    ],
    deliverables: [
      { title: "Bespoke Web Applications", desc: "Custom web products with interactive databases, user states, and dashboard portals." },
      { title: "Responsive Marketing Sites", desc: "Stunning homepages with premium animations, fully optimized for mobile devices." },
      { title: "E-Commerce Funnels", desc: "Highly secure shopping templates integrated with stripe payment processing." },
      { title: "Custom API Integrations", desc: "Seamless synchronization with Salesforce, HubSpot, Stripe, or proprietary backends." }
    ],
    relatedProjects: [
      {
        title: "Tatheer Hotels",
        category: "Web Optimization & Performance Marketing",
        desc: "Smart hotel booking interface designs and campaigns to optimize bookings and drive performance marketing.",
        image: "/assets/projects/tatheer_hotels.png",
        color: "from-[#1c4e80]/20 via-transparent to-black",
      }
    ]
  },
  "film-production": {
    num: "08",
    title: "Film Production",
    icon: Film,
    desc: "Transforming narrative ideas into theatrical-grade cinematic releases. We handle the entire film pipeline, from high-concept scriptwriting and casting to location management, cinematography, post-production VFX, soundscapes, and color grading.",
    stats: [
      { label: "Dynamic Camera Rigging", value: "Red/Arri" },
      { label: "Post-Production Pipeline", value: "DaVinci Resolve" },
      { label: "Emotional Index", value: "High Impact" }
    ],
    process: [
      { step: "01", title: "Script & Storyboards", desc: "Refining screenplays, pacing details, and pre-visualizing shots using storyboards." },
      { step: "02", title: "Cinematic Capture", desc: "Executing shoots using cinematic lenses, stabilization gimbals, and detailed director cue sheets." },
      { step: "03", title: "Sound & Color Artistry", desc: "Syncing soundscapes, implementing professional foley, and applying color maps." },
      { step: "04", title: "VFX & Compositing", desc: "Blending computer graphics, title cards, green-screen assets, and tracking plates." }
    ],
    deliverables: [
      { title: "Narrative Short Films", desc: "High-concept narrative storytelling suitable for festivals and online launches." },
      { title: "Documentary Features", desc: "In-depth corporate stories, founder biographies, and social advocacy films." },
      { title: "Cinema Advertising Assets", desc: "Large-screen cinematic commercials matching standard theatrical parameters." },
      { title: "Cinematic Music Videos", desc: "Rhythmically edited visuals customized for artists and label releases." }
    ],
    relatedProjects: [
      {
        title: "Convention Centre",
        category: "Event Venue Marketing & Video Assets",
        desc: "High-end corporate brochures and cinematic walkthrough packages designed for wedding and conference spaces.",
        image: "/assets/projects/convention_centre.png",
        color: "from-[#8a1c14]/20 via-transparent to-black",
      },
      {
        title: "Natya Institute",
        category: "Promotional Reels & Campaign Strategy",
        desc: "Vibrant reels and campaign strategies capturing the elegance and history of classical Indian dance admissions.",
        image: "/assets/projects/natya_institute.png",
        color: "from-[#5b2c6f]/20 via-transparent to-black",
      }
    ]
  }
};

const GRAPHIC_COMPONENTS: Record<string, React.ComponentType> = {
  "media-production": MediaProductionGraphic,
  "branding-design": BrandingDesignGraphic,
  "digital-marketing": DigitalMarketingGraphic,
  "podcasting": PodcastingGraphic,
  "advertising-strategy": AdvertisingStrategyGraphic,
  "ai-video-production": AiVideoProductionGraphic,
  "web-app-development": WebDevGraphic,
  "film-production": FilmProductionGraphic,
};

export default function ServicePageClient({ slug }: { slug: string }) {
  const detail = SERVICES_DETAILS[slug];
  if (!detail) {
    notFound();
  }

  const [frame, setFrame] = useState(0);

  // Slow automated animation ticking for background components
  useEffect(() => {
    let animId: number;
    const tick = () => {
      setFrame((f) => (f + 0.3) % 1200);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // GSAP Mount Entry Stagger Animation
  useEffect(() => {
    gsap.fromTo(
      ".reveal-item",
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out"
      }
    );
  }, [slug]);

  const IconComponent = detail.icon;
  const ServiceGraphic = GRAPHIC_COMPONENTS[slug] || (() => null);

  return (
    <main className="relative bg-agency-black w-full min-h-screen text-white overflow-x-hidden">
      {/* Hyperframes Cinematic Filter Definitions */}
      <FilmGrainFilters />

      {/* Ticking Animated Background Grid */}
      <AnimatedBackground frame={frame} variant="dark" showGrid={true} shapeCount={8} />

      {/* Grain and Vignette Overlays */}
      <FilmGrain frame={frame} opacity={0.12} />
      <Vignette intensity={0.65} centerSize={40} />

      {/* Site Navigation */}
      <Navbar />

      {/* Background Large Stroke Typography (Airstrike style matching homepage) */}
      <div className="absolute top-28 left-0 right-0 w-full overflow-hidden select-none pointer-events-none opacity-[0.03] z-0">
        <h2 className="font-airstrike font-black text-[12vw] tracking-tighter uppercase leading-none text-stroke text-center whitespace-nowrap transform -skew-x-12">
          {detail.title}
        </h2>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-24 flex flex-col gap-20">
        
        {/* Back Link */}
        <div className="reveal-item">
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-agency-textGrey hover:text-agency-redGlow transition-colors group"
            data-cursor="pointer"
          >
            <ArrowLeft size={14} className="transform group-hover:-translate-x-1.5 transition-transform duration-300" />
            <span>{"// Back to capabilities"}</span>
          </Link>
        </div>

        {/* Section 1: Hero Details Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Core info) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="reveal-item flex items-center gap-4">
              <span className="font-mono text-sm text-agency-red font-semibold">{detail.num}</span>
              <span className="w-8 h-[1px] bg-white/10" />
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-agency-redGlow">
                <IconComponent size={20} className="stroke-[1.5]" />
              </div>
            </div>

            <h1 className="reveal-item font-heading font-black text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tight leading-none text-white uppercase">
              {detail.title}
            </h1>

            <p className="reveal-item text-agency-textGrey text-sm md:text-base leading-relaxed font-sans max-w-xl">
              {detail.desc}
            </p>

            {/* Impact telemetry values */}
            <div className="reveal-item grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
              {detail.stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1 hover:translate-y-[-2px] transition-transform duration-300">
                  <span className="font-heading font-bold text-lg sm:text-2xl text-agency-redGlow">{stat.value}</span>
                  <span className="text-[9px] font-mono tracking-widest text-agency-textGrey/70 uppercase leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Custom Interactive SVG Graphic */}
          <div className="reveal-item lg:col-span-5 w-full flex lg:justify-end justify-center">
            <div className="w-full max-w-md xl:max-w-lg hover:shadow-red-glow transition-shadow duration-500 rounded-3xl overflow-hidden">
              <ServiceGraphic />
            </div>
          </div>

        </div>

        {/* Section 2: Scope & Workflow Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start border-t border-white/5 pt-16">
          
          {/* Left Column: Scope / Deliverables */}
          <div className="reveal-item lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-agency-red">{"// Deliverables"}</span>
              <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tight">Service Scope.</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              {detail.deliverables.map((item, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
                  <CheckCircle2 size={16} className="text-agency-redGlow stroke-[2] mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <h4 className="font-heading font-semibold text-xs md:text-sm text-white tracking-tight">{item.title}</h4>
                    <p className="text-agency-textGrey text-[11px] sm:text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Strategic Workflow / Timeline */}
          <div className="reveal-item lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-agency-red">{"// Production Pipeline"}</span>
              <h2 className="font-heading font-black text-2xl md:text-3xl text-white uppercase tracking-tight">Our Process.</h2>
            </div>

            <div className="flex flex-col gap-6 pl-2 relative border-l border-white/5 ml-1">
              {detail.process.map((step, i) => (
                <div key={i} className="relative pl-6 flex flex-col gap-1.5 group">
                  {/* Glowing timeline node */}
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-agency-black border-2 border-agency-red group-hover:border-agency-redGlow group-hover:bg-agency-redGlow transition-colors duration-300" />
                  <span className="font-mono text-[9px] text-agency-redGlow tracking-widest uppercase">Step {step.step} {"//"} {step.title}</span>
                  <p className="text-agency-textGrey text-[11px] sm:text-xs leading-relaxed max-w-md">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section 3: Wide Full-width CTA Banner */}
        <div className="reveal-item w-full">
          <div className="glassmorphism p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group shadow-glass shadow-glass-inset">
            <div className="absolute inset-0 bg-gradient-to-r from-agency-red/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-glow-gradient opacity-40 pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="flex flex-col gap-4 max-w-xl">
                <h3 className="font-heading font-black text-2xl md:text-4xl text-white uppercase tracking-tight">
                  Launch Your {detail.title.toLowerCase()} Campaign.
                </h3>
                <p className="text-agency-textGrey text-xs sm:text-sm leading-relaxed">
                  Let&apos;s engineer a high-performance visual workflow tailored to reach your target demographics, elevate your positioning, and scale conversions.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link 
                  href="/#contact"
                  className="inline-flex items-center gap-3 px-7 py-4 text-xs font-mono tracking-widest bg-agency-red hover:bg-agency-redGlow hover:shadow-red-glow rounded-full text-white uppercase transition-all duration-300 font-bold"
                  data-cursor="pointer"
                >
                  <span>Initiate project</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Related Portfolio Case Studies */}
        {detail.relatedProjects.length > 0 && (
          <div className="reveal-item flex flex-col gap-10 border-t border-white/5 pt-16">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-agency-red font-semibold">{"// Selected Work"}</span>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white uppercase tracking-tight">Related Case Studies.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detail.relatedProjects.map((proj, i) => (
                <div 
                  key={i} 
                  className="flex flex-col gap-6 group glassmorphism p-6 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-glass hover:translate-y-[-4px]"
                >
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-glass">
                    <Image 
                      src={proj.image} 
                      alt={proj.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-tr ${proj.color} opacity-40 mix-blend-overlay`} />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <div className="flex flex-col gap-2.5 px-1">
                    <span className="text-[9px] font-mono tracking-widest text-agency-redGlow uppercase">{proj.category}</span>
                    <h3 className="font-heading font-bold text-xl text-white group-hover:text-agency-redGlow transition-colors duration-300">{proj.title}</h3>
                    <p className="text-agency-textGrey text-xs leading-relaxed">{proj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
