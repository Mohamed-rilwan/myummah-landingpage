/** Public assets under Vite `base` (absolute from site root — safe for Three.js loaders). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`
  return `${base}${clean}`
}
