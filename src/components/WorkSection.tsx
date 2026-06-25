"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    title: "Sarco Jewellery",
    category: "Campaign Photography & Visuals",
    desc: "Premium visual assets and campaign photography showcasing gold bars and luxurious jewellery items with timeless appeal.",
    color: "from-[#b38f00]/30 via-transparent to-black",
    speed: -30,
  },
  {
    title: "Theja Ayurveda",
    category: "Creative Campaign & Visual Design",
    desc: "Digital identity and campaigns for Abu Dhabi's leading ayurvedic treatment centre, connecting ancient healing with modern lifestyles.",
    color: "from-[#2e6f40]/30 via-transparent to-black",
    speed: -90,
  },
  {
    title: "Tatheer Hotels",
    category: "Web Optimization & Performance Marketing",
    desc: "Smart hotel booking interface designs and campaigns to optimize bookings and drive performance marketing.",
    color: "from-[#1c4e80]/30 via-transparent to-black",
    speed: -50,
  },
  {
    title: "Karemah Dates",
    category: "Premium Packaging & Social Design",
    desc: "Sophisticated packaging assets and social media visual strategies highlighting premium quality Arabian dates.",
    color: "from-[#7c3f00]/30 via-transparent to-black",
    speed: -110,
  },
  {
    title: "Natya Institute",
    category: "Promotional Reels & Campaign Strategy",
    desc: "Vibrant reels and campaign strategies capturing the elegance and history of classical Indian dance admissions.",
    color: "from-[#5b2c6f]/30 via-transparent to-black",
    speed: -70,
  },
  {
    title: "Convention Centre",
    category: "Event Venue Marketing & Video Assets",
    desc: "High-end corporate brochures and cinematic walkthrough packages designed for premium wedding and conference spaces.",
    color: "from-[#8a1c14]/30 via-transparent to-black",
    speed: -130,
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
            <span className="w-1.5 h-1.5 bg-agency-red rounded-full animate-pulse" />
            <span>{"// Featured Work"}</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-6xl leading-tight tracking-tight text-white">
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
              {/* Graphic Placeholder */}
              <div
                className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-tr ${project.color} border border-white/5 shadow-glass flex items-center justify-center p-8 transition-transform duration-500 hover:scale-[1.01]`}
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
                <span className="text-[10px] font-mono tracking-widest text-agency-redGlow uppercase">
                  {project.category}
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-white tracking-tight group-hover:text-agency-redGlow transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-agency-textGrey text-xs md:text-sm leading-relaxed max-w-md">
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
