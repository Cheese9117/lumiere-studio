'use strict';

/**
 * booking.js — Lumière Studio
 *
 * Single-step 4-field booking form (nombre, servicio, fecha, hora).
 * On valid submit the form fades out, a bronze sparkle burst plays,
 * then the visitor is redirected to WhatsApp with a prefilled message.
 */

const MAX_NAME_LEN = 80;

function initBooking() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  const fields = {
    nombre: form.querySelector('#f-nombre'),
    servicio: form.querySelector('#f-servicio'),
    fecha: form.querySelector('#f-fecha'),
    hora: form.querySelector('#f-hora'),
  };

  const sparkle = document.querySelector('.sparkle-burst');

  function markInvalid(field, invalid) {
    field?.classList.toggle('is-invalid', invalid);
  }

  function validate() {
    let valid = true;

    const nameVal = fields.nombre.value.trim();
    if (!nameVal || nameVal.length > MAX_NAME_LEN) {
      markInvalid(fields.nombre, true);
      valid = false;
    }

    if (!fields.servicio.value) {
      markInvalid(fields.servicio, true);
      valid = false;
    }

    if (!fields.fecha.value) {
      markInvalid(fields.fecha, true);
      valid = false;
    }

    if (!fields.hora.value) {
      markInvalid(fields.hora, true);
      valid = false;
    }

    return valid;
  }

  function buildWhatsAppURL() {
    const lang = document.documentElement.lang || CONFIG.DEFAULT_LANG;
    const safeName = Sanitize.sanitizeText(fields.nombre.value.trim(), MAX_NAME_LEN);
    const servicio = fields.servicio.selectedOptions[0]?.text ?? '';
    const fecha = fields.fecha.value;
    const hora = fields.hora.value;

    const message = lang === 'en'
      ? `Hi! I'd like to book an appointment at Lumière Studio.\n\n📋 *Name:* ${safeName}\n✂️ *Service:* ${servicio}\n📅 *Date:* ${fecha}\n🕐 *Time:* ${hora}\n\nThank you!`
      : `¡Hola! Quiero reservar una cita en Lumière Studio.\n\n📋 *Nombre:* ${safeName}\n✂️ *Servicio:* ${servicio}\n📅 *Fecha:* ${fecha}\n🕐 *Hora:* ${hora}\n\n¡Gracias!`;

    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  Object.values(fields).forEach((field) => {
    field.addEventListener('input', () => markInvalid(field, false));
    field.addEventListener('change', () => markInvalid(field, false));
  });

  fields.fecha.min = new Date().toISOString().split('T')[0];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    const whatsappURL = buildWhatsAppURL();

    form.classList.add('is-hidden');
    sparkle?.classList.add('is-playing');

    setTimeout(() => {
      window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    }, 700);
  });
}
