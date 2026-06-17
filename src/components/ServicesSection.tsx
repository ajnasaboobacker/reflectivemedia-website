"use client";

import { useRef, useEffect } from "react";
import { Video, TrendingUp, Sparkles, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES_DATA = [
  {
    icon: Video,
    title: "Video Production",
    desc: "Cinematic commercial films, corporate documentaries, high-impact social media deliverables, and expert motion graphics that capture your brand's essence.",
    features: ["Cinematography", "Creative Direction", "Post-Production", "Color Grading"],
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "Data-driven advertising campaigns, search engine optimization campaigns, conversions audit, and hyper-targeted paid ads to maximize your visual ROI.",
    features: ["Meta & Google Ads", "Conversion Rate Audits", "SEO Architectures", "Funnel Strategy"],
  },
  {
    icon: Sparkles,
    title: "Social Growth",
    desc: "Short-form vertical video loops, viral creative templates, influencer orchestration, and platform-specific community growth strategies.",
    features: ["Short-form Concepting", "TikTok & Reel Strategy", "Community Design", "Trend Analysis"],
  },
  {
    icon: Compass,
    title: "Brand Direction",
    desc: "Creative direction, typography design systems, brand guidelines, UI/UX conceptual layout, and identity guidelines that establish market authority.",
    features: ["Visual Identity", "Typography Systems", "Art Direction", "UI/UX Prototypes"],
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
        stagger: 0.15,
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
              <span className="w-1.5 h-1.5 bg-agency-red rounded-full" />
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4"
        >
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="service-card glassmorphism glassmorphism-hover p-8 md:p-10 rounded-3xl flex flex-col justify-between gap-8 border border-white/5 shadow-glass relative overflow-hidden group"
                data-cursor="pointer"
              >
                {/* Radial Glow on Hover */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-glow-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-col gap-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-agency-redGlow group-hover:border-agency-red/30 transition-colors duration-300">
                    <IconComponent size={22} className="stroke-[1.5]" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col gap-3">
                    <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight group-hover:text-agency-redGlow transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-agency-textGrey text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>

                {/* Sub features tags */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono tracking-wider text-white/60 uppercase"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
