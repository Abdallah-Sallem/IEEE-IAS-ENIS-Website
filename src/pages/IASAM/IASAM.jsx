import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobeAmericas, FaTrophy, FaUsers, FaLightbulb, FaTimes, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Hero from '../../components/Hero/Hero';
import JoinCTA from '../../components/JoinCTA/JoinCTA';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useInView } from '../../hooks/useInView';
import iasamData from '../../data/iasamParticipation.json';
import styles from './IASAM.module.css';

const iasamImages = import.meta.glob('../../assets/iasam/**/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

function resolveImage(filename) {
  if (!filename) return null;
  const key = filename.replace(/\\/g, '/').split('/').pop();
  const match = Object.entries(iasamImages).find(([path]) => path.endsWith('/' + key));
  return match ? match[1] : null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

const HIGHLIGHTS = [
  { icon: <FaGlobeAmericas />, title: 'International Presence', desc: 'Representing IEEE IAS ENIS SBC at the global IAS Annual Meeting alongside chapters worldwide.' },
  { icon: <FaTrophy />, title: 'Awards & Recognition', desc: 'Multiple prestigious awards including Outstanding Member, Best Website, and Best SBC.' },
  { icon: <FaUsers />, title: 'Networking', desc: 'Building connections with IEEE IAS leaders, professionals, and fellow student chapters.' },
  { icon: <FaLightbulb />, title: 'Knowledge Sharing', desc: 'Presenting activities, exchanging best practices, and learning from global industry experts.' },
];

function PhotoLightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  if (!images || !images.length) return null;
  const src = resolveImage(images[currentIndex]);
  if (!src) return null;
  return (
    <motion.div className={styles.lightboxOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
        <button className={styles.lightboxClose} onClick={onClose} aria-label="Close"><FaTimes /></button>
        {images.length > 1 && <button className={styles.lightboxPrev} onClick={onPrev} aria-label="Previous"><FaChevronLeft /></button>}
        <img src={src} alt={`IASAM photo ${currentIndex + 1}`} className={styles.lightboxImg} />
        {images.length > 1 && <button className={styles.lightboxNext} onClick={onNext} aria-label="Next"><FaChevronRight /></button>}
        {images.length > 1 && <div className={styles.lightboxCounter}>{currentIndex + 1} / {images.length}</div>}
      </div>
    </motion.div>
  );
}

function EditionCard({ edition, index, inView, onOpenLightbox }) {
  const coverSrc = resolveImage(edition.images?.[0]);
  return (
    <motion.article className={styles.editionCard} custom={index} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
      <div className={styles.timelineDot} />
      <div className={styles.editionInner}>
        {coverSrc && (
          <div className={styles.editionCover} onClick={() => onOpenLightbox(edition.images, 0)} role="button" tabIndex={0} aria-label={`View ${edition.edition} gallery`}>
            <img src={coverSrc} alt={edition.edition} loading="lazy" />
            <div className={styles.editionCoverOverlay}><span>{edition.images.length} photos</span></div>
          </div>
        )}
        <div className={styles.editionInfo}>
          <div className={styles.editionMeta}>
            <span className={styles.editionYear}><FaCalendarAlt /> {edition.date}</span>
            <span className={styles.editionLocation}><FaMapMarkerAlt /> {edition.location}</span>
          </div>
          <h3 className={styles.editionTitle}>{edition.edition} — {edition.title}</h3>
          <p className={styles.editionDesc}>{edition.description}</p>
          {edition.highlights?.length > 0 && (
            <ul className={styles.editionHighlights}>
              {edition.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          )}
          {edition.images?.length > 1 && (
            <div className={styles.editionThumbs}>
              {edition.images.slice(0, 6).map((img, i) => {
                const src = resolveImage(img);
                if (!src) return null;
                return <img key={i} src={src} alt={`${edition.edition} - ${i + 1}`} loading="lazy" className={styles.editionThumb} onClick={() => onOpenLightbox(edition.images, i)} />;
              })}
              {edition.images.length > 6 && <button className={styles.editionThumbMore} onClick={() => onOpenLightbox(edition.images, 6)}>+{edition.images.length - 6}</button>}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function IASAM() {
  useDocumentTitle('IASAM', 'Discover IEEE IAS ENIS SBC participation in IAS Annual Meetings — awards, networking, and international representation.');
  const [refH, inViewH] = useInView();
  const [refT, inViewT] = useInView();
  const [lbImages, setLbImages] = useState(null);
  const [lbIndex, setLbIndex] = useState(0);
  const openLb = useCallback((imgs, i = 0) => { setLbImages(imgs); setLbIndex(i); }, []);
  const closeLb = useCallback(() => { setLbImages(null); setLbIndex(0); }, []);
  const nextP = useCallback(() => { if (lbImages) setLbIndex(p => (p + 1) % lbImages.length); }, [lbImages]);
  const prevP = useCallback(() => { if (lbImages) setLbIndex(p => (p - 1 + lbImages.length) % lbImages.length); }, [lbImages]);

  return (
    <div className={styles.page}>
      <Hero title="IAS Annual Meeting" isHome={false} />
      <section className={styles.section} id="iasam-intro">
        <div className="container">
          <div className="section-title">
            <h2>Our Participation in IAS Annual Meeting</h2>
            <p>IEEE IAS ENIS SBC has been actively participating in the IAS Annual Meeting, representing our chapter on the international stage. These events have been milestones in our journey — from building global connections to earning prestigious awards.</p>
          </div>
          <div className={styles.highlightsGrid} ref={refH}>
            {HIGHLIGHTS.map((item, i) => (
              <motion.div key={i} className={styles.highlightCard} custom={i} variants={fadeUp} initial="hidden" animate={inViewH ? 'visible' : 'hidden'}>
                <div className={styles.highlightIcon}>{item.icon}</div>
                <h3 className={styles.highlightTitle}>{item.title}</h3>
                <p className={styles.highlightDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.sectionAlt} id="iasam-timeline" ref={refT}>
        <div className="container">
          <div className="section-title">
            <h2>Our Journey Through the Years</h2>
            <p>A look back at our participation across multiple editions</p>
          </div>
          <div className={styles.timeline}>
            {[...iasamData].reverse().map((ed, i) => (
              <EditionCard key={ed.id} edition={ed} index={i} inView={inViewT} onOpenLightbox={openLb} />
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {lbImages && <PhotoLightbox images={lbImages} currentIndex={lbIndex} onClose={closeLb} onNext={nextP} onPrev={prevP} />}
      </AnimatePresence>
      <JoinCTA />
    </div>
  );
}
