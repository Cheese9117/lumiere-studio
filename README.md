# Lumière Studio — Liquid Beauty

> Sitio de una página para un salón de belleza premium en Laureles, Medellín. Concepto "Liquid Beauty": tipografía masiva ultra-thin, paleta bronce sobre negro/crema, animaciones cinematográficas y bilingüe (ES/EN).

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Live](https://img.shields.io/badge/Ver_sitio_en_vivo-C8A882?style=flat-square&logo=googlechrome&logoColor=white)](https://cheese9117.github.io/lumiere-studio/)

---

## Demo en vivo

**[cheese9117.github.io/lumiere-studio](https://cheese9117.github.io/lumiere-studio/)**

---

## Concepto

"Liquid Beauty" — el agua y la luz como metáfora de cómo fluyen los productos, cómo la luz incide en el cabello y cómo el color se filtra a través de cada hebra. Todo, desde los `clip-path` del hero hasta el parallax de la galería, refuerza esa idea.

- **Tipografía:** Bodoni Moda (display, ultra-thin) para titulares masivos (`clamp(4rem, 10vw, 12rem)`), Instrument Sans para texto y DM Mono para cifras y acentos.
- **Paleta:** negro `#050505`, crema `#FAF6F0` y bronce `#C8A882` como hilo conductor.
- **Estructura narrativa no convencional:** loader → hero → marquee → filosofía → servicios → galería → equipo → testimonios → reserva → footer.

---

## Animaciones

| # | Efecto | Archivo |
|---|---|---|
| 1 | Cursor magnético bronce (40px → 80px) | `js/cursor.js` |
| 2 | Smooth-scroll estilo Lenis, sin librerías | `js/scroll.js` |
| 3 | Scramble de texto en hover (servicios) | `js/distortion.js` |
| 4 | Botones magnéticos (proximidad 80px) | `js/magnetic.js` |
| 5 | Reveals escalonados por sección (`IntersectionObserver`) | `js/scroll.js` + `css/animations.css` |
| 6 | Contadores con morph de blur | `js/counter.js` |
| 7 | Marquee infinito | `js/marquee.js` |
| 8 | Barra de progreso superior + loading screen | `js/app.js` |
| 9 | Sparkle burst al confirmar reserva | `js/booking.js` |
| 10 | Cotizador inteligente (3 pasos, precio + duración + CTA WhatsApp) | `js/quote.js` |
| 11 | Slider antes/después táctil con teclado | `js/compare.js` |
| 12 | Shimmer degradado en énfasis del hero | `css/animations.css` |
| 13 | Nav flotante compacto al bajar scroll | `js/scroll.js` |
| 14 | Simulador de iluminación ambiental (3 paletas) | `js/ambient.js` |

---

## Estructura

```
/
├── index.html
├── css/
│   ├── variables.css   # Design tokens — color, tipografía, motion
│   ├── reset.css        # Reset moderno + prefers-reduced-motion
│   ├── base.css         # Tipografía base y utilidades de texto
│   ├── layout.css        # Contenedores, grids, secciones
│   ├── components.css   # Loader, nav, botones, forms, cursor, lightbox
│   ├── sections.css     # Estilos de las 9 secciones
│   ├── animations.css   # Keyframes y sistema de reveal
│   ├── responsive.css   # Breakpoints 1024 / 768 / 480
│   └── utilities.css    # Helpers puntuales
├── js/
│   ├── language.js      # CONFIG + TRANSLATIONS (ES/EN) + i18n
│   ├── cursor.js         # Cursor magnético
│   ├── scroll.js          # Smooth-scroll, reveals, parallax, stat bars
│   ├── magnetic.js        # Botones magnéticos
│   ├── distortion.js      # Scramble de texto
│   ├── counter.js          # Contadores con blur morph
│   ├── marquee.js          # Duplicado del marquee infinito
│   ├── gallery.js          # Lightbox de la galería
│   ├── compare.js          # Slider antes/después
│   ├── quote.js            # Cotizador inteligente (3 pasos)
│   ├── ambient.js          # Simulador de iluminación ambiental
│   ├── booking.js          # Validación + redirect a WhatsApp
│   └── app.js              # Loader, menú móvil, bootstrap general
├── utils/
│   └── sanitize.js      # Sanitización de inputs del formulario
├── assets/icons/favicon.svg
├── robots.txt
└── sitemap.xml
```

---

## Reservas sin backend

El formulario de la sección "Reservar" valida los 4 campos (nombre, servicio, fecha, hora), reproduce un sparkle de confirmación y construye una URL `wa.me/57XXXXXXXXXX?text=...` con los datos codificados — funciona en cualquier hosting estático, sin servidor.

---

## SEO

- Meta title/description optimizados, Open Graph + Twitter Cards.
- `HairSalon` JSON-LD con dirección, geolocalización, horarios y rating agregado (4.9★ / 400 reseñas).
- `hreflang` ES/EN, canonical, `sitemap.xml` con anclas de sección y `robots.txt` abierto.

---

## Correr localmente

```bash
npx serve .
# Luego abre http://localhost:3000
```

O visitá la demo en vivo: **[cheese9117.github.io/lumiere-studio](https://cheese9117.github.io/lumiere-studio/)**

---

## Autor

**Juan Sebastián Henao** — Freelance Web Developer · Medellín, Colombia

> ¿Querés una landing page así para tu negocio? Escribime.
