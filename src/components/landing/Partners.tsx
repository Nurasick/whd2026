import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import SectionHeading from '@/components/landing/SectionHeading';

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
        <motion.div
          {...reveal}
          className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 md:gap-16"
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
      </div>
    </section>
  );
}
