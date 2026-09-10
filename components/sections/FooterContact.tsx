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
                hover:shadow-[0_8px_30px_oklch(55%_0.12_38/0.12)]
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

        {/* ── Social proof ── */}
        <p className="mt-10 text-center font-body text-sm text-dba-muted leading-relaxed">
          {dict.footer.socialProof}
        </p>

        {/* ── Signature ── */}
        <p className="mt-12 text-center font-body text-xs text-dba-faint tracking-wide uppercase">
          {dict.footer.signature}
        </p>

        {/* ── Minimalist Social & Contact Links ── */}
        <nav
          className="
            mt-6 pt-6 border-t border-dba-rule-strong/50
            flex flex-wrap items-center justify-center gap-6 md:gap-10
          "
          aria-label="Footer links"
        >
          {[
            { label: 'Instagram', href: 'https://instagram.com/dayanabarboza.art' },
            { label: 'TikTok', href: 'https://tiktok.com/@dayanabarboza.art' },
            { label: locale === 'es' ? 'Contacto' : 'Contact', href: buildWhatsAppUrl('footerIdea', locale) },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-body text-xs font-medium text-dba-muted uppercase tracking-[0.15em]
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
      </div>
    </footer>
  );
}
