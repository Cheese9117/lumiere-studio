'use strict';

/**
 * lightbox.js — Lumière Studio
 *
 * Full-screen gallery viewer. Click a gallery item to open it,
 * navigate with the arrow buttons or keyboard, close with the
 * close button, Escape, or by clicking the dimmed backdrop.
 */

function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');

  if (!items.length || !lightbox) return;

  const img = lightbox.querySelector('.lightbox-img');
  const caption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;

  function showItem(index) {
    currentIndex = (index + items.length) % items.length;
    const thumb = items[currentIndex].querySelector('.gallery-thumb');

    img.src = thumb.currentSrc || thumb.src;
    img.alt = thumb.alt;
    caption.textContent = thumb.alt;
  }

  function open(index) {
    showItem(index);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => open(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(index);
      }
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => showItem(currentIndex - 1));
  nextBtn.addEventListener('click', () => showItem(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') showItem(currentIndex - 1);
    if (e.key === 'ArrowRight') showItem(currentIndex + 1);
  });
}
