'use strict';

/**
 * ambient.js — Lumière Studio
 *
 * Ambient Lighting Simulator: a floating switch that lets visitors
 * preview the salon under three lighting moods (Morning Light,
 * Golden Hour, Studio Nocturno) by toggling a `data-ambient`
 * attribute on the document root.
 */

const AMBIENT_STORAGE_KEY = 'lumiere-ambient';
const AMBIENT_DEFAULT = 'golden';

function applyAmbient(switcher, mode) {
  document.documentElement.dataset.ambient = mode;

  switcher.querySelectorAll('.ambient-option').forEach((btn) => {
    const isActive = btn.dataset.ambient === mode;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-checked', String(isActive));
  });
}

function initAmbientSwitch() {
  const switcher = document.querySelector('.ambient-switch');
  if (!switcher) return;

  const stored = localStorage.getItem(AMBIENT_STORAGE_KEY) ?? AMBIENT_DEFAULT;
  applyAmbient(switcher, stored);

  switcher.querySelectorAll('.ambient-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.ambient;
      applyAmbient(switcher, mode);
      localStorage.setItem(AMBIENT_STORAGE_KEY, mode);
    });
  });
}
