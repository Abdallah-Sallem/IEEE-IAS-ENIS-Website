import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';

function LoadingFallback() {
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
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Static blueprint backdrop (grid + registration marks) */}
      <AnimatedBackground />

      <Navbar />
      {/*
        Page enter: a keyed CSS keyframe (see .page-transition in global.css).
        Replaces the previous <AnimatePresence mode="wait"> + Framer exit/enter,
        which could leave a lazily-loaded page stuck at opacity 0 when React
        Router ran the navigation as a transition (empty page until refresh).
        A CSS animation always finishes in its visible state on its own.
      */}
      <main
        id="main-content"
        tabIndex={-1}
        key={location.pathname}
        className="page-transition"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
