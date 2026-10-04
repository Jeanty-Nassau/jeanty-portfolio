"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

const nodes = [
  {
    id: "sources",
    label: "Event Sources",
    x: 80,
    y: 150,
    width: 150,
  },
  {
    id: "ingress",
    label: "Ingress",
    x: 290,
    y: 150,
    width: 130,
  },
  {
    id: "kafka",
    label: "Kafka",
    x: 480,
    y: 150,
    width: 130,
  },
  {
    id: "consumer",
    label: "Consumers",
    x: 670,
    y: 150,
    width: 140,
  },
  {
    id: "services",
    label: "Processing",
    x: 870,
    y: 150,
    width: 150,
  },
  {
    id: "database",
    label: "PostgreSQL",
    x: 1080,
    y: 150,
    width: 160,
  },
  {
    id: "alerts",
    label: "Alerts",
    x: 870,
    y: 320,
    width: 150,
  },
];

function Node({
  label,
  x,
  y,
  width,
}: {
  label: string;
  x: number;
  y: number;
  width: number;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="64"
        rx="8"
        fill="rgba(247,247,242,0.06)"
        stroke="rgba(247,247,242,0.35)"
      />

      <text
        x={x + width / 2}
        y={y + 39}
        textAnchor="middle"
        fill="#f7f7f2"
        fontSize="13"
        fontFamily="var(--font-geist-mono)"
        letterSpacing="1.2"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

export function WebhookArchitecture() {
    const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-cobalt text-paper">
      <div className="px-[var(--page-padding)] py-20 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/55">
                System Shape
              </p>
            </div>

            <div className="lg:col-span-9">
              <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.04em] md:text-5xl">
                Events moving through a distributed processing pipeline.
              </h2>

              <p className="mt-6 max-w-2xl leading-7 text-paper/65">
                A simplified public view of the architecture. Internal service
                names, business logic, customer-specific flows, and proprietary
                implementation details are intentionally omitted.
              </p>
            </div>
          </div>

          <div className="mt-16 overflow-x-auto border-y border-paper/20 py-12">
            <svg
              viewBox="0 0 1320 450"
              className="min-w-[1100px] w-full"
              role="img"
              aria-label="Simplified distributed event processing architecture"
            >
              <defs>
                <marker
                  id="arrow"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3"
                  orient="auto"
                >
                  <path
                    d="M0,0 L0,6 L6,3 z"
                    fill="rgba(247,247,242,0.45)"
                  />
                </marker>
              </defs>

              {/* Main pipeline */}
              <path
                d="M230 182 H290"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              <path
                d="M420 182 H480"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              <path
                d="M610 182 H670"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              <path
                d="M810 182 H870"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              <path
                d="M1020 182 H1080"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              {/* Failure / alert path */}
              <path
                d="M945 214 V285 H945 V320"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              {/* Nodes */}
              {nodes.map((node) => (
                <Node
                  key={node.id}
                  label={node.label}
                  x={node.x}
                  y={node.y}
                  width={node.width}
                />
              ))}
            <circle
             cx="545"
             cy="142"
             r="4"
             fill="#ff5c1a"
            />
              {/* Event packets */}
              <motion.circle
                r="5"
                fill="#ff5c1a"
                initial={{ cx: 230, cy: 182 }}
                animate={{
                  cx: [230, 290, 420, 480, 610, 670, 810, 870, 1020, 1080],
                  cy: [182, 182, 182, 182, 182, 182, 182, 182, 182, 182],
                }}
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              />

              <motion.circle
                r="4"
                fill="#ff5c1a"
                initial={{ cx: 230, cy: 182 }}
                animate={{
                  cx: [230, 290, 420, 480, 610, 670, 810, 870, 945, 945],
                  cy: [182, 182, 182, 182, 182, 182, 182, 182, 182, 320],
                }}
                transition={
                  shouldReduceMotion
                    ? {
                        duration: 0,
                      }
                    : {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2,
                      }
                }
              />

              <text
                x="945"
                y="395"
                textAnchor="middle"
                fill="rgba(247,247,242,0.45)"
                fontSize="11"
                fontFamily="var(--font-geist-mono)"
                letterSpacing="1.3"
              >
                FAILURE PATH
              </text>
            </svg>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/45">
            <span>Orange = event flow</span>
            <span>White = system boundary</span>
            <span>Diagram intentionally simplified</span>
          </div>
        </div>
      </div>
    </section>
  );
}