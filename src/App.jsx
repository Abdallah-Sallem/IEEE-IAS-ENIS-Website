import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
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

/* ─── Global Page Transition Indicator ──────────────── */
/* A thin green progress line instead of a full-screen cover */
function PageTransitionLoader() {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setLoading(true);
    }
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          role="progressbar"
          aria-label="Loading page"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            transformOrigin: '0 50%',
            background: 'var(--color-green-bright)',
            zIndex: 'var(--z-overlay)',
          }}
        />
      )}
    </AnimatePresence>
  );
}

/* ─── Lazy-loaded pages ─────────────────────────────── */
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Activities = lazy(() => import('./pages/Activities'));
const Media = lazy(() => import('./pages/Media/Media'));
const IASAM = lazy(() => import('./pages/IASAM/IASAM'));
const ENIF = lazy(() => import('./pages/ENIF'));
const UpcomingActivities = lazy(() => import('./pages/UpcomingActivities'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));

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
      <div
        role="status"
        aria-label="Loading"
        style={{
          width: 40,
          height: 40,
          border: '2px solid var(--color-white-10)',
          borderTop: '2px solid var(--color-green-bright)',
          borderRadius: '50%',
          animation: 'spin 0.75s linear infinite',
        }}
      />
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
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <ScrollToTop />
      {/* ── Intro / loading screen ────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen key="intro" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      <PageTransitionLoader />

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
            path="projects"
            element={
              <Suspense fallback={<PageLoader />}>
                <Projects />
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
              <div className="blueprint-bg" style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: 'calc(var(--nav-height) + 2rem) var(--container-padding) 4rem',
                textAlign: 'center',
              }}>
                <span className="eyebrow">Fault code · route not found</span>
                <h1 style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(4rem, 14vw, 9rem)',
                  fontWeight: 500,
                  color: 'var(--color-white)',
                  lineHeight: 1,
                  margin: 0,
                }}>4<span style={{ color: 'var(--color-green-bright)' }}>0</span>4</h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                  Page not found.
                </p>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  Go Home
                </Link>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </MotionConfig>
  );
}
