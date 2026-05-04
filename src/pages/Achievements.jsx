import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaStar, FaMedal, FaFileAlt, FaHeart, FaBolt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import Hero from '../components/Hero/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInView } from '../hooks/useInView';
import achievementsData from '../data/achievements.json';
import styles from '../styles/pages.module.css';
import enifStyles from '../styles/enif.module.css';

const AWARDS_GALLERY = [
  '/src/assets/awards/anmeeting1.jpg',
  '/src/assets/awards/anmeeting2.jpg',
  '/src/assets/awards/Best Website.jpg',
  '/src/assets/awards/bestiast.jpg',
  '/src/assets/awards/Humanitarian Award.jpg',
  '/src/assets/awards/iastam.jpg',
  '/src/assets/awards/iastam2.jpg',
  '/src/assets/awards/iastam3.jpg',
  '/src/assets/awards/Outstanding Member.jpg',
  '/src/assets/awards/OutstandingChapter.jpg',
  '/src/assets/awards/tsyp1.jpg',
  '/src/assets/awards/tsyp2.jpg',
  '/src/assets/awards/tsyp3.jpg',
  '/src/assets/awards/tsyp4.jpg',
  '/src/assets/awards/tsyp5.jpg',
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
      className={enifStyles.lightboxOverlay} 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className={enifStyles.lightboxClose} onClick={onClose} aria-label="Close"><FaTimes /></button>
      <button className={enifStyles.lightboxPrev} onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous"><FaChevronLeft /></button>
      <motion.img 
        key={currentIndex}
        src={images[currentIndex]} 
        alt={`Gallery ${currentIndex}`} 
        className={enifStyles.lightboxImg} 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      />
      <button className={enifStyles.lightboxNext} onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next"><FaChevronRight /></button>
    </motion.div>
  );
}


const ICON_MAP = {
  trophy: <FaTrophy />,
  star: <FaStar />,
  award: <FaMedal />,
  'file-text': <FaFileAlt />,
  heart: <FaHeart />,
  zap: <FaBolt />,
};

const fadeUp = {
  hidden: { opacity: 0, x: -30 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Achievements() {
  useDocumentTitle(
    'Achievements',
    'IEEE IAS ENIS SBC awards and achievements — 14+ awards including Best IAS Chapter globally.'
  );
  const [ref, inView] = useInView();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };
  
  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % AWARDS_GALLERY.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev === 0 ? AWARDS_GALLERY.length - 1 : prev - 1));

  return (
    <div className={styles.page}>
      <Hero title="Achievements & Awards" isHome={false} />

      {/* Awards Gallery */}
      <section className={styles.sectionAlt} aria-label="Awards Gallery" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="section-title">
            <h2>Achievements Gallery</h2>
            <p>Highlights from our recent awards and events</p>
          </div>
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
            className={enifStyles.gallerySwiper}
          >
            {AWARDS_GALLERY.map((imgSrc, idx) => (
              <SwiperSlide key={idx} className={enifStyles.gallerySlide}>
                <img src={imgSrc} alt={`Award ${idx}`} loading="lazy" onClick={() => openLightbox(idx)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox 
            images={AWARDS_GALLERY} 
            currentIndex={lightboxIndex} 
            onClose={() => setLightboxOpen(false)}
            onNext={nextLightbox}
            onPrev={prevLightbox}
          />
        )}
      </AnimatePresence>

      {/* Timeline */}
      <section className={styles.section} aria-labelledby="timeline-heading" ref={ref}>
        <div className="container">
          <div className="section-title">
            <h2 id="timeline-heading">Award Timeline</h2>
            <p>A chronological journey through our proudest moments</p>
          </div>

          <div className={styles.timeline}>
            {achievementsData.map((item, i) => (
              <motion.div
                key={item.id}
                className={styles.timelineItem}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineIcon} aria-hidden="true">
                    {ICON_MAP[item.icon] || <FaTrophy />}
                  </div>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineOrg}>{item.organization}</p>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <JoinCTA />
    </div>
  );
}
