import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import DecryptedText from '@/components/landing/DecryptedText';

type SectionHeadingProps = {
  /** Small uppercase eyebrow above the title. */
  kicker: string;
  title: string;
  className?: string;
};

/**
 * The heading every section shares: a pink kicker over an oversized,
 * left-aligned title. The title decrypts itself as it scrolls into view.
 */
export default function SectionHeading({ kicker, title, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className={cn('flex flex-col items-start text-left', className)}
    >
      <p className="section-kicker mb-3 md:mb-4">{kicker}</p>
      <h2 className="whd-display max-w-[12ch] text-[clamp(2.75rem,1.2rem+5.6vw,8rem)]">
        <DecryptedText
          text={title}
          animateOn="view"
          sequential
          encryptedClassName="text-whd-pink/60"
        />
      </h2>
    </motion.div>
  );
}
