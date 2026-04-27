import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone, FaMapMarkerAlt, FaEnvelope,
  FaFacebookF, FaInstagram, FaLinkedinIn,
  FaPaperPlane,
} from 'react-icons/fa';
import Hero from '../components/Hero/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useInView } from '../hooks/useInView';
import styles from '../styles/pages.module.css';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
};

export default function Contact() {
  useDocumentTitle(
    'Contact',
    'Get in touch with IEEE IAS ENIS SBC — contact form, phone, email, and address in Sfax, Tunisia.'
  );
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]   = useState({});
  const [ref, inView] = useInView();

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim())  e.lastName  = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.message.trim()) e.message = 'Required';
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <div className={styles.page}>
      <Hero title="Contact Us" isHome={false} />

      <section className={styles.section} id="content" aria-label="Contact content" ref={ref}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Contact Info */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className={styles.contactInfo}>
                <h3>Contact Information</h3>

                <div className={styles.contactItem}>
                  <div className={styles.contactItemIcon} aria-hidden="true"><FaPhone /></div>
                  <div className={styles.contactItemText}>
                    <h4>Phone</h4>
                    <a href="tel:+21626337322">+216 26 337 322</a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactItemIcon} aria-hidden="true"><FaEnvelope /></div>
                  <div className={styles.contactItemText}>
                    <h4>Email</h4>
                    <a href="mailto:sbc.enis.ias@ieee.org">sbc.enis.ias@ieee.org</a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactItemIcon} aria-hidden="true"><FaMapMarkerAlt /></div>
                  <div className={styles.contactItemText}>
                    <h4>Address</h4>
                    <p>Route Soukra km 3, B.P. 1173<br />Sfax 3038, Tunisia</p>
                  </div>
                </div>

                {/* Social Links */}
                <div style={{ marginTop: 'var(--spacing-xl)' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: 'var(--spacing-md)',
                  }}>Follow Us</h4>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {[
                      { href: 'https://www.facebook.com/ieee.ias.enis', icon: <FaFacebookF />, label: 'Facebook' },
                      { href: 'https://www.instagram.com/ieee.ias.enis/', icon: <FaInstagram />, label: 'Instagram' },
                      { href: 'https://www.linkedin.com/company/ieee-ias-enis', icon: <FaLinkedinIn />, label: 'LinkedIn' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        style={{
                          width: 44, height: 44,
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'var(--color-text-muted)',
                          fontSize: '1rem',
                          transition: 'all var(--transition-base)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-accent)';
                          e.currentTarget.style.color = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--color-border)';
                          e.currentTarget.style.color = 'var(--color-text-muted)';
                        }}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className={styles.mapEmbed} style={{ marginTop: 'var(--spacing-xl)' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.095!2d10.74!3d34.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1301631a7b7ffea9%3A0x5e6ec3b0b6c0e8d7!2sENIS%20-%20National%20School%20of%20Engineers%20of%20Sfax!5e0!3m2!1sen!2stn!4v1234567890"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ENIS location on Google Maps"
                  />
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className={styles.contactForm}>
                <h3>Send a Message</h3>

                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="contact-firstName">First Name</label>
                      <input
                        id="contact-firstName"
                        name="firstName"
                        type="text"
                        placeholder="Ahmed"
                        value={form.firstName}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'err-firstName' : undefined}
                        style={errors.firstName ? { borderColor: '#ef5350' } : {}}
                      />
                      {errors.firstName && <span id="err-firstName" style={{ fontSize: '0.78rem', color: '#ef5350' }}>{errors.firstName}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="contact-lastName">Last Name</label>
                      <input
                        id="contact-lastName"
                        name="lastName"
                        type="text"
                        placeholder="Jallouli"
                        value={form.lastName}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.lastName}
                        style={errors.lastName ? { borderColor: '#ef5350' } : {}}
                      />
                      {errors.lastName && <span style={{ fontSize: '0.78rem', color: '#ef5350' }}>{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      style={errors.email ? { borderColor: '#ef5350' } : {}}
                    />
                    {errors.email && <span style={{ fontSize: '0.78rem', color: '#ef5350' }}>{errors.email}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help?"
                      value={form.subject}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      style={errors.subject ? { borderColor: '#ef5350' } : {}}
                    />
                    {errors.subject && <span style={{ fontSize: '0.78rem', color: '#ef5350' }}>{errors.subject}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      style={errors.message ? { borderColor: '#ef5350' } : {}}
                    />
                    {errors.message && <span style={{ fontSize: '0.78rem', color: '#ef5350' }}>{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <FaPaperPlane aria-hidden="true" />
                    Send Message
                  </button>

                  {submitted && (
                    <div className={styles.formSuccess} role="status" aria-live="polite">
                      ✓ Message sent! We'll get back to you as soon as possible.
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
