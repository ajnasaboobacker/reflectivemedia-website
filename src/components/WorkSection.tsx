"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    title: "Project Redshift",
    category: "Commercial Film & Video Production",
    desc: "A futuristic visual brand campaign for an EV startup, combining high-velocity cinematic shots with neon aesthetics.",
    color: "from-[#e60026]/40 via-transparent to-black",
    speed: -40,
  },
  {
    title: "Veloce Marketing",
    category: "Performance Ads Campaign",
    desc: "Scale orchestration of multi-channel ad copy, delivering a 4.2x ROI improvement using custom high-retention video loops.",
    color: "from-zinc-800/40 via-transparent to-black",
    speed: -120, // Moves faster for parallax depth
  },
  {
    title: "Neon Velocity",
    category: "Social Campaign & Reels",
    desc: "Creating viral short-form sequences generating over 15 million views across platforms in less than 30 days.",
    color: "from-[#800014]/40 via-transparent to-black",
    speed: -60,
  },
  {
    title: "Aether Branding",
    category: "Visual Identity & Strategy",
    desc: "Complete design overhaul, style guidelines, typography guidelines, and digital mapping for an international media agency.",
    color: "from-zinc-900/60 via-transparent to-black",
    speed: -160, // Moves much faster
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionRef.current?.querySelectorAll(".project-card");
    if (!cards) return;

    cards.forEach((card) => {
      const speed = parseFloat(card.getAttribute("data-speed") || "0");
      
      gsap.fromTo(
        card,
        { y: 0 },
        {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center bg-transparent z-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 md:gap-24">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.4em] text-agency-red font-semibold">
            <span className="w-1.5 h-1.5 bg-agency-red rounded-full" />
            <span>{"// Featured Work"}</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-6xl tracking-tight text-white">
            Shaping Legends.
          </h2>
        </div>

        {/* Asymmetrical Parallax Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mt-8">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              className={`project-card flex flex-col gap-6 relative group select-none ${
                index % 2 === 1 ? "md:mt-32" : ""
              }`}
              data-speed={project.speed}
            >
              {/* Graphic Placeholder (representing high-fidelity visuals) */}
              <div
                className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr ${project.color} border border-white/5 shadow-glass flex items-center justify-center p-8`}
                data-cursor="view"
              >
                {/* Frosted Glass Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                
                {/* Radial Glow Overlay */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-60 z-10" />

                {/* Aesthetic Camera Framing inside card */}
                <div className="absolute inset-6 border border-white/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500 rounded-xl flex flex-col justify-between p-4 z-20 font-mono text-[9px] text-white pointer-events-none">
                  <div className="flex justify-between">
                    <span>PORTFOLIO_P.0{index + 1}</span>
                    <span>ACTIVE_SCENE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>REFLECTIVE_MEDIA</span>
                    <span>[+] FOCUS</span>
                  </div>
                </div>

                {/* Red Core Aura */}
                <div className="w-32 h-32 rounded-full bg-agency-red filter blur-3xl opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-700 z-0" />
              </div>

              {/* Text Info */}
              <div className="flex flex-col gap-3 px-2">
                <span className="text-[10px] font-mono tracking-widest text-agency-red uppercase">
                  {project.category}
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-white tracking-tight group-hover:text-agency-redGlow transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-agency-textGrey text-sm leading-relaxed max-w-md">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
