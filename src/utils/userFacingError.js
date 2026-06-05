const TECHNICAL_PATTERN = /SQLSTATE|Integrity constraint|Prepared statement|Connection:\s*mysql|`[a-z_]+`|delete from|insert into|update `|select \*|stack trace|PDOException/i;

export function sanitizeApiMessage(message, fallback = 'Ocurrió un error. Intenta de nuevo en unos segundos.') {
  if (!message || typeof message !== 'string') {
    return fallback;
  }

  const trimmed = message.trim();
  if (!trimmed || TECHNICAL_PATTERN.test(trimmed) || trimmed.length > 220) {
    return fallback;
  }

  return trimmed;
}
