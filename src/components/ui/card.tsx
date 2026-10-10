import { cn } from '@/lib/utils';

/**
 * A violet panel with the neon pink rim — the single-element version of
 * `NeonFrame` + `NeonPanel`, for content cards across the app.
 */
export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'group/card border-whd-pink bg-whd-purple rounded-[20px] border-[5px] transition-all duration-300',
        'shadow-[inset_0_4px_12px_rgb(0_0_0/0.25),0_0_28px_rgb(253_92_195/0.35),0_14px_40px_rgb(96_42_175/0.45)]',
        'hover:shadow-[inset_0_4px_12px_rgb(0_0_0/0.25),0_0_40px_rgb(253_92_195/0.55),0_18px_52px_rgb(96_42_175/0.6)]',
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('p-6 md:p-8', className)} {...props} />;
}
