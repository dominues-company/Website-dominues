/**
 * Restaura el menú móvil y el body tras salir de pantallas full-screen (p. ej. waiting-room).
 */
export function closeMobileNavigation() {
  document.querySelectorAll('.menu.active').forEach((el) => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.header-trigger.active').forEach((el) => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.overlay.active').forEach((el) => {
    el.classList.remove('active');
    el.classList.remove('overlay-color');
  });

  document.body.style.overflow = '';
  document.body.style.pointerEvents = '';
  document.documentElement.style.overflow = '';
}
