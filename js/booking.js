'use strict';

/**
 * booking.js — Lumière Studio
 *
 * 3-step booking form (Datos → Servicio → Confirmar) with per-step
 * validation, a review summary on the final step, and a WhatsApp
 * redirect on submit. No backend required — works on any static host.
 */

function initBooking() {
  const form    = document.getElementById('booking-form');
  const confirm = document.getElementById('booking-confirm');

  if (!form) return;

  const stepPanels = form.querySelectorAll('.form-step');
  const stepIndicators = form.querySelectorAll('.form-steps li[data-step]');
  const totalSteps = stepPanels.length;
  let currentStep = 1;

  // ─── Helpers ──────────────────────────────────────────────────────────────
  function getField(id) {
    return form.querySelector(`#${id}`);
  }

  function setError(field, show) {
    if (!field) return;
    field.classList.toggle('invalid', show);
  }

  function clearErrors() {
    form.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));
  }

  // ─── Step navigation ──────────────────────────────────────────────────────
  function goToStep(step) {
    currentStep = step;

    stepPanels.forEach((panel) => {
      panel.classList.toggle('active', Number(panel.dataset.stepPanel) === step);
    });

    stepIndicators.forEach((li) => {
      const n = Number(li.dataset.step);
      li.classList.toggle('active', n === step);
      li.classList.toggle('done', n < step);
    });

    if (step === totalSteps) buildSummary();
  }

  function validateStep(step) {
    clearErrors();
    let valid = true;

    if (step === 1) {
      const nombre = getField('f-nombre');
      const fecha = getField('f-fecha');

      if (!nombre || !nombre.value.trim()) {
        setError(nombre, true);
        valid = false;
      }
      if (!fecha || !fecha.value) {
        setError(fecha, true);
        valid = false;
      }
    }

    if (step === 2) {
      const servicio = getField('f-servicio');
      const hora = getField('f-hora');

      if (!servicio || !servicio.value) {
        setError(servicio, true);
        valid = false;
      }
      if (!hora || !hora.value) {
        setError(hora, true);
        valid = false;
      }
    }

    return valid;
  }

  function validateAll() {
    return validateStep(1) && validateStep(2);
  }

  // ─── Review summary (step 3) ─────────────────────────────────────────────
  function buildSummary() {
    const summary = document.getElementById('booking-summary');
    if (!summary) return;

    const lang = document.documentElement.lang || CONFIG.DEFAULT_LANG;
    const t = TRANSLATIONS[lang] || TRANSLATIONS[CONFIG.DEFAULT_LANG];

    const rows = [
      [t.form_name, getField('f-nombre').value.trim()],
      [t.form_service, getField('f-servicio').selectedOptions[0]?.text || ''],
      [t.form_date, getField('f-fecha').value],
      [t.form_time, getField('f-hora').value],
    ];

    summary.innerHTML = '';

    rows.forEach(([label, value]) => {
      const row = document.createElement('p');
      row.className = 'booking-summary-item';

      const strong = document.createElement('strong');
      strong.textContent = `${label}: `;

      row.appendChild(strong);
      row.appendChild(document.createTextNode(value));
      summary.appendChild(row);
    });
  }

  // ─── Build WhatsApp URL ───────────────────────────────────────────────────
  function buildWhatsAppURL(nombre, servicio, fecha, hora) {
    const lang = document.documentElement.lang || CONFIG.DEFAULT_LANG;

    const message =
      lang === 'en'
        ? `Hi! I'd like to book an appointment at Lumière Studio.\n\n📋 *Name:* ${nombre}\n✂️ *Service:* ${servicio}\n📅 *Date:* ${fecha}\n🕐 *Time:* ${hora}\n\nThank you!`
        : `¡Hola! Quiero reservar una cita en Lumière Studio.\n\n📋 *Nombre:* ${nombre}\n✂️ *Servicio:* ${servicio}\n📅 *Fecha:* ${fecha}\n🕐 *Hora:* ${hora}\n\n¡Gracias!`;

    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // ─── Step nav buttons ─────────────────────────────────────────────────────
  form.querySelectorAll('.form-next').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) goToStep(Math.min(currentStep + 1, totalSteps));
    });
  });

  form.querySelectorAll('.form-back').forEach((btn) => {
    btn.addEventListener('click', () => goToStep(Math.max(currentStep - 1, 1)));
  });

  // ─── Submit handler ───────────────────────────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    const nombre   = getField('f-nombre').value.trim();
    const servicio = getField('f-servicio').selectedOptions[0]?.text || '';
    const fecha    = getField('f-fecha').value;
    const hora     = getField('f-hora').value;

    if (confirm) {
      form.style.display = 'none';
      confirm.style.display = 'block';
      requestAnimationFrame(() => confirm.classList.add('show'));
    }

    setTimeout(() => {
      window.open(buildWhatsAppURL(nombre, servicio, fecha, hora), '_blank', 'noopener,noreferrer');
    }, 800);
  });

  // ─── Clear invalid state on input ─────────────────────────────────────────
  form.querySelectorAll('input, select').forEach((el) => {
    el.addEventListener('input', () => setError(el, false));
    el.addEventListener('change', () => setError(el, false));
  });

  // ─── Set minimum date to today ────────────────────────────────────────────
  const fechaField = getField('f-fecha');
  if (fechaField) {
    const today = new Date().toISOString().split('T')[0];
    fechaField.min = today;
  }

  goToStep(1);
}
