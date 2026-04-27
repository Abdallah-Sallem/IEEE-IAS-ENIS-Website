import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import testimonials from '../../data/testimonials.json';
import { useInView } from '../../hooks/useInView';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, inView] = useInView();

  const total = testimonials.length;

  const go = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + total) % total);
  };

  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section className={styles.testimonials} aria-labelledby="testimonials-heading" ref={ref}>
      <div className="container">
        <div className="section-title">
          <h2 id="testimonials-heading">Previous Experiences</h2>
          <p>Words from those who shaped our chapter's legacy</p>
        </div>

        <div className={styles.slider}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              className={`${styles.slide} ${styles.active}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <article className={styles.card}>
                <FaQuoteLeft className={styles.quoteIcon} aria-hidden="true" />
                <p className={styles.quoteText}>
                  {testimonials[current].quote}
                </p>
                <div className={styles.author}>
                  <img
                    src={testimonials[current].photo}
                    alt={testimonials[current].name}
                    className={styles.authorPhoto}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className={styles.authorName}>{testimonials[current].name}</span>
                  <span className={styles.authorTitle}>{testimonials[current].title}</span>
                </div>
              </article>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <nav className={styles.controls} aria-label="Testimonial navigation">
            <button
              className={styles.arrowBtn}
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft aria-hidden="true" />
            </button>

            <div className={styles.dots} role="tablist" aria-label="Testimonial slides">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.active : ''}`}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className={styles.arrowBtn}
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              <FaChevronRight aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
