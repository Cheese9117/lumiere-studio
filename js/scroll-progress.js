'use strict';

/**
 * scroll-progress.js — Lumière Studio
 *
 * Thin gold bar fixed to the top of the viewport that fills as the
 * visitor scrolls down the page.
 */

function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();
}
