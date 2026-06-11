'use strict';

/**
 * cursor.js — Lumière Studio
 *
 * Custom bronze cursor that trails the pointer and expands over
 * interactive elements (magnetic feel via mix-blend-mode). Skipped
 * entirely on touch devices.
 */

function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor is-hidden';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.classList.remove('is-hidden');
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));

  document.querySelectorAll('a, button, input, select, textarea, .magnetic, .gallery-item, .service-card').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
}
