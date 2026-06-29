"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Target, 
  Eye, 
  Sparkles, 
  Compass, 
  Award, 
  Zap, 
  Users, 
  TrendingUp, 
  Cpu, 
  Shield 
} from "lucide-react";

const CORE_VALUES = [
  { icon: Sparkles, name: "Creativity with Purpose" },
  { icon: Compass, name: "Strategy First" },
  { icon: Award, name: "Excellence in Execution" },
  { icon: Zap, name: "Speed with Precision" },
  { icon: Users, name: "Client-Centric Approach" },
  { icon: TrendingUp, name: "Results-Driven Mindset" },
  { icon: Cpu, name: "Innovation & Adaptability" },
  { icon: Shield, name: "Integrity & Transparency" },
];

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef1 = useRef<HTMLParagraphElement>(null);
  const textRef2 = useRef<HTMLParagraphElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const valuesContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in animations
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );
    }

    [textRef1.current, textRef2.current].forEach((para, idx) => {
      if (para) {
        gsap.fromTo(
          para,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: idx * 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: para,
              start: "top 85%",
            },
          }
        );
      }
    });

    // Mission/Vision cards reveal
    const cards = cardsContainerRef.current?.querySelectorAll(".mv-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Core Values badges reveal
    const values = valuesContainerRef.current?.querySelectorAll(".value-badge");
    if (values) {
      gsap.fromTo(
        values,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: valuesContainerRef.current,
            start: "top 90%",
          },
        }
      );
    }

    // Stat counter animations
    const stats = statsContainerRef.current?.querySelectorAll(".stat-num");
    if (stats) {
      stats.forEach((stat) => {
        const isLetterAnim = stat.getAttribute("data-target") === "A-Z";
        const suffix = stat.getAttribute("data-suffix") || "";
        const statWithVal = stat as unknown as { _val: number };
        
        if (isLetterAnim) {
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          statWithVal._val = 0;
          gsap.fromTo(
            stat,
            { _val: 0 },
            {
              _val: 25,
              duration: 2.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
              },
              onUpdate: () => {
                const index = Math.floor(statWithVal._val);
                stat.innerHTML = chars[25 - index] + suffix;
              },
            }
          );
        } else {
          const targetVal = parseInt(stat.getAttribute("data-target") || "0", 10);
          statWithVal._val = 0;
          gsap.fromTo(
            stat,
            { _val: 0 },
            {
              _val: targetVal,
              duration: 2.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
              },
              onUpdate: () => {
                stat.innerHTML = Math.floor(statWithVal._val).toString() + suffix;
              },
            }
          );
        }
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={triggerRef}
      className="relative min-h-screen pt-12 pb-24 md:pt-16 md:pb-36 px-6 md:px-12 flex flex-col justify-center items-center bg-transparent z-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 md:gap-24">
        {/* Monospace Indicator */}
        <div className="flex items-center gap-3 self-start text-xs font-mono uppercase tracking-[0.4em] text-agency-red font-semibold">
          <span className="w-1.5 h-1.5 bg-agency-red rounded-full animate-pulse" />
          <span>{"// Who We Are"}</span>
        </div>

        {/* Narrative & Description */}
        <div className="max-w-5xl flex flex-col gap-8">
          <h2
            ref={headingRef}
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight text-left text-white"
          >
            Reflective <span className="text-agency-redGlow text-glow-accent">Media</span> Productions
          </h2>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-agency-textGrey/90 font-sans font-light text-base md:text-lg leading-relaxed">
              <p ref={textRef1}>
                Reflective Media Productions LLC is a UAE based creative production and digital marketing company dedicated to bringing brands to life through compelling storytelling, innovative visuals, and strategic marketing.
              </p>
              <p ref={textRef2}>
                We combine innovation, design, and data-driven insights to craft marketing solutions that engage audiences, strengthen brand presence, and deliver measurable business results. Our focus is on helping businesses transform their vision into a compelling digital identity that inspires trust, drives growth, and creates lasting impact.
              </p>
            </div>
            
            <div className="flex flex-col items-start gap-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs font-mono uppercase tracking-[0.2em] text-agency-redGlow hover:text-white transition-colors duration-300 flex items-center gap-2 mt-2"
                data-cursor="pointer"
              >
                <span>{isExpanded ? "// Show Less" : "// Read Full Story"}</span>
                <span className={`transform transition-transform duration-300 text-[10px] ${isExpanded ? "rotate-180" : ""}`}>▼</span>
              </button>
              
              <div 
                className={`transition-all duration-500 overflow-hidden font-sans font-light text-base md:text-lg text-agency-textGrey/80 leading-relaxed max-w-4xl ${
                  isExpanded ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <p>
                  <strong>Reflective Media Productions LLC</strong> is a UAE-based creative production and digital marketing agency that specializes in cinematic video production, corporate storytelling, brand strategy, and performance-based marketing. Headquartered in Abu Dhabi, the company delivers end-to-end media services, including commercial film production, corporate video editing, graphic design, and data-driven ad campaigns. Reflective Media combines creative visual design with digital marketing insights to build cohesive digital identities that scale client visibility and drive measurable revenue growth across regional markets. By leveraging high-quality photography, structured advertising strategies, and modern web application development, the agency helps local and international brands transform their creative vision into a trusted, premium market presence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div 
          ref={cardsContainerRef} 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4"
        >
          {/* Vision */}
          <div className="mv-card glassmorphism p-8 md:p-10 rounded-3xl border border-white/5 shadow-glass shadow-glass-inset relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-glow-gradient opacity-5 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-agency-redGlow">
                <Eye size={22} className="stroke-[1.5]" />
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-white">Our Vision</h3>
            </div>
            <p className="text-agency-textGrey text-sm md:text-base leading-relaxed">
              To be a leading creative production and marketing company, delivering impactful and world-class brand experiences that inspire, engage, and drive lasting success.
            </p>
          </div>

          {/* Mission */}
          <div className="mv-card glassmorphism p-8 md:p-10 rounded-3xl border border-white/5 shadow-glass shadow-glass-inset relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-glow-gradient opacity-5 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-agency-redGlow">
                <Target size={22} className="stroke-[1.5]" />
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl text-white">Our Mission</h3>
            </div>
            <p className="text-agency-textGrey text-sm md:text-base leading-relaxed">
              To create innovative content and strategic marketing solutions that engage audiences, strengthen brand identity, and deliver measurable business growth.
            </p>
          </div>
        </div>

        {/* Core Values Badge Grid */}
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.4em] text-agency-textGrey/60">
            <span>{"// Core Values"}</span>
          </div>
          <div 
            ref={valuesContainerRef} 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {CORE_VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={idx} 
                  className="value-badge glassmorphism px-6 py-5 rounded-2xl border border-white/5 flex flex-col gap-3 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300 group"
                >
                  <div className="text-agency-redGlow/70 group-hover:text-agency-redGlow transition-colors duration-300">
                    <IconComp size={20} className="stroke-[1.5]" />
                  </div>
                  <span className="text-xs md:text-sm font-sans font-medium text-white/95">
                    {val.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12"
        >
          {/* Stat 1 */}
          <div className="glassmorphism p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-white/5 shadow-glass shadow-glass-inset group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-glow-gradient opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-300" />
            <span
              className="stat-num font-heading font-black text-4xl md:text-5xl text-white"
              data-target="450"
              data-suffix="+"
            >
              0+
            </span>
            <span className="text-[10px] font-mono tracking-widest text-agency-textGrey uppercase mt-2">
              {"// Projects Delivered"}
            </span>
            <span className="text-[9px] font-mono text-agency-redGlow mt-1 uppercase">
              In UAE, India, Kuwait
            </span>
          </div>

          {/* Stat 2 */}
          <div className="glassmorphism p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-white/5 shadow-glass shadow-glass-inset group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-glow-gradient opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-300" />
            <span
              className="stat-num font-heading font-black text-4xl md:text-5xl text-white"
              data-target="95"
              data-suffix="%"
            >
              0%
            </span>
            <span className="text-[10px] font-mono tracking-widest text-agency-textGrey uppercase mt-2">
              {"// Satisfied Clients"}
            </span>
            <span className="text-[9px] font-mono text-agency-redGlow mt-1 uppercase">
              Proven Trust
            </span>
          </div>

          {/* Stat 3 */}
          <div className="glassmorphism p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-white/5 shadow-glass shadow-glass-inset group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-glow-gradient opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-300" />
            <span
              className="stat-num font-heading font-black text-4xl md:text-5xl text-white"
              data-target="24"
              data-suffix="/7"
            >
              0/7
            </span>
            <span className="text-[10px] font-mono tracking-widest text-agency-textGrey uppercase mt-2">
              {"// Creative Support"}
            </span>
            <span className="text-[9px] font-mono text-agency-redGlow mt-1 uppercase">
              Always On
            </span>
          </div>

          {/* Stat 4 */}
          <div className="glassmorphism p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-white/5 shadow-glass shadow-glass-inset group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-glow-gradient opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-300" />
            <span
              className="stat-num font-heading font-black text-4xl md:text-5xl text-white"
              data-target="A-Z"
              data-suffix="-Z"
            >
              Z-Z
            </span>
            <span className="text-[10px] font-mono tracking-widest text-agency-textGrey uppercase mt-2">
              {"// Branding Solutions"}
            </span>
            <span className="text-[9px] font-mono text-agency-redGlow mt-1 uppercase">
              Complete Delivery
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
