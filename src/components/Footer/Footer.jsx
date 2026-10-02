import { Link } from 'react-router-dom';
import {
  FaFacebookF, FaInstagram, FaLinkedinIn,
  FaArrowUp, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaBolt
} from 'react-icons/fa';
import navLinks from '../../data/navLinks.json';
import NewsletterForm from '../NewsletterForm/NewsletterForm';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand & Contact */}
          <div className={styles.footerBrand}>
           
            <h3 className={styles.brandTitle}>IEEE IAS ENIS SBC</h3>
            <p className={styles.footerDesc}>
              Founded in 2010 at ENIS Sfax. Dedicated to advancing theory and practice in electrical and electronic engineering, bridging ambitious students with cutting-edge industry leaders through world-class events, technical workshops, and industrial forums.
            </p>

            <div className={styles.footerContact}>
              <a href="tel:+21650737271" className={styles.contactItem}>
                <span className={styles.iconBox} aria-hidden="true"><FaPhoneAlt /></span>
                <span>+216 50 737 271</span>
              </a>
              <div className={styles.contactItem}>
                <span className={styles.iconBox} aria-hidden="true"><FaMapMarkerAlt /></span>
                <span>Route Soukra km 3 B.P 1173, Sfax, 3038, Tunisia</span>
              </div>
              <a href="mailto:sbc.enis.ias@ieee.org" className={styles.contactItem}>
                <span className={styles.iconBox} aria-hidden="true"><FaEnvelope /></span>
                <span>sbc.enis.ias@ieee.org</span>
              </a>
            </div>

            <div className={styles.socialLinks}>
              <a
                href="https://www.facebook.com/ieee.ias.enis"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/ieee.ias.enis/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/ieee-ias-enis"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav className={styles.footerSection} aria-labelledby="footer-links-heading">
            <h4 id="footer-links-heading" className={styles.sectionHeading}>
              Quick Links
            </h4>
            <ul className={styles.footerLinks} role="list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className={styles.linkItem}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter Section */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionHeading}>
              Stay Updated
            </h4>
            <p className={styles.newsletterDesc}>
              Subscribe to our newsletter for exclusive invites to technical workshops, conferences, industrial visits, and hackathons.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar — drawing title block */}
      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.bottomContent}>
            <dl className={styles.titleBlock}>
              <div>
                <dt>Chapter</dt>
                <dd>IEEE IAS · ENIS SBC</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Sfax, TN · 34.74°N 10.76°E</dd>
              </div>
              <div>
                <dt>Est.</dt>
                <dd>2010</dd>
              </div>
              <div>
                <dt>Rev.</dt>
                <dd>{year}</dd>
              </div>
            </dl>
            <p className={styles.copyright}>
              © {year} <strong>IEEE IAS ENIS SBC</strong>. Open the Gate to Industry Evolution.
            </p>
            <button
              onClick={scrollToTop}
              className={styles.scrollTopBtn}
              aria-label="Scroll to top"
            >
              <FaArrowUp aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
