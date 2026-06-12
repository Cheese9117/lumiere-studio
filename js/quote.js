'use strict';

/**
 * quote.js — Lumière Studio
 *
 * 3-step "smart quote" wizard: hair length -> desired service ->
 * estimated price + duration, with a WhatsApp CTA prefilled with the
 * visitor's selections.
 */

const QUOTE_MATRIX = {
  corte: {
    label: { es: 'Corte y Estilizado', en: 'Cut & Styling' },
    corto: { price: 45000, duration: 30 },
    medio: { price: 60000, duration: 45 },
    largo: { price: 80000, duration: 60 },
  },
  color: {
    label: { es: 'Coloración y Mechas', en: 'Color & Highlights' },
    corto: { price: 120000, duration: 90 },
    medio: { price: 180000, duration: 120 },
    largo: { price: 250000, duration: 150 },
  },
  hidratacion: {
    label: { es: 'Tratamiento e Hidratación', en: 'Treatment & Hydration' },
    corto: { price: 60000, duration: 45 },
    medio: { price: 100000, duration: 60 },
    largo: { price: 150000, duration: 75 },
  },
};

const QUOTE_LARGO_LABEL = {
  corto: { es: 'corto', en: 'short' },
  medio: { es: 'medio', en: 'medium' },
  largo: { es: 'largo', en: 'long' },
};

const TOTAL_QUOTE_STEPS = 3;

function formatCOP(value) {
  return `${new Intl.NumberFormat('es-CO').format(value)} COP`;
}

function initQuoteWizard() {
  const form = document.getElementById('quote-wizard');
  if (!form) return;

  const panels = form.querySelectorAll('[data-quote-panel]');
  const dots = form.querySelectorAll('[data-step-dot]');
  const nextBtn = form.querySelector('.quote-next');
  const backBtn = form.querySelector('.quote-back');
  const restartBtn = form.querySelector('.quote-restart');
  const priceOut = form.querySelector('.quote-result-price');
  const durationOut = form.querySelector('.quote-result-duration');
  const ctaLink = form.querySelector('.quote-cta');

  let currentStep = 1;

  function goToStep(step) {
    currentStep = step;

    panels.forEach((panel) => {
      panel.classList.toggle('is-active', Number(panel.dataset.quotePanel) === step);
    });

    dots.forEach((dot) => {
      dot.classList.toggle('is-active', Number(dot.dataset.stepDot) === step);
      dot.classList.toggle('is-done', Number(dot.dataset.stepDot) < step);
    });

    backBtn.classList.toggle('is-hidden', step === 1);
    nextBtn.classList.toggle('is-hidden', step === TOTAL_QUOTE_STEPS);
    restartBtn.classList.toggle('is-hidden', step !== TOTAL_QUOTE_STEPS);

    if (step === TOTAL_QUOTE_STEPS) buildResult();
  }

  function currentPanelIsValid() {
    const panel = form.querySelector(`[data-quote-panel="${currentStep}"]`);
    const radios = panel.querySelectorAll('input[type="radio"]');
    return [...radios].some((radio) => radio.checked);
  }

  function buildResult() {
    const largo = form.querySelector('input[name="largo"]:checked')?.value;
    const servicio = form.querySelector('input[name="servicio"]:checked')?.value;
    if (!largo || !servicio) return;

    const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    const entry = QUOTE_MATRIX[servicio][largo];
    const durationUnit = TRANSLATIONS[lang].quote_duration_unit;

    priceOut.textContent = formatCOP(entry.price);
    durationOut.textContent = `${entry.duration} ${durationUnit}`;

    const message = TRANSLATIONS[lang].quote_wa_message
      .replace('{servicio}', QUOTE_MATRIX[servicio].label[lang])
      .replace('{largo}', QUOTE_LARGO_LABEL[largo][lang])
      .replace('{precio}', formatCOP(entry.price))
      .replace('{duracion}', entry.duration);

    ctaLink.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  nextBtn.addEventListener('click', () => {
    if (!currentPanelIsValid()) return;
    goToStep(Math.min(currentStep + 1, TOTAL_QUOTE_STEPS));
  });

  backBtn.addEventListener('click', () => {
    goToStep(Math.max(currentStep - 1, 1));
  });

  restartBtn.addEventListener('click', () => {
    form.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.checked = false;
    });
    goToStep(1);
  });

  document.addEventListener('langchange', () => {
    if (currentStep === TOTAL_QUOTE_STEPS) buildResult();
  });

  goToStep(1);
}
