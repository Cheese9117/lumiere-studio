'use strict';

/**
 * app.js — Lumière Studio
 *
 * Coordinates the loading screen, top progress bar, mobile menu and
 * nav-link smooth scrolling, then bootstraps every feature module.
 */

const LOADER_MAX_DURATION = 2000;

function initLoader() {
  const loader = document.querySelector('.loader');
  const progressBar = document.querySelector('.progress-bar');
  if (!loader) return;

  function finish() {
    loader.classList.add('is-hidden');
    progressBar?.classList.add('is-done');
  }

  if (document.readyState === 'complete') {
    finish();
  } else {
    window.addEventListener('load', finish, { once: true });
  }

  setTimeout(finish, LOADER_MAX_DURATION);
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!hamburger || !menu) return;

  function closeMenu() {
    menu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  hamburger.addEventListener('click', () => {
    menu.classList.add('is-open');
    document.body.classList.add('no-scroll');
  });

  menu.querySelector('.mobile-close')?.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

function initNavLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      smoothScrollToElement(target);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initLanguage();
  initCursor();
  initSmoothScroll();
  initNavTheme();
  initReveal();
  initStatBars();
  initParallax();
  initMagnetic();
  initDistortion();
  initCounters();
  initMarquee();
  initGallery();
  initCompareSliders();
  initBooking();
  initQuoteWizard();
  initMobileMenu();
  initNavLinks();
});
