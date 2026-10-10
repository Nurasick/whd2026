import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { LinkButton } from '@/components/ui/button';
import DecryptedText from '@/components/landing/DecryptedText';
import { NeonFrame, NeonPanel } from '@/components/ui/neon';
import { VENUE_MAP_URL } from '@/lib/event';

/**
 * The "When / Where / How" band, in the timeline cards' style: a big answer on
 * top and a one-line note beneath, so the three cards always line up.
 */
export default function InfoCards() {
  const { t } = useTranslation();

  const rows = [
    {
      label: t('infoCards.when'),
      answer: t('infoCards.whenAnswer'),
      detail: t('infoCards.whenDetail'),
    },
    {
      label: t('infoCards.where'),
      answer: t('infoCards.whereAnswer'),
      detail: t('infoCards.whereDetail'),
      action: { text: t('infoCards.whereAction'), href: VENUE_MAP_URL },
    },
    {
      label: t('infoCards.how'),
      answer: t('infoCards.howAnswer'),
      detail: t('infoCards.howDetail'),
    },
  ];

  return (
    <section id="info" className="relative py-10 md:py-16">
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-4 px-4 sm:px-8 md:grid-cols-3 lg:px-12">
        {rows.map((row, index) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <NeonFrame interactive className="h-full">
              <NeonPanel
                position="top"
                className="flex flex-1 flex-col items-center justify-center gap-2 px-4 py-5 text-center"
              >
                <span className="text-whd-pink-bright text-sm font-semibold tracking-[0.25em] uppercase">
                  {row.label}
                </span>
                <h3 className="neon-text text-[clamp(1.75rem,1.1rem+1.5vw,3rem)] leading-tight font-bold text-balance text-white lowercase">
                  <DecryptedText
                    text={row.answer}
                    animateOn="view"
                    sequential
                    encryptedClassName="text-whd-pink-bright/70"
                  />
                </h3>
              </NeonPanel>
              <NeonPanel
                position="bottom"
                className="neon-text flex items-center justify-center gap-2 px-4 pt-1 pb-2 text-center text-base font-semibold text-white lowercase md:text-lg"
              >
                <span>{row.detail}</span>
                {row.action && (
                  <LinkButton
                    href={row.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="link"
                    size="none"
                    className="group/action text-whd-pink-bright gap-1.5 text-base font-semibold lowercase hover:text-white md:text-lg"
                  >
                    · {row.action.text}
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 14 10"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover/action:translate-x-1"
                    >
                      <path
                        d="M1 5h11M8.5 1.5 12 5l-3.5 3.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </LinkButton>
                )}
              </NeonPanel>
            </NeonFrame>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
