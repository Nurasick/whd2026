import { cn } from '@/lib/utils';

const controlClasses = [
  'border-whd-purple-soft/60 bg-whd-purple-deep/60 w-full rounded-xl border-2 px-4 py-2.5 text-base text-white',
  'shadow-[inset_0_3px_8px_rgb(0_0_0/0.3)] transition-colors duration-200 outline-none',
  'focus:border-whd-pink focus:ring-whd-pink/30 focus:ring-4',
  'aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-400/30',
  'disabled:cursor-not-allowed disabled:opacity-50',
];

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      className={cn(controlClasses, 'placeholder:text-whd-text-muted/60', className)}
      {...props}
    />
  );
}

export function Select({ className, ...props }: React.ComponentProps<'select'>) {
  return (
    <select
      className={cn(controlClasses, '[&>option]:bg-whd-purple-deep cursor-pointer', className)}
      {...props}
    />
  );
}
