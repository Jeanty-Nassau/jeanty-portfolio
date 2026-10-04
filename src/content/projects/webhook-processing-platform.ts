import type { CaseStudy } from "@/types/case-study";

export const webhookProcessingCaseStudy: CaseStudy = {
  projectSlug: "webhook-processing-platform",

  intro:
    "Production backend infrastructure responsible for ingesting and processing high-volume telematics events across distributed services. My work focused on reliability, event processing, integration boundaries, data access, testing, and operational correctness.",

  metrics: [
    {
      value: "50M+",
      label: "Events processed per day",
      detail: "Typical production volume",
    },
    {
      value: "1K+",
      label: "Events per second",
      detail: "Sustained throughput",
    },
    {
      value: "99.99%+",
      label: "Successful processing",
      detail: "Observed across a representative production window",
    },
  ],

  sections: [
    {
      eyebrow: "Context",
      title: "Operating at production scale",
      body: [
        "The platform sits within a fleet-telematics environment where large volumes of incoming events must be received, validated, transformed, routed, and processed reliably across multiple backend services.",

        "At this scale, seemingly small implementation details can become operational problems. Error propagation, serialization behaviour, database access patterns, retry semantics, and downstream API failures all affect the reliability of the wider system.",
      ],
    },

    {
      eyebrow: "Engineering",
      title: "Designing for failure, not just the happy path",
      body: [
        "A recurring focus of my work was making failures visible and actionable rather than allowing services to fail silently or lose important context.",

        "This included improving exception propagation through asynchronous consumers, addressing integration edge cases, strengthening data access behaviour, and expanding automated test coverage around areas where regressions would be costly.",
      ],
    },

    {
      eyebrow: "Architecture",
      title: "Working across system boundaries",
      body: [
        "The work spans event-driven services, Kafka-based consumers, AWS infrastructure, PostgreSQL-backed services, and external or internal APIs.",

        "A large part of the engineering challenge is not any individual technology. It is preserving correct behaviour as data moves between systems with different contracts, failure modes, and operational constraints.",
      ],
    },
  ],

  contributions: [
    {
      title: "Improved consumer failure propagation",
      description:
        "Changed Kafka consumer error handling so specific downstream failures propagated correctly and could trigger critical operational alerts instead of being obscured by generic processing behaviour.",
    },

    {
      title: "Modernised legacy data access",
      description:
        "Helped remove legacy data-access code and replace it with PostgreSQL and Dapper-based implementations, including JSON type handling and integration-test coverage.",
    },

    {
      title: "Provider abstraction work",
      description:
        "Contributed to provider-agnostic abstractions used to reduce coupling between application logic and specific external implementations.",
    },

    {
      title: "Expanded automated testing",
      description:
        "Added substantial unit and integration test coverage around backend components where correctness depended on multiple edge cases and integration boundaries.",
    },
  ],

  disclaimer:
    "This case study describes professional work at a high level. Architecture, customer information, proprietary business logic, internal service names, and other sensitive implementation details have intentionally been omitted or generalized.",
};