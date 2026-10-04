"use client";

import {
   OrbitControls,
  PerspectiveCamera,
  useTexture,
  useVideoTexture,
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
  | "displacement-field";

const RAW_ASSET_BASE =
  "https://raw.githubusercontent.com/Jeanty-Nassau";

const EARTH_TEXTURE =
  `${RAW_ASSET_BASE}/Interactive-World-ThreeJS/main/static/earth.jpeg`;

const CINEMA_ASSET_BASE =
  `${RAW_ASSET_BASE}/Interactive-CylinderCinema-ThreeJS/main/static`;

const CINEMA_SCREENS = [
  "Castle",
  "House",
  "Sky",
  "Building",
] as const;

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
      "A stylised Earth study built from the original world map, atmospheric glow, orbital graphics, and a slow passive rotation.",
    hint: "Drag to orbit · Scroll to zoom.",
  },
  {
    id: "signal-theatre",
    title: "Signal Theatre",
    eyebrow: "THREE.JS STUDY / 02",
    description:
      "A cylindrical cinema using the original project media, framed one screen at a time from a seated viewing perspective.",
    hint: "Switch screens · Zoom in or out.",
  },
  {
    id: "displacement-field",
    title: "Displacement Field",
    eyebrow: "THREE.JS STUDY / 03",
    description:
      "A radar-like signal terrain built from animated displacement, contour bands, scan energy, and pointer-driven pulses.",
    hint: "Move the pointer to send a pulse through the field.",
  },
];

function seededUnit(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function Stars() {
  const positions = useMemo(() => {
    const values = new Float32Array(1100 * 3);

    for (let index = 0; index < 1100; index += 1) {
      const radius = 14 + seededUnit(index, 1) * 36;
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
        size={0.035}
        transparent
        opacity={0.72}
        sizeAttenuation
      />
    </points>
  );
}

const earthVertex = `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(position, 1.0);
  }
`;

const earthFragment = `
  uniform sampler2D uMap;
  uniform float uTime;

  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec3 source = texture2D(uMap, vUv).rgb;

    float luminance =
      dot(source, vec3(0.299, 0.587, 0.114));

    float landMask = smoothstep(
      0.24,
      0.68,
      luminance + (source.g - source.b) * 0.22
    );

    vec3 ocean = vec3(0.012, 0.035, 0.18);
    vec3 landLow = vec3(0.12, 0.28, 1.0);
    vec3 landHigh = vec3(0.92, 0.95, 1.0);

    vec3 land = mix(
      landLow,
      landHigh,
      smoothstep(0.28, 0.84, luminance)
    );

    vec3 color = mix(ocean, land, landMask);

    vec3 normal = normalize(vNormal);

    float light =
      max(dot(normal, normalize(vec3(0.45, 0.28, 1.0))), 0.0);

    color *= 0.42 + light * 0.88;

    float night = pow(1.0 - light, 2.4);
    float citySignal =
      smoothstep(0.7, 0.94, luminance) * night;

    color +=
      vec3(1.0, 0.34, 0.03) *
      citySignal *
      2.2;

    float rim =
      pow(1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0))), 3.0);

    color +=
      vec3(0.04, 0.2, 1.0) *
      rim *
      1.1;

    float lon =
      abs(fract(vUv.x * 18.0) - 0.5);

    float lat =
      abs(fract(vUv.y * 10.0) - 0.5);

    float grid =
      1.0 -
      smoothstep(
        0.455,
        0.5,
        min(lon, lat)
      );

    color +=
      vec3(0.12, 0.32, 1.0) *
      grid *
      0.18;

    float scanCenter =
      fract(uTime * 0.055);

    float scan =
      1.0 -
      smoothstep(
        0.0,
        0.035,
        abs(vUv.y - scanCenter)
      );

    color +=
      vec3(1.0, 0.38, 0.03) *
      scan *
      landMask *
      1.25;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function OrbitalSignals() {
  const texture = useTexture(EARTH_TEXTURE);
  const earth = useRef<THREE.Mesh>(null);
  const earthMaterial = useRef<THREE.ShaderMaterial>(null);
  const orbitRig = useRef<THREE.Group>(null);

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uTime: { value: 0 },
    }),
    [texture],
  );

  useFrame((state, delta) => {
    if (earthMaterial.current) {
      earthMaterial.current.uniforms.uTime.value =
        state.clock.elapsedTime;
    }
    if (earth.current) {
      earth.current.rotation.y += delta * 0.045;
    }

    if (orbitRig.current) {
      orbitRig.current.rotation.y += delta * 0.11;
      orbitRig.current.rotation.z += delta * 0.025;
    }
  });

  return (
    <>
      <Stars />

      <group rotation={[0, 0, THREE.MathUtils.degToRad(-23.4)]}>
        <mesh ref={earth}>
          <sphereGeometry args={[2.05, 128, 128]} />
          <shaderMaterial
            ref={earthMaterial}
            vertexShader={earthVertex}
            fragmentShader={earthFragment}
            uniforms={uniforms}
          />
        </mesh>

        <mesh scale={1.035}>
          <sphereGeometry args={[2.05, 48, 48]} />
          <meshBasicMaterial
            color="#91a7ff"
            wireframe
            transparent
            opacity={0.07}
          />
        </mesh>

        <mesh scale={1.09}>
          <sphereGeometry args={[2.05, 72, 72]} />
          <meshBasicMaterial
            color="#1847ff"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      <group ref={orbitRig}>
        <mesh rotation={[Math.PI / 2.25, 0.1, 0.2]}>
          <torusGeometry args={[2.8, 0.012, 10, 220]} />
          <meshBasicMaterial
            color="#ff991c"
            transparent
            opacity={0.72}
          />
        </mesh>

        <mesh rotation={[1.0, 0.4, 0.7]}>
          <torusGeometry args={[3.25, 0.006, 8, 220]} />
          <meshBasicMaterial
            color="#91a7ff"
            transparent
            opacity={0.38}
          />
        </mesh>

        <mesh position={[2.65, 0.85, 0]}>
          <sphereGeometry args={[0.07, 18, 18]} />
          <meshBasicMaterial color="#ff991c" />
        </mesh>

        <mesh position={[-2.45, -1.15, 0.35]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#91a7ff" />
        </mesh>

        <mesh rotation={[0.2, 1.15, 0.3]}>
          <torusGeometry args={[3.7, 0.004, 8, 240]} />
          <meshBasicMaterial
            color="#ff991c"
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>

      <ambientLight intensity={0.34} />
      <directionalLight position={[6, 4, 7]} intensity={1.7} />
      <pointLight
        position={[-6, 1.5, 3]}
        intensity={18}
        color="#1847ff"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={5.4}
        maxDistance={10}
        minPolarAngle={Math.PI * 0.2}
        maxPolarAngle={Math.PI * 0.8}
        target={[0, 0, 0]}
      />
    </>
  );
}

function SignalTheatre({
  screenIndex,
  fov,
}: {
  screenIndex: number;
  fov: number;
}) {
  const castle = useVideoTexture(
    `${CINEMA_ASSET_BASE}/castleGif.mp4`,
    {
      muted: true,
      loop: true,
      playsInline: true,
      crossOrigin: "anonymous",
    },
  );
  const house = useVideoTexture(
    `${CINEMA_ASSET_BASE}/houseGif.mp4`,
    {
      muted: true,
      loop: true,
      playsInline: true,
      crossOrigin: "anonymous",
    },
  );
  const sky = useVideoTexture(
    `${CINEMA_ASSET_BASE}/sky2Gif.mp4`,
    {
      muted: true,
      loop: true,
      playsInline: true,
      crossOrigin: "anonymous",
    },
  );
  const buildingSource = useTexture(
    `${CINEMA_ASSET_BASE}/building.jpeg`,
  );
  const building = useMemo(() => {
    const clone = buildingSource.clone();
    clone.colorSpace = THREE.SRGBColorSpace;
    clone.needsUpdate = true;
    return clone;
  }, [buildingSource]);

  useEffect(() => {
    return () => {
      building.dispose();
    };
  }, [building]);

  const theatre = useRef<THREE.Group>(null);
  const screenArc = Math.PI / 2 - 0.16;

  useFrame(() => {
    if (!theatre.current) return;

    const target = -screenIndex * (Math.PI / 2);

    theatre.current.rotation.y +=
      (target - theatre.current.rotation.y) * 0.085;
  });

  const textures = [castle, house, sky, building];

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 0.28, 0]}
        rotation={[-0.09, 0, 0]}
        fov={fov}
        near={0.1}
        far={80}
      />

      <group ref={theatre}>
        {textures.map((texture, index) => {
          const thetaStart =
            Math.PI -
            screenArc / 2 +
            index * (Math.PI / 2);

          return (
            <mesh key={index}>
              <cylinderGeometry
                args={[
                  5,
                  5,
                  2.8,
                  96,
                  1,
                  true,
                  thetaStart,
                  screenArc,
                ]}
              />

              <meshBasicMaterial
                map={texture}
                side={THREE.BackSide}
                toneMapped={false}
              />
            </mesh>
          );
        })}
      </group>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.4, 0]}
      >
        <circleGeometry args={[4.95, 96]} />

        <meshStandardMaterial
          color="#11151f"
          roughness={0.72}
          metalness={0.1}
        />
      </mesh>

      <ambientLight intensity={0.2} />

      <pointLight
        position={[-1.5, 1.8, 0]}
        intensity={16}
        color="#1847ff"
      />

      <pointLight
        position={[1.8, 1.1, 0.5]}
        intensity={9}
        color="#ff991c"
      />
    </>
  );
}

const waveVertex = `
  uniform float uTime;
  uniform vec2 uPointer;

  varying vec2 vUv;
  varying float vHeight;
  varying float vPulse;
  varying float vSweep;

  void main() {
    vec3 p = position;
    vUv = uv;

    vec2 pointerUv =
      vec2(0.5) + uPointer * 0.22;

    float radial =
      distance(uv, pointerUv);

    float waveA =
      sin((p.x * 1.75) + uTime * 0.95) * 0.2;

    float waveB =
      cos((p.y * 2.4) - uTime * 0.78) * 0.15;

    float diagonal =
      sin(
        (p.x + p.y) * 1.9 -
        uTime * 1.15
      ) * 0.11;

    float ripple =
      sin(
        radial * 34.0 -
        uTime * 3.3
      ) *
      exp(-radial * 5.4) *
      0.28;

    float sweepPhase =
      fract(uTime * 0.115);

    float sweepDistance =
      abs(uv.y - sweepPhase);

    float sweep =
      exp(-sweepDistance * 32.0);

    p.z +=
      waveA +
      waveB +
      diagonal +
      ripple +
      sweep * 0.12;

    vHeight = p.z;
    vPulse = exp(-radial * 6.0);
    vSweep = sweep;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(p, 1.0);
  }
`;

const waveFragment = `
  uniform float uTime;

  varying vec2 vUv;
  varying float vHeight;
  varying float vPulse;
  varying float vSweep;

  void main() {
    vec3 deep =
      vec3(0.008, 0.016, 0.055);

    vec3 cobalt =
      vec3(0.025, 0.12, 0.68);

    vec3 electric =
      vec3(0.16, 0.42, 1.0);

    float heightMix =
      smoothstep(-0.55, 0.6, vHeight);

    vec3 color =
      mix(deep, cobalt, heightMix);

    color =
      mix(
        color,
        electric,
        smoothstep(0.12, 0.7, vHeight)
      );

    float contourPhase =
      fract((vHeight + 0.65) * 8.5);

    float contour =
      1.0 -
      smoothstep(
        0.455,
        0.5,
        abs(contourPhase - 0.5)
      );

    color +=
      vec3(0.5, 0.66, 1.0) *
      contour *
      0.2;

    float gridX =
      1.0 -
      smoothstep(
        0.47,
        0.5,
        abs(fract(vUv.x * 18.0) - 0.5)
      );

    float gridY =
      1.0 -
      smoothstep(
        0.47,
        0.5,
        abs(fract(vUv.y * 12.0) - 0.5)
      );

    float grid =
      max(gridX, gridY);

    color +=
      vec3(0.12, 0.25, 0.72) *
      grid *
      0.12;

    float hotPeak =
      smoothstep(0.22, 0.72, vHeight);

    color +=
      vec3(1.0, 0.28, 0.02) *
      hotPeak *
      0.55;

    color +=
      vec3(1.0, 0.42, 0.04) *
      vPulse *
      0.82;

    color +=
      vec3(1.0, 0.5, 0.08) *
      vSweep *
      0.95;

    float edgeFade =
      smoothstep(
        0.02,
        0.16,
        min(
          min(vUv.x, 1.0 - vUv.x),
          min(vUv.y, 1.0 - vUv.y)
        )
      );

    float flicker =
      0.96 +
      sin(uTime * 7.0 + vUv.x * 20.0) *
      0.02;

    gl_FragColor =
      vec4(
        color * flicker,
        edgeFade
      );
  }
`;

const waveWireFragment = `
  varying float vPulse;
  varying float vSweep;

  void main() {
    vec3 base =
      vec3(0.3, 0.5, 1.0);

    vec3 pulse =
      vec3(1.0, 0.45, 0.05) *
      (vPulse * 0.7 + vSweep * 0.55);

    gl_FragColor =
      vec4(base + pulse, 0.16);
  }
`;

function DisplacementField() {
  const group =
    useRef<THREE.Group>(null);
  const surfaceMaterial =
    useRef<THREE.ShaderMaterial>(null);
  const wireMaterial =
    useRef<THREE.ShaderMaterial>(null);

  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: {
        value: new THREE.Vector2(),
      },
    }),
    [],
  );

  const signalNodes = useMemo(
    () => [
      [-2.2, 1.45, 0.22] as const,
      [1.7, 1.0, 0.18] as const,
      [2.15, -1.25, 0.26] as const,
      [-1.35, -1.55, 0.2] as const,
    ],
    [],
  );

  useFrame((state) => {
    if (surfaceMaterial.current) {
      surfaceMaterial.current.uniforms.uTime.value =
        state.clock.elapsedTime;

      surfaceMaterial.current.uniforms.uPointer.value.set(
        pointer.x,
        pointer.y,
      );
    }

    if (wireMaterial.current) {
      wireMaterial.current.uniforms.uTime.value =
        state.clock.elapsedTime;

      wireMaterial.current.uniforms.uPointer.value.set(
        pointer.x,
        pointer.y,
      );
    }

    if (group.current) {
      group.current.rotation.z +=
        (pointer.x * 0.1 -
          group.current.rotation.z) *
        0.035;

      group.current.rotation.x +=
        (-0.86 -
          pointer.y * 0.055 -
          group.current.rotation.x) *
        0.035;

      group.current.position.y +=
        (-0.5 -
          pointer.y * 0.12 -
          group.current.position.y) *
        0.03;
    }
  });

  return (
    <>
      <group
        ref={group}
        rotation={[-0.86, 0, 0]}
        position={[1.0, -0.5, 0]}
      >
        <mesh>
          <planeGeometry
            args={[7.8, 7.8, 180, 180]}
          />

          <shaderMaterial
            ref={surfaceMaterial}
            vertexShader={waveVertex}
            fragmentShader={waveFragment}
            uniforms={uniforms}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0, 0.025]}>
          <planeGeometry
            args={[7.8, 7.8, 84, 84]}
          />

          <shaderMaterial
            ref={wireMaterial}
            vertexShader={waveVertex}
            fragmentShader={waveWireFragment}
            uniforms={uniforms}
            transparent
            wireframe
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {signalNodes.map(
          (position, index) => (
            <group
              key={index}
              position={position}
            >
              <mesh>
                <sphereGeometry
                  args={[0.055, 18, 18]}
                />

                <meshBasicMaterial
                  color={
                    index % 2 === 0
                      ? "#ff991c"
                      : "#91a7ff"
                  }
                />
              </mesh>

              <mesh
                rotation={[Math.PI / 2, 0, 0]}
              >
                <ringGeometry
                  args={[0.11, 0.125, 32]}
                />

                <meshBasicMaterial
                  color="#ff991c"
                  transparent
                  opacity={0.5}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          ),
        )}
      </group>

      <pointLight
        position={[3, 4, 3]}
        intensity={16}
        color="#1847ff"
      />

      <pointLight
        position={[-3, -1, 2]}
        intensity={13}
        color="#ff991c"
      />

      <pointLight
        position={[0, 1.5, 2]}
        intensity={7}
        color="#91a7ff"
      />
    </>
  );
}

function StudyScene({
  study,
  cinemaScreen,
  cinemaFov,
}: {
  study: StudyId;
  cinemaScreen: number;
  cinemaFov: number;
}) {
  return (
    <>
      {study === "orbital-signals" && (
        <OrbitalSignals />
      )}

      {study === "signal-theatre" && (
        <SignalTheatre
          screenIndex={cinemaScreen}
          fov={cinemaFov}
        />
      )}

      {study === "displacement-field" && (
        <DisplacementField />
      )}
    </>
  );
}

export function CreativeMode() {
  const [active, setActive] = useState(false);
  const [study, setStudy] =
    useState<StudyId>("orbital-signals");
  const [cinemaScreen, setCinemaScreen] =
    useState(0);
  const [cinemaFov, setCinemaFov] =
    useState(52);

  const selected =
    studies.find((item) => item.id === study) ??
    studies[0];

  useEffect(() => {
    if (!active) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setActive(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [active]);

  function showCinemaScreen(next: number) {
    const normalized =
      (next + CINEMA_SCREENS.length) %
      CINEMA_SCREENS.length;

    setCinemaScreen(normalized);
    setCinemaFov(52);
  }

  function changeCinemaZoom(delta: number) {
    setCinemaFov((current) =>
      THREE.MathUtils.clamp(
        current + delta,
        38,
        68,
      ),
    );
  }

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
          onWheel={(event) => {
            if (study === "signal-theatre") {
              changeCinemaZoom(
                Math.sign(event.deltaY) * 2,
              );
            }
          }}
        >
          <div className="absolute inset-0">
            <Canvas
              key={study}
              camera={{
                position: [0, 0, 6.5],
                fov: 48,
              }}
              dpr={[1, 1.65]}
              gl={{
                antialias: true,
                powerPreference:
                  "high-performance",
              }}
            >
              <color
                attach="background"
                args={["#05070b"]}
              />

              <StudyScene
                study={study}
                cinemaScreen={cinemaScreen}
                cinemaFov={cinemaFov}
              />
            </Canvas>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,11,0.94)_0%,rgba(5,7,11,0.5)_24%,rgba(5,7,11,0.08)_44%,transparent_58%)]" />

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5 md:p-8">
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-md">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-orange">
                  {selected.eyebrow}
                </p>

                <h2 className="mt-3 text-4xl font-medium leading-[0.9] tracking-[-0.055em] md:text-6xl">
                  {selected.title}
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-paper/60">
                  {selected.description}
                </p>

                <p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-orange">
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

            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="pointer-events-auto flex flex-wrap items-center gap-2">
                {study === "signal-theatre" && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        showCinemaScreen(
                          cinemaScreen - 1,
                        )
                      }
                      className="border border-paper/20 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-orange hover:text-orange"
                    >
                      ← Prev screen
                    </button>

                    <span className="min-w-24 text-center font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-orange">
                      {CINEMA_SCREENS[cinemaScreen]}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        showCinemaScreen(
                          cinemaScreen + 1,
                        )
                      }
                      className="border border-paper/20 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-orange hover:text-orange"
                    >
                      Next screen →
                    </button>

                    <span
                      className="mx-1 h-5 w-px bg-paper/15"
                      aria-hidden="true"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        changeCinemaZoom(-4)
                      }
                      className="border border-paper/20 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-orange hover:text-orange"
                      aria-label="Zoom in"
                    >
                      Zoom +
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        changeCinemaZoom(4)
                      }
                      className="border border-paper/20 bg-ink/70 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-orange hover:text-orange"
                      aria-label="Zoom out"
                    >
                      Zoom −
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
                      setCinemaScreen(0);
                      setCinemaFov(52);
                    }}
                    className={[
                      "shrink-0 border px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.13em] transition-all",
                      item.id === study
                        ? "border-orange bg-orange text-ink"
                        : "border-paper/20 bg-ink/70 text-paper/60 hover:border-orange hover:text-orange",
                    ].join(" ")}
                    aria-pressed={item.id === study}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}{" "}
                    {item.title}
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
