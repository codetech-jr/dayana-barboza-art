import Image from 'next/image';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { Dictionary } from '@/lib/types/dictionary';
import type { Locale } from '@/lib/i18n/config';

interface FooterContactProps {
  dict: Dictionary;
  locale: Locale;
}

/** Footer CTA triggers mapped to dictionary keys. */
const FOOTER_CTAS = [
  { trigger: 'footerJacket', dictKey: 'jacket' },
  { trigger: 'footerParty', dictKey: 'party' },
  { trigger: 'footerIdea', dictKey: 'idea' },
] as const;

/**
 * FooterContact — Landing incrustada. NOT a dead black box.
 *
 * Server Component. Paper background (warm).
 * Three full-width iOS-style WhatsApp CTA buttons.
 * Each button = a different "excuse" to start a conversation.
 *
 * Hick's Law: 3 options max, each clearly differentiated by intent.
 */
export function FooterContact({ dict, locale }: FooterContactProps) {
  return (
    <footer id="footer" className="bg-dba-paper py-section">
      <div className="max-w-2xl mx-auto px-6">
        <Eyebrow className="text-center">{dict.footer.eyebrow}</Eyebrow>

        {/* ── Three iOS-style full-width CTA buttons ── */}
        <div className="mt-10 flex flex-col gap-3">
          {FOOTER_CTAS.map(({ trigger, dictKey }) => (
            <a
              key={trigger}
              href={buildWhatsAppUrl(trigger, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center justify-between
                w-full rounded-2xl
                border border-dba-rule-strong
                bg-dba-white
                px-6 py-5
                font-body text-base font-medium text-dba-ink
                transition-all duration-300 ease-[var(--dba-ease)]
                hover:border-dba-accent hover:text-dba-accent
                hover:shadow-[0_8px_30px_oklch(45%_0.14_340/0.12)]
                active:scale-[0.99]
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-dba-accent
                select-none
              "
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span>{dict.footer.buttons[dictKey]}</span>
              <span
                className="
                  text-dba-faint transition-transform duration-300
                  group-hover:translate-x-1 group-hover:text-dba-accent
                "
                aria-hidden="true"
              >
                →
              </span>
            </a>
          ))}
        </div>


        {/* ── Signature ── */}
        <p className="mt-12 text-center font-body text-xs text-dba-faint tracking-wide uppercase">
          {dict.footer.signature}
        </p>

        {/* ── Minimalist Social & Contact Links (Mockup 03) ── */}
        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
          aria-label="Social and contact links"
        >
          {[
            { label: 'INSTAGRAM', href: 'https://instagram.com/dayanabarboza.art' },
            { label: 'TIKTOK', href: 'https://tiktok.com/@dayanabarboza.art' },
            {
              label: locale === 'es' ? 'CONTACTO' : 'CONTACT',
              href: buildWhatsAppUrl('footerIdea', locale),
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-mono text-xs font-medium text-dba-muted uppercase tracking-[0.2em]
                transition-colors duration-300 ease-[var(--dba-ease)]
                hover:text-dba-accent
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-dba-accent
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Umbrella Brand Origin Stamp (Amazing Project) ── */}
        <div className="mt-14 pt-10 border-t border-dba-rule/60 flex flex-col items-center justify-center">
          <Image
            src="/logos/logo-3.png"
            alt="Amazing Project"
            width={240}
            height={120}
            className="h-16 md:h-20 w-auto object-contain select-none opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* ── Discreet Legal Links Strip ── */}
        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-xs font-body text-dba-muted"
          aria-label="Legal links"
        >
          <Link
            href={`/${locale}/returns`}
            className="hover:text-dba-accent transition-colors duration-200"
          >
            {dict.legal.returns}
          </Link>
          <span className="text-dba-rule select-none" aria-hidden="true">·</span>
          <Link
            href={`/${locale}/privacy`}
            className="hover:text-dba-accent transition-colors duration-200"
          >
            {dict.legal.privacy}
          </Link>
          <span className="text-dba-rule select-none" aria-hidden="true">·</span>
          <Link
            href={`/${locale}/terms`}
            className="hover:text-dba-accent transition-colors duration-200"
          >
            {dict.legal.terms}
          </Link>
          <span className="text-dba-rule select-none" aria-hidden="true">·</span>
          <Link
            href={`/${locale}/shipping`}
            className="hover:text-dba-accent transition-colors duration-200"
          >
            {dict.legal.shipping}
          </Link>
          <span className="text-dba-rule select-none" aria-hidden="true">·</span>
          <Link
            href={`/${locale}/accessibility`}
            className="hover:text-dba-accent transition-colors duration-200"
          >
            {dict.legal.accessibility}
          </Link>
        </nav>

        {/* ── Copyright & Legal Notice ── */}
        <p className="mt-4 text-center font-mono text-[10px] text-dba-faint tracking-wider">
          © {new Date().getFullYear()} Amazing Project · {locale === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  );
}
