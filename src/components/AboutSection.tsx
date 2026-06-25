"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heading = headingRef.current;
    const paragraph = textRef.current;

    if (heading && paragraph) {
      // Clean slide-up & fade-in for the main heading
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
          },
        }
      );

      // Clean slide-up & fade-in for the body text with a slight delay
      gsap.fromTo(
        paragraph,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: paragraph,
            start: "top 85%",
          },
        }
      );
    }

    // Stat counter animations
    const stats = statsContainerRef.current?.querySelectorAll(".stat-num");
    if (stats) {
      stats.forEach((stat) => {
        const targetVal = parseInt(stat.getAttribute("data-target") || "0", 10);
        const suffix = stat.getAttribute("data-suffix") || "";
        
        gsap.fromTo(
          stat,
          { textContent: "0" },
          {
            textContent: targetVal.toString(),
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 85%",
            },
            onUpdate: function () {
              stat.innerHTML = this.targets()[0].textContent + suffix;
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      id="about"
      ref={triggerRef}
      className="relative min-h-screen py-24 md:py-36 px-6 md:px-12 flex flex-col justify-center items-center bg-transparent z-20"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 md:gap-16">
        {/* Monospace Indicator */}
        <div className="flex items-center gap-3 self-start text-xs font-mono uppercase tracking-[0.4em] text-agency-red font-semibold">
          <span className="w-1.5 h-1.5 bg-agency-red rounded-full" />
          <span>{"// Agency DNA"}</span>
        </div>

        {/* Narrative Section */}
        <div className="max-w-4xl flex flex-col gap-6">
          <h1
            ref={headingRef}
            className="font-heading font-extrabold text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-left text-white text-balance"
          >
            Cinematic storytelling <br className="hidden md:inline" />
            meets <span className="text-agency-redGlow text-glow-accent">performance marketing.</span>
          </h1>
          <p
            ref={textRef}
            className="font-sans font-light text-base md:text-xl lg:text-2xl leading-relaxed text-left text-agency-textGrey/90 max-w-3xl mt-2 text-balance"
          >
            Reflective Media develops engaging video assets and optimized digital campaigns to help brands tell their story and connect with their target audience.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-12"
        >
          {/* Stat 1 */}
          <div className="glassmorphism p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-white/5 shadow-glass shadow-glass-inset">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-glow-gradient opacity-10 pointer-events-none" />
            <span
              className="stat-num font-heading font-black text-4xl md:text-5xl text-foreground"
              data-target="150"
              data-suffix="+"
            >
              0+
            </span>
            <span className="text-xs font-mono tracking-widest text-agency-textGrey uppercase mt-2">
              {"// Completed Projects"}
            </span>
          </div>

          {/* Stat 2 */}
          <div className="glassmorphism p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-white/5 shadow-glass shadow-glass-inset">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-glow-gradient opacity-10 pointer-events-none" />
            <span
              className="stat-num font-heading font-black text-4xl md:text-5xl text-foreground"
              data-target="24"
              data-suffix="M+"
            >
              0M+
            </span>
            <span className="text-xs font-mono tracking-widest text-agency-textGrey uppercase mt-2">
              {"// Views Generated"}
            </span>
          </div>

          {/* Stat 3 */}
          <div className="glassmorphism p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-white/5 shadow-glass shadow-glass-inset">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-glow-gradient opacity-10 pointer-events-none" />
            <span
              className="stat-num font-heading font-black text-4xl md:text-5xl text-foreground"
              data-target="98"
              data-suffix="%"
            >
              0%
            </span>
            <span className="text-xs font-mono tracking-widest text-agency-textGrey uppercase mt-2">
              {"// Client Retention"}
            </span>
          </div>

          {/* Stat 4 */}
          <div className="glassmorphism p-8 rounded-2xl flex flex-col gap-2 relative overflow-hidden border border-white/5 shadow-glass shadow-glass-inset">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-glow-gradient opacity-10 pointer-events-none" />
            <span
              className="stat-num font-heading font-black text-4xl md:text-5xl text-foreground"
              data-target="12"
              data-suffix="+"
            >
              0+
            </span>
            <span className="text-xs font-mono tracking-widest text-agency-textGrey uppercase mt-2">
              {"// Creative Awards"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
