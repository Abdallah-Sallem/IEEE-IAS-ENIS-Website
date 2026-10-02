import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaAngleDoubleDown, FaArrowRight } from 'react-icons/fa';
import HeaderSchematic from '../HeaderSchematic/HeaderSchematic';
import statsData from '../../data/stats.json';
import LOGO from '../../assets/LOGO.webp';
import styles from './Hero.module.css';
const comboLogo = '/assets/img/combo-logo.webp';
const logoBackground = '/assets/img/logobackground.webp';

const IEEE_JOIN_URL =
  'https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMIA034';

/* Readout under the CTAs — first three figures from stats.json */
const READOUT = statsData.slice(0, 3);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ title = "About us", isHome = true }) {
  const handleScrollDown = (e) => {
    e.preventDefault();
    const heroSection = e.currentTarget.closest('section');
    if (heroSection && heroSection.nextElementSibling) {
      const yOffset = -80; // Account for fixed navbar
      const element = heroSection.nextElementSibling;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
    }
  };

  const scrollBtn = (
    <button onClick={handleScrollDown} className={styles.scrollDownBtn} aria-label="Scroll down">
      <FaAngleDoubleDown aria-hidden="true" />
    </button>
  );

  if (!isHome) {
    return (
      <section
        className={`${styles.hero} ${styles.heroCompact}`}
        aria-label={`${title} header`}
      >
        <HeaderSchematic variant="compact" />
        <motion.div
          className={`container ${styles.compactInner}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.compactText}>
            <motion.nav variants={itemVariants} aria-label="Breadcrumb" className={styles.breadcrumb}>
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{title}</span>
            </motion.nav>
            <motion.h1 className={styles.heroTagline} variants={itemVariants}>
              {title}
            </motion.h1>
            <motion.div variants={itemVariants}>{scrollBtn}</motion.div>
          </div>
          <motion.div variants={itemVariants} className={styles.compactLogo}>
            <img src={logoBackground} alt="IAS Logo Background" />
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      className={`${styles.hero}`}
      aria-label="Hero section"
    >
      <HeaderSchematic variant="full" />

      <div className={`container ${styles.heroGrid}`}>
        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="eyebrow">
            IEEE Industry Applications Society · ENIS Sfax
          </motion.p>

          <motion.h1 variants={itemVariants} className={styles.heroTitle}>
            Open the gate to <span className={styles.accent}>industry evolution.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className={styles.heroKey}>
            IAS IEEE ENIS SBC is your key
          </motion.p>

          <motion.div variants={itemVariants} className={styles.heroCtas}>
            <a
              href={IEEE_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              aria-label="Become an IEEE IAS Member (opens in new tab)"
            >
              Become a member <FaArrowRight aria-hidden="true" />
            </a>
            <Link to="/activities" className="btn btn-outline">
              Explore activities
            </Link>
          </motion.div>

          <motion.dl variants={itemVariants} className={styles.readout}>
            {READOUT.map((s) => (
              <div key={s.id}>
                <dt>{s.label}</dt>
                <dd>{s.end}{s.suffix}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Nameplate panel: chapter logo + partner combo logo */}
        <motion.div
          className={styles.plate}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.plateHeader} aria-hidden="true">
            <span>IAS-ENIS / SBC</span>
            <span className={styles.status}>Online</span>
          </div>
          <div className={styles.plateBody}>
            <img src={LOGO} alt="IEEE ENIS IAS Chapter logo" width="2687" height="1465" />
          </div>
          <div className={styles.plateFooter}>
            <img src={comboLogo} alt="IEEE ENIS IAS Logos" width="1024" height="132" />
          </div>
        </motion.div>
      </div>

      <div className={styles.scrollWrap}>{scrollBtn}</div>
    </section>
  );
}
