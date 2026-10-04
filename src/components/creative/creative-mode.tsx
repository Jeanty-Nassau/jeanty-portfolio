"use client";

import {
  MeshReflectorMaterial,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

type StudyId =
  | "orbital-signals"
  | "signal-theatre"
  | "displacement-field"
  | "noise-field"
  | "scroll-studies";

const RAW_ASSET_BASE =
  "https://raw.githubusercontent.com/Jeanty-Nassau";

const EARTH_TEXTURE =
  `${RAW_ASSET_BASE}/Interactive-World-ThreeJS/main/static/earth.jpeg`;

const CINEMA_ASSET_BASE =
  `${RAW_ASSET_BASE}/Interactive-CylinderCinema-ThreeJS/main/static`;

const studies: Array<{
  id: StudyId;
  title: string;
  eyebrow: string;
  description: string;
  hint: string;
}> = [
  {
    id: "orbital-signals",
    title: "Orbital Signals",
    eyebrow: "THREE.JS STUDY / 01",
    description:
      "An interactive Earth study built around texture mapping, atmospheric falloff, a procedural star field, and a quiet orbital camera.",
    hint: "Drag to orbit · Scroll to zoom · The Earth spins on its own.",
  },
  {
    id: "signal-theatre",
    title: "Signal Theatre",
    eyebrow: "THREE.JS STUDY / 02",
    description:
      "A cylindrical cinema rebuilt with the original castle, house, sky, building, and floor assets from the source project.",
    hint: "Drag to look around · Use the screen controls to rotate the theatre.",
  },
  {
    id: "displacement-field",
    title: "Displacement Field",
    eyebrow: "THREE.JS STUDY / 03",
    description:
      "A surface study using displacement, pointer influence, light, and depth to turn a simple plane into a responsive terrain.",
    hint: "Move the pointer to alter the field.",
  },
  {
    id: "noise-field",
    title: "Noise Field",
    eyebrow: "THREE.JS STUDY / 04",
    description:
      "A procedural geometry study driven by continuous noise and moving light.",
    hint: "Move the pointer to shift the field.",
  },
  {
    id: "scroll-studies",
    title: "Scroll Studies",
    eyebrow: "THREE.JS STUDY / 05",
    description:
      "A motion study combining simple forms, particles, parallax, and scroll-like scene progression.",
    hint: "Scroll over the canvas to move through the forms.",
  },
];

function seededUnit(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function Stars() {
  const positions = useMemo(() => {
    const values = new Float32Array(950 * 3);

    for (let index = 0; index < 950; index += 1) {
      const radius = 14 + seededUnit(index, 1) * 34;
      const theta = seededUnit(index, 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededUnit(index, 3) - 1);

      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      values[index * 3 + 2] = radius * Math.cos(phi);
    }

    return values;
  }, []);

  const points = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y -= delta * 0.004;
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
        size={0.04}
        transparent
        opacity={0.72}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalSignals() {
  const texture = useTexture(EARTH_TEXTURE);
  const earth = useRef<THREE.Mesh>(null);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((_, delta) => {
    if (earth.current) {
      earth.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <Stars />

      <group rotation={[0, 0, THREE.MathUtils.degToRad(-23.4)]}>
        <mesh ref={earth}>
          <sphereGeometry args={[2.05, 96, 96]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.82}
            metalness={0.02}
          />
        </mesh>

        <mesh scale={1.075}>
          <sphereGeometry args={[2.05, 72, 72]} />
          <meshBasicMaterial
            color="#1847ff"
            transparent
            opacity={0.11}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 4, 7]} intensity={2.2} />
      <pointLight position={[-6, 1.5, 3]} intensity={20} color="#1847ff" />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={5.4}
        maxDistance={10}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
        autoRotate={false}
        target={[0, 0, 0]}
      />
    </>
  );
}

function useVideoTexture(src: string) {
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null);

  useEffect(() => {
    const video = document.createElement("video");

    video.src = src;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const nextTexture = new THREE.VideoTexture(video);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.minFilter = THREE.LinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;

    setTexture(nextTexture);
    void video.play().catch(() => undefined);

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      nextTexture.dispose();
    };
  }, [src]);

  return texture;
}

function CinemaLookControls() {
  const { camera, gl } = useThree();
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);
  const currentYaw = useRef(0);
  const currentPitch = useRef(0);

  useEffect(() => {
    const element = gl.domElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const down = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      element.setPointerCapture(event.pointerId);
    };

    const move = (event: PointerEvent) => {
      if (!dragging) return;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;

      lastX = event.clientX;
      lastY = event.clientY;

      targetYaw.current -= dx * 0.0045;
      targetPitch.current = THREE.MathUtils.clamp(
        targetPitch.current - dy * 0.003,
        -0.34,
        0.34,
      );
    };

    const up = (event: PointerEvent) => {
      dragging = false;

      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
    };

    element.addEventListener("pointerdown", down);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerup", up);
    element.addEventListener("pointercancel", up);

    return () => {
      element.removeEventListener("pointerdown", down);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerup", up);
      element.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame(() => {
    currentYaw.current +=
      (targetYaw.current - currentYaw.current) * 0.08;
    currentPitch.current +=
      (targetPitch.current - currentPitch.current) * 0.08;

    camera.rotation.order = "YXZ";
    camera.rotation.y = currentYaw.current;
    camera.rotation.x = currentPitch.current;
  });

  return null;
}

function SignalTheatre({ turn }: { turn: number }) {
  const castle = useVideoTexture(
    `${CINEMA_ASSET_BASE}/castleGif.mp4`,
  );
  const house = useVideoTexture(
    `${CINEMA_ASSET_BASE}/houseGif.mp4`,
  );
  const sky = useVideoTexture(
    `${CINEMA_ASSET_BASE}/sky2Gif.mp4`,
  );
  const building = useTexture(
    `${CINEMA_ASSET_BASE}/building.jpeg`,
  );
  const floorTexture = useTexture(
    `${CINEMA_ASSET_BASE}/floorTexture.jpg`,
  );

  const theatre = useRef<THREE.Group>(null);

  useEffect(() => {
    building.colorSpace = THREE.SRGBColorSpace;
    floorTexture.colorSpace = THREE.SRGBColorSpace;

    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(8, 8);

    building.needsUpdate = true;
    floorTexture.needsUpdate = true;
  }, [building, floorTexture]);

  useFrame(() => {
    if (!theatre.current) return;

    const target = turn * (Math.PI / 2);
    theatre.current.rotation.y +=
      (target - theatre.current.rotation.y) * 0.06;
  });

  const textures = [castle, house, sky, building];

  return (
    <>
      <CinemaLookControls />

      <group ref={theatre}>
        {textures.map((texture, index) => (
          <mesh key={index}>
            <cylinderGeometry
              args={[
                4.2,
                4.2,
                2.45,
                96,
                1,
                true,
                index * (Math.PI / 2),
                Math.PI / 2 - 0.06,
              ]}
            />
            {texture ? (
              <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
                toneMapped={false}
              />
            ) : (
              <meshBasicMaterial
                color={index % 2 === 0 ? "#1847ff" : "#1036cc"}
                side={THREE.BackSide}
              />
            )}
          </mesh>
        ))}
      </group>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.23, 0]}
      >
        <circleGeometry args={[4, 96]} />
        <MeshReflectorMaterial
          map={floorTexture}
          color="#6e7482"
          roughness={0.55}
          metalness={0.2}
          mirror={0.35}
          blur={[220, 90]}
          resolution={512}
          mixBlur={1}
          mixStrength={0.55}
        />
      </mesh>

      <ambientLight intensity={0.24} />
      <pointLight position={[-1.5, 1.8, 0]} intensity={20} color="#1847ff" />
      <pointLight position={[1.8, 1.2, 0.5]} intensity={12} color="#ff991c" />
    </>
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
      mesh.current.rotation.z +=
        ((pointer.x * 0.12) - mesh.current.rotation.z) * 0.04;
    }
  });

  return (
    <>
      <mesh
        ref={mesh}
        rotation={[-0.82, 0, 0]}
        position={[1.1, -0.5, 0]}
      >
        <planeGeometry args={[7.2, 7.2, 128, 128]} />

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

      <pointLight position={[3, 4, 3]} intensity={18} color="#1847ff" />
      <pointLight position={[-3, -1, 2]} intensity={10} color="#ff991c" />
    </>
  );
}

const noiseVertex = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying float vHeight;

  float field(vec2 p) {
    float a = sin(p.x * 1.4 + uTime * 0.8);
    float b = cos(p.y * 1.8 - uTime * 0.55);
    float c = sin((p.x + p.y) * 0.85 + uTime * 0.4);
    return (a + b + c) / 3.0;
  }

  void main() {
    vec3 p = position;
    p.z += field(p.xy + uPointer * 0.5) * 0.7;
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
  const { pointer } = useThree();

  useFrame((state) => {
    if (!material.current) return;

    material.current.uniforms.uTime.value = state.clock.elapsedTime;
    material.current.uniforms.uPointer.value.set(pointer.x, pointer.y);
  });

  return (
    <mesh
      rotation={[-1.03, 0, 0]}
      position={[1.1, -1.2, -0.4]}
    >
      <planeGeometry args={[10, 8, 150, 110]} />

      <shaderMaterial
        ref={material}
        vertexShader={noiseVertex}
        fragmentShader={noiseFragment}
        uniforms={{
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2() },
        }}
        wireframe
      />
    </mesh>
  );
}

function ScrollStudies() {
  const group = useRef<THREE.Group>(null);
  const { gl, pointer } = useThree();
  const targetPhase = useRef(0);
  const currentPhase = useRef(0);

  useEffect(() => {
    const element = gl.domElement;

    const wheel = (event: WheelEvent) => {
      event.preventDefault();

      targetPhase.current = THREE.MathUtils.clamp(
        targetPhase.current + Math.sign(event.deltaY),
        0,
        2,
      );
    };

    element.addEventListener("wheel", wheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", wheel);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!group.current) return;

    currentPhase.current +=
      (targetPhase.current - currentPhase.current) * 0.08;

    group.current.position.y = currentPhase.current * 2.6;
    group.current.position.x +=
      (pointer.x * 0.35 - group.current.position.x) * 0.04;

    group.current.children.forEach((child, index) => {
      child.rotation.x += delta * (0.08 + index * 0.025);
      child.rotation.y += delta * (0.11 + index * 0.02);
    });
  });

  return (
    <group ref={group}>
      <mesh position={[2.0, 0, 0]}>
        <torusGeometry args={[0.85, 0.28, 24, 80]} />
        <meshToonMaterial color="#91a7ff" />
      </mesh>

      <mesh position={[-1.8, -2.6, 0]}>
        <coneGeometry args={[0.9, 1.8, 40]} />
        <meshToonMaterial color="#f7f7f2" />
      </mesh>

      <mesh position={[2.0, -5.2, 0]}>
        <torusKnotGeometry args={[0.65, 0.2, 120, 18]} />
        <meshToonMaterial color="#ff991c" />
      </mesh>
    </group>
  );
}

function StudyScene({
  study,
  cinemaTurn,
}: {
  study: StudyId;
  cinemaTurn: number;
}) {
  return (
    <>
      <ambientLight intensity={0.45} />

      {study === "orbital-signals" && <OrbitalSignals />}
      {study === "signal-theatre" && (
        <SignalTheatre turn={cinemaTurn} />
      )}
      {study === "displacement-field" && <DisplacementField />}
      {study === "noise-field" && <NoiseField />}
      {study === "scroll-studies" && <ScrollStudies />}
    </>
  );
}

export function CreativeMode() {
  const [active, setActive] = useState(false);
  const [study, setStudy] = useState<StudyId>("orbital-signals");
  const [cinemaTurn, setCinemaTurn] = useState(0);

  const selected =
    studies.find((item) => item.id === study) ?? studies[0];

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
        className="fixed bottom-5 left-5 z-[70] hidden items-center gap-2 border border-paper/25 bg-ink/85 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-paper backdrop-blur-md transition-all hover:border-orange hover:bg-orange hover:text-ink md:inline-flex"
        aria-haspopup="dialog"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-orange" />
        Live studies
      </button>

      {active && (
        <div
          className="fixed inset-0 z-[10000] overflow-hidden bg-ink text-paper"
          role="dialog"
          aria-modal="true"
          aria-label="Live creative coding studies"
        >
          <div className="absolute inset-0">
            <Canvas
              key={study}
              camera={
                study === "signal-theatre"
                  ? { position: [0, 0.1, 0.3], fov: 52 }
                  : { position: [0, 0, 6.5], fov: 48 }
              }
              dpr={[1, 1.65]}
              gl={{
                antialias: true,
                powerPreference: "high-performance",
              }}
            >
              <color attach="background" args={["#05070b"]} />

              <StudyScene
                study={study}
                cinemaTurn={cinemaTurn}
              />
            </Canvas>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,11,0.96)_0%,rgba(5,7,11,0.66)_30%,rgba(5,7,11,0.08)_58%,transparent_76%)]" />

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 md:p-8">
            <div className="flex items-start justify-between gap-6 border-b border-paper/20 pb-5">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-orange">
                  {selected.eyebrow}
                </p>

                <h2 className="mt-3 text-4xl font-medium leading-[0.9] tracking-[-0.055em] md:text-7xl">
                  {selected.title}
                </h2>

                <p className="mt-5 max-w-lg text-sm leading-7 text-paper/65 md:text-base">
                  {selected.description}
                </p>

                <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-orange">
                  {selected.hint}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActive(false)}
                className="pointer-events-auto border border-paper/25 bg-ink/70 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:border-orange hover:bg-orange hover:text-ink"
              >
                Close / Esc
              </button>
            </div>

            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="pointer-events-auto flex items-center gap-2">
                {study === "signal-theatre" && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setCinemaTurn((value) => value - 1)
                      }
                      className="border border-paper/20 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-orange hover:text-orange"
                    >
                      ← Screen
                    </button>

                    <button
                      type="button"
                      onClick={() => setCinemaTurn(0)}
                      className="border border-paper/20 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-orange hover:text-orange"
                    >
                      Center
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCinemaTurn((value) => value + 1)
                      }
                      className="border border-paper/20 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-orange hover:text-orange"
                    >
                      Screen →
                    </button>
                  </>
                )}
              </div>

              <div className="pointer-events-auto flex max-w-full gap-2 overflow-x-auto pb-1">
                {studies.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setStudy(item.id);
                      setCinemaTurn(0);
                    }}
                    className={[
                      "shrink-0 border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-all",
                      item.id === study
                        ? "border-orange bg-orange text-ink"
                        : "border-paper/20 bg-ink/70 text-paper/60 hover:border-orange hover:text-orange",
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
