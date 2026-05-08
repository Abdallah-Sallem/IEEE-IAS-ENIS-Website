import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaStar, FaMedal, FaFileAlt, FaHeart, FaBolt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import Hero from '../components/Hero/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInView } from '../hooks/useInView';
import achievementsData from '../data/achievements.json';
import styles from '../styles/pages.module.css';
import enifStyles from '../styles/enif.module.css';
import '../styles/awardsModal.css'; // New styles for the modal

const AWARDS_GALLERY = [
  '/assets/awards/anmeeting1.webp',
  '/assets/awards/anmeeting2.webp',
  '/assets/awards/Best Website.webp',
  '/assets/awards/bestiast.webp',
  '/assets/awards/Humanitarian Award.webp',
  '/assets/awards/iastam.webp',
  '/assets/awards/iastam2.webp',
  '/assets/awards/iastam3.webp',
  '/assets/awards/Outstanding Member.webp',
  '/assets/awards/OutstandingChapter.webp',
  '/assets/awards/tsyp1.webp',
  '/assets/awards/tsyp2.webp',
  '/assets/awards/tsyp3.webp',
  '/assets/awards/tsyp4.webp',
  '/assets/awards/tsyp5.webp',
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

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedAward, setSelectedAward] = useState(null);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };
  
  const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % AWARDS_GALLERY.length);
  const prevLightbox = () => setLightboxIndex((prev) => (prev === 0 ? AWARDS_GALLERY.length - 1 : prev - 1));

  // Modal Handlers
  const openModal = (award) => setSelectedAward(award);
  const closeModal = () => setSelectedAward(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedAward) closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAward]);

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
            modules={[Pagination, Autoplay, Navigation, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            spaceBetween={0}
            slidesPerView="auto"
            centeredSlides={true}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            watchOverflow={true}
            grabCursor={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className={`premium-swiper ${enifStyles.gallerySwiper}`}
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
      <section className={styles.section} aria-labelledby="timeline-heading">
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
                custom={i % 5} // Limit stagger index so it doesn't wait forever
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <div className={styles.timelineYear}>{item.year}</div>
                <div 
                  className={`${styles.timelineCard} awards-clickable-card`} 
                  onClick={() => openModal(item)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => { if (e.key === 'Enter') openModal(item); }}
                >
                  <div className={styles.timelineIcon} aria-hidden="true">
                    {ICON_MAP[item.icon] || <FaTrophy />}
                  </div>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  {item.organization && <p className={styles.timelineOrg}>{item.organization}</p>}
                  <p className={styles.timelineDesc}>{item.description?.substring(0, 80)}...</p>
                  <span className="read-more-text">Read More</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Modal */}
      <AnimatePresence>
        {selectedAward && (
          <div 
            className="awards-modal-overlay" 
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div 
              className="awards-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button className="awards-modal-close" onClick={closeModal} aria-label="Close Modal">
                <FaTimes />
              </button>
              
              <h2 id="modal-title" className="awards-modal-header">{selectedAward.title}</h2>
              
              <div className="awards-modal-body">
                <div className="awards-modal-image">
                  <img 
                    src={selectedAward.photo || '/assets/LOGO.webp'} 
                    alt={selectedAward.title} 
                    loading="lazy" 
                  />
                </div>
                <div className="awards-modal-info">
                  <div className="awards-info-group">
                    <span className="awards-info-label">Year:</span>
                    <span className="awards-info-value">{selectedAward.year}</span>
                  </div>
                  <div className="awards-info-group">
                    <span className="awards-info-label">Description:</span>
                    <p className="awards-info-text">{selectedAward.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <JoinCTA />
    </div>
  );
}
