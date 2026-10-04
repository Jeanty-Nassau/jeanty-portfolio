import type { LabExperiment } from "@/types/lab-experiment";

export const labExperiments: LabExperiment[] = [
  {
    slug: "orbital-signals",
    title: "Orbital Signals",
    summary:
      "A compact Three.js study in shader-rendered atmosphere, procedural star fields, and pointer-responsive motion.",
    technologies: ["Three.js", "WebGL", "GLSL", "Shaders"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
  },
  {
    slug: "signal-theatre",
    title: "Signal Theatre",
    summary:
      "Curved geometry, video textures, reflections, GLSL, and scroll choreography assembled into a focused cinematic interaction.",
    technologies: ["Three.js", "GLSL", "Video Textures", "GSAP"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
  },
  {
    slug: "displacement-field",
    title: "Displacement Field",
    summary:
      "A terrain study using displacement and alpha maps, lighting, and pointer input to explore surface response and depth.",
    technologies: ["Three.js", "Displacement", "Lighting", "Pointer Input"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
  },
  {
    slug: "noise-field",
    title: "Noise Field",
    summary:
      "A procedural geometry study driven by simplex noise, with an emphasis on continuous motion, lighting, and rendering performance.",
    technologies: ["Three.js", "Simplex Noise", "Procedural Geometry", "WebGL"],
    year: "2022 / 2026",
    status: "complete",
  },
  {
    slug: "scroll-studies",
    title: "Scroll Studies",
    summary:
      "A motion study combining Three.js, GSAP, particles, parallax, and scroll-driven choreography.",
    technologies: ["Three.js", "GSAP", "Particles", "Parallax"],
    year: "2022 / 2026",
    status: "complete",
  },
];
