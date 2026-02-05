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
        background: "#0A0A0A",
        surface: {
          DEFAULT: "#161618",
          light: "#1C1C1F",
          border: "#232326",
        },
        accent: {
          DEFAULT: "#00A19B",
          muted: "#008C87",
          dim: "#006B67",
        },
        text: {
          primary: "#F2F2F2",
          secondary: "#8F8F93",
          tertiary: "#5A5A5E",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "var(--font-noto-jp)",
          "var(--font-noto-kr)",
          "var(--font-noto-sc)",
          "var(--font-noto-devanagari)",
          "var(--font-noto-arabic)",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
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
      },
      borderRadius: {
        sm: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
