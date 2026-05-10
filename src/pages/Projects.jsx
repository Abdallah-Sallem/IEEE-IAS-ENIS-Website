import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot, FaLeaf, FaIndustry, FaBolt, FaProjectDiagram,
  FaExternalLinkAlt, FaGoogleDrive, FaChevronDown, FaPlay,
} from 'react-icons/fa';
import Hero from '../components/Hero/Hero';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import projectsData from '../data/projects.json';
import styles from '../styles/pages.module.css';
import '../styles/projectsAccordion.css';

/* ─── Icon map ────────────────────────────────────────── */
const ICON_MAP = {
  robot: <FaRobot />,
  leaf: <FaLeaf />,
  industry: <FaIndustry />,
  bolt: <FaBolt />,
  default: <FaProjectDiagram />,
};

/* ─── Group projects by category ──────────────────────── */
function groupByCategory(projects) {
  return projects.reduce((acc, project) => {
    const cat = project.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(project);
    return acc;
  }, {});
}

/* ─── Single Project Accordion Item ───────────────────── */
function ProjectItem({ project, isExpanded, onToggle }) {
  const icon = ICON_MAP[project.icon] || ICON_MAP.default;

  return (
    <motion.div
      className={`project-accordion-item ${isExpanded ? 'project-accordion-item--active' : ''}`}
      layout
      layoutId={`project-item-${project.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* ── Clickable header row ── */}
      <button
        className="project-accordion-header"
        onClick={() => onToggle(project.id)}
        aria-expanded={isExpanded}
      >
        <div className="project-accordion-icon" aria-hidden="true">
          {icon}
        </div>
        <span className="project-accordion-name">{project.title}</span>
        <span className="project-accordion-badge">{project.category}</span>
        <span className="project-accordion-year">{project.year}</span>
        <FaChevronDown className={`project-accordion-chevron ${isExpanded ? 'project-accordion-chevron--open' : ''}`} />
      </button>

      {/* ── Expandable body ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="project-accordion-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className="project-accordion-content">
              {/* Image + Info side by side on desktop, stacked on mobile */}
              <div className="project-accordion-layout">
                {project.photo && (
                  <div className="project-accordion-image">
                    <img src={project.photo} alt={project.title} loading="lazy" />
                  </div>
                )}

                <div className="project-accordion-info">
                  {project.description && (
                    <div className="project-accordion-field">
                      <span className="project-accordion-label">Description</span>
                      <p className="project-accordion-desc">{project.description}</p>
                    </div>
                  )}

                  {project.problem && (
                    <div className="project-accordion-field">
                      <span className="project-accordion-label">Problem</span>
                      <p className="project-accordion-desc">{project.problem}</p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="project-accordion-field">
                      <span className="project-accordion-label">Solution</span>
                      <p className="project-accordion-desc">{project.solution}</p>
                      {project.solutionPoints && project.solutionPoints.length > 0 && (
                        <ul className="project-accordion-highlights-list" style={{ marginTop: '4px' }}>
                          {project.solutionPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {project.impact && (
                    <div className="project-accordion-field">
                      <span className="project-accordion-label">Impact</span>
                      <p className="project-accordion-desc">{project.impact}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="project-accordion-actions" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {project.driveLink && project.driveLink.length > 0 && (
                      <a
                        href={project.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-accordion-btn"
                      >
                        <FaGoogleDrive style={{ marginRight: '8px' }} />
                        View Document
                        <FaExternalLinkAlt style={{ marginLeft: '8px', fontSize: '0.8em' }} />
                      </a>
                    )}

                    {project.videoLink && project.videoLink.length > 0 && (
                      <a
                        href={project.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-accordion-btn"
                        style={{ background: 'linear-gradient(135deg, #cc0000 0%, #ff0000 100%)', boxShadow: '0 4px 16px rgba(204, 0, 0, 0.22)' }}
                      >
                        <FaPlay style={{ marginRight: '8px' }} />
                        Watch Video
                        <FaExternalLinkAlt style={{ marginLeft: '8px', fontSize: '0.8em' }} />
                      </a>
                    )}

                    {/* Always show a generic "Learn More" button if no links are provided */}
                    {(!project.driveLink || project.driveLink.length === 0) && (!project.videoLink || project.videoLink.length === 0) && (
                      <button className="project-accordion-btn project-accordion-btn--secondary" disabled>
                        <FaProjectDiagram style={{ marginRight: '8px' }} />
                        More Details Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

  const [expandedId, setExpandedId] = useState(null);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const grouped = groupByCategory(projectsData);

  return (
    <div className={styles.page}>
      <Hero title="Projects" isHome={false} />

      {/* ── Projects Accordion Section ──────────────── */}
      <section className={styles.sectionAlt} id="projects-list" aria-labelledby="projects-heading">
        <div className="container">
          {/* Section header */}
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
              Discover the innovative projects developed by our chapter members. Click on any project to view full details.
            </p>
          </div>

          {/* ── Flat accordion list (Ordered exactly as in JSON) ── */}
          <div className="project-accordion-list">
            {projectsData.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                isExpanded={expandedId === project.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </section>

      <JoinCTA />
    </div>
  );
}
