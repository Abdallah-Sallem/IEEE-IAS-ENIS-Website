import { useState } from 'react';
import styles from './NewsletterForm.module.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | duplicate
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) { setStatus('error'); setErrorMsg('Please enter your email address.'); return; }
    if (!EMAIL_REGEX.test(trimmed)) { setStatus('error'); setErrorMsg('Please enter a valid email address.'); return; }

    setStatus('loading');
    setErrorMsg('');

    try {
      // Dynamically import Firebase to avoid loading it on every page
      const { db } = await import('../../services/firebase');

      if (!db) {
        // TODO: Firebase credentials not configured — show graceful error
        setStatus('error');
        setErrorMsg('Newsletter service is not available at the moment. Please try again later.');
        return;
      }

      const { collection, query, where, getDocs, addDoc, serverTimestamp } = await import('firebase/firestore');

      // Check for duplicate
      const q = query(collection(db, 'newsletterSubscribers'), where('email', '==', trimmed));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setStatus('duplicate');
        return;
      }

      // Add new subscriber
      await addDoc(collection(db, 'newsletterSubscribers'), {
        email: trimmed,
        createdAt: serverTimestamp(),
        source: 'website-newsletter',
        consent: true,
      });

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className={styles.wrapper}>
      {status === 'success' ? (
        <p className={styles.successMsg} role="status">✓ You&apos;re subscribed! Thank you.</p>
      ) : status === 'duplicate' ? (
        <p className={styles.duplicateMsg} role="status">You are already subscribed.</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputGroup}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
              placeholder="Your email address"
              required
              aria-required="true"
              disabled={status === 'loading'}
            />
            <button type="submit" disabled={status === 'loading'} aria-label="Subscribe to newsletter">
              {status === 'loading' ? 'Sending…' : 'Subscribe'}
            </button>
          </div>
          {status === 'error' && <p className={styles.errorMsg} role="alert">{errorMsg}</p>}
        </form>
      )}
      <p className={styles.privacy}>By subscribing, you agree to receive updates from IEEE IAS ENIS SBC.</p>
    </div>
  );
}
