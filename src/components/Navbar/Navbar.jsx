import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import navLinks from '../../data/navLinks.json';
import styles from './Navbar.module.css';
const navLogo = '/assets/img/nav-logo.webp';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false); // eslint-disable-line react-hooks/set-state-in-effect -- syncing with router
  }, [pathname]);

  // Prevent body scroll when menu is open; close it with Escape
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    if (!menuOpen) return () => { document.body.style.overflow = ''; };

    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <nav className={styles.navbarInner} aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className={styles.navbarLogo} aria-label="IEEE IAS ENIS SBC Home">
            <img
              src={navLogo}
              alt="IEEE ENIS IAS Chapter"
              height="44"
            />
          </Link>

          {/* Desktop Links */}
          <ul className={styles.navbarLinks} role="list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={pathname === link.path ? styles.active : ''}
                  aria-current={pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile navigation"
          >
            <ul role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035, duration: 0.25 }}
                >
                  <Link
                    to={link.path}
                    className={pathname === link.path ? styles.active : ''}
                    aria-current={pathname === link.path ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className={styles.mobileMenuFooter}>
              <a href="https://www.facebook.com/ieee.ias.enis" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/ieee.ias.enis/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/ieee-ias-enis" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
