export const PROJECT_IDS = [
  "meridian-forecasting",
  "sentinel-quality",
  "lexicon-intelligence",
  "atlas-decision",
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export const projectTechnologies: Record<ProjectId, string[]> = {
  "meridian-forecasting": [
    "PyTorch",
    "Apache Kafka",
    "TimescaleDB",
    "FastAPI",
    "Docker",
    "AWS",
  ],
  "sentinel-quality": [
    "TensorFlow",
    "NVIDIA Jetson",
    "Python",
    "OpenCV",
    "PostgreSQL",
    "GCP",
  ],
  "lexicon-intelligence": [
    "Hugging Face",
    "spaCy",
    "FastAPI",
    "Redis",
    "Elasticsearch",
    "Kubernetes",
  ],
  "atlas-decision": [
    "Python",
    "NumPy",
    "Next.js",
    "PostgreSQL",
    "Docker",
    "Azure",
  ],
};
