import { useTranslation } from 'react-i18next';
import { Link } from '@tanstack/react-router';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { ConfirmButton } from '@/components/ui/confirm-button';
import type { AdminHeaderControls } from '@/lib/admin-header-context';

const navLinkClass =
  'rounded-lg px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white';

/** Header shared by /admin and /checkin: navigation, refresh, sign out. */
export function AdminHeader({
  onSignOut,
  onRefresh,
  isRefreshing,
  refreshCooldownSeconds = 0,
}: AdminHeaderControls & { onSignOut: () => void }) {
  const { t } = useTranslation();

  return (
    <header className="border-whd-pink/40 bg-whd-dark/75 sticky top-0 z-50 w-full border-b backdrop-blur-[20px]">
      <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between gap-3 px-4 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Women’s Hack Day">
            <img
              src="/whd/logo.webp"
              alt=""
              aria-hidden="true"
              width={200}
              height={101}
              className="h-10 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-1 overflow-x-auto">
            <Link to="/dashboard" className={navLinkClass}>
              {t('navbar.dashboard')}
            </Link>
            <Link
              to="/admin"
              className={navLinkClass}
              activeProps={{
                className: 'bg-whd-purple text-white shadow-[inset_0_0_0_2px_var(--whd-pink)]',
              }}
            >
              {t('admin.navReport')}
            </Link>
            <Link
              to="/checkin"
              className={navLinkClass}
              activeProps={{
                className: 'bg-whd-purple text-white shadow-[inset_0_0_0_2px_var(--whd-pink)]',
              }}
            >
              {t('admin.checkin')}
            </Link>
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing || refreshCooldownSeconds > 0}
            >
              {isRefreshing
                ? t('admin.refreshing')
                : refreshCooldownSeconds > 0
                  ? t('admin.refreshIn', { seconds: refreshCooldownSeconds })
                  : t('admin.refresh')}
            </Button>
          )}
          <LanguageSwitcher />
          <ConfirmButton
            variant="ghost"
            label={t('common.signOut')}
            confirmLabel={t('common.confirm')}
            onConfirm={onSignOut}
            armedClassName="bg-whd-pink text-whd-purple-deep hover:bg-whd-pink-bright hover:text-whd-purple-deep"
          />
        </div>
      </div>
    </header>
  );
}
