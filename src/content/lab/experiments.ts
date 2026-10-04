import type { LabExperiment } from "@/types/lab-experiment";

export const labExperiments: LabExperiment[] = [
  {
    slug: "particle-orb",
    title: "Particle Orb",
    summary:
      "A reactive Three.js point cloud exploring spatial motion, cursor influence, and generative form.",
    technologies: [
      "Three.js",
      "React Three Fiber",
      "TypeScript",
      "Motion",
    ],
    status: "ongoing",
    featured: true,
  },
];
