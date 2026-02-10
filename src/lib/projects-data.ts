export const PROJECT_IDS = [
  "ainova-os",
  "hexstrike-ai",
  "conseiller-placement",
  "n8n-ecosystem",
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
  "hexstrike-ai": [
    "Python",
    "FastMCP",
    "Flask",
    "Selenium",
    "aiohttp",
    "150+ Tools",
  ],
  "conseiller-placement": [
    "Node.js",
    "React",
    "TypeScript",
    "Express",
    "Jest",
    "Vite",
  ],
  "n8n-ecosystem": [
    "n8n",
    "GPT-4",
    "Claude",
    "Whisper",
    "PostgreSQL",
    "Docker",
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
