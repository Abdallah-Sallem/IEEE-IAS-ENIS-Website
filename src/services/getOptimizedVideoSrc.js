// Helper to generate optimized video source URLs for use in <video> elements.
// Usage (React):
// import { getOptimizedSources } from '../services/getOptimizedVideoSrc';
// const sources = getOptimizedSources('/src/assets/retrotech/tunisia.mp4');
// <video controls>
//   {sources.map(s => <source key={s.src} src={s.src} type={s.type} />)}
// </video>

import path from 'path';

export function getOptimizedSources(originalUrl) {
  if (!originalUrl) return [];
  // Determine base name without extension
  const parsed = path.parse(originalUrl);
  const base = parsed.name;

  // Paths where optimized files were saved (served from project root)
  // Adjust if your server serves static files from a different base.
  const optimizedBase = '/optimized_videos/';

  // Prefer WebM then MP4
  return [
    { src: `${optimizedBase}${base}-optimized.webm`, type: 'video/webm' },
    { src: `${optimizedBase}${base}-optimized.mp4`, type: 'video/mp4' },
  ];
}

export default getOptimizedSources;
