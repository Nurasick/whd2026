import { cn } from '@/lib/utils';

type NeonFrameProps = React.ComponentProps<'div'> & {
  /** Tighter padding and radius for small pills like countdown digits. */
  size?: 'md' | 'sm';
  /** Brighten the halo and lift slightly on hover / focus-within. */
  interactive?: boolean;
  /** Drop the outer halo, keeping only the bevel — for dense layouts. */
  flat?: boolean;
};

/**
 * The pink outer frame from the 2026 design. Holds one or more `NeonPanel`s;
 * the 8px gap between them shows the frame colour as a divider.
 */
export function NeonFrame({
  size = 'md',
  interactive = false,
  flat = false,
  className,
  ...props
}: NeonFrameProps) {
  return (
    <div
      data-slot="neon-frame"
      className={cn(
        'neon-frame',
        size === 'sm' && 'neon-frame-sm',
        interactive && 'neon-frame-interactive',
        flat && 'neon-frame-flat',
        className,
      )}
      {...props}
    />
  );
}

type NeonPanelProps = React.ComponentProps<'div'> & {
  /** Which edge touches a sibling panel; that edge is squared off. */
  position?: 'full' | 'top' | 'bottom';
};

/** The violet inset panel that sits inside a `NeonFrame`. */
export function NeonPanel({ position = 'full', className, ...props }: NeonPanelProps) {
  return (
    <div
      data-slot="neon-panel"
      className={cn(
        'neon-panel',
        position === 'top' && 'neon-panel-top',
        position === 'bottom' && 'neon-panel-bottom',
        className,
      )}
      {...props}
    />
  );
}
