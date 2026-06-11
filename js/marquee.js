'use strict';

/**
 * marquee.js — Lumière Studio
 *
 * Duplicates the marquee track content so the CSS marqueeScroll
 * animation (translateX -50%) loops seamlessly.
 */

function initMarquee() {
  document.querySelectorAll('.marquee-track').forEach((track) => {
    const original = [...track.children];
    if (!original.length) return;

    for (let i = 1; i < CONFIG.MARQUEE_REPEAT; i += 1) {
      original.forEach((item) => {
        track.appendChild(item.cloneNode(true));
      });
    }
  });
}
