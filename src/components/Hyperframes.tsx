"use client";

import React from "react";

// Standard hex to rgba converter matching the toolkit
export function hexToRgba(hex: string, alpha: number): string {
  const fullHex = hex.length === 4
    ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
    : hex;

  const r = parseInt(fullHex.slice(1, 3), 16);
  const g = parseInt(fullHex.slice(3, 5), 16);
  const b = parseInt(fullHex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Custom linear interpolation helper replacing Remotion's interpolate
export function interpolate(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
  options?: { extrapolateRight?: "extend" | "clamp" }
): number {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  
  if (value <= inputMin) return outputMin;
  if (value >= inputMax) {
    if (options?.extrapolateRight === "extend") {
      const ratio = (value - inputMin) / (inputMax - inputMin);
      return outputMin + ratio * (outputMax - outputMin);
    }
    return outputMax;
  }
  
  const ratio = (value - inputMin) / (inputMax - inputMin);
  return outputMin + ratio * (outputMax - outputMin);
}

// Local theme settings matching our app's colors
const theme = {
  colors: {
    primary: "#e60026",       // agency-red
    primaryLight: "#ff2a4b",  // agency-redGlow
    bgLight: "#050505",       // agency-black
    textLight: "#ffffff",
    textDark: "#0d0d0d",      // agency-darkGrey
    accent: "#ff2a4b",
  }
};

/* ==========================================
   1. FilmGrain Component
    ========================================== */
export interface FilmGrainProps {
  /** Current frame driven by scroll (0-239) */
  frame: number;
  /** Opacity of the grain overlay (0-1). Default: 0.05 */
  opacity?: number;
  /** CSS blend mode. Default: 'overlay' */
  blendMode?: string;
  /** Animate the grain pattern based on frame. Default: true */
  animate?: boolean;
}

export const FilmGrainFilters: React.FC = () => {
  // Pre-generate a list of seeds to avoid rendering filters dynamically on every scroll frame
  // 10 seeds is plenty to create a smooth high-frequency random noise loop
  const seeds = Array.from({ length: 10 }, (_, i) => i);

  return (
    <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {seeds.map((seed) => (
          <filter id={`grain-filter-${seed}`} key={seed}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              seed={seed}
              stitchTiles="stitch"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
};

export const FilmGrain: React.FC<FilmGrainProps> = ({
  frame,
  opacity = 0.05,
  blendMode = "overlay",
  animate = true,
}) => {
  // Cycle through the pre-generated 10 seeds
  const seed = animate ? Math.floor(frame) % 10 : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        mixBlendMode: blendMode as React.CSSProperties["mixBlendMode"],
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect
          width="100%"
          height="100%"
          filter={`url(#grain-filter-${seed})`}
        />
      </svg>
    </div>
  );
};

/* ==========================================
   2. Vignette Component
   ========================================== */
export interface VignetteProps {
  /** Intensity of the vignette effect (0-1). Default: 0.4 */
  intensity?: number;
  /** Size of the transparent center area (0-100%). Default: 50 */
  centerSize?: number;
}

export const Vignette: React.FC<VignetteProps> = ({
  intensity = 0.4,
  centerSize = 50,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at center, transparent ${centerSize}%, rgba(0,0,0,${intensity}) 100%)`,
        pointerEvents: "none",
        zIndex: 26,
      }}
    />
  );
};

/* ==========================================
   3. AnimatedBackground Component
   ========================================== */
export type BackgroundVariant = "subtle" | "tech" | "warm" | "dark";

export interface AnimatedBackgroundProps {
  /** Current scroll frame (0 to totalFrames) */
  frame: number;
  variant?: BackgroundVariant;
  /** Whether to show grid lines overlay */
  showGrid?: boolean;
  /** Number of floating shapes (for dark variant) */
  shapeCount?: number;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  frame,
  variant = "dark",
  showGrid = true,
  shapeCount = 8,
}) => {
  if (variant === "dark") {
    return <DarkVariant frame={frame} shapeCount={shapeCount} showGrid={showGrid} />;
  }
  return <LightVariant frame={frame} variant={variant} showGrid={showGrid} />;
};

/* AnimatedBackground Subcomponents */

interface LightVariantProps {
  frame: number;
  variant: "subtle" | "tech" | "warm";
  showGrid?: boolean;
}

const LightVariant: React.FC<LightVariantProps> = ({ frame, variant, showGrid }) => {
  const getColors = () => {
    const primary = theme.colors.primary;
    const secondary = theme.colors.textLight;

    switch (variant) {
      case "tech":
        return {
          bg: theme.colors.bgLight,
          shape1: hexToRgba(primary, 0.12),
          shape2: hexToRgba(secondary, 0.08),
          shape3: hexToRgba(theme.colors.primaryLight, 0.06),
        };
      case "warm":
        return {
          bg: "#fffbf7",
          shape1: hexToRgba(primary, 0.15),
          shape2: hexToRgba(primary, 0.09),
          shape3: hexToRgba(theme.colors.primaryLight, 0.09),
        };
      case "subtle":
      default:
        return {
          bg: theme.colors.bgLight,
          shape1: hexToRgba(primary, 0.09),
          shape2: hexToRgba(theme.colors.textDark, 0.06),
          shape3: hexToRgba(primary, 0.06),
        };
    }
  };

  const c = getColors();

  // Slow, organic movements mapped to frame count
  const rotation1 = interpolate(frame, [0, 900], [0, 360], {
    extrapolateRight: "extend",
  });
  const rotation2 = interpolate(frame, [0, 1200], [360, 0], {
    extrapolateRight: "extend",
  });

  const float1Y = Math.sin(frame * 0.008) * 30;
  const float2Y = Math.cos(frame * 0.006) * 40;
  const float3X = Math.sin(frame * 0.005) * 50;

  const scale1 = 1 + Math.sin(frame * 0.004) * 0.1;
  const scale2 = 1 + Math.cos(frame * 0.003) * 0.08;

  const shouldShowGrid = showGrid ?? variant === "tech";

  return (
    <div 
      style={{ 
        position: "absolute",
        inset: 0,
        backgroundColor: c.bg, 
        overflow: "hidden",
        zIndex: 23,
        mixBlendMode: "screen",
        pointerEvents: "none"
      }}
    >
      {/* Large slow-moving circle top-right */}
      <div
        style={{
          position: "absolute",
          top: -200 + float1Y,
          right: -150,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c.shape1} 0%, transparent 70%)`,
          transform: `rotate(${rotation1}deg) scale(${scale1})`,
        }}
      />

      {/* Medium shape bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: -100 + float2Y,
          left: -100 + float3X,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c.shape2} 0%, transparent 70%)`,
          transform: `rotate(${rotation2}deg) scale(${scale2})`,
        }}
      />

      {/* Subtle accent shape center-left */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: -200 + float3X * 0.5,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${c.shape3} 0%, transparent 60%)`,
          transform: `scale(${scale1 * 0.9})`,
        }}
      />

      {/* Grid pattern overlay */}
      {shouldShowGrid && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(${hexToRgba(theme.colors.textLight, 0.08)} 1px, transparent 1px),
              linear-gradient(90deg, ${hexToRgba(theme.colors.textLight, 0.08)} 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      )}
    </div>
  );
};

interface DarkVariantProps {
  frame: number;
  shapeCount: number;
  showGrid?: boolean;
}

const DarkVariant: React.FC<DarkVariantProps> = ({ frame, shapeCount, showGrid = true }) => {
  // Generate floating boxes and tech texts based on frame progress
  const items = Array.from({ length: shapeCount }, (_, i) => {
    const baseX = (i * 260 + 120) % 1920;
    const baseY = (i * 190 + 70) % 1080;
    const size = 90 + (i % 3) * 45;
    const speed = 0.35 + (i % 4) * 0.08;
    const phase = i * 0.9;

    const x = baseX + Math.sin(frame * speed * 0.02 + phase) * 35;
    const y = baseY + Math.cos(frame * speed * 0.015 + phase) * 25;
    const rotation = frame * speed * 0.4 + i * 30;
    const opacity = 0.08 + (i % 3) * 0.04;

    const type = i % 2 === 0 ? "box" : "text";

    // Dynamic tech texts relating to media agency rendering/cinematics
    const techTexts = [
      `REFLECT_MEDIA_2026`,
      `CAM_A // REC_LIVE`,
      `TC 00:04:${Math.floor(frame / 24).toString().padStart(2, "0")}:${Math.floor(frame % 24).toString().padStart(2, "0")}`,
      `POS: [${Math.floor(x)}, ${Math.floor(y)}]`,
      `ZOOM: ${(1 + (frame / 240) * 0.25).toFixed(2)}X`,
      `STATUS_OK`,
      `SYS_REF_0x${(i * 9876).toString(16).toUpperCase()}`,
      `FRAME_${Math.floor(frame).toString().padStart(3, "0")}`
    ];
    const text = techTexts[i % techTexts.length];

    return { x, y, size, rotation, opacity, type, text };
  });

  const accent = theme.colors.accent;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 23, mixBlendMode: "screen", pointerEvents: "none" }}>
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `
            radial-gradient(ellipse at 20% 30%, ${theme.colors.primary}25 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, ${accent}20 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating items (boxes and texts) */}
      {items.map((item, i) => {
        if (item.type === "box") {
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(item.x / 19.2).toFixed(2)}%`,
                top: `${(item.y / 10.8).toFixed(2)}%`,
                width: item.size,
                height: item.size * 0.6,
                borderRadius: "4px",
                border: `1.5px solid ${i % 3 === 0 ? theme.colors.primary : accent}`,
                opacity: item.opacity * 1.5,
                transform: `rotate(${item.rotation}deg) translate(-50%, -50%)`,
                transition: "transform 0.1s linear",
              }}
            />
          );
        } else {
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(item.x / 19.2).toFixed(2)}%`,
                top: `${(item.y / 10.8).toFixed(2)}%`,
                color: i % 3 === 0 ? theme.colors.primary : theme.colors.textLight,
                fontFamily: "monospace",
                fontSize: "11px",
                fontWeight: "bold",
                letterSpacing: "0.15em",
                opacity: item.opacity * 2.2,
                transform: `rotate(${item.rotation * 0.15}deg) translate(-50%, -50%)`,
                transition: "transform 0.1s linear",
                whiteSpace: "nowrap",
              }}
            >
              {item.text}
            </div>
          );
        }
      })}

      {/* Grid lines */}
      {showGrid && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      )}
    </div>
  );
};
