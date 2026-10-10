import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import SectionHeading from '@/components/landing/SectionHeading';
import { NeonFrame, NeonPanel } from '@/components/ui/neon';

const INFO_PARTNERS = [
  '/partners/info-1.svg',
  '/partners/info-2.png',
  '/partners/info-3.jpg',
  '/partners/info-4.png',
] as const;

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6 },
} as const;

/** Freedom Broker wordmark: the shield + FREEDOM lockup with BROKER set beneath. */
function FreedomBrokerLogo({ alt }: { alt: string }) {
  return (
    <div role="img" aria-label={alt} className="relative aspect-[572.663/172.142] w-full">
      <img
        src="/whd/sponsor-freedom.svg"
        alt=""
        width={572.663}
        height={172.142}
        className="absolute inset-0 h-full w-full"
      />
      <img
        src="/whd/sponsor-freedom-broker.svg"
        alt=""
        width={227.821}
        height={42.597}
        className="absolute top-[58.45%] left-[33.33%] h-[24.74%] w-[39.79%]"
      />
    </div>
  );
}

export default function Partners() {
  const { t } = useTranslation();

  return (
    <section id="partners" className="w-full overflow-x-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          kicker={t('partners.kicker')}
          title={t('partners.title')}
          className="mb-10 md:mb-14"
        />

        {/* Sponsors — logos straight on the dark ground, as in the design */}
        <motion.h3 {...reveal} className="section-kicker mb-6 md:mb-8">
          {t('partners.generalSponsor')}
        </motion.h3>

        <motion.div
          {...reveal}
          className="mb-16 grid grid-cols-1 items-center gap-10 sm:grid-cols-2 md:mb-24 md:gap-16"
        >
          <div className="max-w-[36rem] transition-transform duration-300 hover:scale-[1.03]">
            <FreedomBrokerLogo alt={t('partners.generalSponsorAlt')} />
          </div>
          <img
            src="/whd/sponsor-nu-impact.webp"
            alt={t('partners.nuImpactAlt')}
            width={1440}
            height={522}
            loading="lazy"
            className="h-auto w-full max-w-[45rem] transition-transform duration-300 hover:scale-[1.03]"
          />
        </motion.div>

        {/* Info partners — their logos need a light ground, so they sit in a white panel */}
        <motion.h3 {...reveal} className="section-kicker mb-6 md:mb-8">
          {t('partners.infoPartners')}
        </motion.h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {INFO_PARTNERS.map((src, index) => (
            <motion.div key={src} {...reveal} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <NeonFrame interactive>
                <NeonPanel className="flex aspect-square items-center justify-center bg-white p-4 md:p-6 lg:p-8">
                  <img
                    src={src}
                    alt={t('partners.infoPartnerAlt', { index: index + 1 })}
                    width={300}
                    height={150}
                    loading="lazy"
                    className="h-auto max-h-full w-full object-contain"
                  />
                </NeonPanel>
              </NeonFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
