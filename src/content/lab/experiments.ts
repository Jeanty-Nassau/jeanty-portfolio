import type { LabExperiment } from "@/types/lab-experiment";

export const labExperiments: LabExperiment[] = [
  {
    slug: "orbital-signals",
    title: "Orbital Signals",
    summary:
      "A night-side Earth study with topology relief, city-light emission, layered atmosphere, orbit traces, passive spin, and camera controls.",
    technologies: ["Three.js", "WebGL", "Mapped Earth", "Orbit Controls"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
    repositoryUrl:
      "https://github.com/Jeanty-Nassau/Interactive-World-ThreeJS",
  },
  {
    slug: "signal-theatre",
    title: "Signal Theatre",
    summary:
      "A rotating four-screen cinema built from the original media assets, curved cylinder geometry, textured reflective flooring, screen-to-screen controls, and zoom.",
    technologies: ["Three.js", "Video Textures", "Reflection", "Interaction"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
    repositoryUrl:
      "https://github.com/Jeanty-Nassau/Interactive-CylinderCinema-ThreeJS",
  },
  {
    slug: "displacement-field",
    title: "Displacement Field",
    summary:
      "A radar-like signal terrain with animated displacement, contour bands, scan energy, pointer-driven tilt, and click-triggered pulses.",
    technologies: ["Three.js", "GLSL", "Displacement", "Pointer / Click Input"],
    year: "2022 / 2026",
    status: "complete",
    featured: true,
    repositoryUrl:
      "https://github.com/Jeanty-Nassau/Interactive-Terrain-ThreeJS",
  },
];
