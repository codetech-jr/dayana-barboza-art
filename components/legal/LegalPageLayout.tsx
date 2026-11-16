import React from 'react';
import Link from 'next/link';
import type { LegalPageContent } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

export interface LegalPageLayoutProps {
  content: LegalPageContent;
  locale: Locale;
  backLabel?: string;
  lastUpdatedLabel?: string;
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * LEGAL PAGE LAYOUT — EDITORIAL LUXURY
 * Dayana Barboza Art / The Amazing Project
 *
 * Strict Server Component:
 * - Austere and refined editorial hierarchy
 * - Generous typography with optimal reading line-length (max-w-3xl)
 * - Accessible table, lists, and note callouts
 * - Seamless bilingual routing
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function LegalPageLayout({
  content,
  locale,
  backLabel,
  lastUpdatedLabel,
}: LegalPageLayoutProps) {
  const isEs = locale === 'es';
  const defaultBack = isEs ? 'Volver al inicio' : 'Back to home';
  const defaultLastUpdated = isEs ? 'Última actualización' : 'Last updated';

  return (
    <main className="min-h-dvh bg-dba-white pt-24 sm:pt-28 md:pt-36 pb-24 selection:bg-dba-accent/15 selection:text-dba-ink">
      <article className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* ── 1. Subtle Editorial Back Link ── */}
        <div className="mb-8 sm:mb-12">
          <Link
            href={`/${locale}`}
            className="
              inline-flex items-center gap-2
              font-body text-xs sm:text-sm font-medium
              text-dba-muted hover:text-dba-accent
              transition-colors duration-300 group
            "
            aria-label={`${backLabel || defaultBack} — Dayana Barboza Art`}
          >
            <span
              className="transition-transform duration-300 group-hover:-translate-x-1"
              aria-hidden="true"
            >
              ←
            </span>
            <span>{backLabel || defaultBack}</span>
          </Link>
        </div>

        {/* ── 2. Editorial Header ── */}
        <header className="border-b border-dba-rule/70 pb-8 sm:pb-10 mb-10 sm:mb-14">
          <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-dba-muted mb-3">
            The Amazing Project · Dayana Barboza Art
          </span>

          <h1 className="font-display font-semibold text-3xl sm:text-4xl lg:text-[2.75rem] text-dba-ink leading-[1.14] tracking-tight">
            {content.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-dba-muted">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dba-paper border border-dba-rule/60">
              <span className="w-1.5 h-1.5 rounded-full bg-dba-accent" />
              <span>{lastUpdatedLabel || defaultLastUpdated}: {content.lastUpdated}</span>
            </span>
            <span>Richmond, Virginia · USA</span>
          </div>
        </header>

        {/* ── 3. Structured Legal Content Sections ── */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {content.sections.map((section, idx) => (
            <section
              key={section.title || idx}
              aria-labelledby={`legal-sec-${idx}`}
              className="flex flex-col gap-4 text-dba-ink"
            >
              <h2
                id={`legal-sec-${idx}`}
                className="font-body font-semibold text-lg sm:text-xl text-dba-ink tracking-tight border-b border-dba-rule/40 pb-2"
              >
                {section.title}
              </h2>

              {/* Paragraphs */}
              {section.paragraphs?.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="font-body text-sm sm:text-base text-dba-ink/90 leading-relaxed font-normal"
                >
                  {p}
                </p>
              ))}

              {/* Structured Table (if applicable) */}
              {section.table && (
                <div className="my-2 overflow-x-auto rounded-xl border border-dba-rule/80 bg-dba-paper/40">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm font-body">
                    <thead>
                      <tr className="border-b border-dba-rule bg-dba-paper/80 font-semibold text-dba-ink">
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} scope="col" className="py-3 px-4 sm:px-5">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dba-rule/60">
                      {section.table.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-dba-paper/60 transition-colors"
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`py-3 px-4 sm:px-5 text-dba-ink/90 ${
                                cIdx === 0 ? 'font-medium text-dba-ink shrink-0 whitespace-nowrap' : ''
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* List Items (if applicable) */}
              {section.listItems && section.listItems.length > 0 && (
                <ul className="my-2 flex flex-col gap-2.5 pl-2">
                  {section.listItems.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-3 font-body text-sm sm:text-base text-dba-ink/90 leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-dba-accent shrink-0"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Callout Note (if applicable) */}
              {section.note && (
                <aside className="mt-2 p-4 sm:p-5 rounded-2xl bg-dba-cream/50 border border-dba-rule/80 text-xs sm:text-sm font-body text-dba-muted leading-relaxed">
                  <strong className="font-semibold text-dba-ink block mb-1">
                    {isEs ? 'Nota Importante:' : 'Important Notice:'}
                  </strong>
                  {section.note}
                </aside>
              )}
            </section>
          ))}
        </div>

        {/* ── 4. Editorial Contact Stamp ── */}
        <footer className="mt-16 sm:mt-20 pt-8 border-t border-dba-rule/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-body text-dba-muted">
          <div>
            <p className="font-medium text-dba-ink">
              The Amazing Project · Dayana Barboza Art
            </p>
            <p className="mt-0.5">
              Richmond, Virginia · contact@dayanabarboza.art
            </p>
          </div>

          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 font-medium text-dba-accent hover:underline underline-offset-4"
          >
            <span>{backLabel || defaultBack}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </article>
    </main>
  );
}
