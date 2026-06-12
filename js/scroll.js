'use strict';

/**
 * scroll.js — Lumière Studio
 *
 * Lenis-style smooth-scroll engine (pure JS, no library), scroll
 * progress / nav theming, staggered section reveals, stat-bar fills
 * and gallery parallax.
 */

let smoothScrollTarget = window.scrollY;

function initSmoothScroll() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const EASE = 0.085;
  let current = window.scrollY;
  smoothScrollTarget = window.scrollY;
  let rafId = null;

  function maxScroll() {
    return document.documentElement.scrollHeight - window.innerHeight;
  }

  function loop() {
    current += (smoothScrollTarget - current) * EASE;

    if (Math.abs(smoothScrollTarget - current) < 0.5) {
      current = smoothScrollTarget;
      window.scrollTo(0, current);
      rafId = null;
      return;
    }

    window.scrollTo(0, current);
    rafId = requestAnimationFrame(loop);
  }

  function onWheel(e) {
    e.preventDefault();
    smoothScrollTarget = Math.max(0, Math.min(smoothScrollTarget + e.deltaY, maxScroll()));
    if (!rafId) rafId = requestAnimationFrame(loop);
  }

  function onScroll() {
    if (!rafId) {
      current = window.scrollY;
      smoothScrollTarget = window.scrollY;
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    smoothScrollTarget = Math.min(smoothScrollTarget, maxScroll());
  });
}

/** Smoothly scrolls to a target element, accounting for the fixed nav. */
function smoothScrollToElement(el) {
  const navHeight = document.querySelector('.nav')?.offsetHeight ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;

  if (window.matchMedia('(pointer: coarse)').matches) {
    window.scrollTo({ top, behavior: 'smooth' });
    return;
  }

  smoothScrollTarget = Math.max(0, top);
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
