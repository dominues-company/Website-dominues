import pagesMeta from '../../content/pages.json';

export function getPageMeta(contentKey) {
  return pagesMeta[contentKey] || null;
}

export async function loadHtmlContent(filename) {
  const base = process.env.BASE_URL || '/';
  const url = `${base}content/${filename}`.replace(/\/+/g, '/');
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`No se pudo cargar el contenido (${response.status})`);
  }

  return response.text();
}
