"use client";

import { useRef, useEffect } from "react";
import { Camera, Palette, TrendingUp, Mic, Target, Sparkles, Code, Film } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const SERVICES_DATA = [
  {
    num: "01",
    icon: Camera,
    title: "Media Production",
    slug: "media-production",
    desc: "High quality video production, photography, and creative content designed to capture attention, communicate your message, and strengthen your brand presence.",
    features: ["Commercials", "Photography", "Creative Content", "Social Assets"],
  },
  {
    num: "02",
    icon: Palette,
    title: "Branding & Design",
    slug: "branding-design",
    desc: "Building distinctive brand identities through strategic design, visual consistency, and creative solutions that leave a lasting impression.",
    features: ["Brand Identity", "Visual Systems", "Logo Overhaul", "Collateral"],
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Digital Marketing",
    slug: "digital-marketing",
    desc: "Data driven marketing strategies focused on increasing visibility, audience engagement, lead generation, and business growth.",
    features: ["SEO / SEM", "Lead Generation", "Growth Ads", "Engagement"],
  },
  {
    num: "04",
    icon: Mic,
    title: "Podcasting",
    slug: "podcasting",
    desc: "End to end podcast production services, from concept development and recording to editing, publishing, and distribution.",
    features: ["Audio Concepting", "Multi-Mic Recording", "Distribution", "Audio SEO"],
  },
  {
    num: "05",
    icon: Target,
    title: "Advertising & Strategy",
    slug: "advertising-strategy",
    desc: "Strategic campaign planning and execution designed to reach the right audience, maximize impact, and deliver measurable results.",
    features: ["Campaign Planning", "Target Optimization", "Copywriting", "Analytics"],
  },
  {
    num: "06",
    icon: Sparkles,
    title: "AI Video Production",
    slug: "ai-video-production",
    desc: "AI powered video solutions that enable fast, scalable, and engaging content creation for modern digital platforms.",
    features: ["Fast Scale", "AI Video Tech", "Modern Templates", "Automation"],
  },
  {
    num: "07",
    icon: Code,
    title: "Web & App Development",
    slug: "web-app-development",
    desc: "Designing and developing high performance websites and mobile applications with seamless user experiences and robust functionality.",
    features: ["High-Perf Websites", "UX/UI Architecture", "Mobile Apps", "Custom Web"],
  },
  {
    num: "08",
    icon: Film,
    title: "Film Production",
    slug: "film-production",
    desc: "Professional film production services, including concept development, scriptwriting, cinematic production, post-production, VFX, sound design, and final delivery.",
    features: ["Scriptwriting", "Cinematography", "VFX & Sound", "Final Delivery"],
  },
];

export default function ServicesSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current?.querySelectorAll(".service-card");
    if (!cards) return;

    // Slide-up stagger reveal for cards
    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center bg-transparent z-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 md:gap-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.4em] text-agency-red font-semibold">
              <span className="w-1.5 h-1.5 bg-agency-red rounded-full animate-pulse" />
              <span>{"// Capabilities"}</span>
            </div>
            <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight text-white">
              Core Capabilities.
            </h2>
          </div>
          <p className="text-agency-textGrey/80 max-w-sm font-sans text-sm leading-relaxed">
            We bridge the gap between creative visual artistry and analytical campaign growth to offer a full-circle media service.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4"
        >
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={index}
                href={`/services/${service.slug}`}
                className="service-card glassmorphism glassmorphism-hover p-8 rounded-3xl flex flex-col justify-between gap-8 border border-white/5 shadow-glass relative overflow-hidden group"
                data-cursor="pointer"
              >
                {/* Radial Glow on Hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-glow-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-col gap-6">
                  {/* Top bar with Icon and index number */}
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300">
                      <IconComponent size={22} className="stroke-[1.5]" />
                    </div>
                    <span className="font-mono text-xs text-agency-textGrey/45 tracking-widest font-semibold">
                      {service.num}
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-heading font-bold text-lg md:text-xl leading-snug text-white tracking-tight group-hover:text-agency-redGlow transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-agency-textGrey text-xs md:text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Sub features tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] font-mono tracking-wider text-white/50 uppercase group-hover:border-white/10 group-hover:bg-white/[0.08] transition-all duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
