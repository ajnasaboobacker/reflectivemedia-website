"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const totalFrames = 240;
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const activeFrameRef = useRef<number>(0);
  const drawActiveFrameRef = useRef<(() => void) | null>(null);

  // Helper to load a single frame on-demand (1-indexed)
  const loadFrame = useCallback((index: number, onLoadCallback?: () => void) => {
    const frameIdx = index - 1;
    if (imagesRef.current[frameIdx]) {
      if (onLoadCallback) onLoadCallback();
      return imagesRef.current[frameIdx]!;
    }

    const img = new Image();
    const frameNum = String(index).padStart(3, "0");
    img.src = `/assets/RM_Video_Frames/ezgif-frame-${frameNum}.png`;
    imagesRef.current[frameIdx] = img;

    img.onload = () => {
      if (onLoadCallback) onLoadCallback();
      // If the loaded frame matches the active frame we want to show, trigger an immediate redraw
      if (activeFrameRef.current === frameIdx && drawActiveFrameRef.current) {
        drawActiveFrameRef.current();
      }
    };

    img.onerror = () => {
      console.warn(`Failed to load frame ${index}`);
      if (onLoadCallback) onLoadCallback();
    };

    return img;
  }, []);

  // Preload sliding window of images around current frame to prevent flickering
  const preloadWindow = useCallback((currentIndex: number) => {
    const bufferAhead = 25; // ponytail: increased from 15 to prefetch more frames ahead aggressively
    const bufferBehind = 8; // ponytail: increased from 5 to prefetch more frames behind
    
    for (let i = currentIndex - bufferBehind; i <= currentIndex + bufferAhead; i++) {
      if (i >= 0 && i < totalFrames) {
        loadFrame(i + 1);
      }
    }
  }, [loadFrame]);

  // Find the nearest loaded frame (0-indexed) to render when target frame is still loading
  const findNearestLoadedImage = useCallback((currentIndex: number): HTMLImageElement | null => {
    // ponytail: linear search outward is O(N) scan. Ceiling is totalFrames (240), fine for client execution.
    let offset = 1;
    while (offset < totalFrames) {
      const prev = currentIndex - offset;
      const next = currentIndex + offset;
      if (prev >= 0 && imagesRef.current[prev]?.complete) {
        return imagesRef.current[prev];
      }
      if (next < totalFrames && imagesRef.current[next]?.complete) {
        return imagesRef.current[next];
      }
      offset++;
    }
    return null;
  }, []);

  // Preload initial frames, then sequentially load all remaining frames in the background
  useEffect(() => {
    // Initialize images container
    imagesRef.current = new Array(totalFrames).fill(null);

    // Load initial critical frames to unlock the loading screen fast
    const criticalToLoad = 8;
    let criticalLoaded = 0;

    for (let i = 1; i <= criticalToLoad; i++) {
      loadFrame(i, () => {
        criticalLoaded++;
        setLoadingProgress(Math.round((criticalLoaded / criticalToLoad) * 100));
        if (criticalLoaded === criticalToLoad) {
          setIsLoading(false);
        }
      });
    }

    // Sequentially preload all remaining frames in the background one-by-one to avoid clogging the network
    let isCancelled = false;

    const preloadAllRemaining = async () => {
      // Small timeout to let critical page assets load first
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (isCancelled) return;

      for (let i = 1; i <= totalFrames; i++) {
        if (isCancelled) break;

        // Skip if already loaded or loading
        if (imagesRef.current[i - 1]) continue;

        // Load the frame and wait for it to load before starting the next one
        await new Promise<void>((resolve) => {
          const img = loadFrame(i, () => {
            resolve();
          });
          img.onerror = () => resolve();
        });
      }
    };

    preloadAllRemaining();

    return () => {
      isCancelled = true;
    };
  }, [loadFrame]);

  useEffect(() => {
    if (isLoading) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const indicators = indicatorsRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (index: number) => {
      let img = imagesRef.current[index];

      // Ensure the frame object exists and has started loading
      if (!img) {
        img = loadFrame(index + 1);
      }

      // If not fully loaded, fallback to nearest loaded frame
      let imgToDraw = img;
      if (!img.complete) {
        const fallback = findNearestLoadedImage(index);
        if (fallback) {
          imgToDraw = fallback;
        } else {
          // If no fallback at all, do nothing to prevent blank canvas
          return;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ensure high-quality scaling on every draw
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = imgToDraw.width;
      const ih = imgToDraw.height;
      const r = Math.max(cw / iw, ch / ih);
      const nw = iw * r;
      const nh = ih * r;
      const cx = (cw - nw) / 2;
      const cy = (ch - nh) / 2;
      ctx.drawImage(imgToDraw, cx, cy, nw, nh);

      // Preload surrounding window to prepare for upcoming scrolls
      preloadWindow(index);
    };

    // Store reference to draw active frame for onload callback
    drawActiveFrameRef.current = () => drawFrame(activeFrameRef.current);

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
      activeFrameRef.current = currentFrame;
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
          activeFrameRef.current = targetFrame;
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
      drawActiveFrameRef.current = null;
    };
  }, [isLoading, loadFrame, findNearestLoadedImage, preloadWindow]);

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
            <span className="w-2.5 h-2.5 rounded-full bg-agency-red animate-ping" />
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
