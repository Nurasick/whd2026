import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Separator } from '@/components/ui/separator';
import { NeonFrame, NeonPanel } from '@/components/ui/neon';
import SectionHeading from '@/components/landing/SectionHeading';
import { parseTextWithLinks } from '@/lib/text';

/**
 * WHD's ten questions, grouped the way HackNU groups its FAQ — readers scan
 * the category they care about instead of the whole list.
 */
const CATEGORIES = [
  { key: 'general', questions: ['whatIs', 'organizers', 'otherEvents'] },
  {
    key: 'participation',
    questions: ['whoCanParticipate', 'professional', 'noTeam', 'howToParticipate'],
  },
  { key: 'formatPrizes', questions: ['online', 'certificates'] },
  { key: 'contact', questions: ['noAnswer'] },
] as const;

function FAQItem({ questionKey }: { questionKey: string }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <NeonFrame interactive>
      <NeonPanel position={isOpen ? 'top' : 'full'}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="neon-text flex w-full cursor-pointer items-center justify-between gap-4 rounded-[inherit] px-4 py-3 text-left text-[clamp(1.05rem,0.85rem+0.6vw,1.75rem)] text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:py-4"
        >
          <span>{t(`faq.questions.${questionKey}.q`)}</span>
          <svg
            width="18"
            height="12"
            viewBox="0 0 18.431 11.787"
            fill="none"
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`}
          >
            <path
              d="M2 9.787 9.483 2.787 16.431 9.787"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </NeonPanel>

      {isOpen && (
        <NeonPanel position="bottom" id={panelId} className="px-4 pt-2 pb-4">
          <div className="neon-text [&_a]:text-whd-pink-bright text-base leading-relaxed text-white/90 md:text-lg [&_a]:underline">
            {parseTextWithLinks(t(`faq.questions.${questionKey}.a`))}
          </div>
        </NeonPanel>
      )}
    </NeonFrame>
  );
}

export default function FAQ() {
  const { t } = useTranslation();

  return (
    <section id="faq" className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          kicker={t('faq.kicker')}
          title={t('faq.title')}
          className="mb-10 md:mb-14"
        />

        <div className="space-y-10">
          {CATEGORIES.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="section-kicker">{t(`faq.categories.${category.key}`)}</span>
                <Separator className="bg-whd-pink/40 flex-1" />
              </div>

              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                {category.questions.map((questionKey) => (
                  <FAQItem key={questionKey} questionKey={questionKey} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
