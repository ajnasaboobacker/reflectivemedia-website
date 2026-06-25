"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload frames in the background
  useEffect(() => {
    const totalFrames = 240;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/assets/RM_Video_Frames/ezgif-frame-${frameNum}.png`;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
        if (loadedCount === totalFrames) {
          setIsLoading(false);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setIsLoading(false);
        }
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  useEffect(() => {
    if (isLoading) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const indicators = indicatorsRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const totalFrames = 240;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (img && img.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.width;
        const ih = img.height;
        const r = Math.max(cw / iw, ch / ih);
        const nw = iw * r;
        const nh = ih * r;
        const cx = (cw - nw) / 2;
        const cy = (ch - nh) / 2;
        ctx.drawImage(img, cx, cy, nw, nh);
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      // Enable high-quality scaling algorithms on resize
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Get the scroll trigger instance and draw corresponding frame
      const trigger = ScrollTrigger.getById("hero-scroll-trigger");
      const progress = trigger ? trigger.progress : 0;
      const currentFrame = Math.min(
        totalFrames - 1,
        Math.floor(progress * totalFrames)
      );
      drawFrame(currentFrame);
    };

    // Set initial canvas dimension and render first frame
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Scroll trigger timeline for synchronization
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "hero-scroll-trigger",
        trigger: container,
        start: "top top",
        end: "+=300%", // pins for 3x viewport height for smooth frame progression
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetFrame = Math.min(
            totalFrames - 1,
            Math.floor(progress * totalFrames)
          );
          drawFrame(targetFrame);
        },
      },
    });

    // Synchronize cinematic overlays fading with the scroll timeline
    tl.to(
      indicators,
      {
        opacity: 0,
        duration: 0.2,
      },
      0
    );

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      const trigger = ScrollTrigger.getById("hero-scroll-trigger");
      if (trigger) trigger.kill();
    };
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-agency-black select-none z-10"
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-agency-black z-50 flex flex-col justify-center items-center font-mono text-xs uppercase tracking-[0.3em] text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-agency-red animate-pulse" />
              <span>Caching Cinematic Sequence...</span>
            </div>
            <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-agency-red transition-all duration-100 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-white/40">{loadingProgress}%</span>
          </div>
        </div>
      )}

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-agency-black via-transparent to-agency-black/50 z-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-agency-black/40 via-transparent to-agency-black/40 z-30 pointer-events-none" />

      {/* Frame Canvas Player */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-20 brightness-[0.8] contrast-[1.05]"
      />

      {/* Cinematic Frame Interface */}
      <div
        ref={indicatorsRef}
        className="absolute inset-x-8 top-28 bottom-8 flex flex-col justify-between pointer-events-none z-40 text-xs font-mono text-white/40 uppercase tracking-widest"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-agency-red animate-ping" />
            <span className="text-white/60">REC [●]</span>
          </div>
          <div>CAM A // Reflective_Production</div>
        </div>
        <div className="flex justify-between items-end">
          <div>24 FPS // shutter 1/50</div>
          <div>ISO 400</div>
        </div>
      </div>
    </div>
  );
}
