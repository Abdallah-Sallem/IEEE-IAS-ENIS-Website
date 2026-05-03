import { motion } from 'framer-motion';
import { FaClock, FaIndustry } from 'react-icons/fa';
import Hero from '../../components/Hero/Hero';
import GallerySection from '../../components/GallerySection/GallerySection';
import JoinCTA from '../../components/JoinCTA/JoinCTA';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useInView } from '../../hooks/useInView';
import mediaVideos from '../../data/mediaVideos.json';
import styles from './Media.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

const INDUSTRY_ICONS = ['🔧', '⚡', '💻', '🤖'];

function VideoCard({ video, index, inView }) {
  const hasVideo = video.videoUrl && video.status !== 'coming-soon';

  return (
    <motion.article
      className={styles.videoCard}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className={styles.videoThumbnail}>
        {hasVideo ? (
          <iframe
            src={video.videoUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className={styles.videoIframe}
          />
        ) : (
          <div className={styles.comingSoon}>
            <span className={styles.comingSoonIcon}>{INDUSTRY_ICONS[index] || '🏭'}</span>
            <FaClock className={styles.clockIcon} />
            <span className={styles.comingSoonText}>Video Coming Soon</span>
          </div>
        )}
      </div>
      <div className={styles.videoInfo}>
        <div className={styles.videoBadge}>
          <FaIndustry /> {video.subtitle}
        </div>
        <h3 className={styles.videoTitle}>{video.title}</h3>
        <p className={styles.videoDesc}>{video.description}</p>
      </div>
    </motion.article>
  );
}

export default function Media() {
  useDocumentTitle(
    'Media',
    'Explore the evolution from Industry 1.0 to Industry 4.0 — video content and photo gallery from IEEE IAS ENIS SBC.'
  );
  const [ref, inView] = useInView();

  return (
    <div className={styles.page}>
      <Hero title="Media" isHome={false} />

      {/* ── Industry Evolution Section ─────────── */}
      <section className={styles.section} id="industry-evolution" ref={ref}>
        <div className="container">
          <div className="section-title">
            <h2>The Evolution of Industry</h2>
            <p>
              From steam-powered machines to smart factories — explore the four
              industrial revolutions that have shaped modern manufacturing and
              the role of IEEE IAS in driving industry innovation.
            </p>
          </div>

          <div className={styles.videoGrid}>
            {mediaVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ─────────────────────── */}
      <div id="gallery">
        <GallerySection showAll />
      </div>

      <JoinCTA />
    </div>
  );
}
