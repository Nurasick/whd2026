import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import SectionHeading from '@/components/landing/SectionHeading';
import { NeonFrame, NeonPanel } from '@/components/ui/neon';

const ITEMS = [
  { image: '/whd/timeline-1.webp', dateKey: 'registration', labelKey: 'registrationLabel' },
  { image: '/whd/timeline-2.webp', dateKey: 'confirmation', labelKey: 'confirmationLabel' },
  { image: '/whd/timeline-3.webp', dateKey: 'event', labelKey: 'eventLabel' },
] as const;

export default function Timeline() {
  const { t } = useTranslation();

  return (
    <section id="timeline" className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          kicker={t('timeline.kicker')}
          title={t('timeline.title')}
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {ITEMS.map((item, index) => (
            <motion.div
              key={item.dateKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex flex-col gap-4 md:gap-6"
            >
              <NeonFrame interactive className="group">
                <NeonPanel className="p-3 md:p-4">
                  <div className="aspect-[413/340] overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={t(`timeline.items.${item.labelKey}`)}
                      width={827}
                      height={680}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </NeonPanel>
              </NeonFrame>

              <NeonFrame>
                <NeonPanel
                  position="top"
                  className="neon-text px-3 py-3 text-center text-[clamp(1.75rem,1.1rem+1.9vw,3.6rem)] leading-tight font-bold text-white lowercase md:py-4"
                >
                  {t(`timeline.items.${item.dateKey}`)}
                </NeonPanel>
                <NeonPanel
                  position="bottom"
                  className="neon-text px-3 pt-1 pb-2 text-center text-[clamp(1rem,0.7rem+0.9vw,2rem)] font-semibold text-white lowercase"
                >
                  {t(`timeline.items.${item.labelKey}`)}
                </NeonPanel>
              </NeonFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
