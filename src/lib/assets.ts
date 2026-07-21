/** Resolve public/ assets for both local (`/`) and GitHub Pages (`./` or `/repo/`). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  const base = import.meta.env.BASE_URL || './'
  return `${base}${clean}`
}
