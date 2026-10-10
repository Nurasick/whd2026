import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import DecryptedText from '@/components/landing/DecryptedText';
import { NeonFrame, NeonPanel } from '@/components/ui/neon';
import { parseTextWithLinks } from '@/lib/text';

export default function About() {
  const { t } = useTranslation();

  const highlights = [
    { number: t('about.editionOrdinal'), unit: '', text: t('about.annualEdition') },
    { number: t('about.roundsCount'), unit: '', text: t('about.rounds') },
    { number: t('about.prizeAmount'), unit: t('about.prizeUnit'), text: t('about.prizePool') },
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
        {/* Highlights */}
        <div className="mb-16 grid grid-cols-1 gap-4 md:mb-24 md:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <NeonFrame interactive className="h-full">
                <NeonPanel
                  position="top"
                  className="neon-text flex flex-1 items-center justify-center gap-x-2 px-4 py-5 text-[clamp(2.25rem,1.4rem+2.2vw,4rem)] leading-none font-extrabold whitespace-nowrap text-white"
                >
                  <DecryptedText
                    text={item.number}
                    animateOn="view"
                    sequential
                    encryptedClassName="text-whd-pink-bright/70"
                    parentClassName="whitespace-pre!"
                  />
                  {item.unit && <span className="text-[0.5em] font-bold">{item.unit}</span>}
                </NeonPanel>
                <NeonPanel
                  position="bottom"
                  className="neon-text px-4 pt-1 pb-2 text-center text-lg font-semibold text-white lowercase md:text-2xl"
                >
                  {item.text}
                </NeonPanel>
              </NeonFrame>
            </motion.div>
          ))}
        </div>

        {/* Description + illustration */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="section-kicker">{t('about.kicker')}</p>

            <h2 className="whd-display text-[clamp(2.25rem,1.3rem+3vw,4.5rem)]">
              {t('about.title')} <span className="text-whd-pink">{t('about.titleHighlight')}</span>
            </h2>

            <p className="text-lg leading-relaxed text-white sm:text-xl md:text-2xl">
              {parseTextWithLinks(t('about.description'))}
            </p>

            <p className="text-whd-text-muted leading-relaxed">{t('about.organizers')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="relative hidden justify-center lg:flex"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[130%] -translate-x-1/2 -translate-y-1/2 bg-[url('/whd/star-glow.svg')] bg-contain bg-center bg-no-repeat"
            />
            <img
              src="/images/about.svg"
              alt={t('about.imageAlt')}
              width={800}
              height={800}
              loading="lazy"
              className="relative z-10 w-full max-w-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
