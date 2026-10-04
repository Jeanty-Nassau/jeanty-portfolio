"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

const nodes = [
  {
    id: "sources",
    label: "Event Sources",
    x: 70,
    y: 150,
    width: 150,
  },
  {
    id: "api",
    label: "Ingestion API",
    x: 275,
    y: 150,
    width: 150,
  },
  {
    id: "broker",
    label: "Kafka API",
    x: 485,
    y: 150,
    width: 140,
  },
  {
    id: "processor",
    label: "Processor",
    x: 685,
    y: 150,
    width: 145,
  },
  {
    id: "database",
    label: "PostgreSQL",
    x: 900,
    y: 150,
    width: 155,
  },
  {
    id: "retry",
    label: "Retry Dispatcher",
    x: 900,
    y: 315,
    width: 175,
  },
  {
    id: "dlq",
    label: "Dead Letter",
    x: 685,
    y: 315,
    width: 145,
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
                Reliability made visible in the architecture.
              </h2>

              <p className="mt-6 max-w-2xl leading-7 text-paper/65">
                HTTP ingestion feeds a Kafka-compatible broker. Consumers persist
                idempotent outcomes, retryable failures become durable scheduled
                work, and permanent failures are routed to a dead-letter topic.
              </p>
            </div>
          </div>

          <div className="mt-16 overflow-x-auto border-y border-paper/20 py-12">
            <svg
              viewBox="0 0 1160 470"
              className="w-full min-w-[980px]"
              role="img"
              aria-label="Event processing platform architecture"
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

              <path
                d="M220 182 H275"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />
              <path
                d="M425 182 H485"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />
              <path
                d="M625 182 H685"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />
              <path
                d="M830 182 H900"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              <path
                d="M757 214 V315"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              <path
                d="M977 214 V315"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              <path
                d="M900 347 H850 C790 347 785 265 785 214"
                stroke="rgba(247,247,242,0.3)"
                strokeWidth="1.5"
                fill="none"
                markerEnd="url(#arrow)"
              />

              {nodes.map((node) => (
                <Node
                  key={node.id}
                  label={node.label}
                  x={node.x}
                  y={node.y}
                  width={node.width}
                />
              ))}

              <motion.circle
                r="5"
                fill="#ff991c"
                initial={{ cx: 220, cy: 182 }}
                animate={{
                  cx: [220, 275, 425, 485, 625, 685, 830, 900],
                  cy: [182, 182, 182, 182, 182, 182, 182, 182],
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "linear",
                      }
                }
              />

              <motion.circle
                r="4"
                fill="#ff991c"
                initial={{ cx: 757, cy: 214 }}
                animate={{
                  cx: [757, 757],
                  cy: [214, 315],
                }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "linear",
                      }
                }
              />

              <text
                x="757"
                y="418"
                textAnchor="middle"
                fill="rgba(247,247,242,0.45)"
                fontSize="11"
                fontFamily="var(--font-geist-mono)"
                letterSpacing="1.3"
              >
                FAILURE / RETRY PATHS
              </text>
            </svg>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/45">
            <span>Orange = event flow</span>
            <span>Retry state is durable</span>
            <span>Duplicates are expected</span>
          </div>
        </div>
      </div>
    </section>
  );
}
