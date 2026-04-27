import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import styles from './JoinCTA.module.css';

const IEEE_JOIN_URL =
  'https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMIA034';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function JoinCTA() {
  const [ref, inView] = useInView();

  return (
    <section className={styles.joinCta} aria-labelledby="join-cta-heading" ref={ref}>
      <div className={styles.stripe} aria-hidden="true" />
      <div className="container">
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2 id="join-cta-heading" className={styles.heading} variants={itemVariants}>
            Success is a decision, You deserve the best
          </motion.h2>

          <motion.p className={styles.body} variants={itemVariants}>
            Join the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity . by joining the IEEE You get a free first year Industry Applications Society membership.
          </motion.p>

          <motion.a
            className={styles.ctaBtn}
            href={IEEE_JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Become an IEEE IAS Member (opens in new tab)"
          >
            BECOME AN IEEE IAS MEMBER
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
