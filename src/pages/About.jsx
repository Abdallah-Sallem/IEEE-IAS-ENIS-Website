import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe, FaUsers, FaLightbulb } from 'react-icons/fa';
import Hero from '../components/Hero/Hero';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInView } from '../hooks/useInView';
import teamData from '../data/team.json';
import styles from '../styles/pages.module.css';

const GOALS = [
  {
    id: 1,
    icon: <FaGlobe />,
    title: 'Organising Events',
    desc: 'We organize conferences, industrial visits, entertainment events, and workshops to satisfy the organizational objectives and needs of our members.',
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: 'Team Building',
    desc: 'Members think more freely and suggest new ideas in a collaborative environment. Online and in-person meetings enhance our team-work skills.',
  },
  {
    id: 3,
    icon: <FaLightbulb />,
    title: 'Brainstorming',
    desc: 'We foster creative thinking and open discussions, encouraging members to explore innovative solutions to industry challenges.',
  },
];



const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

export default function About() {
  useDocumentTitle(
    'About Us',
    'Learn about IEEE IAS ENIS SBC — our mission, history, goals, and the board members driving the chapter forward.'
  );
  const [goalsRef, goalsInView] = useInView();
  const [teamRef, teamInView] = useInView();

  return (
    <div className={styles.page}>
      {/* Global Hero */}
      <Hero title="About us" isHome={false} />

      {/* About Content */}
      <section className={styles.section} id="content" aria-label="About content">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h3>Who We Are</h3>
              <p>
                With nearly 14,000 worldwide members and over 370 chapters globally, the Industry Applications Society (IAS)
                is one of the largest special interest societies within the Institute of Electrical and Electronics Engineers (IEEE).
                The society enriches both its individual members and the industry as a whole through the sharing of specific
                industry-related solutions.
              </p>
              <p>
                Our IEEE IAS ENIS chapter strives to uphold our principles and maintain our society's reputation and excellence.
                We aim to provide members with a memorable journey in the world of industry and technology and prepare them to
                be future leaders.
              </p>
              <p>
                Our activities include workshops, conferences, competitions, team building, and more. We also collaborate with
                other IAS chapters worldwide to benefit our members. We believe in rising together, and value feedback from
                our members to evolve and improve. Join our family and make a change!
              </p>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flex: 1,// ✅ centre ce bloc par rapport au texte gauche
              marginTop: '50px',
            }}>
              <img
                src="https://ias-enis.ieee.tn/assets/img/iaslogo.png"
                alt="IEEE ENIS IAS Chapter Logo"
                style={{ width: '100%', maxWidth: '400px', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Goals */}
          <div style={{ marginTop: 'var(--spacing-4xl)' }}>
            <div className="section-title">
              <h2>Our Main Goals</h2>
              <p>Driving excellence through focused pillars of action</p>
            </div>
            <div className={styles.goalsGrid} ref={goalsRef}>
              {GOALS.map((goal, i) => (
                <motion.div
                  key={goal.id}
                  className={styles.goalCard}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={goalsInView ? 'visible' : 'hidden'}
                >
                  <div className={styles.goalIcon} aria-hidden="true">{goal.icon}</div>
                  <h3 className={styles.goalTitle}>{goal.title}</h3>
                  <p className={styles.goalDesc}>{goal.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className={styles.quoteSection} aria-label="Quote">
        <div className="container">
          <div className={styles.quoteContent}>
            <img
              src="/src/assets/quotes/1.png"
              alt="Alexander De Croo"

              className={styles.quotePhoto}
              loading="lazy"
            />
            <blockquote className={styles.quoteText}>
              "Every industry revolution brings a long a learning revolution."
            </blockquote>
            <p className={styles.quoteAuthor}>-Alexander De Croo</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.sectionAlt} aria-labelledby="team-heading">
        <div className="container">
          <div className="section-title">
            <h2 id="team-heading">Meet Our Team</h2>
            <p>"Individual commitment to a group effort , that is what makes a team work, a company work, a society work, a civilization work."</p>
          </div>
          <div className={styles.teamContainer} ref={teamRef}>
            {/* TOP ROW: 2 members */}
            <div className={styles.teamRowTop}>
              {teamData.slice(0, 2).map((member, i) => (
                <motion.div
                  key={member.id}
                  className={styles.memberCard}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={teamInView ? 'visible' : 'hidden'}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={styles.memberPhoto}
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300/12121f/1E9668?text=IAS'; }}
                  />
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    {member.social && (
                      <div className={styles.memberSocial}>
                        {member.social.facebook && (
                          <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebookF />
                          </a>
                        )}
                        {member.social.instagram && (
                          <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedinIn />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* BOTTOM ROW: 3 members */}
            <div className={styles.teamRowBottom}>
              {teamData.slice(2).map((member, i) => (
                <motion.div
                  key={member.id}
                  className={styles.memberCard}
                  custom={i + 2}
                  variants={fadeUp}
                  initial="hidden"
                  animate={teamInView ? 'visible' : 'hidden'}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={styles.memberPhoto}
                    loading="lazy"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300/12121f/1E9668?text=IAS'; }}
                  />
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    {member.social && (
                      <div className={styles.memberSocial}>
                        {member.social.facebook && (
                          <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebookF />
                          </a>
                        )}
                        {member.social.instagram && (
                          <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedinIn />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JoinCTA />
    </div>
  );
}
