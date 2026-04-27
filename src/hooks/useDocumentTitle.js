import { useEffect } from 'react';

/**
 * Sets the document <title> and meta description for SEO.
 * @param {string} title - Page title (appended with site name)
 * @param {string} description - Meta description content
 */
export function useDocumentTitle(title, description = '') {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | IEEE IAS ENIS SBC` : 'IEEE IAS ENIS SBC';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (description) {
      metaDesc.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description]);
}
