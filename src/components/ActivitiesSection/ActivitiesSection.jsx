import { motion } from 'framer-motion';
import { FaBus, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import { useInView } from '../../hooks/useInView';
import styles from './ActivitiesSection.module.css';

// Store component references, NOT pre-instantiated JSX elements
const ACTIVITIES = [
  {
    id: 1,
    Icon: FaBus,
    title: 'Industrial Visits',
    desc: 'Industrial visits to industrial companies or research laboratories working in various fields are arranged each year by our chapter to help our members discover professional work environments.',
  },
  {
    id: 2,
    Icon: FaUsers,
    title: 'Conferences',
    desc: 'Technical Conferences provide updates on the development of specific products and business sectors. It is industry and apllication oriented and promotoes the ongoing development of products.',
  },
  {
    id: 3,
    Icon: FaChalkboardTeacher,
    title: 'Trainings & Workshops',
    desc: ' Establish technical industry expertise with our training & certification. Learning different technologies. Professional Development Service-Oriented Comprehensive Training.',
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

            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
