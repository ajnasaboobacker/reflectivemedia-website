"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, Layers, Monitor, Phone, Cpu } from "lucide-react";

/* ==========================================
   1. Media Production Graphic
   ========================================== */
export function MediaProductionGraphic() {
  const [recBlink, setRecBlink] = useState(true);
  const [audioLevels, setAudioLevels] = useState([20, 45, 60, 30, 75, 40, 90, 50, 15, 60]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setRecBlink((b) => !b);
    }, 800);

    const audioInterval = setInterval(() => {
      setAudioLevels((levels) =>
        levels.map(() => Math.floor(Math.random() * 85) + 15)
      );
    }, 150);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(audioInterval);
    };
  }, []);

  return (
    <div className="relative w-full aspect-[16/10] glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 select-none group shadow-glass-inset">
      {/* Cinematic Viewport Crop Brackets */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/30 group-hover:border-agency-red/60 transition-colors duration-300" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/30 group-hover:border-agency-red/60 transition-colors duration-300" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/30 group-hover:border-agency-red/60 transition-colors duration-300" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/30 group-hover:border-agency-red/60 transition-colors duration-300" />

      {/* Top HUD Row */}
      <div className="flex justify-between items-center text-[10px] font-mono text-white/50 z-10">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full bg-agency-red ${recBlink ? "opacity-100 animate-pulse" : "opacity-20"} transition-opacity`} />
          <span className="text-white/80 tracking-widest">REC</span>
        </div>
        <div className="tracking-wider">RAW &nbsp;|&nbsp; 4K HDR &nbsp;|&nbsp; 60 FPS</div>
        <div className="flex items-center gap-1.5 border border-white/10 px-2 py-0.5 rounded bg-white/5">
          <span className="w-1.5 h-3 bg-white/70 rounded-xs" />
          <span className="w-1.5 h-3 bg-white/70 rounded-xs" />
          <span className="w-1.5 h-3 bg-white/70 rounded-xs" />
          <span className="w-1.5 h-3 bg-white/20 rounded-xs" />
          <span className="text-[9px]">88%</span>
        </div>
      </div>

      {/* Grid Lines Center-focus Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <div className="w-full h-[1px] bg-white absolute" />
        <div className="h-full w-[1px] bg-white absolute" />
        <div className="w-24 h-24 rounded-full border border-white" />
      </div>

      {/* Audio Peak Meters HUD */}
      <div className="flex flex-col gap-2 z-10">
        <div className="flex items-end gap-1.5 h-16 w-32 border-b border-l border-white/5 pl-2 pb-1 relative">
          {audioLevels.map((val, i) => (
            <div
              key={i}
              className={`w-2 rounded-t-sm transition-all duration-150 ${
                val > 80 ? "bg-agency-redGlow" : val > 55 ? "bg-agency-red" : "bg-white/45"
              }`}
              style={{ height: `${val}%` }}
            />
          ))}
          <span className="absolute bottom-1 right-2 text-[8px] font-mono text-white/30 uppercase tracking-widest">CH 1/2</span>
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-white/40 pt-2 border-t border-white/5">
          <div>FOCAL: 50.0mm</div>
          <div>ISO: 400</div>
          <div>SHUTTER: 1/50</div>
          <div>APERTURE: f/1.8</div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   2. Branding & Design Graphic
   ========================================== */
export function BrandingDesignGraphic() {
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  const swatches = [
    { color: "#050505", name: "Black", hex: "#050505" },
    { color: "#e60026", name: "Agency Red", hex: "#E60026" },
    { color: "#ff2a4b", name: "Red Glow", hex: "#FF2A4B" },
    { color: "#a0a0a5", name: "Text Grey", hex: "#A0A0A5" },
    { color: "#ffffff", name: "White", hex: "#FFFFFF" },
  ];

  return (
    <div className="relative w-full aspect-[16/10] glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 select-none group shadow-glass-inset">
      {/* Background CAD Grid layout */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.04] pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="border border-white" />
        ))}
      </div>

      {/* Top layout tools HUD */}
      <div className="flex justify-between items-center text-[10px] font-mono text-white/50 z-10 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-agency-redGlow rounded-full" />
          <span className="text-white/80 font-bold uppercase tracking-widest">Identity Workspace</span>
        </div>
        <div className="text-white/30 text-[9px]">V_2.6 // SCALE_100</div>
      </div>

      {/* Interactive Vector Path and Typography bounding box */}
      <div className="relative flex-grow flex items-center justify-center z-10 py-4">
        {/* Mock Anchor Points */}
        <div className="absolute w-3 h-3 bg-agency-red border border-white rounded-full -translate-x-16 -translate-y-8 cursor-pointer hover:scale-125 transition-transform" />
        <div className="absolute w-3 h-3 bg-white border border-agency-red rounded-full translate-x-16 translate-y-8 cursor-pointer hover:scale-125 transition-transform" />
        
        {/* Logo outlines */}
        <svg className="w-64 h-32 text-white/10 group-hover:text-white/20 transition-colors duration-500" viewBox="0 0 200 100">
          {/* Bezier Vector curve */}
          <path d="M 30,70 C 60,10 140,90 170,30" fill="none" stroke="#e60026" strokeWidth="2" strokeDasharray="4 2" />
          {/* Main big RM vector block */}
          <text x="50%" y="65%" textAnchor="middle" className="font-heading font-black text-5xl tracking-tighter fill-transparent stroke-white/25 stroke-[1] select-none" transform="skew-X(-12)">
            REFLECT
          </text>
        </svg>

        {/* Vector coordinates overlays */}
        <div className="absolute top-2 left-6 text-[8px] font-mono text-white/35 flex flex-col gap-1">
          <span>P1: [30, 70]</span>
          <span>P2: [170, 30]</span>
        </div>
      </div>

      {/* Bottom Color Swatches Palette */}
      <div className="flex justify-between items-end border-t border-white/5 pt-4 z-10">
        <div className="flex gap-3">
          {swatches.map((s, idx) => (
            <div
              key={idx}
              className="relative flex flex-col items-center gap-1 cursor-pointer"
              onMouseEnter={() => setHoveredSwatch(idx)}
              onMouseLeave={() => setHoveredSwatch(null)}
            >
              <div
                className="w-6 h-6 rounded-full border border-white/10 transition-all duration-300 transform group-hover:scale-105"
                style={{ backgroundColor: s.color, boxShadow: hoveredSwatch === idx ? `0 0 12px 2px ${s.color}60` : "none" }}
              />
              <span className={`text-[8px] font-mono text-white/40 absolute -top-8 bg-agency-grey border border-white/5 px-1.5 py-0.5 rounded transition-all duration-200 ${
                hoveredSwatch === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              }`}>
                {s.hex}
              </span>
            </div>
          ))}
        </div>
        <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
          {hoveredSwatch !== null ? swatches[hoveredSwatch].name : "Select color"}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   3. Digital Marketing Graphic
   ========================================== */
export function DigitalMarketingGraphic() {
  const [activeStat, setActiveStat] = useState(0);

  const stats = [
    { label: "Impression Growth", value: "+342%", data: [20, 35, 25, 45, 55, 40, 70, 85, 95] },
    { label: "Leads Generated", value: "24.8K", data: [15, 28, 40, 30, 48, 55, 60, 72, 88] },
    { label: "ROAS Ratio", value: "4.8x", data: [35, 40, 38, 44, 58, 62, 50, 70, 92] }
  ];

  const currentData = stats[activeStat].data;

  // Build SVG points for chart line
  const width = 400;
  const height = 120;
  const points = currentData
    .map((val, idx) => {
      const x = (idx / (currentData.length - 1)) * width;
      const y = height - (val / 100) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative w-full aspect-[16/10] glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 select-none group shadow-glass-inset">
      
      {/* Top Header Dashboard */}
      <div className="flex justify-between items-start z-10">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Performance Telemetry</span>
          <h4 className="font-heading font-bold text-lg text-white">Live Campaign Data</h4>
        </div>
        <div className="flex gap-1.5">
          {stats.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStat(idx)}
              className={`px-3 py-1 text-[9px] font-mono rounded-full border transition-all duration-300 ${
                activeStat === idx
                  ? "bg-agency-red/10 border-agency-red text-agency-redGlow shadow-red-glow"
                  : "bg-white/5 border-white/5 text-white/50 hover:border-white/10"
              }`}
            >
              {s.value}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Line Graph */}
      <div className="relative flex-grow w-full flex items-center justify-center my-4 z-10">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 overflow-visible">
          {/* Shadow Area beneath line */}
          <defs>
            <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e60026" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#e60026" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="20" x2={width} y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="60" x2={width} y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="100" x2={width} y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

          {/* Area fill */}
          <path
            d={`M 0,${height} L ${points} L ${width},${height} Z`}
            fill="url(#chart-glow)"
            className="transition-all duration-500"
          />

          {/* Main glowing line */}
          <polyline
            fill="none"
            stroke="#ff2a4b"
            strokeWidth="2.5"
            points={points}
            className="transition-all duration-500 drop-shadow-[0_0_8px_rgba(255,42,75,0.5)]"
          />

          {/* Key Coordinate nodes */}
          {currentData.map((val, idx) => {
            const x = (idx / (currentData.length - 1)) * width;
            const y = height - (val / 100) * height;
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r={idx === currentData.length - 1 ? 5 : 3.5}
                className={`transition-all duration-500 cursor-pointer ${
                  idx === currentData.length - 1
                    ? "fill-white stroke-agency-red stroke-2"
                    : "fill-agency-black stroke-white/40 hover:fill-agency-redGlow"
                }`}
              />
            );
          })}
        </svg>
      </div>

      {/* Bottom info values */}
      <div className="flex justify-between items-center border-t border-white/5 pt-3 z-10 text-[9px] font-mono text-white/40 uppercase tracking-widest">
        <div>Metric: {stats[activeStat].label}</div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          <span className="text-green-400">Attribution Active</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   4. Podcasting Graphic
   ========================================== */
export function PodcastingGraphic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const barCount = 38;
  // Pre-configured wave height ratios
  const waveRatios = [
    25, 45, 60, 30, 75, 40, 90, 50, 15, 60, 45, 80, 20, 65, 85, 30, 95, 40, 50, 
    75, 20, 60, 85, 30, 95, 40, 70, 25, 55, 80, 10, 45, 65, 35, 75, 50, 90, 20
  ];

  useEffect(() => {
    if (isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.5));
      }, 50);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying]);

  const activeBarIndex = Math.floor((progress / 100) * barCount);

  return (
    <div className="relative w-full aspect-[16/10] glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 select-none group shadow-glass-inset">
      
      {/* Top Audio Player HUD */}
      <div className="flex justify-between items-center text-[10px] font-mono text-white/50 z-10">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-agency-redGlow animate-pulse" : "bg-white/20"}`} />
          <span>AUDIO_TRACK_04.wav</span>
        </div>
        <div className="tracking-wider">00:04:{Math.floor(progress).toString().padStart(2, "0")} / 00:04:100</div>
      </div>

      {/* Main interactive waveform visualizer */}
      <div className="flex-grow flex items-center justify-center gap-[3px] py-4 z-10 px-4">
        {waveRatios.map((ratio, idx) => {
          const isActive = idx <= activeBarIndex;
          const isCurrent = idx === activeBarIndex;
          return (
            <div
              key={idx}
              onClick={() => setProgress((idx / barCount) * 100)}
              className={`w-[6px] rounded-full cursor-pointer transition-all duration-300 hover:scale-y-110 ${
                isCurrent 
                  ? "bg-white shadow-[0_0_10px_#fff] scale-y-105" 
                  : isActive 
                    ? "bg-agency-redGlow" 
                    : "bg-white/10 group-hover:bg-white/20"
              }`}
              style={{ height: `${ratio}%` }}
            />
          );
        })}
      </div>

      {/* Play Controls and micro statistics */}
      <div className="flex justify-between items-center border-t border-white/5 pt-4 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-agency-red hover:bg-agency-red/10 flex items-center justify-center text-white hover:text-agency-redGlow transition-all duration-300 shadow-glass"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="translate-x-0.5" />}
          </button>
          <button
            onClick={() => setProgress(0)}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/5 hover:border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          >
            <RefreshCw size={12} />
          </button>
        </div>

        {/* Level peak indicators */}
        <div className="flex items-center gap-1 text-[9px] font-mono text-white/40">
          <span>L</span>
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-agency-redGlow" style={{ width: isPlaying ? `${Math.floor(Math.random() * 40) + 50}%` : "10%" }} />
          </div>
          <span>R</span>
          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-agency-redGlow" style={{ width: isPlaying ? `${Math.floor(Math.random() * 40) + 50}%` : "10%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   5. Advertising & Strategy Graphic
   ========================================== */
export function AdvertisingStrategyGraphic() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const tiers = [
    { name: "Awareness", desc: "Top of Funnel: Multi-channel targeting", rate: "100%", fill: "w-full", color: "bg-agency-red/35" },
    { name: "Interest", desc: "Mid Funnel: Value proposition delivery", rate: "42%", fill: "w-[75%]", color: "bg-agency-red/50" },
    { name: "Desire", desc: "Bottom Funnel: High intent comparisons", rate: "18%", fill: "w-[50%]", color: "bg-agency-red/70" },
    { name: "Action", desc: "Retention: Conversions & purchases", rate: "4.8%", fill: "w-[25%]", color: "bg-agency-redGlow" }
  ];

  return (
    <div className="relative w-full aspect-[16/10] glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 select-none group shadow-glass-inset">
      
      {/* Top HUD bar */}
      <div className="flex justify-between items-center text-[10px] font-mono text-white/50 z-10 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Layers size={12} className="text-agency-red" />
          <span className="text-white/80 font-bold uppercase tracking-widest">Conversion Architecture</span>
        </div>
        <div className="text-white/40">AIDA_MODEL.pdf</div>
      </div>

      {/* Funnel Layout */}
      <div className="flex-grow flex flex-col justify-center items-center gap-2.5 my-4 z-10 max-w-sm mx-auto w-full">
        {tiers.map((t, idx) => {
          const isHovered = hoveredTier === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredTier(idx)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 w-full ${t.fill} ${
                isHovered ? "scale-105" : "scale-100 opacity-90 group-hover:opacity-100"
              }`}
            >
              <div className={`h-8 rounded-lg flex items-center justify-between px-4 w-full text-[10px] sm:text-xs font-mono font-bold tracking-wider text-white border border-white/10 ${t.color} shadow-glass`}>
                <span className="uppercase">{idx + 1}. {t.name}</span>
                <span className="bg-black/45 border border-white/15 px-2 py-0.5 rounded text-[9px] text-agency-redGlow">{t.rate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic details drawer */}
      <div className="h-10 border-t border-white/5 pt-3 flex justify-between items-center z-10 text-[10px] font-mono text-white/40">
        <div className="transition-all duration-300">
          {hoveredTier !== null ? (
            <span className="text-white/80 font-bold tracking-wide">
              {tiers[hoveredTier].name}: <span className="text-agency-textGrey font-normal">{tiers[hoveredTier].desc}</span>
            </span>
          ) : (
            <span>Hover on a conversion stage to review funnel details</span>
          )}
        </div>
        <div className="text-[9px] uppercase tracking-widest text-agency-redGlow">Telemetry Engine</div>
      </div>
    </div>
  );
}

/* ==========================================
   6. AI Video Production Graphic
   ========================================== */
export function AiVideoProductionGraphic() {
  const [progress, setProgress] = useState(0);
  const [promptIndex, setPromptIndex] = useState(0);

  const prompts = [
    "Compiling cinematic color mapping presets...",
    "Generating vertical clip variants...",
    "Synchronizing cloned voiceover file...",
    "Rendering dynamic subtitles overlay..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPromptIndex((idx) => (idx + 1) % prompts.length);
          return 0;
        }
        return p + 4;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [prompts.length]);

  return (
    <div className="relative w-full aspect-[16/10] glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 select-none group shadow-glass-inset">
      
      {/* Top rendering details HUD */}
      <div className="flex justify-between items-center text-[10px] font-mono text-white/50 z-10 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Cpu size={12} className="text-agency-red animate-spin" />
          <span className="text-white/80 uppercase font-bold tracking-widest">AI Render Engine</span>
        </div>
        <div>STABLE_DIF // RUNNING</div>
      </div>

      {/* Terminal Viewport */}
      <div className="flex-grow flex flex-col justify-center gap-4 py-3 z-10 font-mono text-xs text-white/85 max-w-md mx-auto w-full">
        
        {/* Terminal screen box */}
        <div className="bg-black/65 border border-white/5 p-4 rounded-xl flex flex-col gap-2 shadow-inner text-[10px] sm:text-xs">
          <div className="text-agency-redGlow">{"$ node generate-clip-variants.js"}</div>
          <div className="text-white/45">{"[INFO] Initializing generative model weights..."}</div>
          <div className="text-white/45">{"[INFO] Cloned voice profile detected. Loading acoustics..."}</div>
          <div className="text-white/90 animate-pulse transition-all duration-300">
            {"[RENDER] "}{prompts[promptIndex]}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1.5 px-1">
          <div className="flex justify-between items-center text-[9px] tracking-wider text-white/40 uppercase">
            <span>Progress: {progress}%</span>
            <span>Est: {( (100 - progress) * 0.15 ).toFixed(1)}s</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
            <div className="h-full bg-agency-red transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Bottom values */}
      <div className="flex justify-between items-center text-[9px] font-mono text-white/40 uppercase tracking-widest z-10">
        <div>CUDA cores active: 1042</div>
        <div className="text-green-400">FP16 Compile Success</div>
      </div>
    </div>
  );
}

/* ==========================================
   7. Web & App Development Graphic
   ========================================== */
export function WebDevGraphic() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  const mockCode = [
    "import { Canvas } from '@react-three/fiber';",
    "import { GlassBackground } from '@/components';",
    "",
    "export default function App() {",
    "  return (",
    "    <main className='relative w-full h-screen'>",
    "      <GlassBackground intensity={0.8} />",
    "      <div className='z-10 text-white'>",
    "        <h1>Reflective Media Agency</h1>",
    "      </div>",
    "    </main>",
    "  );",
    "}"
  ];

  return (
    <div className="relative w-full aspect-[16/10] glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 select-none group shadow-glass-inset">
      
      {/* Top Header bar with window controls */}
      <div className="flex justify-between items-center border-b border-white/5 pb-3 z-10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="flex gap-1 border border-white/10 p-0.5 rounded-full bg-white/5">
          <button
            onClick={() => setDevice("desktop")}
            className={`p-1 rounded-full transition-colors ${device === "desktop" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
          >
            <Monitor size={12} />
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`p-1 rounded-full transition-colors ${device === "mobile" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
          >
            <Phone size={12} />
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Screen */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 items-center py-3 z-10 overflow-hidden">
        {/* Left Side: Code Editor */}
        <div className="bg-black/60 border border-white/5 rounded-xl p-4 font-mono text-[9px] leading-relaxed text-white/50 h-full overflow-y-auto">
          {mockCode.map((line, idx) => (
            <div key={idx} className="whitespace-pre">
              <span className="text-white/20 select-none mr-2">{(idx + 1).toString().padStart(2, "0")}</span>
              <span className={
                line.startsWith("import") 
                  ? "text-agency-redGlow" 
                  : line.includes("export") || line.includes("return") 
                    ? "text-agency-red" 
                    : line.includes("<") 
                      ? "text-white/90" 
                      : "text-white/60"
              }>
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side: Virtual Device Rendering */}
        <div className="flex items-center justify-center h-full">
          {device === "desktop" ? (
            /* Desktop frame */
            <div className="w-full aspect-[16/10] max-h-36 border border-white/15 bg-black/75 rounded-lg flex flex-col justify-between overflow-hidden shadow-glass relative">
              <div className="bg-white/10 h-3 flex items-center px-1.5 border-b border-white/15">
                <span className="w-1 h-1 rounded-full bg-white/40 mr-1" />
                <div className="w-24 h-1.5 bg-white/25 rounded-xs" />
              </div>
              <div className="flex-grow flex items-center justify-center text-[10px] font-heading font-black text-white/80 tracking-widest uppercase">
                RM_AGENCY.web
              </div>
              <div className="bg-white/15 h-1 w-full" />
            </div>
          ) : (
            /* Mobile shell */
            <div className="w-24 aspect-[9/16] max-h-40 border border-white/15 bg-black/75 rounded-2xl flex flex-col justify-between items-center py-2 overflow-hidden shadow-glass relative">
              {/* Speaker */}
              <div className="w-8 h-1 bg-white/20 rounded-full mb-1" />
              <div className="flex-grow flex items-center justify-center text-[9px] font-heading font-black text-white/80 tracking-widest uppercase transform -rotate-90">
                RM_MOBILE
              </div>
              {/* Home button circle */}
              <div className="w-3 h-3 rounded-full border border-white/20" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom specs */}
      <div className="flex justify-between items-center text-[9px] font-mono text-white/40 uppercase tracking-widest z-10">
        <div>Port: localhost:3000</div>
        <div className="text-green-400">Next.js Dev Server Live</div>
      </div>
    </div>
  );
}

/* ==========================================
   8. Film Production Graphic
   ========================================== */
export function FilmProductionGraphic() {
  const [playhead, setPlayhead] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayhead((p) => (p >= 85 ? 15 : p + 0.8));
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[16/10] glassmorphism rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-between p-6 select-none group shadow-glass-inset">
      
      {/* Top HUD */}
      <div className="flex justify-between items-center text-[10px] font-mono text-white/50 z-10 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-agency-red animate-pulse" />
          <span className="text-white/80 font-bold uppercase tracking-widest">NLE Timeline View</span>
        </div>
        <div>TIME: 00:04:12:{Math.floor(playhead * 0.25).toString().padStart(2, "0")}</div>
      </div>

      {/* Movie timeline view representation */}
      <div className="flex-grow flex flex-col gap-2 justify-center py-3 z-10 relative">
        {/* Playhead line overlay */}
        <div 
          className="absolute top-0 bottom-0 w-[1.5px] bg-agency-redGlow shadow-[0_0_8px_#ff2a4b] z-20 transition-all duration-75"
          style={{ left: `${playhead}%` }}
        />

        {/* Video Track 1 */}
        <div className="h-5 bg-white/5 border border-white/5 rounded-md relative overflow-hidden flex items-center px-3">
          <span className="text-[8px] font-mono text-white/40 absolute left-2 uppercase">V1 // Cinematic_Reels</span>
          <div className="absolute left-[20%] right-[30%] h-3.5 bg-agency-red/35 border border-white/10 rounded-sm" />
          <div className="absolute left-[72%] right-[10%] h-3.5 bg-agency-red/20 border border-white/5 rounded-sm" />
        </div>

        {/* Audio Track 1 */}
        <div className="h-5 bg-white/5 border border-white/5 rounded-md relative overflow-hidden flex items-center px-3">
          <span className="text-[8px] font-mono text-white/40 absolute left-2 uppercase">A1 // Foley_Sound</span>
          <div className="absolute left-[15%] right-[25%] h-2.5 bg-white/15 border border-white/5 rounded-sm flex items-center justify-around overflow-hidden px-1">
            {/* Small waves */}
            <div className="w-[1px] h-1.5 bg-white/50" /><div className="w-[1px] h-2 bg-white/50" /><div className="w-[1px] h-1 bg-white/50" /><div className="w-[1px] h-2.5 bg-white/50" /><div className="w-[1px] h-1.5 bg-white/50" />
          </div>
        </div>

        {/* Audio Track 2 */}
        <div className="h-5 bg-white/5 border border-white/5 rounded-md relative overflow-hidden flex items-center px-3">
          <span className="text-[8px] font-mono text-white/40 absolute left-2 uppercase">A2 // BGM_Track</span>
          <div className="absolute left-[10%] right-[5%] h-2.5 bg-white/10 border border-white/5 rounded-sm flex items-center justify-around overflow-hidden px-1">
            {/* Waves */}
            <div className="w-[1px] h-1 bg-white/30" /><div className="w-[1px] h-1.5 bg-white/30" /><div className="w-[1px] h-2 bg-white/30" /><div className="w-[1px] h-1 bg-white/30" /><div className="w-[1px] h-1.5 bg-white/30" />
          </div>
        </div>
      </div>

      {/* Bottom Info bar */}
      <div className="flex justify-between items-center text-[9px] font-mono text-white/40 uppercase tracking-widest z-10 pt-2 border-t border-white/5">
        <div>Resolution: 3840x2160</div>
        <div>Codec: Apple ProRes 422 HQ</div>
      </div>
    </div>
  );
}
