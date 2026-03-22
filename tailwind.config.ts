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
        background: "#050505",
        surface: {
          DEFAULT: "#0F0F11",
          light: "#161618",
          border: "#1E293B",
        },
        accent: {
          DEFAULT: "#00A19B",
          muted: "#008C87",
          dim: "#006B67",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          tertiary: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        hero: ["6rem", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
        "hero-lg": ["8rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        display: ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h2: ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h3: ["1.5rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.5)",
        card: "0 2px 8px rgba(0, 0, 0, 0.3)",
        elevated: "0 4px 16px rgba(0, 0, 0, 0.4)",
        "glow-accent": "0 0 15px rgba(0, 161, 155, 0.15), 0 0 30px rgba(0, 161, 155, 0.05)",
        "glow-accent-lg": "0 0 25px rgba(0, 161, 155, 0.2), 0 0 50px rgba(0, 161, 155, 0.08)",
      },
      borderRadius: {
        sm: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
