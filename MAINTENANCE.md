# Maintenance Guide

**Projects:** Lumière Studio · Barber Classic  
**Owner:** Cheese9117  
**Hosting:** GitHub Pages

---

## Weekly Checklist

- [ ] Open the live site on mobile and click every WhatsApp button — confirm the pre-filled message and number are correct
- [ ] Check browser console for errors (F12 → Console → reload page)
- [ ] Verify the booking form on Lumière fills out and redirects to WhatsApp correctly
- [ ] Test the barber selector modal opens, barber buttons work, Escape/backdrop close works

---

## Monthly Checklist

- [ ] Review Google Search Console for crawl errors or manual actions
- [ ] Check Core Web Vitals in Google Search Console (Performance → Core Web Vitals)
- [ ] Open both sites in Chrome DevTools → Lighthouse and run a full audit
- [ ] Verify all external links still resolve (Instagram, Facebook, Google Maps)
- [ ] If Google Fonts changes their CDN structure, check fonts still load

---

## Pre-Deploy Checklist

Before pushing any changes to `main`:

- [ ] Run the site locally (open `index.html` in browser or `npx serve .`)
- [ ] Test on Firefox and Safari in addition to Chrome
- [ ] Test on a real mobile device or DevTools mobile emulation (375px, 768px, 1280px)
- [ ] Check that no `console.log()` statements were left in JS files
- [ ] Verify WhatsApp links open the correct chat with the correct pre-filled message
- [ ] Confirm the copyright year in the footer is current (it's dynamic — should always be correct)
- [ ] Check no `.env` files are staged: `git diff --cached --name-only | grep -i env`

---

## How to Add a New Service — Barber Classic

1. Open `barber-classic/index.html`
2. Copy an existing `<article class="service-card ...">` block inside `<div class="services__grid">`
3. Update: emoji icon, service name, price, description
4. Update the `data-service="..."` attribute on the `<button>` with the exact service name
5. The WhatsApp message is built automatically: `Hola, quiero reservar: [data-service] con [barber]`
6. If you also want it in the footer services list, add a matching `<li>` in the footer with the correct `href` on the WhatsApp link

To add a new barber to the selector modal:

1. Open `index.html` and find `<div class="barber-modal__grid">`
2. Add a new `<button class="barber-modal__barber" data-barber="Nombre">` block
3. The 2×2 grid will reflow automatically; for 5+ barbers you may want to change the grid to `grid-template-columns: repeat(3, 1fr)` in `css/components.css`

---

## How to Add a New Service — Lumière Studio

Services live in two places: the HTML service cards and the translation dictionaries.

1. Open `index.html` and add a new `<article class="service-card ...">` in `<div class="services-grid">`
2. Use a new key prefix (e.g. `s7_`) for `data-i18n` attributes
3. Open `js/config.js` and add both Spanish and English versions of the key to `TRANSLATIONS.es` and `TRANSLATIONS.en`:

```js
s7_name:  'Nuevo Servicio',
s7_price: '$XX.000 COP',
s7_desc:  'Descripción del nuevo servicio.',
```

4. Add the same key with the same name to the `<select id="f-servicio">` options in the booking form
5. Add it to the footer services list

---

## How to Update the WhatsApp Number

**Barber Classic:**
Open `barber-classic/js/booking.js` and update:
```js
const BASE_URL = 'https://wa.me/57XXXXXXXXXX';
```
Replace `57XXXXXXXXXX` with the country code + number (no spaces, no `+`).

Also update all `href="https://wa.me/..."` links in `index.html` that exist outside the JS-controlled modal (nav CTA, hero buttons, footer links).

**Lumière Studio:**
Open `js/config.js` and update:
```js
WHATSAPP_NUMBER: '57XXXXXXXXXX',
```
All WhatsApp buttons are built from this single value.

---

## How to Rotate API Keys / Tokens

Currently neither project uses API keys at runtime. If you add a service (analytics, maps, contact form backend):

1. Never put keys in source files — use `.env` for local dev
2. For GitHub Pages: add secrets in **Settings → Secrets and variables → Actions** if using GitHub Actions to inject them at build time
3. For Netlify: add them in **Site settings → Environment variables**
4. Document required keys in `.env.example` without the actual values
5. If a key is accidentally committed: rotate it **before** attempting to remove it from git history — removal from history is not instantaneous and forks may still have it

To revoke the previously exposed GitHub token:  
→ https://github.com/settings/tokens — delete any token starting with `***REMOVED***`

---

## Deployment — GitHub Pages

Both sites deploy automatically from the `main` branch root directory.

- **Lumière:** https://cheese9117.github.io/lumiere-studio/
- **Barber Classic:** https://cheese9117.github.io/barber-classic/

Deployment takes 1–3 minutes after a push. Check status at:  
**Repository → Actions** (if Actions is used) or **Settings → Pages → Build and deployment**

To deploy Barber Classic as a standalone domain, change GitHub Pages source to the `barber-classic/` folder — or move the repo to its own repository (already done).

---

## Emergency Contacts

| Role | Contact |
|------|---------|
| Site owner / developer | [add contact] |
| Domain registrar | [add if custom domain is added] |
| GitHub account | github.com/Cheese9117 |
| WhatsApp (Barber Classic) | +57 305 461 1436 |
| WhatsApp (Lumière) | +57 300 123 4567 (placeholder — update) |

---

## Known Limitations

- **No server-side CSP headers** — GitHub Pages does not support custom HTTP headers. The `<meta http-equiv="Content-Security-Policy">` tag covers most attack vectors but cannot set `Strict-Transport-Security` or `X-Frame-Options` headers. These are enforced by GitHub Pages infrastructure by default (HTTPS is enforced; framing is blocked by the GitHub Pages CDN).
- **Google Fonts SRI** — not implementable; documented in `SECURITY_AUDIT.md`
- **No form spam protection** — without a backend there is no rate limiting or CAPTCHA. If spam becomes an issue, consider adding Netlify Forms (free tier) or Formspree.
