import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaInfoCircle, 
  FaListUl, 
  FaTimes, 
  FaArrowRight, 
  FaBolt, 
  FaLaptopCode, 
  FaIndustry,
  FaCheckCircle
} from 'react-icons/fa';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Hero from '../components/Hero/Hero';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import styles from './UpcomingActivities.module.css';

import img7 from '../assets/UpcommingEvents/7.webp';
import imgSortie from '../assets/UpcommingEvents/sortie industrielle.jpg';
import imgIas from '../assets/IAS presentation .png';
import imgIasLogoBg from '../assets/UpcommingEvents/iaslogobg.webp';

const ALL_ACTIVITIES = [
  {
    id: 'act-1',
    category: 'event',
    categoryLabel: 'Annual Forum',
    title: "ENIF 7.0",
    subtitle: "ENIS Industrial Forum — Seventh Edition",
    location: "National Engineering School of Sfax (ENIS)",
    date: "Coming Soon",
    status: "Flagship Event",
    overview: "The ENIS Industrial Forum (ENIF), now soaring into its seventh awe-inspiring edition. ENIF is the premier hub where ideas take flight, innovation knows no limits, and creativity reshapes industries. Get ready for a groundbreaking revelation that promises to revolutionize technology and inspire progress. Stay tuned because ENIF 7.0 is about to ignite your passion for innovation like never before.",
    agenda: "• Keynote opening conferences with renowned industrial leaders\n• Hands-on technical workshops\n• High-stakes industrial hackathon\n• Partner networking session & closing awards gala",
    description: "ENIF is the flagship annual event organized by IEEE IAS ENIS SBC. Gathering students and engineers from across Tunisia, it focuses on modern industrial evolution, IoT, AI, and smart systems.",
    image: img7,
  },
  {
    id: 'act-2',
    category: 'event',
    categoryLabel: 'Industrial Visit',
    title: "Industrial Site Visit",
    subtitle: "Discovering Advanced Industry Beyond the Classroom",
    location: "Leading Tech Partner Facilities (Tunisia)",
    date: "Coming Soon",
    status: "Registration Opening",
    overview: "Join us for an exclusive industrial field visit to one of Tunisia's leading technology and manufacturing facilities. This visit offers a rare opportunity for students to witness industrial IoT and automated systems in live operation, observe real-world engineering workflows, and engage directly with senior plant managers.",
    agenda: "• Departure from ENIS campus\n• Welcome briefing & site safety protocols\n• Comprehensive production line & engineering tour\n• Interactive Q&A discussion with plant engineers\n• Networking & return to ENIS",
    description: "Experience engineering in action! This industrial visit bridges academic knowledge with live industrial environments and manufacturing excellence.",
    image: imgSortie,
  },
  {
    id: 'act-3',
    category: 'event',
    categoryLabel: 'Hardware Prototype',
    title: "The Cardboard Twin",
    subtitle: "Interactive Physical & Digital Model of Industry",
    location: "ENIS Engineering Labs",
    date: "Coming Soon",
    status: "Hands-on Demo",
    overview: "The Cardboard Twin is an innovative physical model replicating a miniature smart factory. Designed specifically to help students visualize complex industrial ecosystems, it integrates IoT sensors, our custom TSYP smart badge prototype, and cloud telemetry to illustrate automated material routing in real-time.",
    agenda: "• Conceptual overview of industrial digital twins\n• Live demonstration of sensor integration & smart badge tracking\n• Hands-on interaction session for participating teams",
    description: "A tangible physical-digital hybrid model helping young engineers understand factory automation, sensor meshes, and telemetry tracking.",
    image: imgIas,
  },
  {
    id: 'act-4',
    category: 'workshop',
    categoryLabel: 'Tech Workshop',
    title: "Digital Twin Systems",
    subtitle: "From Physical Assets to Cloud-Connected Simulations",
    location: "ENIS Conference Hall",
    date: "Coming Soon",
    status: "Skill Building",
    overview: "An intensive masterclass introducing the principles of creating virtual replicas of physical devices and systems. Participants learn how telemetry streams from IoT sensors power real-time digital simulations, enabling predictive maintenance and performance optimization.",
    agenda: "• Fundamentals of Digital Twins in Industry 4.0\n• Data ingestion architectures & protocols (MQTT, WebSockets)\n• Case studies from aerospace and smart energy\n• Guided simulation exercise",
    description: "Learn how digital twin models optimize equipment uptime, simulate stress factors, and redefine modern industrial operations.",
    image: imgIasLogoBg,
  },
  {
    id: 'act-5',
    category: 'workshop',
    categoryLabel: 'Cybersecurity',
    title: "Cybersecurity for Smart Industries",
    subtitle: "Protecting SCADA & OT Infrastructure in the Connected Age",
    location: "National Engineering School of Sfax",
    date: "Coming Soon",
    status: "Security Focus",
    overview: "This practical workshop delves into safeguarding modern operational technology (OT) and industrial control networks (SCADA) against sophisticated cyber threats. Students explore network segmentation, vulnerability assessments, and defensive zero-trust strategies.",
    agenda: "• Threat landscape of Industry 4.0 and smart grids\n• SCADA / PLC vulnerabilities & vector analysis\n• Incident detection and hardening techniques\n• Hands-on defensive lab exercise",
    description: "Essential training on protecting critical industrial infrastructure, connected machines, and sensitive telemetry data from malicious attacks.",
    image: imgIasLogoBg,
  },
  {
    id: 'act-6',
    category: 'workshop',
    categoryLabel: 'Blockchain',
    title: "Blockchain & Decentralized Trust",
    subtitle: "Immutable Ledgers & Smart Contracts in Supply Chains",
    location: "ENIS Computer Labs",
    date: "Coming Soon",
    status: "Emerging Tech",
    overview: "Demystifying distributed ledger technology for industrial applications. Learn how cryptographic consensus, immutable record-keeping, and automated smart contracts are transforming logistics, component provenance, and transparent supply chain audits.",
    agenda: "• Cryptographic foundations & consensus algorithms\n• Architecture of enterprise blockchains (Hyperledger / Ethereum)\n• Smart contract development basics\n• Industrial traceability demo",
    description: "Discover how decentralized ledger technologies establish indisputable trust, prevent counterfeit components, and streamline automated settlements.",
    image: imgIasLogoBg,
  },
  {
    id: 'act-7',
    category: 'workshop',
    categoryLabel: 'Chapter Induction',
    title: "Exploring the IAS Chapter",
    subtitle: "Discovering Opportunities within IEEE Industry Applications Society",
    location: "National Engineering School of Sfax",
    date: "Coming Soon",
    status: "Community & Networking",
    overview: "Organized in close collaboration with the IEEE Tunisia Section, this orientation and community session introduces engineering students to the global IEEE IAS network, professional certifications, travel grants, student competitions, and executive leadership opportunities.",
    agenda: "• Introduction to IEEE IAS global mission & initiatives\n• Overview of ENIS SBC achievements and upcoming calendar\n• Member benefits: conferences, journals, and mentoring\n• Open Q&A and networking with IAS alumni",
    description: "A welcoming gateway to unlock international student opportunities, research networks, and professional development in engineering.",
    image: imgIasLogoBg,
  }
];

export default function UpcomingActivities() {
  useDocumentTitle('Upcoming Activities', 'See upcoming IEEE IAS ENIS SBC events, conferences, workshops, and industrial visits.');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'event' | 'workshop'

  const filteredActivities = filter === 'all'
    ? ALL_ACTIVITIES
    : ALL_ACTIVITIES.filter(item => item.category === filter);

  return (
    <div className={styles.page}>
      <Hero 
        title="Upcoming Activities" 
        subtitle="Explore upcoming conferences, high-level workshops, industrial visits, and hands-on competitions."
        isHome={false} 
      />

      <div className="container">
        {/* Interactive Filter Pills */}
        <div className={styles.filterWrapper}>
          <div className={styles.filterTabs}>
            <button
              type="button"
              className={`${styles.filterTab} ${filter === 'all' ? styles.filterTabActive : ''}`}
              onClick={() => setFilter('all')}
            >
              <FaBolt /> All Activities ({ALL_ACTIVITIES.length})
            </button>
            <button
              type="button"
              className={`${styles.filterTab} ${filter === 'event' ? styles.filterTabActive : ''}`}
              onClick={() => setFilter('event')}
            >
              <FaIndustry /> Major Events & Visits (3)
            </button>
            <button
              type="button"
              className={`${styles.filterTab} ${filter === 'workshop' ? styles.filterTabActive : ''}`}
              onClick={() => setFilter('workshop')}
            >
              <FaLaptopCode /> Workshops & Training (4)
            </button>
          </div>
        </div>

        {/* Activities Grid */}
        <section className={styles.section}>
          <motion.div 
            className={styles.grid}
            layout
          >
            <AnimatePresence>
              {filteredActivities.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className={styles.card}>
                    <div className={styles.cardTopAccent} />
                    
                    <div className={styles.cardImageWrapper}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className={styles.cardImage} 
                        loading="lazy" 
                      />
                      <div className={styles.cardImageOverlay}>
                        <span className={styles.categoryTag}>{item.categoryLabel}</span>
                        <span className={styles.cardStatus}>{item.status}</span>
                      </div>
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <div className={styles.cardSubtitle}>{item.subtitle}</div>
                      <p className={styles.cardDesc}>{item.description}</p>
                      
                      <div className={styles.cardFooter}>
                        <div className={styles.cardLocation} title={item.location}>
                          <FaMapMarkerAlt className={styles.cardLocationIcon} />
                          <span>{item.location}</span>
                        </div>
                        <button className={styles.cardButton} aria-label={`View details for ${item.title}`}>
                          Details <FaArrowRight style={{ fontSize: '0.75rem' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>

      {/* High-Tech Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <img src={selectedItem.image} alt={selectedItem.title} />
                <div className={styles.modalHeaderOverlay} />
                
                <button
                  className={styles.modalClose}
                  onClick={() => setSelectedItem(null)}
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
                
                <div className={styles.modalTitleWrapper}>
                  <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <span className={styles.categoryTag}>{selectedItem.categoryLabel}</span>
                    <span className={styles.cardStatus}>{selectedItem.status}</span>
                  </div>
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
                      <h4><FaListUl /> Highlights & Agenda</h4>
                      <p>{selectedItem.agenda}</p>
                    </div>
                  )}
                </div>

                <div className={styles.modalSidebar}>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalInfoLabel}>Estimated Date</span>
                    <span className={styles.modalInfoValue}>
                      <FaCalendarAlt className={styles.cardLocationIcon} /> {selectedItem.date}
                    </span>
                  </div>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalInfoLabel}>Venue / Location</span>
                    <span className={styles.modalInfoValue}>
                      <FaMapMarkerAlt className={styles.cardLocationIcon} /> {selectedItem.location}
                    </span>
                  </div>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalInfoLabel}>Organization</span>
                    <span className={styles.modalInfoValue}>
                      <FaCheckCircle className={styles.cardLocationIcon} /> IEEE IAS ENIS SBC
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button 
                  type="button"
                  className={styles.btnOutline} 
                  onClick={() => setSelectedItem(null)}
                >
                  Close
                </button>
                <a
                  href="https://www.linkedin.com/company/ieee-ias-enis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  Contact / Stay Notified <FaArrowRight />
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