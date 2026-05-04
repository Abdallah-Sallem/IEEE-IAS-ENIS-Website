import { motion } from 'framer-motion';
import { FaBookOpen, FaArrowRight } from 'react-icons/fa';
import { useInView } from '../../hooks/useInView';
import styles from './MagazineSection.module.css';

/* TODO: Replace this placeholder link with the official Google Drive magazine link once provided. */
const MAGAZINE_LINK = 'https://drive.google.com/file/d/1awTlyQjmRMVYdWTz-NK7fJtfDsq4-NZz/view?ts=69f7b205';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function MagazineSection() {
  const [ref, inView] = useInView();

  return (
    <div ref={ref}>
      <div className="container" style={{ paddingTop: 'var(--spacing-4xl)', paddingBottom: 'var(--spacing-lg)' }}>
        <div className="section-title">
          <h2>Our Magazine</h2>
          <p>Read the latest edition of the IEEE IAS ENIS SBC magazine</p>
        </div>
      </div>
      <section className={styles.section} aria-label="Our Magazine">
        <div className="container">
          <motion.div
            className={styles.card}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.iconBox}>
              <FaBookOpen />
            </div>
            <div className={styles.content}>
              <p className={styles.desc}>
                Explore our latest magazine featuring activities, achievements, technical
                content, and highlights from IEEE IAS ENIS SBC.
              </p>
              <a
                href={MAGAZINE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cta}
              >
                Read the Magazine <FaArrowRight />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
