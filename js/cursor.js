'use strict';

/**
 * cursor.js — Lumière Studio
 *
 * Custom rose-coloured cursor circle that trails the pointer with a
 * short CSS transition lag. Skipped entirely on touch devices.
 */

function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mousedown', () => cursor.classList.add('is-active'));
  document.addEventListener('mouseup', () => cursor.classList.remove('is-active'));

  document.querySelectorAll('a, button, input, select, textarea').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
}
