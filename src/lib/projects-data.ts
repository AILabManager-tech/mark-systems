export const PROJECT_IDS = [
  "usine-rh",
  "beaumont-avocats",
  "estimaweb-qc",
  "nexos-soic-stack",
  "n8n-ecosystem",
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export const projectTechnologies: Record<ProjectId, string[]> = {
  "usine-rh": [
    "Next.js 14",
    "TypeScript",
    "next-intl",
    "Vercel",
    "Loi 25",
    "SEO local",
  ],
  "beaumont-avocats": [
    "Next.js 14",
    "TypeScript",
    "UX writing",
    "Formulaire qualifiant",
    "Loi 25",
    "SEO local",
  ],
  "estimaweb-qc": [
    "Next.js 15",
    "TypeScript",
    "Wizard UX",
    "PDF export",
    "Lead generation",
    "Vercel",
  ],
  "nexos-soic-stack": [
    "Python",
    "Next.js",
    "FastAPI",
    "SOIC",
    "NEXOS",
    "OSIRIS",
  ],
  "n8n-ecosystem": [
    "n8n",
    "GPT-4",
    "Claude",
    "Whisper",
    "PostgreSQL",
    "Docker",
  ],
};
