import GallerySection from '../components/GallerySection/GallerySection';
import Hero from '../components/Hero/Hero';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from '../styles/pages.module.css';

export default function Media() {
  useDocumentTitle(
    'Media',
    'Browse the IEEE IAS ENIS SBC photo gallery — moments from events, industrial visits, workshops, and conferences.'
  );

  return (
    <div className={styles.page}>
      <Hero title="Media" isHome={false} />

      <div id="content">
        <GallerySection showAll />
      </div>
    </div>
  );
}
