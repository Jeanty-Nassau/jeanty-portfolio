import type { LabExperiment } from "@/types/lab-experiment";

export const labExperiments: LabExperiment[] = [
  {
    slug: "orbital-signals",
    title: "Orbital Signals",
    summary:
      "A stylised interactive Earth study exploring atmosphere, orbital motion, mapped surfaces, and camera interaction.",
    technologies: ["Three.js", "WebGL", "GLSL", "Shaders"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
  },
  {
    slug: "signal-theatre",
    title: "Signal Theatre",
    summary:
      "A cylindrical cinema built from curved media surfaces, original video assets, reflection, and focused screen-to-screen interaction.",
    technologies: ["Three.js", "Video Textures", "Reflection", "Interaction"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
  },
  {
    slug: "displacement-field",
    title: "Displacement Field",
    summary:
      "A terrain study using displacement, lighting, and pointer input to explore responsive surface depth.",
    technologies: ["Three.js", "Displacement", "Lighting", "Pointer Input"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
  },
];
