import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot, FaLeaf, FaIndustry, FaBolt, FaProjectDiagram,
  FaTimes, FaExternalLinkAlt, FaGoogleDrive,
} from 'react-icons/fa';
import Hero from '../components/Hero/Hero';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import projectsData from '../data/projects.json';
import styles from '../styles/pages.module.css';
import '../styles/projectsModal.css';

/* ─── Icon map ────────────────────────────────────────── */
const ICON_MAP = {
  robot: <FaRobot />,
  leaf: <FaLeaf />,
  industry: <FaIndustry />,
  bolt: <FaBolt />,
  default: <FaProjectDiagram />,
};

/* ─── Animation variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

/* ─── Project Card ────────────────────────────────────── */
function ProjectCard({ project, index, onSelect }) {
  const icon = ICON_MAP[project.icon] || ICON_MAP.default;

  return (
    <motion.article
      className={styles.activityCard}
      style={{ cursor: 'pointer' }}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') onSelect(project); }}
    >
      {/* Card image */}
      {project.photo && (
        <div className="project-card-image">
          <img src={project.photo} alt={project.title} loading="lazy" />
          <div className="project-card-overlay">
            <span className="project-card-year">{project.year}</span>
            <span className="project-card-category">{project.category}</span>
          </div>
        </div>
      )}

      <div className={styles.activityCardHeader}>
        <div className={styles.activityCardIcon} aria-hidden="true">
          {icon}
        </div>
        <h3 className={styles.activityCardTitle}>{project.title}</h3>
      </div>

      <div className={styles.activityCardBody}>
        <p>
          {project.description.length > 180
            ? `${project.description.substring(0, 180)}...`
            : project.description}
        </p>
        <ul className={styles.activityList}>
          {project.highlights.slice(0, 3).map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
        <span className="project-read-more">View Details →</span>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PROJECTS PAGE
   ═══════════════════════════════════════════════════════ */
export default function Projects() {
  useDocumentTitle(
    'Projects',
    'Explore IEEE IAS ENIS SBC innovative engineering projects — BuddyBot, Zaytouna Sense, and more.'
  );

  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <div className={styles.page}>
      <Hero title="Projects" isHome={false} />

      {/* ── Projects Grid ──────────────────────────── */}
      <section className={styles.section} aria-labelledby="projects-heading">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2
              id="projects-heading"
              style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#266d43ff',
                letterSpacing: '2px',
                marginBottom: '10px',
              }}
            >
              Our Projects
            </h2>
            <div
              style={{
                width: '50px',
                height: '4px',
                backgroundColor: '#1a6b3c',
                margin: '0 auto 16px',
              }}
            />
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              Discover the innovative projects developed by our chapter members, combining engineering, AI, IoT, and sustainability to solve real-world problems.
            </p>
          </div>

          <div className={styles.activitiesPageGrid}>
            {projectsData.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Detail Modal ───────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="projects-modal-overlay"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <motion.div
              className="projects-modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="projects-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close Modal"
              >
                <FaTimes />
              </button>

              <h2 id="project-modal-title" className="projects-modal-header">
                {selectedProject.title}
              </h2>

              <div className="projects-modal-body">
                {selectedProject.photo && (
                  <div className="projects-modal-image">
                    <img
                      src={selectedProject.photo}
                      alt={selectedProject.title}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="projects-modal-info">
                  <div className="projects-info-group">
                    <span className="projects-info-label">Category</span>
                    <span className="projects-info-value">{selectedProject.category}</span>
                  </div>
                  <div className="projects-info-group">
                    <span className="projects-info-label">Year</span>
                    <span className="projects-info-value">{selectedProject.year}</span>
                  </div>
                  <div className="projects-info-group">
                    <span className="projects-info-label">Description</span>
                    <p className="projects-info-text">{selectedProject.description}</p>
                  </div>

                  {/* Highlights */}
                  <div className="projects-info-group">
                    <span className="projects-info-label">Key Highlights</span>
                    <ul className="projects-highlights-list">
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Drive Button */}
                  {selectedProject.driveLink && (
                    <a
                      href={selectedProject.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects-drive-btn"
                    >
                      <FaGoogleDrive style={{ marginRight: '8px' }} />
                      View on Google Drive
                      <FaExternalLinkAlt style={{ marginLeft: '8px', fontSize: '0.8em' }} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <JoinCTA />
    </div>
  );
}
