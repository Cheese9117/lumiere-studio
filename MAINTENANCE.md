# Maintenance Guide — Lumière Studio

**Hosting:** GitHub Pages (deploys automatically from `main`)
**Live site:** https://cheese9117.github.io/lumiere-studio/

---

## Weekly Checklist

- [ ] Open the live site on mobile and click the WhatsApp buttons — confirm the pre-filled message and number are correct
- [ ] Check the browser console for errors (F12 → Console → reload page)
- [ ] Verify the booking form fills out and redirects to WhatsApp correctly
- [ ] Verify the language toggle (ES/EN) switches all visible text

---

## Monthly Checklist

- [ ] Review Google Search Console for crawl errors or manual actions
- [ ] Check Core Web Vitals (Performance → Core Web Vitals)
- [ ] Run a Lighthouse audit in Chrome DevTools
- [ ] Verify external links still resolve (Instagram, Facebook, WhatsApp)
- [ ] Update `lastmod` dates in `sitemap.xml` if content changed

---

## Pre-Deploy Checklist

Before pushing any changes to `main`:

- [ ] Run the site locally (`npx serve .`) and smoke-test the main flows
- [ ] Test at 375px, 768px and 1280px viewport widths
- [ ] Check for `console.log()` statements left in JS files
- [ ] Confirm WhatsApp links open the correct chat with the correct pre-filled message
- [ ] Confirm no `.env` files or credentials are staged: `git diff --cached --name-only | grep -i env`

---

## How to Add a New Service

Services live in two places: the HTML service cards and the translation dictionary.

1. Open `index.html` and add a new `<article class="service-card ...">` inside `<div class="services-track">`
2. Use a new key prefix (e.g. `s7_`) for the `data-i18n` attributes
3. Open `js/language.js` and add the Spanish and English copy to `TRANSLATIONS.es` and `TRANSLATIONS.en`:

   ```js
   s7_name:  'Nuevo Servicio',
   s7_price: '$XX.000 – $YY.000 COP',
   s7_desc:  'Descripción del nuevo servicio.',
   ```

4. Add the matching `<option>` to `<select id="f-servicio">` in the booking form
5. Add a background image for the card in `css/sections.css` (`.service-card:nth-child(n) .service-card-bg`)

---

## How to Update the WhatsApp Number

Open `js/language.js` and update `CONFIG.WHATSAPP_NUMBER`, then update the `href="https://wa.me/..."` links in `index.html` (hero CTA, booking section, footer) to match.

---

## Credentials & Secrets

- This project has no runtime API keys. `.env.example` documents the only configurable value (`WHATSAPP_NUMBER`) for reference — it is not consumed by any build step.
- Never commit `.env`, tokens, or credentials. Authenticate git with the GitHub CLI (`gh auth login`) or a credential manager — never embed a token in a remote URL.
- If a credential is ever accidentally committed: rotate/revoke it immediately at https://github.com/settings/tokens, then remove it from the repository.

---

## Known Limitations

- **No server-side headers** — GitHub Pages does not support custom HTTP response headers. The `<meta http-equiv="Content-Security-Policy">` tag in `index.html` covers most client-side risks; HTTPS and frame-blocking are enforced by GitHub Pages itself.
- **No SRI on Google Fonts** — not practical because Google serves different CSS per `User-Agent`. Mitigated by restricting `font-src`/`style-src` in the CSP.
- **No form backend** — the booking form redirects to WhatsApp; there is no spam protection. If this becomes an issue, consider Netlify Forms or Formspree.
