import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createBlogApiHandler } from './blogApi.js'
import { initDb } from './db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT) || 4173
const dist = path.resolve(__dirname, '../dist')

app.use(express.json({ limit: '2mb' }))

const blogApi = createBlogApiHandler()
app.use(async (req, res, next) => {
  const handled = await blogApi(req, res, next)
  if (!handled) next()
})

app.use(express.static(dist))
app.get('*', (_req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

async function start() {
  await initDb()
  app.listen(port, '0.0.0.0', () => {
    console.log(`GSM server running on port ${port}`)
    console.log(`Admin panel: /admin`)
    console.log(`Health: /api/health`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err.message)
  process.exit(1)
})
