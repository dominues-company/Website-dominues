/** WhatsApp para reportar recargas (solo dígitos, incluye código país 58). */
export const RECHARGE_WHATSAPP_PHONES = [
  '584243038858', // principal
  '584243548523'  // respaldo / rotación (+58 424-3548523)
];

/** @deprecated Usar RECHARGE_WHATSAPP_PHONES / pickRechargeWhatsAppPhone() */
export const RECHARGE_WHATSAPP_PHONE = RECHARGE_WHATSAPP_PHONES[0];

/** Mensaje corto del botón flotante (solo saludo / contacto general). */
export const WHATSAPP_FLOAT_GREETING = '¡Saludos! Me contacto desde Dominues.';

/**
 * Elige un número al azar entre los configurados (reparte carga / evita bloqueos).
 */
export function pickRechargeWhatsAppPhone() {
  const phones = RECHARGE_WHATSAPP_PHONES.filter(Boolean);
  if (!phones.length) return RECHARGE_WHATSAPP_PHONE;
  const index = Math.floor(Math.random() * phones.length);
  return phones[index];
}

/**
 * Mensaje estructurado para notificar una recarga al equipo.
 * @param {{ userName?: string, amount?: string, methodLabel: string }} params
 */
export function buildRechargeReportMessage({ userName, amount, methodLabel }) {
  const userLine = userName?.trim() || '[Escribir nombre de usuario aquí]';
  const amountLine = amount?.trim() || '[Monto recargado]';
  const methodLine = methodLabel?.trim() || '[Pago Móvil / USDT]';
  return `¡Saludos! Acabo de realizar una recarga en Dominues.
Usuario: ${userLine}
Monto: ${amountLine}
Método: ${methodLine}
Adjunto el comprobante para la aprobación manual. ¡Gracias!`;
}

export function rechargeWhatsAppUrl(message, phone = null) {
  const target = phone || pickRechargeWhatsAppPhone();
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
}
