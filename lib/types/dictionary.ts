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
  };
  readonly about: {
    readonly eyebrow: string;
    readonly title: string;
    readonly bio: {
      readonly hook: string;
      readonly technique: string;
      readonly manifesto: string;
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
  };
  readonly events: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly inclusions: readonly string[];
    readonly ctaPrimary: string;
    readonly ctaSecondary: string;
    readonly microcopy: string;
  };
  readonly merch: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly ctaPrimary: string;
    readonly microcopy: string;
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
