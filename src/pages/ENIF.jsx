import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaExternalLinkAlt, 
  FaCalendarAlt, 
  FaTag, 
  FaImages, 
  FaArrowRight,
  FaBolt
} from 'react-icons/fa';
import PremiumSwiper from '../components/PremiumSwiper/PremiumSwiper';
import Hero from '../components/Hero/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInView } from '../hooks/useInView';
import styles from '../styles/enif.module.css';

const ENIF_EDITIONS = [
  {
    id: 6,
    title: 'ENIF 6.0',
    year: '2024',
    tagline: 'Industry 5.0 & Next-Gen Smart Technologies for Sustainable Innovation',
    tags: ['Industry 5.0', 'Sustainability', 'Hackathon', 'Human-Machine Tech'],
    description: "The 6th edition of the ENIS Industrial Forum marked a major milestone by exploring the integration of Industry 5.0 principles into modern sustainable engineering. Bringing together industry leaders, academic researchers, and students, the forum combined keynote conferences with a high-intensity hackathon featuring real-world industrial challenges formulated directly by corporate partners.",
    thumbnail: '/assets/Thumbnail/logo enif final-02.png',
    facebook: 'https://events.vtools.ieee.org/m/553109',
    gallery: [
      
      '/assets/enif6/3.webp',
      '/assets/enif6/5.webp',
      '/assets/enif6/6.webp',
      '/assets/enif6/7.webp',
    ]
  },
  {
    id: 5,
    title: 'ENIF 5.0',
    year: '2023',
    tagline: 'Advanced Technologies for a Sustainable Future',
    tags: ['Sustainable Tech', 'Green Energy', 'AI & IoT', 'Industrial Hackathon'],
    description: "Under the theme 'Advanced Technologies for a Sustainable Future', ENIF 5.0 highlighted the collaborative synergy between humans and smart machines to enhance sustainability across multiple industrial sectors. An intensive hackathon challenged multidisciplinary teams to invent viable prototypes addressing partner problems.",
    thumbnail: '/assets/Thumbnail/enif_5.0.webp',
    facebook: 'https://events.vtools.ieee.org/m/449923',
    gallery: [
      '/assets/enif5/1.webp',
      '/assets/enif5/2.webp',
      '/assets/enif5/3.webp',
      '/assets/enif5/4.webp',
      '/assets/enif5/5.webp',
      '/assets/enif5/6.webp',
      '/assets/enif5/7.webp',
    ]
  },
  {
    id: 4,
    title: 'ENIF 4.0',
    year: '2022',
    tagline: 'E-Health, Smart IoT & Healthcare Artificial Intelligence',
    tags: ['E-Health', 'Healthcare AI', 'Medical IoT', 'Pitching Competition'],
    description: "ENIF 4.0 focused on the vital intersection of engineering and medical sciences, addressing healthcare challenges via AI and IoT. Interactive soft skills workshops on pitch formulation and public speaking were followed by an intense pitch competition evaluated by a jury of clinical and technological experts.",
    thumbnail: '/assets/Thumbnail/enif_4.0.webp',
    facebook: 'https://events.vtools.ieee.org/m/377196',
    gallery: [
      '/assets/enif4/1.webp',
      '/assets/enif4/2.webp',
      '/assets/enif4/3.webp',
      '/assets/enif4/4.webp',
      '/assets/enif4/5.webp',
      '/assets/enif4/6.webp',
      '/assets/enif4/7.webp',
    ]
  },
  {
    id: 3,
    title: 'ENIF 3.0',
    year: '2021',
    tagline: 'Artificial Intelligence & Applied IoT Innovation',
    tags: ['Applied AI', 'Data Systems', 'Industrial IoT', 'Partner Sponsor'],
    description: "Building on the momentum of previous years, the third edition brought 2 action-packed days of expert conferences covering machine intelligence and industrial IoT systems, followed by project competitions sponsored by Olivia and DAAD.",
    thumbnail: '/assets/Thumbnail/enif 3.0.png',
    facebook: 'https://events.vtools.ieee.org/m/325175',
    gallery: [
      '/assets/enif3/1.webp',
      '/assets/enif3/2.webp',
      '/assets/enif3/3.webp',
      '/assets/enif3/4.webp',
      '/assets/enif3/5.webp',
      '/assets/enif3/6.webp',
    ]
  },
  {
    id: 2,
    title: 'ENIF 2.0',
    year: '2021',
    tagline: 'Smart IoT Technologies in Precision Agriculture',
    tags: ['Smart Agriculture', 'ESP32 Systems', 'MicroPython', 'TechXchange'],
    description: "The edition that established the ENIF brand! Spanning two comprehensive days in December, participants built automated weather stations using ESP32 & MicroPython, attended TechXchange sessions in collaboration with IEEE CS ENIS, and competed in partner-led IoT challenges.",
    thumbnail: '/assets/Thumbnail/enif_2.0.webp',
    gallery: [
      '/assets/enif2/1.webp',
      '/assets/enif2/2.webp',
      '/assets/enif2/3.webp',
      '/assets/enif2/4.webp',
      '/assets/enif2/5.webp',
      '/assets/enif2/6.webp',
    ]
  },
  {
    id: 1,
    title: 'ENIF 1.0',
    year: '2018',
    tagline: 'Industrial IoT Forum — The Genesis of ENIF',
    tags: ['Industrial IoT', 'BLE Communications', '10 Conferences', 'Inception'],
    description: "The historic inception held on May 2nd, 2018 at ENIS. Originally titled the 'Industrial IoT Forum', it laid the groundwork with 10 high-level technological conferences and practical workshops introducing Bluetooth Low Energy (BLE) protocols and smart communication nodes.",
    thumbnail: '/assets/Thumbnail/enif_1.0.webp',
    gallery: [
      '/assets/enif1/1.webp',
      '/assets/enif1/2.webp',
      '/assets/enif1/3.webp',
      '/assets/enif1/4.webp',
      '/assets/enif1/5.0.webp',
      '/assets/enif1/5.1.webp',
      '/assets/enif1/5.2.webp',
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
      <button className={styles.lightboxClose} onClick={onClose} aria-label="Close">
        <FaTimes />
      </button>
      <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
        <FaChevronLeft />
      </button>
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`ENIF gallery item ${currentIndex + 1}`}
        className={styles.lightboxImg}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.25 }}
      />
      <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
        <FaChevronRight />
      </button>
    </motion.div>
  );
}

function EditionSection({ edition, index }) {
  const [ref, inView] = useInView(0.1, true);
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
    <section 
      id={`edition-${edition.id}`} 
      className={styles.editionSection}
      ref={ref}
    >
      <motion.article 
        className={styles.editionCard}
        initial={{ opacity: 0, y: 35 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        {/* Banner with Title & Description */}
        <div className={styles.editionBanner}>
          <div className={`${styles.editionContainer} ${isEven ? styles.rowReverse : ''}`}>
            
            <div className={styles.editionText}>
              <div className={styles.editionHeaderMeta}>
                <span className={styles.editionTag}>
                  <FaBolt style={{ marginRight: '4px', fontSize: '0.8em' }} /> {edition.title}
                </span>
                <span className={styles.editionYear}>
                  <FaCalendarAlt style={{ marginRight: '5px' }} /> {edition.year}
                </span>
              </div>

              <h3 className={styles.editionTitle}>{edition.title}</h3>
              <p className={styles.editionTagline}>{edition.tagline}</p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {edition.tags.map((tag) => (
                  <span 
                    key={tag} 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--color-white-body)',
                      padding: '0.25rem 0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--line-strong)'
                    }}
                  >
                    <FaTag aria-hidden="true" style={{ marginRight: '6px', color: 'var(--color-green-bright)' }} />{tag}
                  </span>
                ))}
              </div>

              <p className={styles.editionDescription}>{edition.description}</p>

              <div className={styles.editionActions}>
                {edition.facebook && (
                  <a 
                    href={edition.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.vtoolsBtn}
                  >
                    View on IEEE vTools <FaExternalLinkAlt style={{ fontSize: '0.85em' }} />
                  </a>
                )}
                {edition.link && (
                  <a 
                    href={edition.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={styles.linkBtn}
                  >
                    Visit Portal <FaArrowRight style={{ fontSize: '0.85em' }} />
                  </a>
                )}
              </div>
            </div>

            {/* Thumbnail Showcase */}
            <div className={styles.editionThumbnail}>
              <div className={styles.thumbWrapper}>
                <img 
                  src={edition.thumbnail} 
                  alt={`${edition.title} emblem`} 
                  className={styles.thumbImg} 
                  loading="lazy" 
                />
              </div>
            </div>

          </div>
        </div>

        {/* Gallery Carousel */}
        <div className={styles.editionGallery}>
          <div className={styles.galleryHeader}>
            <div className={styles.galleryTitle}>
              <FaImages style={{ color: 'var(--color-accent)' }} /> 
              Highlights & Moments
            </div>
            <div className={styles.galleryHint}>
              Click any photo to enlarge • {edition.gallery.length} photos
            </div>
          </div>

          <PremiumSwiper
            slides={edition.gallery.map((src, idx) => ({ 
              id: `${edition.id}-photo-${idx}`, 
              src, 
              alt: `${edition.title} photo ${idx + 1}` 
            }))}
            onSlideClick={(_slide, idx) => openLightbox(idx)}
          />
        </div>

        {/* Lightbox Modal */}
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
      </motion.article>
    </section>
  );
}

export default function ENIF() {
  useDocumentTitle('ENIF', 'ENIF — Engineering and Industry Forum by IEEE IAS ENIS SBC.');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredEditions = selectedFilter === 'all' 
    ? ENIF_EDITIONS 
    : ENIF_EDITIONS.filter(e => e.title.toLowerCase().replace(/\s+/g, '') === selectedFilter.toLowerCase().replace(/\s+/g, ''));

  return (
    <div className={styles.page}>
      <Hero 
        title="ENIF" 
        subtitle="Engineering & Industry Forum — Bridging academia and industrial evolution since 2018."
        isHome={false} 
      />

      {/* What is ENIF Intro Block */}
      <section className={styles.introSection}>
        <motion.div 
          className={styles.introCard}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.introHeader}>
            <span className={styles.heroBadge}>
              <FaBolt /> Enis Industrial Forum
            </span>
            <h2 className={styles.introTitle}>
              What is <span>ENIF</span>?
            </h2>
            <p className={styles.introText}>
              <strong>ENIF (ENIS Industrial Forum)</strong> is the premier annual flagship forum organized by the <strong>IEEE IAS ENIS Chapter</strong>. Gathering ambitious engineering students, prominent researchers, and distinguished industrial leaders from all across Tunisia, ENIF bridges the gap between theoretical knowledge and the next generation of Industry 4.0 & 5.0 technologies through high-impact workshops, expert keynotes, and real-world industrial competitions.
            </p>
          </div>

          {/* Key Metrics */}
          <div className={styles.introStats}>
            <div className={styles.introStatItem}>
              <div className={styles.introStatVal}>6+</div>
              <div className={styles.introStatLabel}>Successful Editions</div>
            </div>
            <div className={styles.introStatItem}>
              <div className={styles.introStatVal}>400+</div>
              <div className={styles.introStatLabel}>Attendees & Engineers</div>
            </div>
            <div className={styles.introStatItem}>
              <div className={styles.introStatVal}>15+</div>
              <div className={styles.introStatLabel}>Conferences & Keynotes</div>
            </div>
            <div className={styles.introStatItem}>
              <div className={styles.introStatVal}>15+</div>
              <div className={styles.introStatLabel}>Industrial Partners</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className={styles.introActions}>
            <a
              href="https://ias-enis.ieee.tn/enif/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Visit ENIF Official Portal <FaExternalLinkAlt style={{ fontSize: '0.85em' }} />
            </a>
            <a
              href="#editions-container"
              className={styles.btnSecondary}
            >
              Explore All Editions <FaArrowRight style={{ fontSize: '0.85em' }} />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Sticky Interactive Edition Filter Bar */}
      <div className={styles.filterBarWrapper} id="editions-container">
        <div className="container">
          <div className={styles.filterBar}>
            <button
              type="button"
              className={`${styles.filterPill} ${selectedFilter === 'all' ? styles.filterPillActive : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Editions ({ENIF_EDITIONS.length})
            </button>
            {ENIF_EDITIONS.map((ed) => {
              const key = ed.title.toLowerCase().replace(/\s+/g, '');
              const isActive = selectedFilter === key;
              return (
                <button
                  key={ed.id}
                  type="button"
                  className={`${styles.filterPill} ${isActive ? styles.filterPillActive : ''}`}
                  onClick={() => setSelectedFilter(key)}
                >
                  {ed.title} <span style={{ opacity: 0.6, fontSize: '0.8em' }}>({ed.year})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Editions List */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {filteredEditions.map((edition, index) => (
              <EditionSection key={edition.id} edition={edition} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
