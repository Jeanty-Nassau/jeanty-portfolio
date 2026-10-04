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

  {
    slug: "shader-study",
    title: "Shader Study",
    summary:
      "Small experiments in fragment shaders, distortion, gradients, and procedural motion.",
    technologies: [
      "GLSL",
      "Three.js",
      "WebGL",
    ],
    status: "ongoing",
    featured: true,
  },

  {
    slug: "interaction-study",
    title: "Interaction Study",
    summary:
      "Exploring responsive interface motion, pointer behaviour, and transitions beyond conventional UI patterns.",
    technologies: [
      "React",
      "Motion",
      "TypeScript",
    ],
    status: "ongoing",
  },
];