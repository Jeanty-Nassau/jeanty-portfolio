export type CaseStudyMetric = {
  value: string;
  label: string;
  detail?: string;
};

export type CaseStudySection = {
  title: string;
  eyebrow?: string;
  body: string[];
};

export type CaseStudyContribution = {
  title: string;
  description: string;
};

export type CaseStudy = {
  projectSlug: string;

  intro: string;

  metrics: CaseStudyMetric[];

  sections: CaseStudySection[];

  contributions: CaseStudyContribution[];

  disclaimer?: string;
};