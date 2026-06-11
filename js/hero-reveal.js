'use strict';

/**
 * hero-reveal.js — Lumière Studio
 *
 * Wraps each word of the hero headline in a span so animations.css
 * can stagger a clip-path reveal per word. Must run after applyLang()
 * so it operates on the final translated text.
 */

function wrapWordsInSpans(line) {
  const words = line.textContent.trim().split(/\s+/);

  line.textContent = '';

  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.className = 'reveal-word';
    span.style.setProperty('--i', index);
    span.textContent = word;
    line.appendChild(span);

    if (index < words.length - 1) {
      line.appendChild(document.createTextNode(' '));
    }
  });
}

function initHeroReveal() {
  document.querySelectorAll('.hero-title-line').forEach(wrapWordsInSpans);
}
