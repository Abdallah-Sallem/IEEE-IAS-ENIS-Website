import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';
import styles from './QuoteSection.module.css';

import authorImg from '../../assets/quotes/2.webp';

export default function QuoteSection() {
  const [ref, inView] = useInView();

  return (
    <section className={styles.quoteSection} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <img
            src={authorImg}
            alt="Stephen Gardiner"
            className={styles.authorImage}
            loading="lazy"
          />
          <h3 className={styles.quoteText}>
            "The industrial revolution was another of those extraordinary jumps forward in the story of civilization."
          </h3>
          <p className={styles.authorName}>-Stephen Gardiner</p>
        </motion.div>
      </div>
    </section>
  );
}
