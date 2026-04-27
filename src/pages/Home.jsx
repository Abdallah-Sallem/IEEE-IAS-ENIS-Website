import Hero from '../components/Hero/Hero';
import AboutSnippet from '../components/AboutSnippet/AboutSnippet';
import ActivitiesSection from '../components/ActivitiesSection/ActivitiesSection';
import StatsSection from '../components/StatsSection/StatsSection';
import GallerySection from '../components/GallerySection/GallerySection';
import Testimonials from '../components/Testimonials/Testimonials';
import QuoteSection from '../components/QuoteSection/QuoteSection';
import JoinCTA from '../components/JoinCTA/JoinCTA';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Home() {
  useDocumentTitle(
    'Home',
    'IEEE IAS ENIS SBC — Open the gate to industry evolution. The IEEE Industry Applications Society student branch chapter at ENIS, Sfax, Tunisia.'
  );

  return (
    <>
      <Hero />
      <AboutSnippet />
      <ActivitiesSection />
      <StatsSection />
      <JoinCTA />
      <GallerySection />
      <QuoteSection />
      <Testimonials />
    </>
  );
}
