'use strict';

/**
 * animations.js — Lumière Studio
 *
 * Scroll-triggered reveal using IntersectionObserver.
 * Elements with class "reveal" start invisible (defined in animations.css)
 * and receive the class "visible" when they enter the viewport.
 */

function initReveal() {
  // Nothing to observe if the API isn't available (very old browsers)
  if (!('IntersectionObserver' in window)) {
    // Fallback: just make everything visible immediately
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after reveal so it doesn't toggle back
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: CONFIG.REVEAL_THRESHOLD,
      rootMargin: '0px 0px -40px 0px', // Trigger slightly before fully in view
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}
