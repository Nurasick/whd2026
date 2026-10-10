import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import SectionHeading from '@/components/landing/SectionHeading';
import { NeonFrame, NeonPanel } from '@/components/ui/neon';

const PHOTOS = ['/whd/timeline-1.webp', '/whd/timeline-2.webp', '/whd/timeline-3.webp'] as const;

export default function Gallery() {
  const { t } = useTranslation();

  return (
    <section id="gallery" className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-8 lg:px-12">
        <SectionHeading
          kicker={t('gallery.kicker')}
          title={t('gallery.title')}
          className="mb-10 md:mb-14"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {PHOTOS.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <NeonFrame interactive className="group">
                <NeonPanel className="p-3 md:p-4">
                  <div className="aspect-[413/340] overflow-hidden rounded-lg">
                    <img
                      src={src}
                      alt={t('gallery.imageAlt', { index: index + 1 })}
                      width={827}
                      height={680}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </NeonPanel>
              </NeonFrame>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
