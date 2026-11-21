/**
 * Static prerendering for the public site.
 *
 * Runs after the client build and the SSR build (see the "build-only" script):
 *   1. renders the Vue app to HTML with vue/server-renderer,
 *   2. injects it into dist/index.html (the client hydrates it),
 *   3. adds preload hints for the self-hosted fonts,
 *   4. writes robots.txt and sitemap.xml for the configured site URL.
 *
 * The result is plain static files: no Node.js server is needed in production.
 */
import { readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const mode = process.env.MODE || 'production'
const env = loadEnv(mode, root, 'VITE_')
const siteUrl = (env.VITE_SITE_URL || 'https://syntekra.com').replace(/\/+$/, '')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const appHtml = await render()

const indexPath = path.join(distDir, 'index.html')
let html = await readFile(indexPath, 'utf8')

const mountPoint = '<div id="app"></div>'
if (!html.includes(mountPoint)) {
  throw new Error(`[prerender] Mount point ${mountPoint} not found in dist/index.html`)
}
html = html.replace(mountPoint, `<div id="app">${appHtml}</div>`)

const assets = await readdir(path.join(distDir, 'assets'))
const fontPreloads = assets
  .filter((file) => file.endsWith('.woff2'))
  .sort()
  .map(
    (file) =>
      `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`,
  )
  .join('\n    ')
html = html.replace('<!--preload-fonts-->', fontPreloads)

await writeFile(indexPath, html)

const today = new Date().toISOString().slice(0, 10)
await writeFile(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
)
await writeFile(
  path.join(distDir, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
)

await rm(ssrDir, { recursive: true, force: true })

console.log(
  `[prerender] dist/index.html prerendered (${(appHtml.length / 1024).toFixed(1)} kB of markup)`,
)
console.log(`[prerender] robots.txt and sitemap.xml written for ${siteUrl}`)

if (!env.VITE_CONTACT_EMAIL && !env.VITE_CONTACT_FORM_ENDPOINT) {
  console.warn(
    '\n\x1b[33m[prerender] WARNING: no contact channel configured.\n' +
      '  Set VITE_CONTACT_EMAIL and/or VITE_CONTACT_FORM_ENDPOINT before deploying (see .env.example).\x1b[0m\n',
  )
}
