"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    // Use GSAP quickTo for smooth lagging physics
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });

    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power1.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power1.out" });

    // Track cursor location relative to viewport
    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dotXTo(e.clientX);
      dotYTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Mouse hover listeners for scaling/transforming the cursor
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("[data-cursor]");
      
      if (hoverable) {
        const type = hoverable.getAttribute("data-cursor");
        setHoveredType(type);
        
        if (type === "view") {
          gsap.to(cursor, {
            width: 80,
            height: 80,
            backgroundColor: "rgba(230, 0, 38, 0.15)",
            borderColor: "rgba(230, 0, 38, 0.8)",
            duration: 0.3,
          });
          gsap.to(dot, { scale: 0, duration: 0.2 });
        } else if (type === "pointer") {
          gsap.to(cursor, {
            width: 40,
            height: 40,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.5)",
            duration: 0.3,
          });
          gsap.to(dot, { scale: 1.5, backgroundColor: "#e60026", duration: 0.2 });
        }
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("[data-cursor]");
      
      if (hoverable) {
        setHoveredType(null);
        gsap.to(cursor, {
          width: 24,
          height: 24,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.3)",
          duration: 0.3,
        });
        gsap.to(dot, { scale: 1, backgroundColor: "#ffffff", duration: 0.2 });
      }
    };

    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 border border-white/30 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] mix-blend-difference hidden md:flex items-center justify-center transition-transform duration-100 ease-out"
        style={{ willChange: "transform" }}
      >
        {hoveredType === "view" && (
          <span className="text-[10px] font-heading font-bold text-[#f5f5f5] tracking-widest animate-pulse">
            VIEW
          </span>
        )}
      </div>

      {/* Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[10000] mix-blend-difference hidden md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
