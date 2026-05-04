import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBus, FaUsers, FaChalkboardTeacher,
  FaNetworkWired, FaProjectDiagram, FaMedal,
  FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight,
  FaMicrochip, FaHandshake, FaUserTie,
} from 'react-icons/fa';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import Hero from '../components/Hero/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInView } from '../hooks/useInView';
import styles from '../styles/pages.module.css';
import vtoolsData from '../assets/Activities/vtools.json';

/* ─── Static "Why Us" activity types ──────────────────── */
const ACTIVITY_TYPES = [
  {
    id: 1,
    icon: <FaBus />,
    title: 'Industrial Visits',
    desc: 'We arrange annual visits to industrial companies and research laboratories working in various fields. These visits help our members discover professional work environments, observe cutting-edge industrial processes, and build lasting connections with industry professionals.',
    highlights: [
      'Guided tours of manufacturing facilities',
      'Meetings with engineering professionals',
      'Insights into real-world industry operations',
      'Networking with potential future employers',
    ],
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: 'Conferences',
    desc: 'Technical conferences provide updates on the development of specific products and business sectors. Industry-oriented and application-driven, these events promote the ongoing development of engineering knowledge and foster collaboration between academia and industry.',
    highlights: [
      'Paper presentations and panel discussions',
      'Keynote speakers from top companies',
      'Academic and industry collaboration sessions',
      'Best paper awards and recognition',
    ],
  },
  {
    id: 3,
    icon: <FaChalkboardTeacher />,
    title: 'Trainings & Workshops',
    desc: 'Establish technical industry expertise with our training and certification programs. From programming to professional development, our workshops provide hands-on experience with tools and technologies that matter in the modern engineering workplace.',
    highlights: [
      'Hands-on technical skill development',
      'Certification preparation programs',
      'Soft skills and leadership training',
      'Industry-standard tools and platforms',
    ],
  },
  {
    id: 4,
    icon: <FaNetworkWired />,
    title: 'Networking Events',
    desc: 'Building professional relationships is key to career success. Our networking events bring together students, alumni, and industry professionals in a relaxed environment to exchange ideas, share experiences, and explore collaboration opportunities.',
    highlights: [
      'Alumni career panels',
      'Student-industry mixer events',
      'LinkedIn profile and branding workshops',
      'Mentorship program connections',
    ],
  },
  {
    id: 5,
    icon: <FaProjectDiagram />,
    title: 'Project Competitions',
    desc: 'We organize and participate in engineering design competitions that challenge our members to apply their technical knowledge to solve real-world problems. These competitions develop critical thinking, teamwork, and presentation skills.',
    highlights: [
      'Innovation and design challenges',
      'IEEE regional and global competitions',
      'Prototype development and testing',
      'Expert judging and feedback sessions',
    ],
  },
  {
    id: 6,
    icon: <FaMedal />,
    title: 'ENIF — Flagship Event',
    desc: 'The Engineering and Industry Forum (ENIF) is our premier annual event, bringing together hundreds of students and professionals for a full day of talks, workshops, and an industrial careers fair. A highlight of the academic calendar.',
    highlights: [
      'Annual flagship engineering forum',
      'Multiple simultaneous workshop tracks',
      'Industrial partners and sponsors',
      'Hundreds of student participants',
    ],
  },
];

/* ─── Animation variants ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

const tabContentVariant = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

/* ─── Import all activity images eagerly ──────────────── */
const activityImages = import.meta.glob(
  '../assets/Activities/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

function resolvePhoto(filename) {
  if (!filename) return null;
  const match = Object.entries(activityImages).find(([path]) =>
    path.endsWith('/' + filename)
  );
  return match ? match[1] : null;
}

/* ─── "Why Us" Activity Card (existing) ───────────────── */
function ActivityCard({ activity, index, inView }) {
  return (
    <motion.article
      className={styles.activityCard}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className={styles.activityCardHeader}>
        <div className={styles.activityCardIcon} aria-hidden="true">
          {activity.icon}
        </div>
        <h3 className={styles.activityCardTitle}>{activity.title}</h3>
      </div>
      <div className={styles.activityCardBody}>
        <p>{activity.desc}</p>
        <ul className={styles.activityList}>
          {activity.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* ─── Photo Lightbox ──────────────────────────────────── */
function PhotoLightbox({ photos, currentIndex, onClose, onNext, onPrev }) {
  if (!photos || photos.length === 0) return null;
  const src = resolvePhoto(photos[currentIndex]);
  if (!src) return null;

  return (
    <motion.div
      className={styles.lightboxOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
        <button className={styles.lightboxClose} onClick={onClose} aria-label="Close">
          <FaTimes />
        </button>
        {photos.length > 1 && (
          <button className={styles.lightboxPrev} onClick={onPrev} aria-label="Previous">
            <FaChevronLeft />
          </button>
        )}
        <img src={src} alt={`Photo ${currentIndex + 1}`} className={styles.lightboxImg} />
        {photos.length > 1 && (
          <button className={styles.lightboxNext} onClick={onNext} aria-label="Next">
            <FaChevronRight />
          </button>
        )}
        {photos.length > 1 && (
          <div className={styles.lightboxCounter}>
            {currentIndex + 1} / {photos.length}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── VTools Activity Item ────────────────────────────── */
function VToolsActivityItem({ activity, onSelect, isSelected, onOpenLightbox }) {
  const photos = activity.photos || (activity.photo ? [activity.photo] : []);
  const hasPhotos = photos.length > 0 && photos.some(p => typeof p === 'string' && p.length > 0);

  return (
    <motion.div
      className={`${styles.vtoolsItem} ${isSelected ? styles.vtoolsItemActive : ''}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className={styles.vtoolsItemHeader}>
        <button
          className={styles.vtoolsItemBtn}
          onClick={() => hasPhotos && onSelect(activity)}
          disabled={!hasPhotos}
          title={hasPhotos ? 'Click to view photos' : 'No photos available'}
        >
          <span className={styles.vtoolsItemName}>{activity.name}</span>
          {activity.category && (
            <span className={styles.vtoolsItemCategory}>{activity.category}</span>
          )}
        </button>
        <a
          href={activity.vtools_link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.vtoolsLink}
          title="View on vTools"
        >
          <FaExternalLinkAlt />
        </a>
      </div>

      {/* Photo thumbnails when selected */}
      <AnimatePresence>
        {isSelected && hasPhotos && (
          <motion.div
            className={styles.vtoolsPhotoGrid}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {photos.map((photo, i) => {
              const src = resolvePhoto(photo);
              if (!src) return null;
              return (
                <img
                  key={i}
                  src={src}
                  alt={`${activity.name} - ${i + 1}`}
                  className={styles.vtoolsThumb}
                  onClick={() => onOpenLightbox(photos, i)}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Speaker Card ────────────────────────────────────── */
function SpeakerCard({ speaker }) {
  const photo = typeof speaker.photo === 'string' ? resolvePhoto(speaker.photo) : null;

  return (
    <motion.div
      className={styles.speakerCard}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {photo ? (
        <img src={photo} alt={speaker.name} className={styles.speakerPhoto} />
      ) : (
        <div className={styles.speakerPhotoPlaceholder}>
          <FaUserTie />
        </div>
      )}
      <div className={styles.speakerInfo}>
        <h4 className={styles.speakerName}>{speaker.name}</h4>
        <a
          href={speaker.vtools_link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.vtoolsLinkSmall}
        >
          View on vTools <FaExternalLinkAlt size={10} />
        </a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN ACTIVITIES PAGE
   ═══════════════════════════════════════════════════════ */
export default function Activities() {
  useDocumentTitle(
    'Activities',
    'Explore IEEE IAS ENIS SBC activities — industrial visits, conferences, workshops, and our flagship ENIF event.'
  );
  const [ref, inView] = useInView();

  /* ── Tab state ───────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState('technical');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxPhotos, setLightboxPhotos] = useState(null);

  const technicalActivities = vtoolsData.technical_activities || [];
  const nonTechnicalActivities = vtoolsData.non_technical_activities || [];
  const speakersAndParticipants = vtoolsData.speakers_and_participants || [];

  const currentActivities = activeTab === 'technical'
    ? technicalActivities
    : nonTechnicalActivities;

  /* ── Group activities by category ────────────────────── */
  const grouped = currentActivities.reduce((acc, activity) => {
    const cat = activity.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(activity);
    return acc;
  }, {});

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setSelectedActivity(null);
    setLightboxPhotos(null);
  }, []);

  const handleSelectActivity = useCallback((activity) => {
    setSelectedActivity(prev =>
      prev && prev.name === activity.name ? null : activity
    );
  }, []);

  const openLightbox = useCallback((photos, index = 0) => {
    setLightboxPhotos(photos);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxPhotos(null);
    setLightboxIndex(0);
  }, []);

  const nextPhoto = useCallback(() => {
    if (!lightboxPhotos) return;
    setLightboxIndex(prev => (prev + 1) % lightboxPhotos.length);
  }, [lightboxPhotos]);

  const prevPhoto = useCallback(() => {
    if (!lightboxPhotos) return;
    setLightboxIndex(prev => (prev - 1 + lightboxPhotos.length) % lightboxPhotos.length);
  }, [lightboxPhotos]);

  return (
    <div className={styles.page}>
      <Hero title="Activities" isHome={false} />

      {/* ── "Why Us" section header ──────────────────── */}
      <div style={{ textAlign: 'center', paddingTop: '60px' }}>
        <h2 style={{
          fontWeight: 800,
          textTransform: 'uppercase',
          color: '#266d43ff',
          letterSpacing: '2px',
          marginBottom: '10px'
        }}>
          Why Us
        </h2>
        <div style={{
          width: '50px',
          height: '4px',
          backgroundColor: '#1a6b3c',
          margin: '0 auto'
        }} />
      </div>

      {/* ── "Why Us" activity cards ──────────────────── */}
      <section className={styles.section} id="content" aria-label="Activities list" ref={ref}>
        <div className="container">
          <div className={styles.activitiesPageGrid}>
            {ACTIVITY_TYPES.map((activity, i) => (
              <ActivityCard key={activity.id} activity={activity} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          VTOOLS ACTIVITIES BROWSER — Tabbed Section
          ═══════════════════════════════════════════════ */}
      <section className={styles.sectionAlt} id="vtools-activities" aria-label="Past Activities">
        <div className="container">
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#266d43ff',
              letterSpacing: '2px',
              marginBottom: '10px'
            }}>
              Our Activities
            </h2>
            <div style={{
              width: '50px',
              height: '4px',
              backgroundColor: '#1a6b3c',
              margin: '0 auto 16px'
            }} />
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Browse our past events organized by category. Click on any activity to view associated photos.
            </p>
          </div>

          {/* ── Category Tabs ───────────────────────── */}
          <div className={styles.vtoolsTabs} id="category-tabs">
            <button
              id="tab-technical"
              className={`${styles.vtoolsTab} ${activeTab === 'technical' ? styles.vtoolsTabActive : ''}`}
              onClick={() => handleTabChange('technical')}
            >
              <FaMicrochip style={{ marginRight: '8px' }} />
              Technical Activities
            </button>
            <button
              id="tab-non-technical"
              className={`${styles.vtoolsTab} ${activeTab === 'non-technical' ? styles.vtoolsTabActive : ''}`}
              onClick={() => handleTabChange('non-technical')}
            >
              <FaHandshake style={{ marginRight: '8px' }} />
              Non-Technical Activities
            </button>
          </div>

          {/* ── Tab Content ─────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabContentVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={styles.vtoolsTabContent}
            >
              {Object.entries(grouped).map(([category, activities]) => (
                <div key={category} className={styles.vtoolsCategoryGroup}>
                  <h3 className={styles.vtoolsCategoryTitle}>{category}</h3>
                  <div className={styles.vtoolsItemsList}>
                    {activities.map((activity, i) => (
                      <VToolsActivityItem
                        key={activity.name + i}
                        activity={activity}
                        onSelect={handleSelectActivity}
                        isSelected={selectedActivity && selectedActivity.name === activity.name}
                        onOpenLightbox={openLightbox}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {currentActivities.length === 0 && (
                <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '40px 0' }}>
                  No activities in this category yet.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SPEAKERS & PARTICIPANTS — Separate Section
          ═══════════════════════════════════════════════ */}
      {speakersAndParticipants.length > 0 && (
        <section className={styles.section} id="speakers" aria-label="Speakers">
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#266d43ff',
                letterSpacing: '2px',
                marginBottom: '10px'
              }}>
                Speakers
              </h2>
              <div style={{
                width: '50px',
                height: '4px',
                backgroundColor: '#1a6b3c',
                margin: '0 auto'
              }} />
            </div>
            <div className={styles.speakersGrid}>
              {speakersAndParticipants.map((speaker, i) => (
                <SpeakerCard key={speaker.name + i} speaker={speaker} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Lightbox ────────────────────────────────── */}
      <AnimatePresence>
        {lightboxPhotos && (
          <PhotoLightbox
            photos={lightboxPhotos}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextPhoto}
            onPrev={prevPhoto}
          />
        )}
      </AnimatePresence>

      <JoinCTA />
    </div>
  );
}
