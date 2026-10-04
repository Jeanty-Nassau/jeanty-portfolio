import type { CaseStudy } from "@/types/case-study";

export const webhookProcessingCaseStudy: CaseStudy = {
  projectSlug: "webhook-processing-platform",

  intro:
    "A public .NET reference implementation of a durable asynchronous event-processing pipeline, focused on the failure modes that matter after a message has been published.",

  metrics: [
    {
      value: "At-least-once",
      label: "Delivery model",
      detail: "With idempotent side effects",
    },
    {
      value: "1s / 5s / 30s",
      label: "Retry schedule",
      detail: "Durable PostgreSQL-backed delays with jitter",
    },
    {
      value: "OpenTelemetry",
      label: "Observability",
      detail: "Traces, metrics, Prometheus, Tempo and Grafana",
    },
  ],

  sections: [
    {
      eyebrow: "Reliability",
      title: "Duplicate delivery is expected, not exceptional",
      body: [
        "The processor implements at-least-once delivery with PostgreSQL-enforced idempotency, so a crash after persistence but before offset commit can safely result in redelivery.",

        "The project deliberately avoids an exactly-once claim. Its guarantees are expressed in application terms that can be demonstrated and tested.",
      ],
    },

    {
      eyebrow: "Failure handling",
      title: "Retries are durable state",
      body: [
        "Retryable failures are persisted with a next-attempt timestamp and handled by a separate dispatcher rather than by sleeping consumers.",

        "Permanent failures and exhausted retries move to a dead-letter topic, with source offsets committed only after the relevant durable action succeeds.",
      ],
    },

    {
      eyebrow: "Operations",
      title: "The system is designed to be inspected while it fails",
      body: [
        "The local stack includes Redpanda, PostgreSQL, OpenTelemetry Collector, Prometheus, Tempo, and Grafana.",

        "Container-backed integration tests, failure-simulation scripts, smoke tests, and a k6 workload make the reliability model repeatable rather than just documented.",
      ],
    },
  ],

  contributions: [
    {
      title: "Delivery semantics",
      description:
        "At-least-once processing with database-enforced idempotency for safe redelivery.",
    },
    {
      title: "Durable retries",
      description:
        "PostgreSQL-backed retry scheduling with a separate dispatcher for due work.",
    },
    {
      title: "Dead-letter recovery",
      description:
        "Permanent and exhausted events reach a DLQ without prematurely committing source offsets.",
    },
    {
      title: "Operational visibility",
      description:
        "OpenTelemetry, Prometheus, Tempo, Grafana, integration tests, and repeatable failure scenarios.",
    },
  ],

  disclaimer:
    "This is an independently designed portfolio/reference project. It uses generic event-processing concepts and does not contain or reproduce proprietary employer code, schemas, business logic, naming, or architecture.",
};
