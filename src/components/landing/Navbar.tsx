import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import type { Session } from '@/lib/types';

const NAV_LINKS = [
  { href: '#about', labelKey: 'navbar.about' },
  { href: '#schedule', labelKey: 'navbar.schedule' },
  { href: '#partners', labelKey: 'navbar.partners' },
  { href: '#benefits', labelKey: 'navbar.benefits' },
  { href: '#gallery', labelKey: 'navbar.gallery' },
  { href: '#faq', labelKey: 'navbar.faq' },
] as const;

export default function Navbar({
  session,
  registrationOpen,
}: {
  session: Session;
  registrationOpen: boolean;
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!session?.user;
  const ctaTo = isLoggedIn ? '/dashboard' : '/login';
  const guestLabel = registrationOpen ? t('navbar.register') : t('navbar.signIn');
  const ctaLabel = isLoggedIn ? t('navbar.dashboard') : guestLabel;

  return (
    <header className="bg-whd-dark/90 fixed inset-x-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-4 sm:px-8 lg:h-24 lg:px-12">
        {/* Logo */}
        <a href="#top" className="flex items-center" aria-label="Women’s Hack Day">
          <img
            src="/whd/logo.webp"
            alt=""
            aria-hidden="true"
            width={200}
            height={101}
            className="h-12 w-auto transition-transform duration-300 hover:-rotate-3 lg:h-16"
          />
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-x-1 text-white lg:flex xl:gap-x-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-whd-pink-bright rounded-full px-4 py-2.5 text-base no-underline transition-colors duration-200 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none xl:px-5 xl:text-lg"
            >
              {t(link.labelKey)}
            </a>
          ))}

          <Link
            to={ctaTo}
            className={cn(
              buttonVariants({ variant: 'primary', size: 'sm' }),
              'ml-2 px-5 py-2 text-base',
            )}
          >
            {ctaLabel}
          </Link>

          <LanguageSwitcher className="ml-3" />
        </nav>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={t('navbar.toggleMenu')}
          className="flex flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </Button>
      </div>

      {/* Mobile dropdown */}
      <div className="absolute inset-x-0 top-full lg:hidden">
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-whd-pink bg-whd-purple-deep space-y-1 border-y-4 px-4 py-3 shadow-[0_18px_40px_rgb(96_42_175/0.6)]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-whd-purple block rounded-lg px-3 py-2 text-base font-medium text-white no-underline transition-all duration-200 hover:translate-x-1"
                >
                  {t(link.labelKey)}
                </a>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitcher size="md" onLanguageChange={() => setIsOpen(false)} />
              </div>
              <Link
                to={ctaTo}
                onClick={() => setIsOpen(false)}
                className={cn(buttonVariants({ variant: 'primary' }), 'w-full')}
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
