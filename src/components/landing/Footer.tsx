import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import type { Session } from '@/lib/types';
import DecryptedText from '@/components/landing/DecryptedText';
import { NeonPanel } from '@/components/ui/neon';
import { SOCIAL_LINKS } from '@/lib/event';

const SOCIALS = [
  { href: SOCIAL_LINKS.instagram, labelKey: 'footer.instagram' },
  { href: SOCIAL_LINKS.telegram, labelKey: 'footer.telegram' },
  { href: SOCIAL_LINKS.tiktok, labelKey: 'footer.tiktok' },
  { href: SOCIAL_LINKS.email, labelKey: 'footer.email' },
] as const;

export default function Footer({ session }: { session: Session }) {
  const { t } = useTranslation();
  const isLoggedIn = !!session?.user;

  return (
    <footer id="registration">
      {/* Closing call to action */}
      <div className="relative mx-auto max-w-[90rem] overflow-x-clip px-4 py-16 sm:px-8 md:py-24 lg:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(900px,130vw)] -translate-x-1/2 -translate-y-1/2 bg-[url('/whd/star-glow.svg')] bg-contain bg-center bg-no-repeat opacity-60"
        />

        <div className="relative mx-auto flex max-w-[40rem] flex-col items-center gap-8 text-center">
          <p className="whd-display text-[clamp(2.25rem,1.2rem+3.5vw,5rem)]">
            <DecryptedText
              text={t('footer.readyToJoin')}
              animateOn="view"
              sequential
              encryptedClassName="text-whd-pink/60"
            />
          </p>
          <Link
            to={isLoggedIn ? '/dashboard' : '/login'}
            className="neon-frame neon-frame-interactive group w-full no-underline outline-none focus-visible:ring-4 focus-visible:ring-white/70"
          >
            <NeonPanel className="neon-text group-hover:bg-whd-purple-soft flex items-center justify-center p-4 text-[clamp(1.5rem,1rem+1.4vw,2.5rem)] font-bold text-white lowercase transition-colors duration-200">
              {isLoggedIn ? t('footer.dashboard') : t('footer.register')}
            </NeonPanel>
          </Link>
        </div>
      </div>

      {/* Social links */}
      <div className="mx-auto max-w-[60rem] px-4 pt-6 pb-12 text-center sm:px-8">
        <div className="text-whd-pink mb-8 flex flex-wrap justify-center gap-x-10 gap-y-4 font-['Montserrat_Variable'] text-lg sm:justify-between md:text-2xl lg:text-3xl">
          {SOCIALS.map((social) => (
            <a
              key={social.labelKey}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-whd-pink-bright underline decoration-1 underline-offset-4 transition-colors duration-200 hover:decoration-2"
            >
              {t(social.labelKey)}
            </a>
          ))}
        </div>

        <p className="text-whd-text-dim font-['Montserrat_Variable'] text-base italic sm:text-xl md:text-2xl">
          {t('footer.rights')}
        </p>

        <div className="text-whd-text-muted mt-5 flex justify-center gap-6 text-sm">
          <Link to="/privacy" className="hover:text-whd-pink-bright transition-colors">
            {t('footer.privacy')}
          </Link>
          <Link to="/terms" className="hover:text-whd-pink-bright transition-colors">
            {t('footer.terms')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
