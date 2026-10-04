"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type StudyId =
  | "orbital-signals"
  | "signal-theatre"
  | "displacement-field"
  | "noise-field"
  | "scroll-studies";

const studies: Array<{
  id: StudyId;
  title: string;
  note: string;
}> = [
  {
    id: "orbital-signals",
    title: "Orbital Signals",
    note: "Atmosphere / stars / pointer response",
  },
  {
    id: "signal-theatre",
    title: "Signal Theatre",
    note: "Curved geometry / light / reflection",
  },
  {
    id: "displacement-field",
    title: "Displacement Field",
    note: "Surface displacement / pointer input",
  },
  {
    id: "noise-field",
    title: "Noise Field",
    note: "Procedural geometry / continuous motion",
  },
  {
    id: "scroll-studies",
    title: "Scroll Studies",
    note: "Geometry / parallax / choreography",
  },
];

function Stars() {
  const positions = useMemo(() => {
    const values = new Float32Array(900 * 3);

    for (let index = 0; index < 900; index += 1) {
      const radius = 12 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[index * 3 + 2] = radius * Math.cos(phi);
    }

    return values;
  }, []);

  const points = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y -= delta * 0.015;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f7f7f2"
        size={0.035}
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalSignals() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x +=
      (pointer.y * -0.16 - group.current.rotation.x) * 0.04;
    group.current.rotation.z +=
      (pointer.x * 0.12 - group.current.rotation.z) * 0.04;
  });

  return (
    <>
      <Stars />

      <group ref={group}>
        <mesh>
          <sphereGeometry args={[1.65, 96, 96]} />
          <meshStandardMaterial
            color="#1847ff"
            roughness={0.58}
            metalness={0.08}
          />
        </mesh>

        <mesh scale={1.075}>
          <sphereGeometry args={[1.65, 64, 64]} />
          <meshBasicMaterial
            color="#91a7ff"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2.2, 0.2, 0]}>
          <torusGeometry args={[2.25, 0.007, 8, 220]} />
          <meshBasicMaterial color="#ff991c" transparent opacity={0.75} />
        </mesh>
      </group>
    </>
  );
}

function SignalTheatre() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x +=
      (pointer.y * 0.12 - group.current.rotation.x) * 0.035;
    group.current.position.x +=
      (pointer.x * 0.35 - group.current.position.x) * 0.035;

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.015;
    group.current.scale.setScalar(pulse);
  });

  const panels = [0, 1, 2, 3];

  return (
    <group ref={group}>
      {panels.map((panel) => (
        <mesh
          key={panel}
          rotation={[0, panel * (Math.PI / 2), 0]}
        >
          <cylinderGeometry
            args={[2.1, 2.1, 1.75, 64, 1, true, 0, Math.PI / 2 - 0.05]}
          />
          <meshStandardMaterial
            color={panel % 2 === 0 ? "#1847ff" : "#1036cc"}
            emissive={panel === 2 ? "#ff991c" : "#1847ff"}
            emissiveIntensity={panel === 2 ? 0.35 : 0.08}
            roughness={0.25}
            metalness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
        <circleGeometry args={[3.3, 96]} />
        <meshStandardMaterial
          color="#0b0b0b"
          metalness={0.9}
          roughness={0.22}
        />
      </mesh>
    </group>
  );
}

const waveVertex = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying float vHeight;

  void main() {
    vec3 p = position;
    float radial = distance(uv, vec2(0.5) + uPointer * 0.08);
    float waveA = sin((p.x * 2.4) + uTime * 1.3) * 0.16;
    float waveB = cos((p.y * 3.0) - uTime * 0.95) * 0.12;
    float ripple = sin(radial * 28.0 - uTime * 2.3) * 0.09;
    p.z += waveA + waveB + ripple;
    vHeight = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const waveFragment = `
  varying float vHeight;

  void main() {
    float mixAmount = smoothstep(-0.3, 0.3, vHeight);
    vec3 low = vec3(0.04, 0.08, 0.22);
    vec3 high = vec3(0.09, 0.28, 1.0);
    vec3 color = mix(low, high, mixAmount);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function DisplacementField() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      material.current.uniforms.uPointer.value.set(pointer.x, pointer.y);
    }

    if (mesh.current) {
      mesh.current.rotation.z = state.clock.elapsedTime * 0.035;
    }
  });

  return (
    <mesh ref={mesh} rotation={[-0.65, 0, 0]}>
      <planeGeometry args={[6.8, 6.8, 120, 120]} />
      <shaderMaterial
        ref={material}
        vertexShader={waveVertex}
        fragmentShader={waveFragment}
        uniforms={{
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2() },
        }}
        wireframe
      />
    </mesh>
  );
}

const noiseVertex = `
  uniform float uTime;
  varying float vHeight;

  float field(vec2 p) {
    float a = sin(p.x * 1.4 + uTime * 0.8);
    float b = cos(p.y * 1.8 - uTime * 0.55);
    float c = sin((p.x + p.y) * 0.85 + uTime * 0.4);
    return (a + b + c) / 3.0;
  }

  void main() {
    vec3 p = position;
    p.z += field(p.xy) * 0.7;
    vHeight = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const noiseFragment = `
  varying float vHeight;

  void main() {
    float t = smoothstep(-0.75, 0.75, vHeight);
    vec3 a = vec3(0.03, 0.03, 0.04);
    vec3 b = vec3(1.0, 0.6, 0.11);
    gl_FragColor = vec4(mix(a, b, t), 1.0);
  }
`;

function NoiseField() {
  const material = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-1.05, 0, 0]} position={[0, -1.2, -0.5]}>
      <planeGeometry args={[10, 8, 150, 110]} />
      <shaderMaterial
        ref={material}
        vertexShader={noiseVertex}
        fragmentShader={noiseFragment}
        uniforms={{
          uTime: { value: 0 },
        }}
        wireframe
      />
    </mesh>
  );
}

function ScrollStudies() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.12;
    group.current.position.x +=
      (pointer.x * 0.45 - group.current.position.x) * 0.04;
    group.current.position.y +=
      (pointer.y * 0.25 - group.current.position.y) * 0.04;

    group.current.children.forEach((child, index) => {
      child.rotation.x += delta * (0.08 + index * 0.035);
      child.rotation.y += delta * (0.12 + index * 0.02);
    });

    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh position={[-2.15, 0.8, 0]}>
        <torusGeometry args={[0.85, 0.28, 24, 80]} />
        <meshToonMaterial color="#f7f7f2" />
      </mesh>

      <mesh position={[0, -0.45, 0]}>
        <coneGeometry args={[0.9, 1.8, 40]} />
        <meshToonMaterial color="#91a7ff" />
      </mesh>

      <mesh position={[2.1, 0.65, 0]}>
        <torusKnotGeometry args={[0.65, 0.2, 120, 18]} />
        <meshToonMaterial color="#ff991c" />
      </mesh>
    </group>
  );
}

function StudyScene({ study }: { study: StudyId }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} />
      <pointLight position={[-4, 2, 3]} intensity={24} color="#1847ff" />
      <pointLight position={[4, -2, 2]} intensity={18} color="#ff991c" />

      {study === "orbital-signals" && <OrbitalSignals />}
      {study === "signal-theatre" && <SignalTheatre />}
      {study === "displacement-field" && <DisplacementField />}
      {study === "noise-field" && <NoiseField />}
      {study === "scroll-studies" && <ScrollStudies />}
    </>
  );
}

export function CreativeMode() {
  const [active, setActive] = useState(false);
  const [study, setStudy] = useState<StudyId>("orbital-signals");
  const selected = studies.find((item) => item.id === study) ?? studies[0];

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return (
    <>
      <button
        type="button"
        onClick={() => setActive(true)}
        className="fixed bottom-5 left-5 z-[70] hidden items-center gap-2 border border-paper/25 bg-ink/85 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-paper backdrop-blur-md transition-colors hover:border-orange hover:text-orange md:inline-flex"
        aria-haspopup="dialog"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-orange" />
        Live studies
      </button>

      {active && (
        <div
          className="fixed inset-0 z-[10000] bg-ink text-paper"
          role="dialog"
          aria-modal="true"
          aria-label="Live creative coding studies"
        >
          <div className="absolute inset-0">
            <Canvas
              camera={{ position: [0, 0, 6], fov: 48 }}
              dpr={[1, 1.75]}
              gl={{ antialias: true, powerPreference: "high-performance" }}
            >
              <color attach="background" args={["#070707"]} />
              <StudyScene study={study} />
            </Canvas>
          </div>

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 md:p-8">
            <div className="flex items-start justify-between border-b border-paper/20 pb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-orange">
                  Live studies / portfolio mode
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                  {selected.title}
                </h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/45">
                  {selected.note}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActive(false)}
                className="pointer-events-auto border border-paper/25 bg-ink/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors hover:border-orange hover:text-orange"
              >
                Close / Esc
              </button>
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-paper/40">
                Portfolio-native ports of my original Three.js studies. Move the pointer through each scene.
              </p>

              <div className="pointer-events-auto flex max-w-full gap-2 overflow-x-auto pb-1">
                {studies.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStudy(item.id)}
                    className={[
                      "shrink-0 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.13em] transition-colors",
                      item.id === study
                        ? "border-orange bg-orange text-ink"
                        : "border-paper/20 bg-ink/70 text-paper/60 hover:border-paper/50 hover:text-paper",
                    ].join(" ")}
                    aria-pressed={item.id === study}
                  >
                    {String(index + 1).padStart(2, "0")} {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
