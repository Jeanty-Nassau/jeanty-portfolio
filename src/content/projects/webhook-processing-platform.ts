import type { CaseStudy } from "@/types/case-study";

export const webhookProcessingCaseStudy: CaseStudy = {
  projectSlug: "webhook-processing-platform",

  intro:
    "A public .NET reference implementation of a durable asynchronous event-processing pipeline, built to make failure semantics explicit rather than hide them behind a simple happy-path Kafka demo.",

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
      eyebrow: "Problem",
      title: "The difficult part starts after an event is published",
      body: [
        "Event-driven systems become interesting when delivery is duplicated, consumers crash between side effects and offset commits, downstream processing fails, or poison messages repeatedly return to the same consumer.",

        "This project was designed around those failure windows. The domain itself is intentionally small so the repository can focus on delivery semantics, recoverability, observability, and operational behaviour.",
      ],
    },

    {
      eyebrow: "Reliability",
      title: "At-least-once delivery with explicit idempotency",
      body: [
        "The processor treats duplicate delivery as expected behaviour rather than an exceptional case. EventId is the application idempotency key, enforced by PostgreSQL so a crash after persistence but before offset commit can safely result in redelivery.",

        "The project deliberately does not claim exactly-once processing. Broker guarantees do not automatically make arbitrary external side effects exactly once, so the reliability model is expressed in application terms that can be tested and reasoned about.",
      ],
    },

    {
      eyebrow: "Failure handling",
      title: "Retries are durable state, not sleeping consumers",
      body: [
        "Retryable failures are persisted with a next-attempt timestamp. A separate retry dispatcher safely claims due rows with PostgreSQL locking semantics and republishes them only when they are ready.",

        "Permanent failures and exhausted retries are published to a dead-letter topic. Source offsets are committed only after the relevant durable action succeeds, preserving recoverability when PostgreSQL or the broker is unavailable.",
      ],
    },

    {
      eyebrow: "Operations",
      title: "Designed to be inspected while it is failing",
      body: [
        "The local stack includes Redpanda, PostgreSQL, OpenTelemetry Collector, Prometheus, Tempo, and Grafana. Custom telemetry exposes ingestion, processing, duplicate, retry, and dead-letter behaviour without introducing high-cardinality identifiers.",

        "Integration tests use real disposable Kafka-compatible and PostgreSQL containers, and the repository includes repeatable scripts for duplicates, retries, dead-letter scenarios, consumer scaling, smoke tests, and load testing.",
      ],
    },
  ],

  contributions: [
    {
      title: "Explicit delivery semantics",
      description:
        "Implemented at-least-once processing with database-enforced idempotency so duplicate Kafka delivery does not duplicate logical side effects.",
    },

    {
      title: "Durable delayed retries",
      description:
        "Separated retry scheduling from consumer execution using PostgreSQL-backed retry state and a dispatcher that safely claims and republishes due work.",
    },

    {
      title: "Recoverable dead-letter handling",
      description:
        "Ensured malformed, unsupported, permanent, and retry-exhausted events reach a dead-letter topic without prematurely committing their source offsets.",
    },

    {
      title: "Operational visibility",
      description:
        "Instrumented the pipeline with OpenTelemetry traces and metrics and provisioned a local Prometheus, Tempo, and Grafana stack.",
    },

    {
      title: "Repeatable verification",
      description:
        "Added container-backed integration tests, failure-simulation scripts, smoke tests, and a k6 workload with a documented benchmark methodology.",
    },
  ],

  disclaimer:
    "This is an independently designed portfolio/reference project. It uses generic event-processing concepts and does not contain or reproduce proprietary employer code, schemas, business logic, naming, or architecture.",
};
