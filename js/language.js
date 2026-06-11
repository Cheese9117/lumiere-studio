'use strict';

/**
 * language.js — Lumière Studio
 *
 * ES / EN language toggle.
 * Reads all [data-i18n] elements and sets their textContent (or innerHTML
 * for keys ending in _html) from the TRANSLATIONS object in config.js.
 * Persists choice to localStorage.
 */

// ─── State ────────────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem(CONFIG.STORAGE_KEY) || CONFIG.DEFAULT_LANG;

// ─── Core apply function ──────────────────────────────────────────────────────
/**
 * Walk every [data-i18n] element and fill in translated text.
 * Keys that contain HTML (e.g. footer_address with <br>) use innerHTML.
 */
function applyLang(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!(key in dict)) return;

    // Keys ending in "_html" use innerHTML so we can embed tags like <br>
    if (key.endsWith('_html')) {
      el.innerHTML = dict[key];
    } else {
      el.textContent = dict[key];
    }
  });

  // Placeholders need a separate attribute
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key in dict) el.placeholder = dict[key];
  });

  // aria-label needs a separate attribute too
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset.i18nAria;
    if (key in dict) el.setAttribute('aria-label', dict[key]);
  });

  // Update <html lang="...">
  document.documentElement.lang = lang;

  // Update lang-toggle button appearance
  document.querySelectorAll('.lang-opt').forEach((opt) => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  localStorage.setItem(CONFIG.STORAGE_KEY, currentLang);
  applyLang(currentLang);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
function initLanguage() {
  // Apply persisted (or default) language on first load
  applyLang(currentLang);

  // Wire up the lang-toggle button
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.addEventListener('click', toggleLang);
}
