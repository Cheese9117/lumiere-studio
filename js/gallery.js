'use strict';

/**
 * gallery.js — Lumière Studio
 *
 * Lightweight lightbox for the transformation gallery: clicking a
 * masonry item opens a fullscreen preview, closable via the close
 * button, backdrop click or Escape.
 */

function buildLightbox() {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox is-hidden';
  overlay.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Cerrar">&times;</button>
    <img class="lightbox-image" src="" alt="" />
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function openLightbox(overlay, img) {
  const lightboxImage = overlay.querySelector('.lightbox-image');
  lightboxImage.src = img.currentSrc || img.src;
  lightboxImage.alt = img.alt;
  overlay.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
}

function closeLightbox(overlay) {
  overlay.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}

function initGallery() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  const overlay = buildLightbox();

  items.forEach((img) => {
    img.addEventListener('click', () => openLightbox(overlay, img));
  });

  overlay.querySelector('.lightbox-close').addEventListener('click', () => closeLightbox(overlay));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox(overlay);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('is-hidden')) closeLightbox(overlay);
  });
}
