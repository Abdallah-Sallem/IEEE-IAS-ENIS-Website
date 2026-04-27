import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import styles from './AboutSnippet.module.css';

const IAS_LOGO = 'https://ias-enis.ieee.tn/assets/img/iaslogo.png';

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } },
};

export default function AboutSnippet() {
  const [ref, inView] = useInView();

  return (
    <section className={styles.aboutSnippet} aria-labelledby="about-snippet-heading" ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {/* Text Side */}
          <motion.div
            className={styles.textSide}
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >

            <h2 id="about-snippet-heading" className={styles.heading}>
              About Us
            </h2>
            <p className={styles.body}>
              The IEEE industrial application society was founded in 2010,
              it is interested in advancement of theory of Electronic and electrical
              engineering in development, manufacturing smart systems it builds linkage
              between students and industries from training sessions and events.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>15+</span>
                <span className={styles.statLabel}>Years Active</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>180+</span>
                <span className={styles.statLabel}>Members</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>14</span>
                <span className={styles.statLabel}>Awards</span>
              </div>
            </div>

            <Link to="/about" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Read More
            </Link>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className={styles.imageSide}
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.imageFrame}>
              <div className={styles.ring} style={{
                width: '340px', height: '340px',
                border: '1px solid rgba(12, 116, 68, 0.2)',
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)', borderRadius: '50%',
                animation: 'ringPulse 4s ease-in-out infinite'
              }} />
              <div className={styles.ring} style={{
                width: '420px', height: '420px',
                border: '1px solid rgba(30, 150, 104,0.1)',
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)', borderRadius: '50%',
                animation: 'ringPulse 4s ease-in-out infinite 2s'
              }} />
              <div className={styles.imageBox}>
                <img
                  src={IAS_LOGO}
                  alt="IEEE IAS Logo"
                  loading="lazy"
                />
              </div>
              <div className={styles.cornerAccent} aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
