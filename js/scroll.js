'use strict';

/**
 * scroll.js — Lumière Studio
 *
 * Lenis-style smooth-scroll engine (pure JS, no library), scroll
 * progress / nav theming, staggered section reveals, stat-bar fills
 * and gallery parallax.
 */

const SMOOTH_SCROLL_EASE = 0.085;

let smoothScrollTarget = window.scrollY;
let smoothScrollCurrent = window.scrollY;
let smoothScrollRafId = null;
let smoothScrollEnabled = false;

function smoothScrollMaxScroll() {
  return document.documentElement.scrollHeight - window.innerHeight;
}

function smoothScrollLoop() {
  smoothScrollCurrent += (smoothScrollTarget - smoothScrollCurrent) * SMOOTH_SCROLL_EASE;

  if (Math.abs(smoothScrollTarget - smoothScrollCurrent) < 0.5) {
    smoothScrollCurrent = smoothScrollTarget;
    window.scrollTo(0, smoothScrollCurrent);
    smoothScrollRafId = null;
    return;
  }

  window.scrollTo(0, smoothScrollCurrent);
  smoothScrollRafId = requestAnimationFrame(smoothScrollLoop);
}

function startSmoothScrollLoop() {
  if (!smoothScrollRafId) smoothScrollRafId = requestAnimationFrame(smoothScrollLoop);
}

function initSmoothScroll() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  smoothScrollEnabled = true;
  smoothScrollCurrent = window.scrollY;
  smoothScrollTarget = window.scrollY;

  function onWheel(e) {
    e.preventDefault();
    smoothScrollTarget = Math.max(0, Math.min(smoothScrollTarget + e.deltaY, smoothScrollMaxScroll()));
    startSmoothScrollLoop();
  }

  function onScroll() {
    if (!smoothScrollRafId) {
      smoothScrollCurrent = window.scrollY;
      smoothScrollTarget = window.scrollY;
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    smoothScrollTarget = Math.min(smoothScrollTarget, smoothScrollMaxScroll());
  });
}

/** Smoothly scrolls to a target element, accounting for the fixed nav. */
function smoothScrollToElement(el) {
  const navHeight = document.querySelector('.nav')?.offsetHeight ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;

  if (!smoothScrollEnabled) {
    window.scrollTo({ top, behavior: 'smooth' });
    return;
  }

  smoothScrollTarget = Math.max(0, Math.min(top, smoothScrollMaxScroll()));
  startSmoothScrollLoop();
}

/** Smoothly scrolls back to the top of the page. */
function smoothScrollToTop() {
  if (!smoothScrollEnabled) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  smoothScrollTarget = 0;
  startSmoothScrollLoop();
}

/** Toggles nav background + light/dark theme based on the section in view. */
function initNavTheme() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    nav.classList.toggle('is-scrolled', currentScrollY > 40);

    const scrollingDown = currentScrollY > lastScrollY;
    nav.classList.toggle('is-compact', scrollingDown && currentScrollY > 240);

    lastScrollY = currentScrollY;
  }, { passive: true });

  const sections = document.querySelectorAll('[data-nav-theme]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        nav.classList.toggle('is-light', entry.target.dataset.navTheme === 'light');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach((section) => observer.observe(section));
}

/** Generic IntersectionObserver-driven reveal for .reveal elements. */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: CONFIG.REVEAL_THRESHOLD });

  items.forEach((el, index) => {
    const group = el.closest('[data-stagger]');
    if (group) {
      const siblings = [...group.querySelectorAll('.reveal')];
      el.style.setProperty('--d', `${siblings.indexOf(el) * 0.12}s`);
    }
    observer.observe(el);
  });
}

/** Fills the philosophy stat bars once they enter the viewport. */
function initStatBars() {
  const bars = document.querySelectorAll('.stat-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.setProperty('--fill', bar.dataset.fill ?? '0%');
        bar.classList.add('is-visible');
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach((bar) => observer.observe(bar));
}

/** Applies a per-image vertical parallax offset to gallery items on scroll. */
function initParallax() {
  const items = document.querySelectorAll('.gallery-item');
  if (!items.length) return;

  function update() {
    const viewportCenter = window.innerHeight / 2;

    items.forEach((item) => {
      const speed = Number(item.dataset.parallax ?? 0);
      const rect = item.getBoundingClientRect();
      const distance = rect.top + rect.height / 2 - viewportCenter;
      const offset = distance * speed * -0.08;
      item.style.setProperty('--parallax-offset', `${offset}px`);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/** Shows a "back to top" button once the page has been scrolled down. */
function initBackToTop() {
  const button = document.querySelector('.back-to-top');
  if (!button) return;

  window.addEventListener('scroll', () => {
    button.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  button.addEventListener('click', () => {
    smoothScrollToTop();
  });
}

function initServicesNav() {
  const track = document.querySelector('[data-services-track]');
  const prevBtn = document.querySelector('[data-services-prev]');
  const nextBtn = document.querySelector('[data-services-next]');
  if (!track || !prevBtn || !nextBtn) return;

  function scrollByCard(direction) {
    const card = track.querySelector('.service-card');
    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => scrollByCard(-1));
  nextBtn.addEventListener('click', () => scrollByCard(1));
}
