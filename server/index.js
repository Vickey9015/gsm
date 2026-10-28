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

const blogApi = createBlogApiHandler()
app.use(async (req, res, next) => {
  const handled = await blogApi(req, res, next)
  if (!handled) next()
})

if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next()
    res.sendFile(path.join(dist, 'index.html'))
  })
} else {
  app.get('/', (_req, res) => {
    res.status(503).send('Frontend build missing. Check postinstall / vite build logs.')
  })
}

function startListening() {
  return new Promise((resolve) => {
    // Hostinger injects PORT — bind without forcing a host string.
    const server = app.listen(port, () => {
      console.log(`GSM server running on port ${port}`)
      console.log('Admin panel: /admin')
      console.log('Health: /api/health')
      resolve(server)
    })
  })
}

async function connectDbWithRetry() {
  let attempt = 0
  for (;;) {
    attempt += 1
    try {
      await initDb()
      return
    } catch (err) {
      console.error(`[db] connect failed (attempt ${attempt}):`, err.message)
      if (attempt >= 5) {
        console.error('[db] giving up for now; API will keep retrying on request')
        return
      }
      await new Promise((r) => setTimeout(r, 2000 * attempt))
    }
  }
}

await startListening()
connectDbWithRetry()
