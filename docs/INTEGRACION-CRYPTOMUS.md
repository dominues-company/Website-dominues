# Integración Cryptomus (recargas) – Guía y datos a pedir

## Resumen

- **Pago Móvil:** se mantiene igual. El usuario ve datos de la cuenta, paga por su banco y envía al frontend: monto, referencia y opcionalmente comprobante. El backend recibe eso y procesa.
- **Cryptomus:** se añade como segunda opción. El usuario elige monto, el backend crea una factura en Cryptomus y devuelve una URL de pago. El usuario paga en la página de Cryptomus; Cryptomus notifica al backend por webhook y el backend acredita el saldo. El “dato” que llega al sistema es la notificación (webhook), no un formulario manual como en Pago Móvil.

---

## 1. Datos que debes pedir a Cryptomus

Para integrar pagos (recargas) necesitas una **cuenta merchant** en Cryptomus y lo siguiente:

| Dato | Dónde obtenerlo | Uso |
|------|------------------|-----|
| **Merchant UUID** | Panel de Cryptomus → Configuración / API | Header `merchant` en todas las peticiones a la API. |
| **API Key (pagos)** | Panel de Cryptomus → API Keys (clave para *pagos*, no payouts) | Firmar peticiones y, en el backend, crear facturas (invoices). |
| **URL de callback (webhook)** | La defines tú; la configuras en Cryptomus | URL de tu backend que Cryptomus llamará cuando el pago esté pagado o cambie de estado. |

### Cómo obtenerlos (pasos recomendados)

1. Entra a **https://cryptomus.com** → Iniciar sesión / Registrarse.
2. Ve a **Pagos** en el menú y luego al **panel de control** (o sección para comercios/merchant).
3. Crea o configura tu **merchant** y añade tu dominio (ej. `tudominio.com`) para pasar la moderación.
4. En la sección de **API** o **Claves API**:
   - Copia el **Merchant UUID** (Merchant ID).
   - Genera o copia la **API Key** usada para **pagos** (no la de payouts).
5. En la configuración del merchant, configura la **URL de callback** con la ruta de tu backend que recibirá el webhook (ej. `https://tuapi.com/api/recharge/cryptomus/webhook`).

Importante: la **API Key** y el **Merchant UUID** solo deben usarse en el **backend** (nunca en el frontend), para crear la factura y para verificar el webhook.

---

## 2. Flujo de datos: Pago Móvil vs Cryptomus

### Pago Móvil (actual, sin cambios)

1. Frontend muestra datos de cuenta (banco, documento, teléfono).
2. Usuario paga por Pago Móvil en su banco.
3. Usuario rellena en el frontend: **monto**, **número de referencia** y opcionalmente **comprobante**.
4. Frontend envía esos datos al backend (ej. `POST /api/recharge_api`).
5. Backend valida y procesa la recarga (manual o semiautomática).

### Cryptomus (nuevo)

1. Usuario elige “Cryptomus” y pone el **monto** (y moneda si aplica, ej. USD).
2. Frontend llama al backend, ej. `POST /api/recharge/cryptomus/create` con `{ amount, currency }` (y user identificado por sesión/token).
3. Backend:
   - Genera un `order_id` único (ej. `recharge_<user_id>_<timestamp>`).
   - Llama a Cryptomus `POST https://api.cryptomus.com/v1/payment` con: `amount`, `currency`, `order_id`, `url_callback` (webhook), y opcionalmente `url_success`, `url_return`.
   - Guarda en BD: `order_id`, `user_id`, `amount`, `currency`, `uuid` de Cryptomus, estado `pending`.
   - Responde al frontend con la **URL de pago** (ej. `result.url`) y, si quieres, `order_id` y tiempo de expiración.
4. Frontend muestra el botón/enlace “Ir a pagar” que abre la URL de Cryptomus (misma ventana o nueva pestaña).
5. Usuario paga en la página de Cryptomus (elige cripto, red, etc.).
6. Cryptomus envía un **webhook** a tu `url_callback` con el estado del pago (ej. “paid”).
7. Backend recibe el webhook, verifica la firma, actualiza la recarga a “paid” y **acredita el saldo** al usuario.
8. Opcional: el usuario vuelve por `url_success` y el frontend puede mostrar “Pago realizado; tu saldo se actualizará en breve” o hacer un pequeño polling por `order_id` hasta que el backend indique “paid”.

En Cryptomus el “cliente paga y envía datos” se traduce en: el cliente paga en Cryptomus y los datos llegan al backend por **webhook**, no por un formulario de referencia/comprobante como en Pago Móvil. El frontend solo inicia el flujo (monto) y muestra el enlace de pago.

---

## 3. Cambios en el backend (resumen)

- **Variables de entorno** (nunca en el frontend):
  - `CRYPTOMUS_MERCHANT` = Merchant UUID  
  - `CRYPTOMUS_API_KEY` = API Key de pagos  

- **Endpoint crear factura** (ej. `POST /api/recharge/cryptomus/create`):
  - Entrada: `amount`, `currency` (ej. `"USD"`).
  - Generar `order_id` único.
  - Llamar a `POST https://api.cryptomus.com/v1/payment` con headers `merchant` y `sign` (firma según [doc Cryptomus](https://doc.cryptomus.com/merchant-api/request-format)).
  - Guardar en BD recarga pendiente con `order_id`, `user_id`, `amount`, `cryptomus_uuid`, etc.
  - Responder al frontend: `{ url, order_id, expired_at }` (y lo que necesites).

- **Endpoint webhook** (ej. `POST /api/recharge/cryptomus/webhook`):
  - Recibir el body que envía Cryptomus.
  - Verificar firma con tu `CRYPTOMUS_API_KEY`.
  - Si el estado es “paid”, actualizar la recarga y acreditar saldo al usuario.
  - Responder 200 OK para que Cryptomus no reintente en vano.

Documentación de referencia: https://doc.cryptomus.com/ (Creating an invoice, Request format, Payment statuses).

---

## 4. Cambios en el frontend (ya preparados en este repo)

- **Selector de método:** Pestañas o cards “Pago Móvil” y “Cryptomus”. Por defecto puede seguir Pago Móvil.
- **Pago Móvil:** Se deja exactamente como está (mismo formulario y mismo `POST /api/recharge_api`).
- **Cryptomus:**
  - Campos: monto (y moneda si lo expones).
  - Botón “Generar pago” / “Pagar con Cryptomus” que llama a `POST /api/recharge/cryptomus/create`.
  - Se muestra la URL de pago (botón “Ir a pagar” que abre `result.url`) y un texto tipo “Cuando termines de pagar, tu saldo se acreditará automáticamente”.

Con esto tienes las dos opciones disponibles y el flujo “pagar y que los datos lleguen” resuelto: en Pago Móvil por formulario; en Cryptomus por webhook.
