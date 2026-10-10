import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Link } from '@tanstack/react-router';
import { NEXT_STEP_ROUTE, type NextStep } from '@/lib/next-step';
import { MIN_TEAM_SIZE } from '@/db/schema';
import Countdown from '@/components/landing/Countdown';

export default function Hero({ nextStep }: { nextStep: NextStep }) {
  const { t } = useTranslation();

  return (
    <section id="top" className="relative overflow-x-clip pt-28 pb-16 md:pt-36 lg:pb-24">
      {/* Pink star glow bleeding off the top-right corner, as in the design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[12%] -right-[30%] aspect-square w-[min(1500px,120vw)] bg-[url('/whd/star-glow.svg')] bg-contain bg-center bg-no-repeat md:-right-[18%]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[90rem] grid-cols-1 items-center gap-6 px-4 sm:px-8 lg:grid-cols-[minmax(0,40rem)_minmax(0,1fr)] lg:gap-4 lg:px-12">
        {/* Headline, countdown, CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="order-2 flex w-full flex-col gap-6 lg:order-none lg:gap-7"
        >
          <h1 className="whd-display text-[clamp(3.25rem,1.6rem+5.2vw,8rem)] drop-shadow-[0_4px_24px_rgb(0_0_0/0.6)]">
            {t('hero.title')}
          </h1>

          <p className="text-whd-text-muted max-w-xl text-base leading-relaxed md:text-lg">
            {t('hero.tagline')}
          </p>

          <Countdown />

          <div className="flex flex-col gap-3">
            <Link
              to={NEXT_STEP_ROUTE[nextStep]}
              className="neon-frame neon-frame-interactive group w-full no-underline outline-none focus-visible:ring-4 focus-visible:ring-white/70"
            >
              <span className="neon-panel neon-text group-hover:bg-whd-purple-soft flex items-center justify-center p-4 text-[clamp(1.5rem,1rem+1.4vw,2.5rem)] font-bold text-white lowercase transition-colors duration-200">
                {t(`hero.cta.${nextStep}`)}
              </span>
            </Link>
            {nextStep !== 'register' && (
              <p className="text-whd-pink-soft text-sm md:text-base">
                {t(`hero.status.${nextStep}`, { min: MIN_TEAM_SIZE })}
              </p>
            )}
          </div>
        </motion.div>

        {/* Mascot on the star */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 mx-auto w-full max-w-[22rem] sm:max-w-md lg:order-none lg:mr-[-6%] lg:max-w-none"
        >
          <img
            src="/whd/hero-art.svg"
            alt={t('hero.imageAlt')}
            width={965}
            height={951}
            fetchPriority="high"
            className="h-auto w-full motion-safe:animate-[whd-float_7s_ease-in-out_infinite]"
          />
        </motion.div>
      </div>
    </section>
  );
}
