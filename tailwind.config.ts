import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#f5f5f5",
        agency: {
          black: "#050505",
          darkGrey: "#0d0d0d",
          grey: "#1a1a1a",
          lightGrey: "#2d2d2d",
          red: "#e60026",
          redGlow: "#ff2a4b",
          redDark: "#800014",
          textGrey: "#a0a0a5",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-syne)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
        "glass-border-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
        "red-glow-gradient": "radial-gradient(circle, rgba(230, 0, 38, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        "glass-inset": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)",
        "red-glow": "0 0 20px 2px rgba(230, 0, 38, 0.3)",
      },
      backdropBlur: {
        "glass": "16px",
      },
    },
  },
  plugins: [],
};
export default config;
