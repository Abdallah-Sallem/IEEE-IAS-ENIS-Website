import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Hero from '../components/Hero/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInView } from '../hooks/useInView';
import styles from '../styles/enif.module.css';

const ENIF_EDITIONS = [
  {
    id: 1,
    title: 'ENIF 1.0',
    description: "The first edition was named Industrial IOT Forum, held on the 2nd of May 2018 in ENIS. It focused on the importance of IOT via 10 conferences and 2 workshops that were based on practical application like the Initiations to the BLE (bluetooth Low Energy) communications workshop.",
    thumbnail: '/src/assets/Thumbnail/enif_1.0.png',
    gallery: [
      '/src/assets/enif1/1.jpg',
      '/src/assets/enif1/2.jpg',
      '/src/assets/enif1/3.jpg',
      '/src/assets/enif1/4.jpg',
      '/src/assets/enif1/5.0.jpg',
      '/src/assets/enif1/5.1.jpg',
      '/src/assets/enif1/5.2.jpg',
    ]
  },
  {
    id: 2,
    title: 'ENIF 2.0',
    description: "In 2021, the return with a new name, ENIF, and a focus on exploring the potential of IoT technologies in agriculture. The Forum spanned two days, December 5th and 12th. The first day featured a soft skills workshop on 'How to pitch your idea' and two technical workshops: 'IoT system from idea to product development' and 'Programming a weather station with the ESP32 card using MicroPython and an IoT platform.' The second day was rich in content, starting with a collaboration with IEEE CS ENIS chapter through TechXchange 1.0 and TechXchange 2.0, and ending with a competition sponsored and proposed by Olivia/DAAD.",
    thumbnail: '/src/assets/Thumbnail/enif_2.0.png',
    gallery: [
      '/src/assets/enif2/1.jpg',
      '/src/assets/enif2/2.jpg',
      '/src/assets/enif2/3.jpg',
      '/src/assets/enif2/4.jpg',
      '/src/assets/enif2/5.jpg',
      '/src/assets/enif2/6.jpg',
    ]
  },
  {
    id: 3,
    title: 'ENIF 3.0',
    description: "Keeping the same energy and goals IEEE IAS ENIS organized the third edition of its forum with the same topic as the second one: divided into 2 days; the first was based on informative conferences about AI and IOT and the second day was the day of the competition with the same topic and sponsor Olivia but it was preceded by a soft skills workshop to help participants in their pitching skills.",
    thumbnail: '/src/assets/Thumbnail/enif 3.0.png',
    gallery: [
      '/src/assets/enif3/1.jpg',
      '/src/assets/enif3/2.jpg',
      '/src/assets/enif3/3.jpg',
      '/src/assets/enif3/4.jpg',
      '/src/assets/enif3/5.jpg',
      '/src/assets/enif3/6.jpg',
    ]
  },
  {
    id: 4,
    title: 'ENIF 4.0',
    description: "This year's focus on e-health, IoT, and AI addresses climate-related health issues. Workshops on personality development and public speaking precede a competition where teams pitch innovative solutions. The event culminates in an awards ceremony, fostering learning, collaboration, and innovation among students at the intersection of technology and healthcare.",
    thumbnail: '/src/assets/Thumbnail/enif_4.0.png',
    gallery: [
      '/src/assets/enif4/1.jpg',
      '/src/assets/enif4/2.jpg',
      '/src/assets/enif4/3.jpg',
      '/src/assets/enif4/4.jpg',
      '/src/assets/enif4/5.jpg',
      '/src/assets/enif4/6.jpg',
      '/src/assets/enif4/7.jpg',
    ]
  },
  {
    id: 5,
    title: 'ENIF 5.0',
    description: "For this edition, with the theme 'Advanced Technologies for a Sustainable Future,' ENIF 5.0 will highlight the integration of Industry 5.0 principles into innovative solutions for a more sustainable future. The event will emphasize the collaboration between humans and advanced technologies to enhance sustainability across various fields. A hackathon will be organized, featuring a theme proposed by our industrial partners, directly linked to the overall topic.",
    thumbnail: '/src/assets/Thumbnail/enif_5.0.png',
    gallery: [
      '/src/assets/enif5/1.jpg',
      '/src/assets/enif5/2.jpg',
      '/src/assets/enif5/3.jpg',
      '/src/assets/enif5/4.jpg',
      '/src/assets/enif5/5.jpg',
      '/src/assets/enif5/6.jpg',
      '/src/assets/enif5/7.jpg',
    ]
  },
  {
    id: 6,
    title: 'ENIF 6.0',
    description: "For this edition, with the theme 'Advanced Technologies for a Sustainable Future,' ENIF 5.0 will highlight the integration of Industry 5.0 principles into innovative solutions for a more sustainable future. The event will emphasize the collaboration between humans and advanced technologies to enhance sustainability across various fields. A hackathon will be organized, featuring a theme proposed by our industrial partners, directly linked to the overall topic.",
    thumbnail: '/src/assets/Thumbnail/logo enif final-01.png',
    link: 'https://ias-enis.ieee.tn/enif/',
    gallery: [
      '/src/assets/img/enif5/1.jpg',
      '/src/assets/img/enif5/2.jpg',
      '/src/assets/img/enif5/3.jpg',
      '/src/assets/img/enif5/4.jpg',
      '/src/assets/img/enif5/5.jpg',
      '/src/assets/img/enif5/6.jpg',
      '/src/assets/img/enif5/7.jpg',
    ]
  }
];

function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      className={styles.lightboxOverlay}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className={styles.lightboxClose} onClick={onClose} aria-label="Close"><FaTimes /></button>
      <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous"><FaChevronLeft /></button>
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex}`}
        className={styles.lightboxImg}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      />
      <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next"><FaChevronRight /></button>
    </motion.div>
  );
}

function EditionSection({ edition, index }) {
  const [ref, inView] = useInView(0.1);
  const isEven = index % 2 === 0;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % edition.gallery.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev === 0 ? edition.gallery.length - 1 : prev - 1));

  return (
    <section className={styles.editionSection}>
      <div className={styles.editionHeaderWrapper}>
        <div className="container">
          <div className={styles.editionTitleWrapper}>
            <h2 className={styles.editionTitle}>{edition.title}</h2>
          </div>
          <motion.div 
            ref={ref}
            className={`${styles.editionContainer} ${isEven ? styles.rowReverse : ''}`}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.editionText}>
              <p>{edition.description}</p>
              {edition.link && (
                <a href={edition.link} target="_blank" rel="noreferrer" className={styles.enterBtn}>
                  Enter {edition.title}
                </a>
              )}
            </div>
            <div className={styles.editionThumbnail}>
              <img src={edition.thumbnail} alt={edition.title} loading="lazy" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        <h3 className={styles.galleryTitle}>{edition.title} Gallery</h3>
      </div>
      <div style={{ width: '100%', overflow: 'hidden' }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView="auto"
          centeredSlides={true}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className={styles.gallerySwiper}
        >
          {edition.gallery.map((imgSrc, idx) => (
            <SwiperSlide key={idx} className={styles.gallerySlide}>
              <img src={imgSrc} alt={`Gallery ${idx}`} loading="lazy" onClick={() => openLightbox(idx)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={edition.gallery}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onNext={nextLightbox}
            onPrev={prevLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default function ENIF() {
  useDocumentTitle('ENIF', 'ENIF — Engineering and Industry Forum.');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading as requested by user
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.page}>
      <AnimatePresence>
        {loading && (
          <motion.div
            className={styles.loaderOverlay}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img src="/src/assets/LOGO.png" alt="Loading..." className={styles.loaderSpinnerImg} />
          </motion.div>
        )}
      </AnimatePresence>

      <Hero title="ENIF" isHome={false} />

      {/* What is ENIF Block */}
      <section style={{ position: 'relative' }}>
        <div className="container">
          <div className={styles.introBlock}>
            <h2>What is ENIF?</h2>
            <p>
              ENIF (ENIS Industrial Forum) is an annual forum organized by the IEEE IAS ENIS
              chapter which has been held three times so far. This forum gathers students from
              all over Tunisia in order to bridge the gap with the new technologies and give
              them the opportunity to experience a journey in the world of industry through
              workshops, conferences and competitions.
            </p>
          </div>
        </div>
      </section>

      {/* ENIF Editions */}
      <div style={{ marginTop: '60px' }}>
        {ENIF_EDITIONS.map((edition, index) => (
          <EditionSection key={edition.id} edition={edition} index={index} />
        ))}
      </div>
    </div>
  );
}
