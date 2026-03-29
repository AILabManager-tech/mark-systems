import type { ProductDemoId } from "@/lib/product-demos";

export { PRODUCT_DEMO_IDS as PROJECT_IDS } from "@/lib/product-demos";
export type ProjectId = ProductDemoId;

export const projectTechnologies: Record<ProjectId, string[]> = {
  "estimaweb-qc": [
    "Next.js 15",
    "TypeScript",
    "Wizard UX",
    "PDF export",
    "Lead generation",
    "Vercel",
  ],
  "osiris-scanner": [
    "Python",
    "Lighthouse",
    "Playwright",
    "Security headers",
    "Reports",
    "Scoring",
  ],
  "one-click-report": [
    "FastAPI",
    "Next.js",
    "OCR",
    "PDF export",
    "Charts",
    "Executive summaries",
  ],
  "inbox-zero": [
    "Python",
    "IMAP",
    "Gmail API",
    "Graph API",
    "LLM classification",
    "Web dashboard",
  ],
  summeet: [
    "Flask",
    "Whisper",
    "OpenAI",
    "Anthropic",
    "SQLite",
    "Markdown export",
  ],
  "financial-intelligence-suite": [
    "React 19",
    "Vite 7",
    "Recharts",
    "Tailwind CSS 4",
    "Scoring",
    "Executive KPIs",
  ],
};
