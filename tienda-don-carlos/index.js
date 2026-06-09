const express = require('express');
const { MessagingResponse } = require('twilio').twiml;

const app = express();
app.use(express.urlencoded({ extended: false }));

// ── Producto catalog ─────────────────────────────────────────────────────────
const productos = {
  arroz: [
    { nombre: 'Arroz Diana x 500g', precio: '2.800' },
    { nombre: 'Arroz Diana x 1kg',  precio: '5.200' },
    { nombre: 'Arroz Supremo x 1kg', precio: '4.900' },
  ],
  aceite: [
    { nombre: 'Aceite Gourmet x 500ml', precio: '7.500' },
    { nombre: 'Aceite Gourmet x 1L',    precio: '13.900' },
    { nombre: 'Aceite La Fina x 1L',    precio: '12.500' },
  ],
  bebidas: [
    { nombre: 'Gaseosa Coca-Cola 400ml',  precio: '2.500' },
    { nombre: 'Gaseosa Postobón 400ml',   precio: '2.200' },
    { nombre: 'Agua Cristal 600ml',       precio: '1.800' },
    { nombre: 'Jugo Hit 250ml',           precio: '2.000' },
  ],
  snacks: [
    { nombre: 'Papas Margarita personal', precio: '1.800' },
    { nombre: 'Chitos personal',          precio: '1.500' },
    { nombre: 'Nucita',                   precio: '1.200' },
    { nombre: 'Chocolatina Jet',          precio: '1.500' },
  ],
};

// ── Intent detection ──────────────────────────────────────────────────────────
function detectIntent(msg) {
  const m = msg.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  if (/\b(hola|buenas|buenos|buenas tardes|buenas noches|buen dia|saludos|hey|hi)\b/.test(m)) {
    return 'greeting';
  }
  if (/\b(arroz)\b/.test(m))   return 'arroz';
  if (/\b(aceite)\b/.test(m))  return 'aceite';
  if (/\b(bebida|gaseosa|agua|jugo|tomar|refresco)\b/.test(m)) return 'bebidas';
  if (/\b(snack|papas|chito|nucita|chocolatina|dulce|mecato)\b/.test(m)) return 'snacks';
  if (/\b(producto|catalogo|venden|tienen|que hay|precio|lista)\b/.test(m)) return 'catalogo';
  if (/\b(hora|horario|abren|cierran|atienden|abierto)\b/.test(m)) return 'horario';
  if (/\b(donde|ubicacion|direccion|barrio|llegar|mapa)\b/.test(m)) return 'ubicacion';
  if (/\b(pago|pagar|nequi|efectivo|transferencia|metodo)\b/.test(m)) return 'pago';
  if (/\b(gracias|thanks|muchas gracias|dale|listo|ok)\b/.test(m)) return 'gracias';

  return 'desconocido';
}

// ── Response builders ─────────────────────────────────────────────────────────
function listarProductos(categoria) {
  return productos[categoria]
    .map(p => `• ${p.nombre}: $${p.precio} COP`)
    .join('\n');
}

function buildReply(intent) {
  switch (intent) {
    case 'greeting':
      return (
        '¡Hola! Bienvenido a *Tienda Don Carlos* 🛒\n\n' +
        'Puedo ayudarte con:\n' +
        '1️⃣ *Productos* – arroz, aceite, bebidas, snacks\n' +
        '2️⃣ *Horarios*\n' +
        '3️⃣ *Ubicación*\n' +
        '4️⃣ *Formas de pago*\n\n' +
        '¿En qué te puedo ayudar? 😊'
      );

    case 'arroz':
      return `🌾 *Arroz disponible:*\n${listarProductos('arroz')}\n\n¿Te interesa alguno?`;

    case 'aceite':
      return `🫙 *Aceites disponibles:*\n${listarProductos('aceite')}\n\n¿Cuál prefieres?`;

    case 'bebidas':
      return `🥤 *Bebidas disponibles:*\n${listarProductos('bebidas')}\n\n¡Bien fresquitas te las tenemos!`;

    case 'snacks':
      return `🍿 *Mecatos disponibles:*\n${listarProductos('snacks')}\n\n¿Cuál se te antoja?`;

    case 'catalogo':
      return (
        '📦 *Nuestros productos:*\n\n' +
        '🌾 *Arroz* – escríbeme "arroz"\n' +
        '🫙 *Aceite* – escríbeme "aceite"\n' +
        '🥤 *Bebidas* – escríbeme "bebidas"\n' +
        '🍿 *Snacks* – escríbeme "snacks"\n\n' +
        'Dime cuál categoría quieres ver 👇'
      );

    case 'horario':
      return (
        '🕐 *Horarios de Tienda Don Carlos:*\n\n' +
        '📅 Lunes a sábado: 7:00 am – 9:00 pm\n' +
        '📅 Domingos: 8:00 am – 2:00 pm\n\n' +
        '¡Te esperamos! 🙌'
      );

    case 'ubicacion':
      return (
        '📍 *¿Dónde estamos?*\n\n' +
        'Estamos en *Medellín*, barrio *Laureles*.\n' +
        'Pregunta por Don Carlos, todos nos conocen por aquí 😄\n\n' +
        '¿Necesitas algo más?'
      );

    case 'pago':
      return (
        '💳 *Formas de pago:*\n\n' +
        '💵 *Efectivo* – siempre disponible\n' +
        '📱 *Nequi* – rápido y fácil\n\n' +
        'Por el momento no manejamos tarjeta. ¿Algo más? 😊'
      );

    case 'gracias':
      return '¡Con gusto! 😊 Si necesitas algo más, aquí estoy. ¡Que tenga un buen día!';

    default:
      return (
        'Hmm, no entendí muy bien 🤔 Puedo ayudarte con:\n\n' +
        '🌾 *Arroz* | 🫙 *Aceite* | 🥤 *Bebidas* | 🍿 *Snacks*\n' +
        '🕐 *Horarios* | 📍 *Ubicación* | 💳 *Formas de pago*\n\n' +
        'Escríbeme alguna de esas palabras clave 👆'
      );
  }
}

// ── Webhook endpoint ──────────────────────────────────────────────────────────
app.post('/webhook', (req, res) => {
  const incomingMsg = (req.body.Body || '').trim();
  const intent = detectIntent(incomingMsg);
  const replyText = buildReply(intent);

  const twiml = new MessagingResponse();
  twiml.message(replyText);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('🛒 Tienda Don Carlos Bot — activo y listo.');
});

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tienda Don Carlos Bot corriendo en http://localhost:${PORT}`);
  console.log(`Webhook: POST http://localhost:${PORT}/webhook`);
});
