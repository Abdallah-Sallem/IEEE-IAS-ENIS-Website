import { motion } from 'framer-motion';
import { FaClock, FaIndustry, FaPodcast } from 'react-icons/fa';
import Hero from '../../components/Hero/Hero';
import JoinCTA from '../../components/JoinCTA/JoinCTA';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useInView } from '../../hooks/useInView';
import mediaVideos from '../../data/mediaVideos.json';
import styles from './Media.module.css';
import tunisiaVideo from '../../assets/retrotech/tunisia.mp4';
import podcastImg from '../../assets/retrotech/podcast.png';

/* ── Eagerly import all retrotech video files ──────────── */
const retroVideos = import.meta.glob(
  '../../assets/retrotech/*.mp4',
  { eager: true, import: 'default' }
);

function resolveVideo(filename) {
  if (!filename) return null;
  const match = Object.entries(retroVideos).find(([path]) =>
    path.endsWith('/' + filename)
  );
  return match ? match[1] : null;
}

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
  const localVideoSrc = resolveVideo(video.videoFile);
  const hasVideo = video.videoUrl && video.status !== 'coming-soon';
  const hasLocalVideo = localVideoSrc && video.status !== 'coming-soon';

  return (
    <motion.article
      className={styles.videoCard}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className={styles.videoThumbnail}>
        {hasLocalVideo ? (
          <video
            src={localVideoSrc}
            controls
            className={styles.videoIframe}
            preload="metadata"
          />
        ) : hasVideo ? (
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
            <h2>Retro Tech</h2>
            <p>
              Retro Tech is an informative video series that traces the evolution of industry from Industry 1.0 to Industry 4.0. Through a journey that explores the key innovations and breakthroughs that shaped each era, Retro Tech provides an understanding of how technology has revolutionized industry and transformed our lives. Discover the fascinating story of industrial evolution and its impact on society by tuning in to Retro Tech today.
            </p>
          </div>

          <div className={styles.videoGrid}>
            {mediaVideos.map((video, i) => (
              <VideoCard key={video.id} video={video} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Beauty of Tunisia Video Section ───────── */}
      <section className={styles.section} id="tunisia-video">
        <div className="container">
          <div className="section-title">
            <h2 style={{ color: 'var(--color-primary)' }}>Video highlighting the beauty of Tunisia</h2>
            <p>Showcased at the prestigious Power Africa Congress</p>
          </div>
          
          <div className={styles.tunisiaContent}>
            <p className={styles.tunisiaText}>
              IEEE IAS ENIS SBC Shines at Power Africa Congress! We are incredibly proud to have represented our chapter at the prestigious Power Africa Congress! During the event, we showcased an inspiring video highlighting the beauty of Tunisia and the incredible activities we've undertaken throughout our mandate in 2024. The response? Absolutely overwhelming! Everyone was captivated and amazed by the video and the energy, dedication, and passion of our chapter. This video, a masterpiece crafted by our talented friend Abderrahmen Marrakchi, also known as The AMmaker, perfectly encapsulated our journey and vision. His creativity and passion have truly put Tunisia and our chapter on the map! Check out the video below and experience its beauty yourself! We are thrilled to have left such an impression and proud to represent Tunisia at this international event. Together, we continue to inspire and make a difference!
            </p>
            
            <motion.div 
              className={styles.tunisiaVideoContainer}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <video 
                src={tunisiaVideo} 
                controls 
                className={styles.tunisiaVideo}
                preload="metadata"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Podcast Section ───────────────────────── */}
      <section className={styles.sectionAlt} id="podcast">
        <div className="container">
          <motion.div
            className={styles.podcastBlock}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.podcastContent}>
              <h2 className={styles.podcastTitle}>
                <FaPodcast className={styles.podcastIcon} />
                Powering the Future with IEEE IAS Podcast
              </h2>
              <p className={styles.podcastText}>
                "Powering the Future with IEEE IAS" is an exciting new podcast that will be launching soon, bringing you the latest insights and expert analysis from the world of electrical power and energy. Stay tuned for updates on the launch date and where you can listen. Whether you're an industry professional, a student, or simply curious about the world of energy, this podcast will offer a wealth of information and fascinating perspectives on the challenges and opportunities facing the industry today.{' '}
                <strong>Don't miss out on this exciting new podcast coming soon!</strong>
              </p>
            </div>
            <div className={styles.podcastImageWrapper}>
              <img
                src={podcastImg}
                alt="Powering the Future with IEEE IAS Podcast"
                className={styles.podcastImage}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <JoinCTA />
    </div>
  );
}
