'use strict';

/**
 * booking.js — Lumière Studio
 *
 * Booking form: client-side validation + WhatsApp redirect.
 *
 * On valid submit:
 *  1. Show brief confirmation screen.
 *  2. Build a wa.me URL with all form data pre-filled as a message.
 *  3. Open WhatsApp in a new tab after a short delay.
 *
 * No backend required — works on any static host.
 */

function initBooking() {
  const form    = document.getElementById('booking-form');
  const confirm = document.getElementById('booking-confirm');

  if (!form) return;

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

  function validate() {
    const lang = document.documentElement.lang || CONFIG.DEFAULT_LANG;
    const t    = TRANSLATIONS[lang] || TRANSLATIONS[CONFIG.DEFAULT_LANG];

    const nombre   = getField('f-nombre');
    const servicio = getField('f-servicio');
    const fecha    = getField('f-fecha');
    const hora     = getField('f-hora');

    let valid = true;

    clearErrors();

    if (!nombre || !nombre.value.trim()) {
      setError(nombre, true);
      valid = false;
    }
    if (!servicio || !servicio.value) {
      setError(servicio, true);
      valid = false;
    }
    if (!fecha || !fecha.value) {
      setError(fecha, true);
      valid = false;
    }
    if (!hora || !hora.value) {
      setError(hora, true);
      valid = false;
    }

    return valid;
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

  // ─── Submit handler ───────────────────────────────────────────────────────
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validate()) return;

    const nombre   = getField('f-nombre').value.trim();
    const servicio = getField('f-servicio').value;
    const fecha    = getField('f-fecha').value;
    const hora     = getField('f-hora').value;

    // Show confirmation UI
    if (confirm) {
      form.style.display   = 'none';
      confirm.style.display = 'block';
      // Trigger CSS animation via class (see animations.css .booking-confirm.show)
      requestAnimationFrame(() => confirm.classList.add('show'));
    }

    // Open WhatsApp after a short delay so user sees the confirmation
    setTimeout(() => {
      window.open(buildWhatsAppURL(nombre, servicio, fecha, hora), '_blank');
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
}
