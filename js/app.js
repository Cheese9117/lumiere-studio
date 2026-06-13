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
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  function openMenu() {
    menu.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (menu.contains(e.target) || hamburger.contains(e.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });

  window.addEventListener('scroll', () => {
    if (menu.classList.contains('is-open')) closeMenu();
  }, { passive: true });
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
  initAmbientSwitch();
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
  initBackToTop();
  initServicesNav();
});
