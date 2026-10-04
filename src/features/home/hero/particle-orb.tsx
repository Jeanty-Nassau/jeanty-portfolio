"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PARTICLE_COUNT = 2200;

function randomFromIndex(index: number, offset: number) {
  const value = Math.sin(index * 12.9898 + offset) * 43758.5453123;
  return value - Math.floor(value);
}

function createParticlePositions() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const radius = 1.9 + (randomFromIndex(i, 1.2) - 0.5) * 0.3;
    const theta = i * 0.61803398875 * Math.PI * 2;
    const phi = Math.acos(2 * randomFromIndex(i, 3.4) - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  return positions;
}

const PARTICLE_POSITIONS = createParticlePositions();

export function ParticleOrb() {
  const pointsRef = useRef<{ rotation: { x: number; y: number } } | null>(null);

  const positions = useMemo(() => PARTICLE_POSITIONS, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * 0.08;

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    pointsRef.current.rotation.y +=
      (pointerX * 0.18 - pointsRef.current.rotation.y) * 0.01;

    pointsRef.current.rotation.x +=
      (-pointerY * 0.1 - pointsRef.current.rotation.x) * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#f7f7f2"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.9}
      />
    </points>
  );
}