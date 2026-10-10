import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import SectionHeading from '@/components/landing/SectionHeading';
import { NeonFrame, NeonPanel } from '@/components/ui/neon';

const BENEFIT_KEYS = [
  'prizePool',
  'welcomePackage',
  'merchandise',
  'coffeeBreak',
  'certificates',
  'coaching',
] as const;

export default function Benefits() {
  const { t } = useTranslation();

  return (
    <section id="benefits" className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          kicker={t('benefits.kicker')}
          title={t('benefits.title')}
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-6">
          {BENEFIT_KEYS.map((benefitKey, index) => (
            <motion.div
              key={benefitKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <NeonFrame interactive className="h-full">
                <NeonPanel className="neon-text flex h-full items-center justify-center gap-3 px-4 py-4 text-center text-[clamp(1.1rem,0.8rem+0.9vw,2rem)] leading-snug font-semibold text-white lowercase">
                  {t(`benefits.${benefitKey}`)}
                </NeonPanel>
              </NeonFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
