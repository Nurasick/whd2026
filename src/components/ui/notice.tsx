import { cn } from '@/lib/utils';

/** Amber call-out for state the visitor cannot change, such as registration being closed. */
export function Notice({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      role="status"
      className={cn(
        'rounded-lg border border-amber-400/30 bg-amber-400/5 px-4 py-3 text-sm leading-relaxed text-amber-200',
        className,
      )}
      {...props}
    />
  );
}
