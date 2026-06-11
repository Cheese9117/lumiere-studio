'use strict';

/**
 * magnetic.js — Lumière Studio
 *
 * Buttons wrapped in .magnetic react to cursor proximity (80px
 * radius): their inner content shifts up to 12px toward the cursor.
 */

const MAGNETIC_RADIUS = 80;
const MAGNETIC_SHIFT = 12;

function initMagnetic() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const items = [...document.querySelectorAll('.magnetic')];
  if (!items.length) return;

  document.addEventListener('mousemove', (e) => {
    items.forEach((wrapper) => {
      const content = wrapper.querySelector('.magnetic-content') ?? wrapper;
      const rect = wrapper.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.hypot(dx, dy);

      if (distance < MAGNETIC_RADIUS) {
        const pull = (1 - distance / MAGNETIC_RADIUS) * MAGNETIC_SHIFT;
        const angle = Math.atan2(dy, dx);
        content.style.transform = `translate(${Math.cos(angle) * pull}px, ${Math.sin(angle) * pull}px)`;
      } else {
        content.style.transform = '';
      }
    });
  });
}
