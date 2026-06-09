# 💄 Lumière Studio — Landing Page

> Sitio web de una página para un salón de belleza de lujo en Medellín. Diseño *Rose & Stone*, bilingüe (ES/EN), con sistema de reservas integrado y chatbot de WhatsApp.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Live](https://img.shields.io/badge/Ver_sitio_en_vivo-C4897A?style=flat-square&logo=googlechrome&logoColor=white)](https://cheese9117.github.io/lumiere-studio)

---

## 🌐 Demo en vivo

**[cheese9117.github.io/lumiere-studio](https://cheese9117.github.io/lumiere-studio)**

---

## ¿Qué es este proyecto?

Landing page completa y lista para producción para **Lumière Studio**, salón de belleza premium en Medellín. Construida como un único archivo HTML autocontenido — sin dependencias externas, sin frameworks, sin build steps.

El diseño sigue la dirección *Rose & Stone*: fondo crema cálido, acentos en rosa empolvado y verde salvia, tipografía de lujo con Cormorant Garamond + DM Sans. El objetivo fue crear una página que se sienta premium sin intimidar — aspiracional pero cercana.

---

## ✨ Funcionalidades

### UX & Diseño
- **Split hero** con entrada animada en CSS puro
- **Ritual strips** — bandas cinematográficas con citas en cursiva como respiro visual
- **Galería masonry** con zoom y overlay de servicio al hover (solo CSS)
- **Testimonials carousel** con autoplay y control por puntos/flechas
- **Animaciones de scroll** con `IntersectionObserver` — sutiles, no dramáticas
- **Mobile-first** completamente responsive

### Funcional
- **Cambio de idioma ES / EN** instantáneo sin recargar página — todo el contenido en un objeto JS, preferencia guardada en `localStorage`
- **Formulario de reserva** con validación en español y estado de confirmación animado
- **Botón de WhatsApp flotante** con tooltip y animación de pulso
- **Back-to-top** que aparece después de 300px de scroll
- **Nav** que se comprime y agrega backdrop blur al hacer scroll

### Secciones
| Sección | Descripción |
|---|---|
| Hero | Titular + CTA principal + tarjeta visual flotante |
| Trust bar | 4.9★ Google · 4.000+ clientas · 6 años · Cruelty-free |
| Servicios | 6 servicios con precios en COP, hover con sombra rosa |
| ¿Por qué nosotras? | 3 columnas: consulta, productos premium, ambiente |
| Equipo | 3 estilistas con avatar y especialidad |
| Testimonios | Carousel con 4 reseñas de clientas reales |
| Galería | 6 celdas masonry con placeholders de gradiente |
| Reservar | Formulario inline + botón directo a WhatsApp |
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

**Tipografía:**
- Display: `Cormorant Garamond` — elegante, editorial
- Cuerpo: `DM Sans` — limpia, legible, moderna

---

## 📁 Estructura

```
/projects/lumiere-studio/
└── index.html     # Todo el sitio — HTML + CSS + JS en un solo archivo
```

---

## ⚡ Decisiones técnicas

**¿Por qué un solo archivo?**
El cliente necesitaba algo que pudiera entregar, hospedar en GitHub Pages y modificar sin necesidad de un servidor ni proceso de build. Un archivo HTML autocontenido es la solución más directa para ese caso de uso.

**¿Por qué sin frameworks?**
Para una landing page estática, React o Next.js agregarían complejidad sin beneficio real. CSS custom properties + `IntersectionObserver` + JS vanilla es más que suficiente y carga instantáneamente.

**¿Por qué i18n en JS puro?**
El cambio de idioma necesitaba ser instantáneo y sin recarga. Un objeto JS con todas las cadenas indexadas por clave es simple, mantenible y no requiere ninguna librería.

---

## 🚀 Uso

```bash
# Opción 1 — abre directo en el navegador
open projects/lumiere-studio/index.html

# Opción 2 — servidor local
npx serve .
# Luego abre: http://localhost:3000/projects/lumiere-studio/
```

O simplemente visita la demo en vivo: **[cheese9117.github.io/lumiere-studio](https://cheese9117.github.io/lumiere-studio)**

---

## 👨‍💻 Autor

**Juan Sebastian Henao** — AI-Powered Web Developer · Medellín, Colombia 🇨🇴

[![Email](https://img.shields.io/badge/juansebastian9117%40gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:juansebastian9117@gmail.com)
[![Instagram](https://img.shields.io/badge/@sebasxhax__-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/sebasxhax_)

> ¿Querés una landing page así para tu negocio? Escríbeme.
