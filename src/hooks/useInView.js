import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook using IntersectionObserver to detect when an element
 * enters the viewport.
 *
 * KEY FIXES vs the original version:
 *
 * 1. The `options` object is NO longer a hook parameter — it used to be
 *    passed as `options = {}` which created a NEW object reference on
 *    every render. Because useEffect listed `options` as a dependency,
 *    this caused the observer to disconnect/reconnect on every render,
 *    producing the black-flash / re-render loop on scroll.
 *
 * 2. Parameters are now primitive values (threshold, rootMargin string)
 *    so they are safe dependency-array values.
 *
 * 3. A `triggered` ref guards the early-exit for triggerOnce mode so
 *    the effect body itself never needs to read `inView` (which would
 *    add it to deps and cause extra reconnections).
 *
 * @param {number}  [threshold=0.15]        - IntersectionObserver threshold
 * @param {boolean} [triggerOnce=true]      - Disconnect after first trigger
 * @param {string}  [rootMargin='0px 0px -50px 0px'] - Observer root margin
 * @returns {[React.RefObject, boolean]}    - [ref, inView]
 */
export function useInView(
  threshold = 0.15,
  triggerOnce = true,
  rootMargin = '0px 0px -50px 0px',
) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const triggered = useRef(false); // tracks whether we already fired once

  useEffect(() => {
    // If we only need to trigger once and already did, skip re-observing
    if (triggerOnce && triggered.current) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            triggered.current = true;
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]); // all primitives — stable references

  return [ref, inView];
}
