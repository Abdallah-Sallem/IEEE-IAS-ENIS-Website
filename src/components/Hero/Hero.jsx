import { motion } from 'framer-motion';
import { FaAngleDoubleDown } from 'react-icons/fa';
import styles from './Hero.module.css';
import comboLogo from '../../../public/assets/img/combo-logo.png';
import logoBackground from '../../../public/assets/img/logobackground.webp';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
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
  return (
    <section className={styles.hero} aria-label="Hero section">
      {/* Main Content */}
      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ textAlign: 'center', width: '100%', padding: '0 20px' }}
      >
        {isHome ? (
          <>
            <motion.h2 variants={itemVariants} style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', color: '#fff', fontWeight: 'bold' }}>
              OPEN THE GATE TO INDUSTRY EVOLUTION
            </motion.h2>
            <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '2.5rem', color: '#fff' }}>
              IAS IEEE ENIS SBC IS YOUR KEY
            </motion.h1>
            <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
              <button onClick={handleScrollDown} className={styles.scrollDownBtn} aria-label="Scroll down">
                <FaAngleDoubleDown />
              </button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.h1 className={styles.heroTagline} variants={itemVariants}>
              {title}
            </motion.h1>
            <motion.div variants={itemVariants} style={{ margin: '2rem 0' }}>
              <button onClick={handleScrollDown} className={styles.scrollDownBtn} aria-label="Scroll down">
                <FaAngleDoubleDown />
              </button>
            </motion.div>
          </>
        )}

        <motion.div variants={itemVariants} style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          {isHome ? (
            <img 
              src={comboLogo} 
              alt="IEEE ENIS IAS Logos" 
              style={{ maxWidth: '80%', height: 'auto' }} 
              onError={(e) => {
                // Fallback to text if the combo logo image doesn't exist
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <img 
              src={logoBackground} 
              alt="IAS Logo Background" 
              style={{ maxWidth: '40%', height: 'auto' }} 
            />
          )}
          {isHome && (
            <div style={{ display: 'none', gap: '20px', alignItems: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
              <span>IEEE</span>
              <span>|</span>
              <span>ENIS</span>
              <span>|</span>
              <img src={logoBackground} alt="IAS" style={{ height: '40px' }} />
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
