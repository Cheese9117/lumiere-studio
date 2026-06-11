'use strict';

function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > CONFIG.NAV_SCROLL_THRESHOLD_PX);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const menu      = document.getElementById('mobile-menu');
  const overlay   = document.getElementById('mobile-menu-overlay');
  const openBtn   = document.getElementById('hamburger');
  const closeBtn  = document.getElementById('mobile-close');

  if (!menu) return;

  function openMenu() {
    menu.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.querySelector('.nav')?.offsetHeight ?? 70;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}

function initBackTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > CONFIG.BACK_TOP_THRESHOLD_PX), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initWaFloat() {
  const wa     = document.getElementById('wa-float');
  const waBook = document.getElementById('wa-book');

  if (wa) wa.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;

  if (waBook) {
    const lang = document.documentElement.lang || CONFIG.DEFAULT_LANG;
    const msg  = lang === 'en'
      ? "Hi! I'd like to book an appointment at Lumière Studio."
      : '¡Hola! Quiero reservar una cita en Lumière Studio.';
    waBook.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }
}

function init() {
  initLanguage();     // language.js — must run before anything so text is set
  initHeroReveal();   // hero-reveal.js — wraps hero words after translation
  initNav();
  initMobileMenu();
  initSmoothScroll();
  initBackTop();
  initWaFloat();
  initReveal();       // animations.js
  initGalleryReveal(); // animations.js
  initCarousel();     // carousel.js
  initBooking();      // booking.js
  initCursor();       // cursor.js
  initScrollProgress(); // scroll-progress.js
  initCounters();     // counters.js
  initLightbox();     // lightbox.js
  initFilters();      // filter.js
  initEasterEgg();    // particles.js
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
