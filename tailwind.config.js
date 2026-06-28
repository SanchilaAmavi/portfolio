import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "var(--bg)",
        "bg-2":  "var(--bg-2)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        card:    "var(--card)",
        text:    "var(--text)",
        muted:   "var(--text-muted)",
        subtle:  "var(--text-subtle)",
        accent:  "var(--accent)",
        violet:  "var(--violet)",
        green:   "var(--green)",
        amber:   "var(--amber)",
        border:  "var(--border)",
      },
      fontFamily: {
        sans:    ["Space Grotesk", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "monospace"],
        display: ["Syne", "sans-serif"],
      },
      backgroundImage: {
        "gradient-text": "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(56,189,248,0.06) 0%, rgba(167,139,250,0.04) 100%)",
      },
      animation: {
        "fade-up":     "fade-up 0.6s ease forwards",
        "fade-in":     "fade-in 0.4s ease forwards",
        float:         "float 3s ease-in-out infinite",
        "pulse-slow":  "pulse-slow 2.5s ease-in-out infinite",
        bounce:        "bounce 1.5s infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
      },
      maxWidth: {
        "8xl": "1120px",
      },
    },
  },
  plugins: [],
};

export default config;