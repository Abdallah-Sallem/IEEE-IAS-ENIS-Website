import { useState, useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { motion } from 'framer-motion';
import statsData from '../../data/stats.json';
import styles from './StatsSection.module.css';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

// Inline SVG icons — no react-icons dependency needed here
function StatIcon({ name }) {
  const icons = {
    heart: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    trophy: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
      </svg>
    ),
    video: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
        <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
      </svg>
    ),
    list: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
      </svg>
    ),
  };
  return icons[name] || null;
}

/**
 * Self-contained animated counter — replaces react-countup which has
 * ESM/React-19 compatibility issues (default export returns object).
 * Uses requestAnimationFrame for smooth, non-blocking animation.
 */
function AnimatedCounter({ end, suffix = '', duration = 2000, active }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!active) { setCount(0); return; } // eslint-disable-line react-hooks/set-state-in-effect -- animation reset

    startRef.current = null;

    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, end, duration]);

  return <>{count}{suffix}</>;
}

export default function StatsSection() {
  const [ref, inView] = useInView(0.2, true);

  return (
    <section
      className={styles.statsSection}
      aria-labelledby="stats-heading"
      ref={ref}
    >
      <div className="container">
        <div className="section-title">
          <h2 id="stats-heading">IEEE IAS ENIS SBC in Numbers</h2>
          <p>A decade and a half of excellence, impact, and industry-driven achievements</p>
        </div>

        <div className={styles.grid}>
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.id}
              className={styles.statCard}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className={styles.statIcon}>
                <StatIcon name={stat.icon} />
              </div>
              <div
                className={styles.statNumber}
                aria-label={`${stat.end}${stat.suffix} ${stat.label}`}
              >
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  active={inView}
                />
              </div>
              <p className={styles.statLabel}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
