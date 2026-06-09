# 💄 Lumière Studio — Landing Page

> Sitio web de una página para un salón de belleza de lujo en Medellín. Diseño *Rose & Stone*, bilingüe (ES/EN), con sistema de reservas integrado vía WhatsApp.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Live](https://img.shields.io/badge/Ver_sitio_en_vivo-C4897A?style=flat-square&logo=googlechrome&logoColor=white)](https://cheese9117.github.io/lumiere-studio)

---

## 🌐 Demo en vivo

**[cheese9117.github.io/lumiere-studio](https://cheese9117.github.io/lumiere-studio)**

---

## ¿Qué es este proyecto?

Landing page completa y lista para producción para **Lumière Studio**, salón de belleza premium en Medellín. Sin frameworks, sin build steps — HTML semántico, CSS modular y JS vanilla puro.

El diseño sigue la dirección *Rose & Stone*: fondo crema cálido, acentos en rosa empolvado y verde salvia, tipografía de lujo con Cormorant Garamond + DM Sans.

---

## ✨ Funcionalidades

### UX & Diseño
- **Split hero** con entrada animada en CSS puro
- **Ritual strips** — bandas cinematográficas con citas en cursiva
- **Galería masonry** con zoom y overlay al hover
- **Testimonials carousel** con autoplay, swipe en móvil y control por flechas/puntos
- **Animaciones de scroll** con `IntersectionObserver`
- **Mobile-first** completamente responsive

### Funcional
- **Cambio de idioma ES / EN** instantáneo, preferencia guardada en `localStorage`
- **Formulario de reserva** con validación — redirige a WhatsApp con datos pre-llenados (`wa.me`)
- **Botón de WhatsApp flotante** con tooltip y animación de pulso
- **Back-to-top** que aparece después de 300px de scroll
- **Nav** con backdrop blur al hacer scroll

### Secciones
| Sección | Descripción |
|---|---|
| Hero | Titular + CTA + tarjeta visual flotante |
| Trust bar | 4.9★ Google · 4.000+ clientas · 6 años · Cruelty-free |
| Servicios | 6 servicios con precios en COP |
| ¿Por qué nosotras? | 3 columnas: consulta, productos premium, ambiente |
| Equipo | 3 estilistas con avatar y especialidad |
| Testimonios | Carousel con 4 reseñas |
| Galería | 6 celdas masonry |
| Reservar | Formulario + botón directo a WhatsApp |
| Footer | Logo, links, contacto, redes sociales |

---

## 🎨 Sistema de diseño

```css
--bg:        #FAF7F4   /* Off-white cálido */
--text:      #1E1410   /* Espresso profundo */
--rose:      #C4897A   /* Rosa empolvado (acento principal) */
--sage:      #8A9E8C   /* Verde salvia (acento secundario) */
--gold:      #B8956A   /* Dorado (uso puntual) */
--bg-card:   #F0EAE4   /* Superficie de tarjetas */
--bg-stone:  #EDE5DC   /* Fondo ritual strips */
```

**Tipografía:** `Cormorant Garamond` (display) · `DM Sans` (cuerpo)

---

## 📁 Estructura

```
/
├── index.html          # Estructura semántica HTML5
├── css/
│   ├── reset.css       # Box-sizing, resets, scrollbar
│   ├── variables.css   # Design tokens (colores, espaciado, sombras)
│   ├── typography.css  # Reglas de fuente para cada componente
│   ├── layout.css      # Grid/flexbox, mobile-first
│   ├── components.css  # Botones, cards, formularios, nav
│   ├── animations.css  # Keyframes, scroll reveal
│   └── responsive.css  # Breakpoints 600px+ y 900px+
└── js/
    ├── config.js       # Número WA, ajustes, contenido ES/EN completo
    ├── language.js     # Toggle de idioma, data-i18n, localStorage
    ├── animations.js   # IntersectionObserver scroll reveal
    ├── carousel.js     # Autoplay + swipe + dots + prev/next
    ├── booking.js      # Validación de formulario + redirect wa.me
    └── main.js         # Entry point, nav, menú móvil, back-top
```

---

## ⚡ Decisiones técnicas

**¿Por qué sin frameworks?**
Para una landing page estática, React o Next.js agregarían complejidad sin beneficio real. CSS custom properties + `IntersectionObserver` + JS vanilla carga instantáneamente.

**¿Por qué i18n en JS puro?**
El cambio de idioma es instantáneo y sin recarga. Un objeto `TRANSLATIONS` indexado por clave en `config.js` es simple, mantenible y no requiere ninguna librería.

**Reservas sin backend:**
El formulario construye una URL `wa.me/57XXXXXXXXXX?text=...` con los datos del formulario URL-encoded y redirige al usuario a WhatsApp — funciona en cualquier hosting estático.

---

## 🚀 Correr localmente

```bash
# Opción 1 — abre directo en el navegador
open index.html

# Opción 2 — servidor local
npx serve .
# Luego abre: http://localhost:3000
```

O simplemente visita la demo: **[cheese9117.github.io/lumiere-studio](https://cheese9117.github.io/lumiere-studio)**

---

## 👨‍💻 Autor

**Juan Sebastian Henao** — AI-Powered Web Developer · Medellín, Colombia 🇨🇴

[![Email](https://img.shields.io/badge/juansebastian9117%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:juansebastian9117@gmail.com)
[![Instagram](https://img.shields.io/badge/@sebasxhax__-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/sebasxhax_)

> ¿Querés una landing page así para tu negocio? Escríbeme.
