'use strict';

function initCarousel() {
  const track    = document.querySelector('.carousel-track');
  const slides   = document.querySelectorAll('.testi-slide');
  const dotsWrap = document.querySelector('.c-dots');
  const btnPrev  = document.getElementById('c-prev');
  const btnNext  = document.getElementById('c-next');

  if (!track || !slides.length) return;

  const total = slides.length;
  let current = 0;
  let timer   = null;

  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'c-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  const getDots = () => dotsWrap?.querySelectorAll('.c-dot') ?? [];

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    getDots().forEach((d, i) => d.classList.toggle('active', i === current));
  }

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAutoplay = () => { timer = setInterval(next, CONFIG.CAROUSEL_INTERVAL_MS); };
  const stopAutoplay  = () => { clearInterval(timer); timer = null; };

  const withAutoplay = fn => () => { stopAutoplay(); fn(); startAutoplay(); };

  btnPrev?.addEventListener('click', withAutoplay(prev));
  btnNext?.addEventListener('click', withAutoplay(next));

  const SWIPE_THRESHOLD = 50;
  let touchStartX = 0;
  let touchStartY = 0;

  const wrapper = document.querySelector('.carousel-track-wrap');
  if (wrapper) {
    wrapper.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    wrapper.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= SWIPE_THRESHOLD) {
        withAutoplay(dx < 0 ? next : prev)();
      }
    }, { passive: true });

    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  goTo(0);
  startAutoplay();
}
