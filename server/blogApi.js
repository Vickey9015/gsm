import multer from 'multer'
import {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from './blogStore.js'
import { initDb, pingDb } from './db.js'
import { getMedia, saveMedia } from './mediaStore.js'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (!file.mimetype?.startsWith('image/')) {
      cb(new Error('Only image uploads are allowed'))
      return
    }
    cb(null, true)
  },
})

function sendJson(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

async function readBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  if (!chunks.length) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return null
  }
}

function runUpload(req, res) {
  return new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err) => {
      if (err) reject(err)
      else resolve(req.file || null)
    })
  })
}

export function createBlogApiHandler() {
  let ready = null

  async function ensureReady() {
    if (!ready) ready = initDb()
    return ready
  }

  return async function blogApiHandler(req, res, next) {
    const url = new URL(req.url || '/', 'http://localhost')
    // Let Vite/Express continue for non-API routes (do not call next() here).
    if (!url.pathname.startsWith('/api/')) {
      return false
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return true
    }

    try {
      await ensureReady()

      if (url.pathname === '/api/health') {
        const ok = await pingDb()
        sendJson(res, 200, { ok, database: ok ? 'connected' : 'error' })
        return true
      }

      if (url.pathname === '/api/upload' && req.method === 'POST') {
        const file = await runUpload(req, res)
        if (!file) {
          sendJson(res, 400, { error: 'No image file provided' })
          return true
        }
        const media = await saveMedia({
          filename: file.originalname,
          mime: file.mimetype,
          buffer: file.buffer,
        })
        sendJson(res, 201, { media })
        return true
      }

      if (url.pathname.startsWith('/api/media/') && req.method === 'GET') {
        const id = decodeURIComponent(url.pathname.replace('/api/media/', '').split('/')[0])
        const media = await getMedia(id)
        if (!media) {
          sendJson(res, 404, { error: 'Media not found' })
          return true
        }
        res.statusCode = 200
        res.setHeader('Content-Type', media.mime)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.setHeader('Content-Length', String(media.data.length))
        res.end(media.data)
        return true
      }

      if (!url.pathname.startsWith('/api/blogs')) {
        sendJson(res, 404, { error: 'Not found' })
        return true
      }

      const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean)
      const id = parts.length >= 3 ? decodeURIComponent(parts[2]) : null

      if (req.method === 'GET' && !id) {
        sendJson(res, 200, { posts: await listBlogs() })
        return true
      }

      if (req.method === 'GET' && id) {
        const post = await getBlog(id)
        if (!post) {
          sendJson(res, 404, { error: 'Post not found' })
          return true
        }
        sendJson(res, 200, { post })
        return true
      }

      if (req.method === 'POST' && !id) {
        const body = await readBody(req)
        if (!body || !body.title) {
          sendJson(res, 400, { error: 'Title is required' })
          return true
        }
        const post = await createBlog(body)
        sendJson(res, 201, { post })
        return true
      }

      if ((req.method === 'PUT' || req.method === 'PATCH') && id) {
        const body = await readBody(req)
        if (!body) {
          sendJson(res, 400, { error: 'Invalid JSON body' })
          return true
        }
        const post = await updateBlog(id, body)
        if (!post) {
          sendJson(res, 404, { error: 'Post not found' })
          return true
        }
        sendJson(res, 200, { post })
        return true
      }

      if (req.method === 'DELETE' && id) {
        const ok = await deleteBlog(id)
        if (!ok) {
          sendJson(res, 404, { error: 'Post not found' })
          return true
        }
        sendJson(res, 200, { ok: true })
        return true
      }

      sendJson(res, 405, { error: 'Method not allowed' })
      return true
    } catch (err) {
      console.error('[blog-api]', err)
      sendJson(res, 500, {
        error: err.message || 'Server error',
        hint: 'Check DB_* environment variables and that MySQL is running.',
      })
      return true
    }
  }
}
