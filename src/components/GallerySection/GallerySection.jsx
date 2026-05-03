import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion } from 'framer-motion';
import { FaExpand } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
              <motion.div
                key={img.id}
                className={styles.item}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                transition={{ delay: Math.min(i * 0.06, 0.5), duration: 0.5, ease: 'easeOut' }}
                onClick={() => handleOpen(i)}
                onKeyDown={(e) => e.key === 'Enter' && handleOpen(i)}
                tabIndex={0}
                role="button"
                aria-label={`Open ${img.alt} in lightbox`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className={styles.overlay} aria-hidden="true">
                  <FaExpand />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className={styles.swiperContainer}
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView="auto"
              centeredSlides={true}
              loop={true}
              className={styles.swiperContainer}
            >
              {images.map((img, i) => (
                <SwiperSlide key={img.id} className={styles.swiperSlideCustom}>
                  <div
                    className={styles.item}
                    onClick={() => handleOpen(i)}
                    onKeyDown={(e) => e.key === 'Enter' && handleOpen(i)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open ${img.alt} in lightbox`}
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    <div className={styles.overlay} aria-hidden="true">
                      <FaExpand />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>


          </motion.div>
        )}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(10,10,15,0.97)' },
        }}
      />
    </section>
  );
}
