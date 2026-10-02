import { motion } from 'framer-motion';
import { FaBookOpen, FaArrowRight } from 'react-icons/fa';
import { useInView } from '../../hooks/useInView';
import magazineCover from '../../assets/magazine.webp';
import styles from './MagazineSection.module.css';

/* TODO: Replace this placeholder link with the official Google Drive magazine link once provided. */
const MAGAZINE_LINK = 'https://drive.google.com/file/d/1awTlyQjmRMVYdWTz-NK7fJtfDsq4-NZz/view?ts=69f7b205';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function MagazineSection() {
  const [ref, inView] = useInView();

  return (
    <section className={styles.section} aria-labelledby="magazine-heading" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2 id="magazine-heading">Our Magazine</h2>
          <p>Read the latest edition of the IEEE IAS ENIS SBC magazine</p>
        </div>

        <motion.div
          className={styles.card}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className={styles.cover}>
            <img src={magazineCover} alt="" loading="lazy" />
            <span className={styles.coverTag} aria-hidden="true">DOC · LATEST EDITION</span>
          </div>

          <div className={styles.content}>
            <div className={styles.iconBox} aria-hidden="true">
              <FaBookOpen />
            </div>
            <p className={styles.desc}>
              Explore our latest magazine featuring activities, achievements, technical
              content, and highlights from IEEE IAS ENIS SBC.
            </p>
            <a
              href={MAGAZINE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Read the Magazine <FaArrowRight aria-hidden="true" />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
