import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaInstagram, FaLinkedinIn,
  FaChevronRight, FaArrowUp
} from 'react-icons/fa';
import navLinks from '../../data/navLinks.json';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand / About (Floating Card) */}
          <div className={styles.footerBrand}>
            <h3>IEEE IAS ENIS SBC</h3>
            <p className={styles.footerDesc}>
              The IEEE industrial application society was founded in 2010, it is interested in advancement of theory of Electronic and electrical engineering in development, manufacturing smart systems it builds linkage between students and industries from training sessions and events.
            </p>
            <div className={styles.footerContact}>
              <p><strong>Phone Number:</strong> +216 26 337 322</p>
              <p><strong>Address:</strong> Route Soukra km 3 B.P 1173, Sfax, 3038 , Tunisia</p>
              <p><strong>Email:</strong> sbc.enis.ias@ieee.org</p>
            </div>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/ieee.ias.enis" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/ieee.ias.enis/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/ieee-ias-enis" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className={styles.footerSection}>
            <h4>Useful Links</h4>
            <ul className={styles.footerLinks} role="list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link to={link.path}>
                    <FaChevronRight aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.footerSection}>
            <h4>Our Newsletter</h4>
            <p className={styles.newsletterDesc}>
              Subscribe to our Newsletter and get the latest updates on our training sessions and conferences!
            </p>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe} noValidate>
              <div className={styles.inputGroup}>
                <label htmlFor="footer-newsletter-email" className="sr-only">Email address</label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                />
                <button type="submit" aria-label="Subscribe to newsletter">Subscribe</button>
              </div>
              {subscribed && (
                <p className={styles.subscribeMsg} role="status">
                  ✓ You're subscribed! Thank you.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <div className="container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <p className={styles.copyright}>
            © Copyright <strong>IEEE IAS ENIS SBC</strong>. All Rights Reserved
          </p>
          <button onClick={scrollToTop} className={styles.scrollTopBtn} aria-label="Scroll to top" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
