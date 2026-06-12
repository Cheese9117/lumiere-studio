'use strict';

const CONFIG = {
  WHATSAPP_NUMBER: '573001234567',
  STORAGE_KEY: 'lumiere_lang',
  DEFAULT_LANG: 'es',
  MARQUEE_REPEAT: 3,
  REVEAL_THRESHOLD: 0.15,
};

const TRANSLATIONS = {
  es: {
    nav_servicios: 'Servicios',
    nav_cotizar: 'Cotizar',
    nav_galeria: 'Galería',
    nav_equipo: 'Equipo',
    nav_reservar: 'Reservar',

    hero_badge: 'Laureles · Medellín',
    hero_line_1: 'Donde el',
    hero_line_2: 'cabello',
    hero_line_3: 'encuentra',
    hero_line_4: 'su luz.',

    marquee_1: 'Corte',
    marquee_2: 'Color',
    marquee_3: 'Tratamientos',
    marquee_4: 'Manicure',
    marquee_5: 'Maquillaje',
    marquee_6: 'Cejas',

    philo_number: '18',
    philo_label: 'años transformando looks en Laureles',
    philo_text_1: 'No somos un salón de paso. Cada cita empieza con una conversación de verdad: qué te gusta, qué no, qué querés cambiar. De ahí sale el plan — nunca al revés.',
    philo_text_2: 'Trabajamos con líneas profesionales libres de crueldad animal, agua filtrada y productos que respetan tu cabello tanto como tu tiempo. El resultado se nota desde la primera visita.',
    stat_1_label: 'Clientas que vuelven',
    stat_2_label: 'Citas a tiempo',
    stat_3_label: 'Productos premium',

    services_title: 'Lo que hacemos',
    s1_name: 'Corte y Estilizado',
    s1_price: '$45.000 – $80.000 COP',
    s1_desc: 'Cortamos en seco primero, para ver cómo cae tu pelo de verdad. Salís con un corte que se peina solo.',
    s2_name: 'Coloración y Mechas',
    s2_price: '$120.000 – $250.000 COP',
    s2_desc: 'Prueba de mechón antes de aplicar el color, sin sorpresas. El brillo dura semanas.',
    s3_name: 'Tratamientos Capilares',
    s3_price: '$60.000 – $150.000 COP',
    s3_desc: 'Revivimos tu pelo desde la raíz. Salís con el cabello suave y sin frizz.',
    s4_name: 'Manicure y Pedicure',
    s4_price: '$35.000 – $65.000 COP',
    s4_desc: 'Limado en seco, cuidado de cutícula. El semipermanente aguanta hasta tres semanas.',
    s5_name: 'Maquillaje Profesional',
    s5_price: '$80.000 – $120.000 COP',
    s5_desc: 'Bases que aguantan sudor y flash. Te vas viéndote vos misma, con mejor luz.',
    s6_name: 'Cejas y Pestañas',
    s6_price: '$40.000 – $70.000 COP',
    s6_desc: 'Diseño según el hueso de tu ceja, no una plantilla. Cambia la mirada sin que se note.',

    quote_eyebrow: 'Cotizador',
    quote_title: 'Tu look, tu precio.',
    quote_lead: 'Tres pasos para saber cuánto cuesta y cuánto dura tu próxima cita.',
    quote_step_label: 'Paso',
    quote_q1: '¿Cuál es el largo de tu cabello?',
    quote_largo_corto: 'Corto',
    quote_largo_medio: 'Medio',
    quote_largo_largo: 'Largo / Extra largo',
    quote_q2: '¿Qué servicio te interesa?',
    quote_servicio_corte: 'Corte y Estilizado',
    quote_servicio_color: 'Coloración y Mechas',
    quote_servicio_hidratacion: 'Tratamiento e Hidratación',
    quote_result_title: 'Tu estimado',
    quote_result_price_label: 'Precio aproximado',
    quote_result_duration_label: 'Duración aproximada',
    quote_duration_unit: 'min',
    quote_cta: 'Reservar este servicio por WhatsApp',
    quote_back: 'Atrás',
    quote_next: 'Siguiente',
    quote_restart: 'Empezar de nuevo',
    quote_wa_message: 'Hola, hice la cotización en la página y me interesa: {servicio}, cabello {largo}. Estimado: {precio} ({duracion} min). ¿Tienen disponibilidad?',

    gallery_title: 'Transformaciones',
    gl1: 'Interior del salón',
    gl2: 'Coloración y mechas',
    gl3: 'Corte y estilizado',
    gl4: 'Manicure y nail art',
    gl5: 'Estilizado profesional',
    gl6: 'Brushing y secado',

    compare_eyebrow: 'Antes / Después',
    compare_title: 'La diferencia, en un deslizo.',
    compare_lead: 'Arrastrá el control para ver la transformación completa.',
    compare_before: 'Antes',
    compare_after: 'Después',
    compare_1_alt_before: 'Cabello antes del tratamiento de hidratación',
    compare_1_alt_after: 'Cabello después del tratamiento de hidratación, con brillo y movimiento',
    compare_2_alt_before: 'Cabello antes de la coloración',
    compare_2_alt_after: 'Cabello después de la coloración y mechas',

    ambient_label: 'Simulador de iluminación ambiental',
    ambient_morning: 'Luz de mañana',
    ambient_golden: 'Hora dorada',
    ambient_night: 'Estudio nocturno',
    back_to_top: 'Volver arriba',

    team_title: 'El equipo',
    t1_name: 'Valentina Ríos',
    t1_role: 'Colorista & Estilista Jefe',
    t2_name: 'Daniela Ortiz',
    t2_role: 'Especialista en Tratamientos',
    t3_name: 'Camila Restrepo',
    t3_role: 'Nail Art & Maquillaje',

    testi_1: 'Le mostré una foto de Pinterest a Valentina y me hizo un balayage que parece pintado por el sol.',
    testi_1_name: 'Mariana G.',
    testi_2: 'Tenía el pelo frito de tanta plancha. Daniela me hizo el tratamiento de keratina y quedé otra persona.',
    testi_2_name: 'Laura P.',
    testi_3: 'Camila me dejó natural pero con un brillo que se notó hasta en las fotos. Lloré, pero de la buena.',
    testi_3_name: 'Camila T.',

    booking_title: 'Tu próxima cita empieza acá.',
    booking_wa: 'Escríbenos por WhatsApp',
    booking_or: 'O llamanos al +57 300 123 4567',
    form_name: 'Nombre',
    form_name_placeholder: 'Tu nombre',
    form_service: 'Servicio',
    form_service_placeholder: 'Elegí un servicio',
    form_date: 'Fecha',
    form_time: 'Hora',
    form_time_placeholder: 'Elegí una hora',
    form_submit: 'Confirmar reserva',
    err_name: 'Ingresá tu nombre.',
    err_service: 'Seleccioná un servicio.',
    err_date: 'Seleccioná una fecha.',
    err_time: 'Seleccioná una hora.',

    footer_tagline: 'Salón de belleza premium en Laureles, Medellín. Donde cada visita es un ritual.',
    footer_links_title: 'Navegación',
    footer_contact_title: 'Contacto',
    footer_social_title: 'Redes',
    footer_address: 'Carrera 70 #44A-23, Laureles, Medellín',
    footer_copy: `© ${new Date().getFullYear()} Lumière Studio`,
    footer_made: 'Hecho en Medellín 🌸',
  },

  en: {
    nav_servicios: 'Services',
    nav_cotizar: 'Quote',
    nav_galeria: 'Gallery',
    nav_equipo: 'Team',
    nav_reservar: 'Book',

    hero_badge: 'Laureles · Medellín',
    hero_line_1: 'Where',
    hero_line_2: 'hair',
    hero_line_3: 'finds',
    hero_line_4: 'its light.',

    marquee_1: 'Cut',
    marquee_2: 'Color',
    marquee_3: 'Treatments',
    marquee_4: 'Manicure',
    marquee_5: 'Makeup',
    marquee_6: 'Brows',

    philo_number: '18',
    philo_label: 'years transforming looks in Laureles',
    philo_text_1: "We're not a walk-in salon. Every appointment starts with a real conversation: what you like, what you don't, what you want to change. The plan comes from there — never the other way around.",
    philo_text_2: 'We work with cruelty-free professional lines, filtered water, and products that respect your hair as much as your time. The result shows from the very first visit.',
    stat_1_label: 'Returning clients',
    stat_2_label: 'On-time appointments',
    stat_3_label: 'Premium products',

    services_title: 'What we do',
    s1_name: 'Cut & Styling',
    s1_price: '$45,000 – $80,000 COP',
    s1_desc: 'We cut on dry hair first, to see how it really falls. You leave with a cut that styles itself.',
    s2_name: 'Color & Highlights',
    s2_price: '$120,000 – $250,000 COP',
    s2_desc: 'A strand test before any color, no surprises. The shine lasts for weeks.',
    s3_name: 'Hair Treatments',
    s3_price: '$60,000 – $150,000 COP',
    s3_desc: 'We bring your hair back to life from the root. You leave soft, with no frizz.',
    s4_name: 'Manicure & Pedicure',
    s4_price: '$35,000 – $65,000 COP',
    s4_desc: 'Dry-filing, careful cuticle work. Gel polish holds for up to three weeks.',
    s5_name: 'Professional Makeup',
    s5_price: '$80,000 – $120,000 COP',
    s5_desc: 'Bases that hold up to sweat and flash. You leave looking like yourself, with better light.',
    s6_name: 'Brows & Lashes',
    s6_price: '$40,000 – $70,000 COP',
    s6_desc: 'Shaped to your own brow bone, never a template. Changes your look without anyone noticing.',

    quote_eyebrow: 'Quote',
    quote_title: 'Your look, your price.',
    quote_lead: 'Three steps to find out how much your next appointment costs and how long it takes.',
    quote_step_label: 'Step',
    quote_q1: 'How long is your hair?',
    quote_largo_corto: 'Short',
    quote_largo_medio: 'Medium',
    quote_largo_largo: 'Long / Extra long',
    quote_q2: 'Which service are you after?',
    quote_servicio_corte: 'Cut & Styling',
    quote_servicio_color: 'Color & Highlights',
    quote_servicio_hidratacion: 'Treatment & Hydration',
    quote_result_title: 'Your estimate',
    quote_result_price_label: 'Estimated price',
    quote_result_duration_label: 'Estimated duration',
    quote_duration_unit: 'min',
    quote_cta: 'Book this service on WhatsApp',
    quote_back: 'Back',
    quote_next: 'Next',
    quote_restart: 'Start over',
    quote_wa_message: 'Hi, I used the quote tool on your site and I\'m interested in: {servicio}, {largo} hair. Estimate: {precio} ({duracion} min). Do you have availability?',

    gallery_title: 'Transformations',
    gl1: 'Salon interior',
    gl2: 'Color and highlights',
    gl3: 'Cut and styling',
    gl4: 'Manicure and nail art',
    gl5: 'Professional styling',
    gl6: 'Blow-dry finish',

    compare_eyebrow: 'Before / After',
    compare_title: 'The difference, in one swipe.',
    compare_lead: 'Drag the handle to see the full transformation.',
    compare_before: 'Before',
    compare_after: 'After',
    compare_1_alt_before: 'Hair before the hydration treatment',
    compare_1_alt_after: 'Hair after the hydration treatment, with shine and movement',
    compare_2_alt_before: 'Hair before coloring',
    compare_2_alt_after: 'Hair after coloring and highlights',

    ambient_label: 'Ambient lighting simulator',
    ambient_morning: 'Morning light',
    ambient_golden: 'Golden hour',
    ambient_night: 'Studio Nocturno',
    back_to_top: 'Back to top',

    team_title: 'The team',
    t1_name: 'Valentina Ríos',
    t1_role: 'Lead Colorist & Stylist',
    t2_name: 'Daniela Ortiz',
    t2_role: 'Hair Treatment Specialist',
    t3_name: 'Camila Restrepo',
    t3_role: 'Nail Art & Makeup',

    testi_1: 'I showed Valentina a photo from Pinterest and she did a balayage that looks like the sun painted it.',
    testi_1_name: 'Mariana G.',
    testi_2: 'My hair was fried from heat styling. Daniela did the keratin treatment and I felt like a new person.',
    testi_2_name: 'Laura P.',
    testi_3: 'Camila kept it natural but with a glow that showed up in every photo. I cried — the good kind.',
    testi_3_name: 'Camila T.',

    booking_title: 'Your next appointment starts here.',
    booking_wa: 'Message us on WhatsApp',
    booking_or: 'Or call +57 300 123 4567',
    form_name: 'Name',
    form_name_placeholder: 'Your name',
    form_service: 'Service',
    form_service_placeholder: 'Choose a service',
    form_date: 'Date',
    form_time: 'Time',
    form_time_placeholder: 'Choose a time',
    form_submit: 'Confirm booking',
    err_name: 'Enter your name.',
    err_service: 'Select a service.',
    err_date: 'Select a date.',
    err_time: 'Select a time.',

    footer_tagline: 'Premium beauty salon in Laureles, Medellín. Where every visit is a ritual.',
    footer_links_title: 'Navigation',
    footer_contact_title: 'Contact',
    footer_social_title: 'Social',
    footer_address: 'Carrera 70 #44A-23, Laureles, Medellín',
    footer_copy: `© ${new Date().getFullYear()} Lumière Studio`,
    footer_made: 'Made in Medellín 🌸',
  },
};

let currentLang = localStorage.getItem(CONFIG.STORAGE_KEY) ?? CONFIG.DEFAULT_LANG;

function applyLang(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (key in dict) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key in dict) el.placeholder = dict[key];
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    const key = el.dataset.i18nAlt;
    if (key in dict) el.alt = dict[key];
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.dataset.i18nAriaLabel;
    if (key in dict) el.setAttribute('aria-label', dict[key]);
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-opt').forEach((opt) => {
    opt.classList.toggle('is-active', opt.dataset.lang === lang);
  });

  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
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
