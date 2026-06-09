'use strict';

/**
 * carousel.js — Lumière Studio
 *
 * Testimonials carousel.
 * Features:
 *  - Auto-rotate every CONFIG.CAROUSEL_INTERVAL_MS ms
 *  - Prev / Next buttons
 *  - Dot navigation (synced to current slide)
 *  - Touch / swipe support (horizontal swipe >= 50px triggers slide)
 *  - Pause on hover / touch
 */

function initCarousel() {
  const track   = document.querySelector('.carousel-track');
  const slides  = document.querySelectorAll('.testi-slide');
  const dotsWrap = document.querySelector('.c-dots');
  const btnPrev = document.getElementById('c-prev');
  const btnNext = document.getElementById('c-next');

  if (!track || !slides.length) return;

  const total = slides.length; // No more hardcoded magic numbers
  let current = 0;
  let timer   = null;

  // ─── Dots ─────────────────────────────────────────────────────────────────
  if (dotsWrap) {
    // Build dots dynamically so they always match slide count
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'c-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function getDots() {
    return dotsWrap ? dotsWrap.querySelectorAll('.c-dot') : [];
  }

  // ─── Go to slide ──────────────────────────────────────────────────────────
  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;

    // Sync dots
    getDots().forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // ─── Autoplay ─────────────────────────────────────────────────────────────
  function startAutoplay() {
    timer = setInterval(next, CONFIG.CAROUSEL_INTERVAL_MS);
  }

  function stopAutoplay() {
    clearInterval(timer);
    timer = null;
  }

  // ─── Buttons ──────────────────────────────────────────────────────────────
  if (btnPrev) btnPrev.addEventListener('click', () => { stopAutoplay(); prev(); startAutoplay(); });
  if (btnNext) btnNext.addEventListener('click', () => { stopAutoplay(); next(); startAutoplay(); });

  // ─── Touch / swipe ────────────────────────────────────────────────────────
  const SWIPE_THRESHOLD = 50; // px
  let touchStartX = 0;
  let touchStartY = 0;

  const wrapper = document.querySelector('.carousel-track-wrap');
  if (wrapper) {
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;

      // Only trigger if horizontal movement dominates (not a vertical scroll)
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= SWIPE_THRESHOLD) {
        stopAutoplay();
        if (dx < 0) next(); else prev();
        startAutoplay();
      }
    }, { passive: true });

    // Pause on hover (desktop) and touch-hold (mobile)
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  // ─── Kick off ─────────────────────────────────────────────────────────────
  goTo(0);
  startAutoplay();
}
