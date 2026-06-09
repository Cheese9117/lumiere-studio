'use strict';

function initBooking() {
  const form    = document.getElementById('booking-form');
  const confirm = document.getElementById('booking-confirm');

  if (!form) return;

  const MAX_NAME_LEN = 80;

  function markInvalid(field, invalid) {
    field?.classList.toggle('invalid', invalid);
  }

  function clearErrors() {
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  }

  function validate() {
    const nombre   = form.querySelector('#f-nombre');
    const servicio = form.querySelector('#f-servicio');
    const fecha    = form.querySelector('#f-fecha');
    const hora     = form.querySelector('#f-hora');

    clearErrors();
    let valid = true;

    const nameVal = nombre?.value.trim() ?? '';
    if (!nameVal || nameVal.length > MAX_NAME_LEN) {
      markInvalid(nombre, true);
      valid = false;
    }
    if (!servicio?.value) { markInvalid(servicio, true); valid = false; }
    if (!fecha?.value)    { markInvalid(fecha,    true); valid = false; }
    if (!hora?.value)     { markInvalid(hora,     true); valid = false; }

    return valid;
  }

  function buildWhatsAppURL(nombre, servicio, fecha, hora) {
    const lang = document.documentElement.lang || CONFIG.DEFAULT_LANG;
    const safeName = Sanitize.sanitizeText(nombre, MAX_NAME_LEN);

    const message = lang === 'en'
      ? `Hi! I'd like to book an appointment at Lumière Studio.\n\n📋 *Name:* ${safeName}\n✂️ *Service:* ${servicio}\n📅 *Date:* ${fecha}\n🕐 *Time:* ${hora}\n\nThank you!`
      : `¡Hola! Quiero reservar una cita en Lumière Studio.\n\n📋 *Nombre:* ${safeName}\n✂️ *Servicio:* ${servicio}\n📅 *Fecha:* ${fecha}\n🕐 *Hora:* ${hora}\n\n¡Gracias!`;

    return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;

    const nombre   = form.querySelector('#f-nombre').value.trim();
    const servicio = form.querySelector('#f-servicio').value;
    const fecha    = form.querySelector('#f-fecha').value;
    const hora     = form.querySelector('#f-hora').value;

    if (confirm) {
      form.style.display    = 'none';
      confirm.style.display = 'block';
      requestAnimationFrame(() => confirm.classList.add('show'));
    }

    setTimeout(() => {
      window.open(buildWhatsAppURL(nombre, servicio, fecha, hora), '_blank', 'noopener,noreferrer');
    }, 800);
  });

  form.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input',  () => markInvalid(el, false));
    el.addEventListener('change', () => markInvalid(el, false));
  });

  const fechaField = form.querySelector('#f-fecha');
  if (fechaField) fechaField.min = new Date().toISOString().split('T')[0];
}
