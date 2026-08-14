export const CLIENT_ACCESS_DENIED_MESSAGE =
  'Los usuarios administrativos no pueden acceder al panel de cliente. Ingresa desde el panel administrativo.';

export function isClientUser(user) {
  const role = String(user?.rol ?? user?.role ?? '').trim().toLowerCase();
  return role === 'client' || role === 'cliente';
}

export function clearClientSession() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
  localStorage.removeItem('last_activity_timestamp');
}
