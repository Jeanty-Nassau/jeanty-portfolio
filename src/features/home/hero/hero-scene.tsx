"use client";

import { Canvas } from "@react-three/fiber";

import { ParticleOrb } from "./particle-orb";

export function HeroScene() {
  return (
    <div
      className="absolute inset-0 translate-x-[12%] -translate-y-[4%] lg:translate-x-[18%]"
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ParticleOrb />
      </Canvas>
    </div>
  );
}