import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
};

/**
 * Modal confirmation built on the native <dialog>, which gives us focus
 * trapping, Esc-to-close and the top layer without a dialog library.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onOpenChange,
}: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={() => onOpenChange(false)}
      // A click on the backdrop lands on the <dialog> itself.
      onClick={(e) => e.target === e.currentTarget && onOpenChange(false)}
      data-slot="card"
      className="border-whd-pink bg-whd-purple m-auto w-[calc(100%-2rem)] max-w-sm rounded-[20px] border-[5px] p-6 text-white shadow-[inset_0_4px_12px_rgb(0_0_0/0.25),0_0_40px_rgb(253_92_195/0.5)] backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-whd-text-muted mt-2 text-sm leading-relaxed">{description}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
          {cancelLabel}
        </Button>
        <Button
          size="sm"
          className="bg-red-600 hover:bg-red-700"
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
