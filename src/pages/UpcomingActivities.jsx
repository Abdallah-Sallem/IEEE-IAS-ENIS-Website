import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle, FaListUl, FaTimes, FaArrowRight } from 'react-icons/fa';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Hero from '../components/Hero/Hero';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import styles from './UpcomingActivities.module.css';

const events = [
  {
    id: 1,
    title: "ENIF 7.0",
    subtitle: "ENIS Industrial Forum.",
    location: "National Engineering School of Sfax",
    overview: "The ENIS Industrial Forum, now soaring into its sixth awe-inspiring edition. ENIF isn't just an event, it's a dynamic hub where ideas take flight, innovation knows no limits, and creativity reshapes industries. Get ready for a groundbreaking revelation that promises to revolutionize technology and inspire progress. Stay tuned because ENIF 6.0 is about to ignite your passion for innovation like never before.",
    agenda: "Coming soon",
    description: "ENIF is an event organized by the IEEE Industrial Applications Society (IAS) ENIS Student Branch Chapter. It focuses on the advancement of theory in electronic and electrical...",
    image: "/src/assets/UpcommingEvents/7.jpg",
  },
  {
    id: 2,
    title: "Industrial Visit",
    subtitle: "Discovering Industry Beyond the Classroom",
    location: "comming soon",
    overview: "Join us for an exclusive industrial visit to Tech Innovations Inc, a leading player in the realm of technology and innovation. This visit offers a unique opportunity for students and professionals alike to gain insights into the latest advancements in IT, witness cutting-edge technologies in action, and engage with industry experts.",
    agenda: "Coming soon!\nDon't miss this incredible opportunity to immerse yourself in the dynamic world of IT and gain firsthand experience from industry leaders at Tech Innovations Inc. Reserve your spot today!",
    description: "Join us for an exciting Industrial Visit organized by the IEEE ENIS IAS student chapter! This visit will provide a firsthand look at the inner workings of a leading industry player...",
    image: "https://ias-enis.ieee.tn/assets/img/UpcommingEvents/sortie%20industrielle.jpg",
  },
  {
    id: 3,
    title: "The Cardboard Twin",
    subtitle: "Exploring Industry Through a cardboard twin",
    location: "Coming soon",
    overview: "The cardboard twin is a simplified physical replica of an industrial environment, created to help first-year students clearly visualize how industry works and how different components and systems interact in real-life settings, along with a demonstration of our TSYP smart badge prototype to showcase its practical applications within the model.",
    agenda: "Coming soon!",
    description: "Dive into the world of smart systems at ENIS SB IEEE IAS Day! This student-led event, organized by the IEEE Industrial Applications Society (IAS) ENIS Student Branch Chapter...",
    image: '/src/assets/IAS presentation .png',
  },
];

const workshops = [
  {
    id: 4,
    title: "Digital Twin",
    subtitle: "Introduction to Digital Twin Technology",
    location: "National Engineering School of Sfax",
    overview: "The bootcamp will focus on the ReactJS framework, covering everything from fundamental concepts to advanced development techniques. Participants will learn about key React features, such as components, state management, and the virtual DOM. Hands-on exercises and projects will allow attendees to gain practical experience building dynamic and responsive web applications using modern tools like React Router, Redux, and Next.js. Experts in the field will guide participants through best practices, performance optimization, and deployment strategies to help them become proficient in ReactJS development.",
    agenda: "Coming soon",
    description: "An introductory session that explains the concept of creating a virtual model of a physical system. Participants learn how real-world objects or processes can be replicated digitally to simulate, analyze, and improve performance. The workshop focuses on basic principles and real-life applications of digital twin technology in industry.",
    image: "/src/assets/UpcommingEvents/iaslogobg.jpg",
  },
  {
    id: 5,
    title: "Cybersecurity for Industries",
    subtitle: "Protecting Industrial Systems in the Digital Age",
    location: "National Engineering School of Sfax",
    overview: "This workshop introduces the fundamentals of cybersecurity in industrial environments. It explores common threats facing modern industries and explains how critical systems, data, and infrastructure can be protected from cyberattacks. Participants will gain a basic understanding of security practices and the importance of safeguarding industrial operations in an increasingly connected world.",
    agenda: "Coming soon",
    description: "Collaboration with the Tunisia section this session, guides you through becoming a young professional within IEEE Learn about benefits, networking...",
    image: "/src/assets/UpcommingEvents/iaslogobg.jpg",
  },


  {
    id: 5,
    title: "Blockchain",
    subtitle: "Decentralizing Trust in the Digital World",
    location: "National Engineering School of Sfax",
    overview: "This workshop introduces the fundamentals of cybersecurity in industrial environments. It explores common threats facing modern industries and explains how critical systems, data, and infrastructure can be protected from cyberattacks. Participants will gain a basic understanding of security practices and the importance of safeguarding industrial operations in an increasingly connected world.",
    agenda: "Coming soon",
    description: "This workshop introduces the fundamentals of blockchain technology, explaining how decentralized systems work to securely store and verify data. Participants will explore how blockchain ensures transparency, security, and trust without the need for intermediaries, along with its key applications in various industries.",
    image: "/src/assets/UpcommingEvents/iaslogobg.jpg",
  },
  {
    id: 6,
    title: "Exploring the IAS Chapter",
    subtitle: "Discovering the Icons of the World of Industry application society",
    location: "National Engineering School of Sfax",
    overview: "Collaboration with the Tunisia section, this session will delve into the history and significance of the IAS Chapter, highlighting the diverse opportunities it offers to members. We aim to provide a comprehensive overview that will inspire participation and involvement.",
    agenda: "Coming soon",
    description: "Collaboration with the Tunisia section, This session dives into the IAS Chapter's history and its importance for members. We'll explore the diverse opportunities it offers, inspiring you to get involved...",
    image: "/src/assets/UpcommingEvents/iaslogobg.jpg",
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function UpcomingActivities() {
  useDocumentTitle('Upcoming Activities', 'See upcoming IEEE IAS ENIS SBC events, conferences, workshops, and industrial visits.');
  const [selectedItem, setSelectedItem] = useState(null);

  // Close modal on escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setSelectedItem(null);
  };

  return (
    <div className={styles.page}>
      <Hero title="Upcoming Activities" isHome={false} />

      {/* ══════ SECTION 1: Upcoming Events ══════ */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-title">
            <h2>Upcoming Events</h2>
            <p>Don't miss out on our upcoming major events and industrial visits</p>
          </div>

          <div className={styles.grid}>
            {events.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                onClick={() => setSelectedItem(item)}
              >
                <div className={styles.card}>
                  <div className={styles.cardImageWrapper}>
                    <img src={item.image} alt={item.title} className={styles.cardImage} loading="lazy" />
                    <div className={styles.cardImageOverlay}>
                      <span className={styles.cardDate}>{item.date}</span>
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardLocation}>
                        <FaMapMarkerAlt className={styles.cardLocationIcon} />
                        <span>{item.location}</span>
                      </div>
                      <button className={styles.cardButton} aria-label="See Details">
                        Details <FaArrowRight style={{ fontSize: '0.8rem' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ SECTION 2: Upcoming Workshops ══════ */}
      <section className={`${styles.section} ${styles.sectionAlt}`} style={{ marginTop: 'var(--spacing-4xl)' }}>
        <div className="container">
          <div className="section-title">
            <h2>Upcoming Workshops</h2>
            <p>Enhance your skills with our upcoming technical and soft skills workshops</p>
          </div>

          <div className={styles.grid}>
            {workshops.map((item, i) => (
              <motion.div
                key={item.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                onClick={() => setSelectedItem(item)}
              >
                <div className={styles.card}>
                  <div className={styles.cardImageWrapper}>
                    <img src={item.image} alt={item.title} className={styles.cardImage} loading="lazy" />
                    <div className={styles.cardImageOverlay}>
                      <span className={styles.cardDate}>{item.date}</span>
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                    <div className={styles.cardFooter}>
                      <div className={styles.cardLocation}>
                        <FaMapMarkerAlt className={styles.cardLocationIcon} />
                        <span>{item.location}</span>
                      </div>
                      <button className={styles.cardButton} aria-label="See Details">
                        Details <FaArrowRight style={{ fontSize: '0.8rem' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ MODAL ══════ */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <img src={selectedItem.image} alt={selectedItem.title} />
                <div className={styles.modalHeaderOverlay}></div>
                <button
                  className={styles.modalClose}
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
                <div className={styles.modalTitleWrapper}>
                  <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
                  <p className={styles.modalSubtitle}>{selectedItem.subtitle}</p>
                </div>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalMain}>
                  <div className={styles.modalSection}>
                    <h4><FaInfoCircle /> Overview</h4>
                    <p>{selectedItem.overview}</p>
                  </div>

                  {selectedItem.agenda && (
                    <div className={styles.modalSection}>
                      <h4><FaListUl /> Agenda</h4>
                      <p>{selectedItem.agenda}</p>
                    </div>
                  )}
                </div>

                <div className={styles.modalSidebar}>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalInfoLabel}>Date</span>
                    <span className={styles.modalInfoValue}>
                      <FaCalendarAlt className={styles.cardLocationIcon} /> {selectedItem.date}
                    </span>
                  </div>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalInfoLabel}>Location</span>
                    <span className={styles.modalInfoValue}>
                      <FaMapMarkerAlt className={styles.cardLocationIcon} /> {selectedItem.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button className={styles.btnOutline} onClick={() => setSelectedItem(null)}>
                  Close
                </button>
                <a
                  href="https://www.linkedin.com/company/ieee-ias-enis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <JoinCTA />
    </div>
  );
}