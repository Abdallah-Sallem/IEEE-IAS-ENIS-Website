import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion } from 'framer-motion';
import { FaExpand } from 'react-icons/fa';
import PremiumSwiper from '../PremiumSwiper/PremiumSwiper';
import galleryData from '../../data/gallery.json';
import { useInView } from '../../hooks/useInView';
import styles from './GallerySection.module.css';

// Show first 8 in homepage preview
const PREVIEW_COUNT = 8;

export default function GallerySection({ showAll = false }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [ref, inView] = useInView();

  const images = showAll ? galleryData : galleryData.slice(0, PREVIEW_COUNT);

  const slides = galleryData.map((img) => ({ src: img.src, alt: img.alt }));

  const handleOpen = (i) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className={styles.gallerySection} aria-labelledby="gallery-heading" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2 id="gallery-heading">Gallery</h2>
          <p>Moments captured from our events, visits, and conferences</p>
        </div>

        {showAll ? (
          <div className={styles.grid}>
            {images.map((img, i) => (
              <motion.button
                type="button"
                key={img.id}
                className={styles.item}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => handleOpen(i)}
                aria-label={`Open ${img.alt} in lightbox`}
              >
                <img src={img.src} alt="" loading="lazy" />
                <span className={styles.overlay} aria-hidden="true">
                  <FaExpand />
                </span>
              </motion.button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <PremiumSwiper
              slides={images}
              onSlideClick={(_slide, i) => handleOpen(i)}
            />
          </motion.div>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(3, 15, 10, 0.97)' },
        }}
      />
    </section>
  );
}
