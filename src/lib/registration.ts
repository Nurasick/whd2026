/** Client-safe registration constants (no `cloudflare:workers`, no env). */
export const REGISTRATION_CLOSED_I18N_KEY = 'onboarding.registrationClosedError' as const;

export type RegistrationStatus = {
  open: boolean;
  /** ISO instant from REGISTRATION_DEADLINE, or null when none is set. */
  deadline: string | null;
};
