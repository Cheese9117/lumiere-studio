'use strict';

/**
 * filter.js — Lumière Studio
 *
 * Service category filter ("Todos | Cabello | Uñas | Estética").
 * Cards fade and shrink out before being hidden, so the grid
 * reflows smoothly instead of snapping.
 */

const FILTER_TRANSITION_MS = 300;

function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.service-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;

      buttons.forEach((b) => b.classList.toggle('active', b === button));

      cards.forEach((card) => {
        const matches = category === 'all' || card.dataset.category === category;

        if (matches) {
          card.classList.remove('is-hidden-final');
          requestAnimationFrame(() => card.classList.remove('is-hidden'));
        } else {
          card.classList.add('is-hidden');
          setTimeout(() => card.classList.add('is-hidden-final'), FILTER_TRANSITION_MS);
        }
      });
    });
  });
}
