import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBus, FaUsers, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';
import { useInView } from '../../hooks/useInView';
import styles from './ActivitiesSection.module.css';

// Store component references, NOT pre-instantiated JSX elements
const ACTIVITIES = [
  {
    id: 1,
    Icon: FaBus,
    title: 'Industrial Visits',
    desc: 'Industrial visits to companies and research laboratories in various fields are arranged each year to help members discover professional work environments and build real-world connections.',
  },
  {
    id: 2,
    Icon: FaUsers,
    title: 'Conferences',
    desc: 'Technical conferences provide updates on the development of specific products and business sectors. Industry-oriented events that promote ongoing development of products and innovations.',
  },
  {
    id: 3,
    Icon: FaChalkboardTeacher,
    title: 'Trainings & Workshops',
    desc: 'Establish technical industry expertise with our training and certification programs. Professional development, service-oriented, and comprehensive training in cutting-edge technologies.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function ActivitiesSection() {
  const [ref, inView] = useInView();

  return (
    <section className={styles.activities} aria-labelledby="activities-heading" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2 id="activities-heading">Our Activities</h2>
          <p>Bridging the gap between academic learning and industry expertise</p>
        </div>

        <div className={styles.grid}>
          {ACTIVITIES.map((activity, i) => (
            <motion.article
              key={activity.id}
              className={styles.card}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className={styles.cardIcon} aria-hidden="true">
                <activity.Icon />
              </div>
              <h3 className={styles.cardTitle}>{activity.title}</h3>
              <p className={styles.cardDesc}>{activity.desc}</p>
              <Link to="/activities" className={styles.cardLink} aria-label={`Learn more about ${activity.title}`}>
                Explore <FaArrowRight aria-hidden="true" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
