'use strict';

/**
 * compare.js — Lumière Studio
 *
 * Touch-friendly before/after comparison slider. Dragging the handle
 * (pointer or keyboard) updates a CSS custom property that drives the
 * clip-path of the "before" layer.
 */

const COMPARE_STEP = 2;

function positionFromPointer(track, clientX) {
  const rect = track.getBoundingClientRect();
  const ratio = (clientX - rect.left) / rect.width;
  return Math.min(100, Math.max(0, ratio * 100));
}

function setPosition(track, handle, value) {
  const rounded = Math.round(value);
  track.style.setProperty('--position', `${rounded}%`);
  handle.setAttribute('aria-valuenow', String(rounded));
}

function initCompareSlider(track) {
  const handle = track.querySelector('.compare-handle');
  if (!handle) return;

  let dragging = false;

  function onPointerMove(e) {
    if (!dragging) return;
    setPosition(track, handle, positionFromPointer(track, e.clientX));
  }

  function stopDragging() {
    dragging = false;
    track.classList.remove('is-dragging');
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', stopDragging);
  }

  function startDragging(e) {
    dragging = true;
    track.classList.add('is-dragging');
    setPosition(track, handle, positionFromPointer(track, e.clientX));
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopDragging);
  }

  handle.addEventListener('pointerdown', startDragging);

  track.addEventListener('pointerdown', (e) => {
    if (e.target === handle) return;
    setPosition(track, handle, positionFromPointer(track, e.clientX));
  });

  handle.addEventListener('keydown', (e) => {
    const current = Number(handle.getAttribute('aria-valuenow'));

    if (e.key === 'ArrowLeft') {
      setPosition(track, handle, current - COMPARE_STEP);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      setPosition(track, handle, current + COMPARE_STEP);
      e.preventDefault();
    } else if (e.key === 'Home') {
      setPosition(track, handle, 0);
      e.preventDefault();
    } else if (e.key === 'End') {
      setPosition(track, handle, 100);
      e.preventDefault();
    }
  });
}

function initCompareSliders() {
  document.querySelectorAll('[data-compare]').forEach(initCompareSlider);
}
