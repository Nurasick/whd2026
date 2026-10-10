import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import SectionHeading from '@/components/landing/SectionHeading';
import { NeonFrame, NeonPanel } from '@/components/ui/neon';
import { cn } from '@/lib/utils';

type ScheduleEvent = {
  time: string;
  id: string;
};

const EVENTS: ScheduleEvent[] = [
  { time: '9:00 - 10:00', id: 'registration' },
  { time: '10:00 - 11:00', id: 'opening' },
  { time: '11:00 - 12:00', id: 'mathematics' },
  { time: '12:00 - 13:00', id: 'programming' },
  { time: '13:00 - 14:00', id: 'coffeeBreak' },
  { time: '14:00 - 16:00', id: 'productDesign' },
  { time: '16:00 - 17:00', id: 'pitching' },
  { time: '17:30 - 18:30', id: 'closing' },
];

/** Morning in the left column, afternoon in the right — chronological top to bottom. */
const COLUMNS = [
  { side: 'left', events: EVENTS.slice(0, EVENTS.length / 2), offset: 0 },
  { side: 'right', events: EVENTS.slice(EVENTS.length / 2), offset: EVENTS.length / 2 },
] as const;

type Side = (typeof COLUMNS)[number]['side'];

/**
 * Card → connector → dot. The left column faces its spine inward (dot on the
 * right) from md up; on mobile both columns put the spine on the left.
 */
function EventRow({
  event,
  side,
  index,
  isLast,
}: {
  event: ScheduleEvent;
  side: Side;
  index: number;
  isLast: boolean;
}) {
  const { t } = useTranslation();
  const spineX = side === 'left' ? 'left-6 md:right-6 md:left-auto' : 'left-6';

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={cn(
        'group relative flex items-center',
        side === 'left' ? 'flex-row-reverse md:flex-row' : 'flex-row-reverse',
      )}
    >
      {/* Spine segment down to the next row's dot. On mobile the columns stack,
          so the morning column's last segment bridges into the afternoon. */}
      {(!isLast || side === 'left') && (
        <span
          aria-hidden="true"
          className={cn(
            'bg-whd-pink absolute top-1/2 h-[calc(100%+var(--row-gap))] w-1.5 translate-x-[-50%]',
            side === 'left' && 'md:translate-x-1/2',
            isLast && 'md:hidden',
            spineX,
          )}
        />
      )}

      <NeonFrame interactive className="min-w-0 flex-1 md:max-w-[29.5rem]">
        <NeonPanel
          position="top"
          className="neon-text px-3 py-2.5 text-center text-[clamp(1.1rem,0.8rem+0.9vw,2rem)] font-bold text-white tabular-nums md:py-3"
        >
          {event.time}
        </NeonPanel>
        <NeonPanel
          position="bottom"
          className="neon-text px-3 pt-1 pb-2 text-center text-[clamp(1.1rem,0.8rem+0.9vw,2rem)] font-semibold text-white lowercase"
        >
          {t(`schedule.events.${event.id}`)}
        </NeonPanel>
      </NeonFrame>

      <span aria-hidden="true" className="bg-whd-pink h-1.5 w-5 shrink-0 md:w-12 lg:w-20" />

      <span
        aria-hidden="true"
        className="bg-whd-pink relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full shadow-[0_0_20px_rgb(253_92_195/0.6)] transition-transform duration-300 group-hover:scale-110"
      >
        <span className="bg-whd-purple size-8 rounded-full shadow-[inset_0_3px_6px_rgb(0_0_0/0.3)]" />
      </span>
    </motion.li>
  );
}

export default function Schedule() {
  const { t } = useTranslation();

  return (
    <section id="schedule" className="w-full overflow-x-hidden py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          kicker={t('schedule.kicker')}
          title={t('schedule.title')}
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-[var(--row-gap)] [--row-gap:1.5rem] md:grid-cols-2 md:gap-x-[clamp(2rem,1rem+8vw,14rem)] md:[--row-gap:2.25rem]">
          {COLUMNS.map((column) => (
            <ol key={column.side} className="flex flex-col gap-[var(--row-gap)]">
              {column.events.map((event, index) => (
                <EventRow
                  key={event.id}
                  event={event}
                  side={column.side}
                  index={column.offset + index}
                  isLast={index === column.events.length - 1}
                />
              ))}
            </ol>
          ))}
        </div>
      </div>
    </section>
  );
}
