'use strict';

/**
 * main.js — Lumière Studio
 *
 * App entry point. Initialises all modules after DOM is ready.
 * Also owns:
 *  - Nav scroll shadow
 *  - Mobile menu open / close
 *  - Back-to-top button visibility & click
 *  - Smooth-scroll for nav anchor links
 *  - WhatsApp float-button href
 */

// ─── Nav scroll shadow ────────────────────────────────────────────────────────
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > CONFIG.NAV_SCROLL_THRESHOLD_PX);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load in case page is already scrolled
}

// ─── Mobile menu ──────────────────────────────────────────────────────────────
function initMobileMenu() {
  const menu      = document.getElementById('mobile-menu');
  const openBtn   = document.getElementById('hamburger');
  const closeBtn  = document.getElementById('mobile-close');

  if (!menu) return;

  function openMenu() {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openBtn)  openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close when a link inside the menu is clicked
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

// ─── Smooth-scroll anchor links ───────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      e.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ─── Back to top ─────────────────────────────────────────────────────────────
function initBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > CONFIG.BACK_TOP_THRESHOLD_PX);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── WhatsApp float href ──────────────────────────────────────────────────────
function initWaFloat() {
  const wa = document.getElementById('wa-float');
  if (wa) {
    wa.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
  }

  // Also wire up the static booking-section WhatsApp button
  const waBook = document.getElementById('wa-book');
  if (waBook) {
    const lang = document.documentElement.lang || CONFIG.DEFAULT_LANG;
    const message =
      lang === 'en'
        ? 'Hi! I\'d like to book an appointment at Lumière Studio.'
        : '¡Hola! Quiero reservar una cita en Lumière Studio.';
    waBook.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
}

// ─── Entry point ──────────────────────────────────────────────────────────────
function init() {
  initLanguage();   // language.js — must run before anything so text is set
  initNav();
  initMobileMenu();
  initSmoothScroll();
  initBackTop();
  initWaFloat();
  initReveal();     // animations.js
  initCarousel();   // carousel.js
  initBooking();    // booking.js
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init(); // DOM already parsed (deferred script)
}
