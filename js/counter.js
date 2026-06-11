'use strict';

/**
 * counter.js — Lumière Studio
 *
 * Animates [data-counter] numbers counting up from 0 to their target
 * value, applying a blur-then-sharpen morph (.is-counting triggers
 * the counterMorph keyframe in animations.css).
 */

const COUNTER_DURATION = 1200;

function animateCounter(el) {
  const target = parseFloat(el.dataset.counter);
  const decimals = el.dataset.counter.includes('.')
    ? el.dataset.counter.split('.')[1].length
    : 0;
  const suffix = el.dataset.counterSuffix ?? '';
  const start = performance.now();

  el.classList.add('is-counting');

  function tick(now) {
    const progress = Math.min((now - start) / COUNTER_DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;

    el.textContent = `${value.toFixed(decimals)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = `${target.toFixed(decimals)}${suffix}`;
    }
  }

  requestAnimationFrame(tick);
}

function initCounters() {
  const items = document.querySelectorAll('[data-counter]');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  items.forEach((el) => observer.observe(el));
}
