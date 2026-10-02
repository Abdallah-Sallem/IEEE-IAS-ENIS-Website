import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { useInView } from '../../hooks/useInView';
import achievements from '../../data/achievements.json';
import styles from './NewsSection.module.css';

/*
 * News — a bulletin board built only from existing site content:
 * the flagship upcoming event (see /upcoming) and the most recent
 * entries from achievements.json (see /achievements).
 */
const UPCOMING = {
  tag: 'Upcoming',
  date: 'Coming Soon',
  title: 'ENIF 7.0',
  subtitle: 'ENIS Industrial Forum — Seventh Edition',
  to: '/upcoming',
};

const LATEST = achievements.slice(0, 3);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function NewsSection() {
  const [ref, inView] = useInView();

  return (
    <section className={styles.news} aria-labelledby="news-heading" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2 id="news-heading">News</h2>
          <p>The latest from the chapter — upcoming events and recent awards</p>
        </div>

        <div className={styles.board}>
          {/* Featured: upcoming flagship event */}
          <motion.article
            className={`spec-card ${styles.featured}`}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.meta}>
              <span className={styles.tagLive}>
                <FaCalendarAlt aria-hidden="true" /> {UPCOMING.tag}
              </span>
              <span className={styles.date}>{UPCOMING.date}</span>
            </div>
            <h3 className={styles.featuredTitle}>{UPCOMING.title}</h3>
            <p className={styles.featuredSub}>{UPCOMING.subtitle}</p>
            <Link to={UPCOMING.to} className="btn btn-accent">
              See upcoming activities <FaArrowRight aria-hidden="true" />
            </Link>
          </motion.article>

          {/* Recent awards feed */}
          <ol className={styles.feed}>
            {LATEST.map((item, i) => (
              <motion.li
                key={`${item.id}-${i}`}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
              >
                <Link to="/achievements" className={styles.item}>
                  <span className={styles.itemYear}>{item.year}</span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemTag}>
                      <FaTrophy aria-hidden="true" /> Award · {item.name}
                    </span>
                    <span className={styles.itemTitle}>{item.title}</span>
                  </span>
                  <FaArrowRight className={styles.itemArrow} aria-hidden="true" />
                </Link>
              </motion.li>
            ))}
            <li>
              <Link to="/achievements" className={styles.allLink}>
                All achievements <FaArrowRight aria-hidden="true" />
              </Link>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
