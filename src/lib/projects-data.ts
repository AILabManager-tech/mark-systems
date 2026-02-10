export const PROJECT_IDS = [
  "ainova-os",
  "winterpulse",
  "n8n-ecosystem",
  "osiris-scanner",
  "stark-portfolio",
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export const projectTechnologies: Record<ProjectId, string[]> = {
  "ainova-os": [
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
  ],
  "winterpulse": [
    "Next.js 14",
    "React 18",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Leaflet",
  ],
  "n8n-ecosystem": [
    "n8n",
    "GPT-4",
    "Claude",
    "Whisper",
    "PostgreSQL",
    "Docker",
  ],
  "osiris-scanner": [
    "Python",
    "Lighthouse",
    "Mozilla Observatory",
    "Click CLI",
    "Rich",
    "Chromium",
  ],
  "stark-portfolio": [
    "React",
    "Three.js",
    "TypeScript",
    "Framer Motion",
    "Tailwind",
    "Netlify",
  ],
};
