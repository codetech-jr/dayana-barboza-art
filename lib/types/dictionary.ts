/**
 * Strongly typed dictionary structure for the bilingual DBA site.
 *
 * Every key maps 1:1 to es.json / en.json.
 * Components consume this via `getDictionary(locale)`.
 */

export interface TechniqueBlock {
  readonly title: string;
  readonly description: string;
}

export interface Dictionary {
  readonly meta: {
    readonly title: string;
    readonly description: string;
  };
  readonly nav: {
    readonly gallery: string;
    readonly about: string;
    readonly classes?: string;
    readonly events: string;
    readonly merch: string;
    readonly cta: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly ticker?: string;
  };
  readonly about: {
    readonly eyebrow: string;
    readonly title: string;
    readonly bio: {
      readonly hook: string;
      readonly technique?: string;
      readonly manifesto: string;
      readonly paragraphs?: readonly string[];
      readonly quote?: string;
    };
    readonly techniques: {
      readonly acrylic: TechniqueBlock;
      readonly durability: TechniqueBlock;
      readonly exclusive: TechniqueBlock;
    };
  };
  readonly gallery: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly filters: {
      readonly all: string;
      readonly portraits: string;
      readonly cinema: string;
      readonly nature: string;
      readonly custom: string;
    };
    readonly cardCta: string;
    readonly ctaPrimary: string;
    readonly microcopy: string;
    readonly ctaSecondary: string;
    readonly badges?: {
      readonly sold: string;
      readonly available: string;
    };
  };
  readonly events: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly inclusions: readonly string[];
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly microcopy: string;
    readonly sections?: readonly {
      readonly number: string;
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
    }[];
  };
  readonly merch: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle?: string;
    readonly ctaPrimary: string;
    readonly microcopy: string;
    readonly placeholder?: string;
    readonly placeholderNote?: string;
  };
  readonly creativeProcess: {
    readonly eyebrow: string;
    readonly title: string;
    readonly steps: readonly {
      readonly number: string;
      readonly title: string;
      readonly description: string;
    }[];
  };
  readonly clientStories?: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly featured: {
      readonly provenance: string;
      readonly quote: string;
      readonly author: string;
      readonly role: string;
      readonly image: string;
      readonly images?: readonly string[];
      readonly imageAlt?: string;
    };
  };
  readonly footer: {
    readonly eyebrow: string;
    readonly buttons: {
      readonly jacket: string;
      readonly party: string;
      readonly idea: string;
    };
    readonly socialProof: string;
    readonly signature: string;
  };
}
