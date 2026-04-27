import { motion } from 'framer-motion';
import {
  FaBus, FaUsers, FaChalkboardTeacher, FaFlask,
  FaNetworkWired, FaProjectDiagram, FaMedal, FaRobot,
} from 'react-icons/fa';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import Hero from '../components/Hero/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInView } from '../hooks/useInView';
import styles from '../styles/pages.module.css';

const ACTIVITY_TYPES = [
  {
    id: 1,
    icon: <FaBus />,
    title: 'Industrial Visits',
    desc: 'We arrange annual visits to industrial companies and research laboratories working in various fields. These visits help our members discover professional work environments, observe cutting-edge industrial processes, and build lasting connections with industry professionals.',
    highlights: [
      'Guided tours of manufacturing facilities',
      'Meetings with engineering professionals',
      'Insights into real-world industry operations',
      'Networking with potential future employers',
    ],
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: 'Conferences',
    desc: 'Technical conferences provide updates on the development of specific products and business sectors. Industry-oriented and application-driven, these events promote the ongoing development of engineering knowledge and foster collaboration between academia and industry.',
    highlights: [
      'Paper presentations and panel discussions',
      'Keynote speakers from top companies',
      'Academic and industry collaboration sessions',
      'Best paper awards and recognition',
    ],
  },
  {
    id: 3,
    icon: <FaChalkboardTeacher />,
    title: 'Trainings & Workshops',
    desc: 'Establish technical industry expertise with our training and certification programs. From programming to professional development, our workshops provide hands-on experience with tools and technologies that matter in the modern engineering workplace.',
    highlights: [
      'Hands-on technical skill development',
      'Certification preparation programs',
      'Soft skills and leadership training',
      'Industry-standard tools and platforms',
    ],
  },
  {
    id: 4,
    icon: <FaNetworkWired />,
    title: 'Networking Events',
    desc: 'Building professional relationships is key to career success. Our networking events bring together students, alumni, and industry professionals in a relaxed environment to exchange ideas, share experiences, and explore collaboration opportunities.',
    highlights: [
      'Alumni career panels',
      'Student-industry mixer events',
      'LinkedIn profile and branding workshops',
      'Mentorship program connections',
    ],
  },
  {
    id: 5,
    icon: <FaProjectDiagram />,
    title: 'Project Competitions',
    desc: 'We organize and participate in engineering design competitions that challenge our members to apply their technical knowledge to solve real-world problems. These competitions develop critical thinking, teamwork, and presentation skills.',
    highlights: [
      'Innovation and design challenges',
      'IEEE regional and global competitions',
      'Prototype development and testing',
      'Expert judging and feedback sessions',
    ],
  },
  {
    id: 6,
    icon: <FaMedal />,
    title: 'ENIF — Flagship Event',
    desc: 'The Engineering and Industry Forum (ENIF) is our premier annual event, bringing together hundreds of students and professionals for a full day of talks, workshops, and an industrial careers fair. A highlight of the academic calendar.',
    highlights: [
      'Annual flagship engineering forum',
      'Multiple simultaneous workshop tracks',
      'Industrial partners and sponsors',
      'Hundreds of student participants',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' } }),
};

function ActivityCard({ activity, index, inView }) {
  return (
    <motion.article
      className={styles.activityCard}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <div className={styles.activityCardHeader}>
        <div className={styles.activityCardIcon} aria-hidden="true">
          {activity.icon}
        </div>
        <h3 className={styles.activityCardTitle}>{activity.title}</h3>
      </div>
      <div className={styles.activityCardBody}>
        <p>{activity.desc}</p>
        <ul className={styles.activityList}>
          {activity.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Activities() {
  useDocumentTitle(
    'Activities',
    'Explore IEEE IAS ENIS SBC activities — industrial visits, conferences, workshops, and our flagship ENIF event.'
  );
  const [ref, inView] = useInView();

  return (
    <div className={styles.page}>
      <Hero title="Activities" isHome={false} />

      <section className={styles.section} id="content" aria-label="Activities list" ref={ref}>
        <div className="container">
          <div className={styles.activitiesPageGrid}>
            {ACTIVITY_TYPES.map((activity, i) => (
              <ActivityCard key={activity.id} activity={activity} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </section>

      <JoinCTA />
    </div>
  );
}
