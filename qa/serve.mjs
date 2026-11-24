// Local static server that behaves like GitHub Pages: gzip, 10-minute cache, nested index.html, 404.html.
import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import { gzipSync } from 'node:zlib'
const root = new URL('../dist/', import.meta.url).pathname
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' }
createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  let f = join(root, p)
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, 'index.html')
  let status = 200
  if (!existsSync(f)) { f = join(root, '404.html'); status = 404 }
  const type = types[extname(f)] ?? 'application/octet-stream'
  let body = readFileSync(f)
  const headers = { 'content-type': type, 'cache-control': 'max-age=600' }
  if (/text|javascript|json|svg|xml|manifest/.test(type) && /gzip/.test(req.headers['accept-encoding'] ?? '')) { body = gzipSync(body); headers['content-encoding'] = 'gzip' }
  res.writeHead(status, headers).end(body)
}).listen(4174, '127.0.0.1', () => console.log('serving dist on http://127.0.0.1:4174'))
