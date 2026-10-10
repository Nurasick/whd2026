import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConfirmButton } from '@/components/ui/confirm-button';
import { CV_ERRORS, CV_MAX_BYTES, CV_MAX_MB } from '@/lib/cv';

type Pending = 'upload' | 'delete' | null;

/** Calls /api/cv; resolves on success, throws an i18n key on failure. */
async function requestCv(init: RequestInit) {
  let res: Response;
  try {
    res = await fetch('/api/cv', init);
  } catch {
    throw new Error(CV_ERRORS.failed);
  }
  if (res.ok) return;
  const body = (await res.json().catch(() => null)) as { error?: string } | null;
  throw new Error(body?.error ?? CV_ERRORS.failed);
}

/**
 * Optional PDF CV, stored in the organisers' Google Drive. The participant can
 * replace or delete it until registration closes; organisers open it from /admin.
 */
export function CvCard({
  hasCv,
  registrationOpen,
  onDone,
  onError,
}: {
  hasCv: boolean;
  registrationOpen: boolean;
  /** Refresh the page data and show `message`. */
  onDone: (message: string) => Promise<void>;
  onError: (message: string) => void;
}) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<Pending>(null);

  const run = async (key: Exclude<Pending, null>, action: () => Promise<void>, done: string) => {
    setPending(key);
    try {
      await action();
      await onDone(done);
    } catch (err) {
      // Error messages are i18n keys from /api/cv; t() passes anything else through.
      const key = err instanceof Error ? err.message : CV_ERRORS.failed;
      onError(t(key, { mb: CV_MAX_MB }));
    } finally {
      setPending(null);
    }
  };

  const upload = (file: File) => {
    // Checked again on the server; this just saves a pointless upload.
    if (file.size > CV_MAX_BYTES) return onError(t(CV_ERRORS.tooLarge, { mb: CV_MAX_MB }));
    if (file.type && file.type !== 'application/pdf') return onError(t(CV_ERRORS.notPdf));
    const body = new FormData();
    body.append('file', file);
    return run('upload', () => requestCv({ method: 'POST', body }), t('cv.feedbackUploaded'));
  };

  return (
    <Card className="mt-6">
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-bold text-white md:text-2xl">{t('cv.title')}</h2>
          <span className={hasCv ? 'text-whd-pink-bright text-sm' : 'text-whd-text-muted text-sm'}>
            {hasCv ? t('cv.uploaded') : t('cv.none')}
          </span>
        </div>

        <p className="text-whd-text-muted text-sm leading-relaxed">
          {registrationOpen ? t('cv.hint', { mb: CV_MAX_MB }) : t('cv.locked')}
        </p>

        {registrationOpen && (
          <div className="flex flex-wrap gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              tabIndex={-1}
              aria-hidden="true"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = ''; // Picking the same file again should still fire.
                if (file) upload(file);
              }}
            />
            <Button size="sm" disabled={pending !== null} onClick={() => inputRef.current?.click()}>
              {pending === 'upload' ? t('cv.uploading') : hasCv ? t('cv.replace') : t('cv.upload')}
            </Button>
            {hasCv && (
              <ConfirmButton
                label={t('cv.delete')}
                confirmLabel={t('cv.deleteConfirm')}
                loading={pending === 'delete'}
                loadingLabel={t('common.loading')}
                disabled={pending !== null}
                onConfirm={() =>
                  run('delete', () => requestCv({ method: 'DELETE' }), t('cv.feedbackDeleted'))
                }
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
