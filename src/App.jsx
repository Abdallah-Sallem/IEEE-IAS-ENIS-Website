import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout/Layout';
import IntroScreen from './components/IntroScreen/IntroScreen';
import './styles/global.css';

/* ─── Scroll To Top Utility ─────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ─── Lazy-loaded pages ─────────────────────────────── */
const Home               = lazy(() => import('./pages/Home'));
const About              = lazy(() => import('./pages/About'));
const Activities         = lazy(() => import('./pages/Activities'));
const Media              = lazy(() => import('./pages/Media/Media'));
const IASAM             = lazy(() => import('./pages/IASAM/IASAM'));
const ENIF               = lazy(() => import('./pages/ENIF'));
const UpcomingActivities = lazy(() => import('./pages/UpcomingActivities'));
const Achievements       = lazy(() => import('./pages/Achievements'));
const Contact            = lazy(() => import('./pages/Contact'));

/* ─── Suspense fallback ─────────────────────────────── */
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
      }}
    >
      <div style={{
        width: 44,
        height: 44,
        border: '3px solid rgba(30, 150, 104,0.15)',
        borderTop: '3px solid var(--color-accent)',
        borderRadius: '50%',
        animation: 'spin 0.75s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── App ───────────────────────────────────────────── */
export default function App() {
  /* Show intro screen only on first visit per session */
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('ias-intro-shown');
  });

  const handleEnter = () => {
    sessionStorage.setItem('ias-intro-shown', '1');
    setShowIntro(false);
  };


  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* ── Intro / loading screen ────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen key="intro" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {/* ── Main app routes ───────────────────────────── */}
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="activities"
            element={
              <Suspense fallback={<PageLoader />}>
                <Activities />
              </Suspense>
            }
          />
          <Route
            path="media"
            element={
              <Suspense fallback={<PageLoader />}>
                <Media />
              </Suspense>
            }
          />
          <Route
            path="iasam"
            element={
              <Suspense fallback={<PageLoader />}>
                <IASAM />
              </Suspense>
            }
          />
          <Route
            path="enif"
            element={
              <Suspense fallback={<PageLoader />}>
                <ENIF />
              </Suspense>
            }
          />
          <Route
            path="upcoming"
            element={
              <Suspense fallback={<PageLoader />}>
                <UpcomingActivities />
              </Suspense>
            }
          />
          <Route
            path="achievements"
            element={
              <Suspense fallback={<PageLoader />}>
                <Achievements />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            }
          />
          {/* 404 catch-all */}
          <Route
            path="*"
            element={
              <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                paddingTop: '80px',
                textAlign: 'center',
              }}>
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(4rem, 12vw, 8rem)',
                  fontWeight: 700,
                  background: 'var(--gradient-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                  margin: 0,
                }}>404</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                  Page not found.
                </p>
                <a href="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Go Home
                </a>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
