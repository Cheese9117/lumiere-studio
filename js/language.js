'use strict';

let currentLang = localStorage.getItem(CONFIG.STORAGE_KEY) ?? CONFIG.DEFAULT_LANG;

function safeSetHTML(el, html) {
  el.innerHTML = Sanitize.allowBr(html);
}

function applyLang(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!(key in dict)) return;

    if (key.endsWith('_html')) {
      safeSetHTML(el, dict[key]);
    } else {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (key in dict) el.placeholder = dict[key];
  });

  // aria-label needs a separate attribute too
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria;
    if (key in dict) el.setAttribute('aria-label', dict[key]);
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  localStorage.setItem(CONFIG.STORAGE_KEY, currentLang);
  applyLang(currentLang);
}

function initLanguage() {
  applyLang(currentLang);
  document.getElementById('lang-toggle')?.addEventListener('click', toggleLang);
}
