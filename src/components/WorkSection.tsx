"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COLUMN_1_PROJECTS = [
  {
    title: "Sarco Jewellery",
    category: "Campaign Photography & Visuals",
    desc: "Premium visual assets and campaign photography showcasing gold bars and luxurious jewellery items with timeless appeal.",
    image: "/assets/projects/sarco_jewellery.png",
    color: "from-[#b38f00]/20 via-transparent to-black",
  },
  {
    title: "Tatheer Hotels",
    category: "Web Optimization & Performance Marketing",
    desc: "Smart hotel booking interface designs and campaigns to optimize bookings and drive performance marketing.",
    image: "/assets/projects/tatheer_hotels.png",
    color: "from-[#1c4e80]/20 via-transparent to-black",
  },
  {
    title: "Convention Centre",
    category: "Event Venue Marketing & Video Assets",
    desc: "High-end corporate brochures and cinematic walkthrough packages designed for premium wedding and conference spaces.",
    image: "/assets/projects/convention_centre.png",
    color: "from-[#8a1c14]/20 via-transparent to-black",
  }
];

const COLUMN_2_PROJECTS = [
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
    desc: "Sophisticated packaging assets and social media visual strategies highlighting premium quality Arabian dates.",
    image: "/assets/projects/karemah_dates.png",
    color: "from-[#7c3f00]/20 via-transparent to-black",
  },
  {
    title: "Natya Institute",
    category: "Promotional Reels & Campaign Strategy",
    desc: "Vibrant reels and campaign strategies capturing the elegance and history of classical Indian dance admissions.",
    image: "/assets/projects/natya_institute.png",
    color: "from-[#5b2c6f]/20 via-transparent to-black",
  }
];

interface RotatingCardProps {
  projects: typeof COLUMN_1_PROJECTS;
  cardIndex: number;
  autoPlayDelay: number;
}

function RotatingProjectCard({ projects, cardIndex, autoPlayDelay }: RotatingCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setFadeState("out");
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
      setFadeState("in");
    }, 400); // half-second text fade out
  }, [projects.length]);

  useEffect(() => {
    const run = () => {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
        run();
      }, autoPlayDelay);
    };
    run();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [nextSlide, autoPlayDelay]);

  // Click handler to manually cycle slides and reset the timer
  const handleCardClick = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    nextSlide();
  };

  const activeProject = projects[activeIndex];

  return (
    <div className="flex flex-col gap-6 relative group select-none w-full">
      {/* Image Container with cross-fade */}
      <div
        className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 shadow-glass cursor-pointer"
        onClick={handleCardClick}
        data-cursor="view"
      >
        {/* Project images mapped for preloading and absolute positioning */}
        {/* Project images/videos mapped for preloading and absolute positioning */}
        {projects.map((proj, idx) => {
          const isVideo = proj.image.endsWith(".mp4") || proj.image.endsWith(".webm");
          return (
            <div
              key={idx}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: idx === activeIndex ? 1 : 0,
                zIndex: idx === activeIndex ? 1 : 0,
              }}
            >
              {isVideo ? (
                <video
                  src={proj.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover brightness-[0.75] contrast-[1.05] transition-transform duration-[4000ms] ease-out scale-100 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                  className="w-full h-full object-cover brightness-[0.75] contrast-[1.05] transition-transform duration-[4000ms] ease-out scale-100 group-hover:scale-105"
                />
              )}
              {/* Colorized Glow Ambient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${proj.color} opacity-40 mix-blend-overlay`} />
            </div>
          );
        })}

        {/* Frosted Glass overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none" />
        
        {/* Vignette shadow overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-55 z-10 pointer-events-none" />

        {/* Cinematic Camera Framing inside card */}
        <div className="absolute inset-6 border border-white/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500 rounded-xl flex flex-col justify-between p-4 z-20 font-mono text-[9px] text-white pointer-events-none">
          <div className="flex justify-between">
            <span>PORTFOLIO_P.0{cardIndex}</span>
            <span>ACTIVE_SCENE_0{activeIndex + 1}</span>
          </div>
          <div className="flex justify-between">
            <span>REFLECTIVE_MEDIA</span>
            <span>[●] ROTATE</span>
          </div>
        </div>

        {/* Slide Indicator Bar */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {projects.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "w-6 bg-agency-red" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info text box (animates on slide changes) */}
      <div 
        className={`flex flex-col gap-3 px-2 transition-all duration-500 ease-out transform ${
          fadeState === "in" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <span className="text-[10px] font-mono tracking-widest text-agency-redGlow uppercase">
          {activeProject.category}
        </span>
        <h3 className="font-heading font-bold text-2xl md:text-3xl leading-tight text-white tracking-tight group-hover:text-agency-redGlow transition-colors duration-300">
          {activeProject.title}
        </h3>
        <p className="text-agency-textGrey text-xs md:text-sm leading-relaxed max-w-md">
          {activeProject.desc}
        </p>
      </div>
    </div>
  );
}

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

        {/* Two-Column Rotating Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 mt-8">
          {/* Column 1 Card */}
          <div className="project-card" data-speed="0">
            <RotatingProjectCard projects={COLUMN_1_PROJECTS} cardIndex={1} autoPlayDelay={4800} />
          </div>

          {/* Column 2 Card (Aligned on the same line) */}
          <div className="project-card" data-speed="0">
            <RotatingProjectCard projects={COLUMN_2_PROJECTS} cardIndex={2} autoPlayDelay={5600} />
          </div>
        </div>
      </div>
    </section>
  );
}
