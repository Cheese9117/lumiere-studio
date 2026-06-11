'use strict';

/**
 * distortion.js — Lumière Studio
 *
 * Text-scramble effect for service names: on hover the label is
 * replaced with random characters that resolve back to the original
 * text over ~300ms.
 */

const DISTORTION_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=-/\\';
const DISTORTION_DURATION = 300;
const DISTORTION_FRAME = 30;

function scrambleText(el) {
  const original = el.dataset.text ?? el.textContent;
  el.dataset.text = original;

  const length = original.length;
  const totalFrames = Math.round(DISTORTION_DURATION / DISTORTION_FRAME);
  let frame = 0;

  if (el._distortionTimer) clearInterval(el._distortionTimer);

  el._distortionTimer = setInterval(() => {
    frame += 1;
    const resolvedCount = Math.floor((frame / totalFrames) * length);

    el.textContent = original
      .split('')
      .map((char, index) => {
        if (char === ' ') return ' ';
        if (index < resolvedCount) return char;
        return DISTORTION_CHARS[Math.floor(Math.random() * DISTORTION_CHARS.length)];
      })
      .join('');

    if (frame >= totalFrames) {
      clearInterval(el._distortionTimer);
      el._distortionTimer = null;
      el.textContent = original;
    }
  }, DISTORTION_FRAME);
}

function initDistortion() {
  document.querySelectorAll('.service-name').forEach((el) => {
    el.addEventListener('mouseenter', () => scrambleText(el));
  });
}
