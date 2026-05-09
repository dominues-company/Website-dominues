/** WhatsApp para reportar recargas (solo dígitos, incluye código país 58). */
export const RECHARGE_WHATSAPP_PHONE = '584243038858';

/** Mensaje corto del botón flotante (solo saludo / contacto general). */
export const WHATSAPP_FLOAT_GREETING = '¡Saludos! Me contacto desde Dominues.';

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

export function rechargeWhatsAppUrl(message) {
  return `https://wa.me/${RECHARGE_WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
