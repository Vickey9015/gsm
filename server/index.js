import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createBlogApiHandler } from './blogApi.js'
import { initDb } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT) || 4173
const dist = path.resolve(__dirname, '../dist')

console.log('[boot] cwd=', process.cwd())
console.log('[boot] port=', port)
console.log('[boot] dist=', dist, 'exists=', fs.existsSync(dist))
console.log('[boot] DB_HOST=', process.env.DB_HOST || '(default 127.0.0.1)')
console.log('[boot] DB_NAME=', process.env.DB_NAME || '(missing)')

app.use(express.json({ limit: '2mb' }))

// Always-on ping (even if MySQL is down) to diagnose Hostinger 503s
app.get('/api/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

const blogApi = createBlogApiHandler()
app.use(async (req, res, next) => {
  try {
    const handled = await blogApi(req, res, next)
    if (!handled) next()
  } catch (err) {
    console.error('[api]', err)
    if (!res.headersSent) {
      res.status(500).json({ error: err.message || 'Server error' })
    }
  }
})

if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  // Express 5-safe SPA fallback (no bare "*")
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    if (req.path.startsWith('/api/')) return next()
    res.sendFile(path.join(dist, 'index.html'), (err) => {
      if (err) next(err)
    })
  })
} else {
  app.get('/', (_req, res) => {
    res
      .status(200)
      .send('API is up, but frontend build (dist) is missing. Check postinstall logs.')
  })
}

app.use((err, _req, res, _next) => {
  console.error('[express]', err)
  if (!res.headersSent) {
    res.status(500).json({ error: err.message || 'Server error' })
  }
})

async function connectDbWithRetry() {
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      await initDb()
      return
    } catch (err) {
      console.error(`[db] connect failed (attempt ${attempt}):`, err.message)
      await new Promise((r) => setTimeout(r, 1500 * attempt))
    }
  }
  console.error('[db] still unavailable; /api routes will retry on each request')
}

const server = app.listen(port, () => {
  console.log(`GSM server running on port ${port}`)
  console.log('Health: /api/health')
  connectDbWithRetry()
})

server.on('error', (err) => {
  console.error('[listen] failed:', err.message)
  process.exit(1)
})
