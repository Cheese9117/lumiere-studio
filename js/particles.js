'use strict';

/**
 * particles.js — Lumière Studio
 *
 * Easter egg: type "belleza" anywhere on the page and a burst of
 * gold particles explodes from the last known cursor position.
 */

function spawnParticleBurst(x, y) {
  for (let i = 0; i < CONFIG.PARTICLE_COUNT; i += 1) {
    const angle = (Math.PI * 2 * i) / CONFIG.PARTICLE_COUNT;
    const distance = 60 + Math.random() * 60;

    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);

    particle.addEventListener('animationend', () => particle.remove());
    document.body.appendChild(particle);
  }
}

function initEasterEgg() {
  const word = CONFIG.EASTER_EGG_WORD;
  let typed = '';
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;

    typed = (typed + e.key.toLowerCase()).slice(-word.length);

    if (typed === word) {
      spawnParticleBurst(pointerX, pointerY);
      typed = '';
    }
  });
}
