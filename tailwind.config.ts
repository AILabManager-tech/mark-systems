import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        surface: {
          DEFAULT: "#111118",
          hover: "#1a1a24",
          elevated: "#16161f",
          border: "rgba(255, 255, 255, 0.06)",
        },
        cyber: {
          cyan: "#00ffd5",
          "cyan-dark": "#00a19b",
          violet: "#0e7490",
          "violet-dark": "#0c5f78",
          neon: "#00ff88",
          "neon-dark": "#22c55e",
          danger: "#ef4444",
          amber: "#f59e0b",
        },
        txt: {
          primary: "#e8e8ed",
          secondary: "#8b8b9e",
          tertiary: "#7f7f94", // was #5a5a6e — lightened for WCAG AA 4.5:1 on #050508
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        hero: [
          "clamp(2.5rem, 6vw, 4.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.03em" },
        ],
        h1: [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.2", letterSpacing: "-0.02em" },
        ],
        h2: [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.3", letterSpacing: "-0.01em" },
        ],
        h3: ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.4" }],
      },
      boxShadow: {
        "glow-cyan":
          "0 0 20px rgba(0,255,213,0.3), 0 0 60px rgba(0,255,213,0.1)",
        "glow-violet":
          "0 0 20px rgba(14,116,144,0.3), 0 0 60px rgba(14,116,144,0.1)",
        "glow-neon":
          "0 0 20px rgba(0,255,136,0.3), 0 0 60px rgba(0,255,136,0.1)",
        "glow-hover":
          "0 0 30px rgba(0,255,213,0.2), 0 0 80px rgba(0,255,213,0.05)",
        "glow-danger": "0 0 20px rgba(239,68,68,0.3)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        float: "float 6s ease-in-out infinite",
        scan: "scan 4s linear infinite",
        "border-glow": "border-glow 3s ease-in-out infinite",
        "bg-drift": "bg-drift 30s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(0, 255, 213, 0.2)" },
          "50%": { borderColor: "rgba(0, 255, 213, 0.6)" },
        },
        "bg-drift": {
          "0%": { transform: "scale(1.05) translate(0px, 0px)" },
          "25%": { transform: "scale(1.08) translate(-10px, -5px)" },
          "50%": { transform: "scale(1.05) translate(5px, -10px)" },
          "75%": { transform: "scale(1.08) translate(-5px, 5px)" },
          "100%": { transform: "scale(1.05) translate(0px, 0px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-gradient":
          "linear-gradient(135deg, #00ffd5, #0e7490, #00ff88)",
      },
    },
  },
  plugins: [],
};

export default config;
