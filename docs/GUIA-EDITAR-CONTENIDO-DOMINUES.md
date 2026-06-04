# Guía para editar contenido de Dominues (GitHub + Vercel)

**Para:** Administración / marketing de Dominues  
**Objetivo:** Actualizar textos de FAQ, Privacidad, Términos, Juego Responsable y AML sin programar.

> **Nota para quien arma el PDF:** Inserta capturas de pantalla donde dice `[IMAGEN: …]`.

---

## 1. Qué necesitas

- Cuenta de **GitHub** con acceso al repositorio del sitio (`Website-dominues`).
- Navegador (Chrome o Edge recomendado).
- Opcional: app de GitHub en el celular (solo para cambios urgentes).

**No necesitas** instalar programas en tu PC si editas desde la web de GitHub.

---

## 2. Cómo funciona (resumen)

1. Los textos viven en la carpeta **`content/`** del repositorio.
2. Editas un archivo y guardas (**Commit**).
3. **Vercel** detecta el cambio y publica la web sola (2–5 minutos).
4. Recargas `https://dominues.com` con **Ctrl + F5** para ver el cambio.

`[IMAGEN: Diagrama simple: GitHub → Vercel → dominues.com]`

---

## 3. Entrar al repositorio en GitHub

1. Abre [https://github.com](https://github.com) e inicia sesión.
2. Entra al repositorio del sitio (nombre tipo **Website-dominues**).
3. Haz clic en la carpeta **`content`**.

`[IMAGEN: Lista de archivos dentro de content/]`

Archivos que verás:

| Archivo | Qué edita |
|---------|-----------|
| `faq.json` | Preguntas frecuentes |
| `privacy.html` | Privacidad |
| `terms.html` | Términos y condiciones |
| `responsible-gambling.html` | Juego responsable |
| `aml.html` | Política AML |
| `pages.json` | Solo títulos de página (cuidado al editar) |

---

## 4. Editar un archivo (paso a paso)

1. Dentro de `content/`, haz clic en el archivo (ej. `privacy.html`).
2. Clic en el icono del **lápiz** (Edit).
3. Modifica el texto.
4. Arriba, en **Commit changes**:
   - Mensaje sugerido: `Actualizar política de privacidad`
   - Clic en **Commit changes** (botón verde).
5. Espera 2–5 minutos y revisa la página en dominues.com.

`[IMAGEN: Pantalla de edición con botón Commit changes]`

---

## 5. Editar Preguntas frecuentes (`faq.json`)

Este archivo es **JSON**. Reglas importantes:

- Cada pregunta tiene `"q"` (pregunta) y `"a"` (respuesta).
- Las respuestas pueden usar HTML simple: `<strong>`, `<br>`, enlaces `<a href="/terms">`.
- **No borres** comas `,` ni llaves `{` `}`.
- Las comillas del texto deben ser `"` (dobles). Si escribes comillas dentro del texto, usa `\"` o reformula la frase.

Ejemplo de una entrada:

```json
{
  "q": "¿Qué es Dominues?",
  "a": "Texto de la respuesta aquí."
}
```

Columnas:

- **`left`**: preguntas de la columna izquierda.
- **`right`**: preguntas de la columna derecha.

`sectionTitle` y `sectionSubtitle` son el título y subtítulo de la sección.

`[IMAGEN: Ejemplo de faq.json abierto en GitHub]`

---

## 6. Editar páginas legales (archivos `.html`)

Archivos: `privacy.html`, `terms.html`, `responsible-gambling.html`, `aml.html`.

Solo escribe **contenido HTML del cuerpo**, sin `<html>`, `<head>` ni `<body>`.

Etiquetas permitidas:

| Etiqueta | Uso |
|----------|-----|
| `<p>...</p>` | Párrafo |
| `<h2>...</h2>` | Título de sección |
| `<h3>...</h3>` | Subtítulo |
| `<strong>...</strong>` | Negrita |
| `<ul><li>...</li></ul>` | Lista |
| `<a href="/terms" style="color:#FFC827;">...</a>` | Enlace interno |

Ejemplo:

```html
<h2>Nueva sección</h2>
<p>Texto del párrafo con <strong>énfasis</strong>.</p>
```

`[IMAGEN: Ejemplo de terms.html en el editor]`

---

## 7. Cambiar el título de una página legal (`pages.json`)

Solo si necesitas cambiar el título grande que aparece arriba (ej. "Política de Privacidad"):

```json
"privacy": {
  "title": "Política de Privacidad",
  "file": "privacy.html"
}
```

- Puedes cambiar `"title"`.
- **No cambies** `"file"` ni el nombre de la clave (`"privacy"`, `"terms"`, etc.).

---

## 8. Ver los cambios en la web

| Página | URL |
|--------|-----|
| FAQ | https://dominues.com/faq |
| Privacidad | https://dominues.com/privacy |
| Términos | https://dominues.com/terms |
| Juego responsable | https://dominues.com/responsible-gambling |
| AML | https://dominues.com/aml |

Después de publicar: **Ctrl + F5** (recarga forzada).

`[IMAGEN: Página /privacy en el navegador]`

---

## 9. Errores frecuentes y solución

| Problema | Causa | Qué hacer |
|----------|-------|-----------|
| La web no actualiza | Vercel aún despliega | Esperar 5 min, recargar con Ctrl+F5 |
| Página en blanco o error | JSON roto en `faq.json` | Revisar comas y comillas; comparar con versión anterior en GitHub (History) |
| Texto sin formato | HTML mal cerrado | Cada `<p>` debe cerrar con `</p>` |
| Build falla en Vercel | Error de sintaxis | GitHub → pestaña **Actions** o email de Vercel; contactar soporte técnico |

**Recuperar versión anterior:** En GitHub, abre el archivo → **History** → elige commit anterior → **Revert** o copia el contenido viejo.

`[IMAGEN: Pestaña History en GitHub]`

---

## 10. Qué NO debes editar

Para no romper el sitio, **no modifiques** (salvo indicación del equipo técnico):

- Carpetas `src/`, `public/`, `node_modules/`
- Archivos `package.json`, `vue.config.js`, `.env`
- Código `.vue` o `.js`

Solo **`content/`** y esta guía.

---

## 11. Checklist antes de guardar (Commit)

- [ ] Releí ortografía y fechas (ej. "Última actualización").
- [ ] En JSON, validé que hay comas entre objetos.
- [ ] En HTML, cerré todas las etiquetas.
- [ ] Escribí un mensaje de commit claro.
- [ ] Tras 5 min, abrí la URL y comprobé con Ctrl+F5.

---

## 12. Contacto de soporte técnico

Si algo no publica o ves error en Vercel, envía al equipo de desarrollo:

- Captura del error (si hay).
- Qué archivo editaste.
- Hora aproximada del cambio.

---

## Anexo: mapa rápido

```
Website-dominues/
└── content/          ← SOLO EDITA AQUÍ
    ├── faq.json
    ├── privacy.html
    ├── terms.html
    ├── responsible-gambling.html
    ├── aml.html
    └── pages.json
```

**Dominues** — Guía de edición de contenido vía GitHub.
