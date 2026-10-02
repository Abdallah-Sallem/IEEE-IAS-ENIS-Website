import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useInView } from '../../hooks/useInView';
import styles from './AboutSnippet.module.css';

import IAS_LOGO from '../../assets/iaslogo.webp';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 },
  }),
};

export default function AboutSnippet() {
  const [ref, inView] = useInView();

  return (
    <section className={styles.aboutSnippet} aria-labelledby="about-snippet-heading" ref={ref}>
      <div className="container">
        <div className={`section-title ${styles.title}`}>
          <h2 id="about-snippet-heading">About Us</h2>
        </div>

        <div className={styles.grid}>
          {/* Text Side */}
          <motion.div
            className={styles.textSide}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <p className={styles.body}>
              The IEEE Industrial Application Society of The National Engineering School of Sfax (ENIS) was founded in 2010,
              it is interested in advancement of theory of Electronic and electrical
              engineering in development, manufacturing smart systems it builds linkage
              between students and industries from training sessions and events.
            </p>

            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>Years Active</dt>
                <dd className={styles.statNum}>16+</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>Members</dt>
                <dd className={styles.statNum}>180+</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>Awards</dt>
                <dd className={styles.statNum}>14</dd>
              </div>
            </dl>

            <Link to="/about" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Read More <FaArrowRight aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Image Side — drawing view */}
          <motion.figure
            className={styles.imageSide}
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.imageFrame}>
              <span className={styles.dimTop} aria-hidden="true">EST. 2010</span>
              <span className={styles.dimSide} aria-hidden="true">SFAX · TN</span>
              <div className={styles.imageBox}>
                <img
                  src={IAS_LOGO}
                  alt="IEEE IAS Logo"
                  loading="lazy"
                />
              </div>
            </div>
            <figcaption className={styles.caption} aria-hidden="true">
              FIG. 01 — IEEE Industry Applications Society
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
