import {
  listBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from './blogStore.js'
import { initDb, pingDb } from './db.js'

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

export function createBlogApiHandler() {
  let ready = null

  async function ensureReady() {
    if (!ready) ready = initDb()
    return ready
  }

  return async function blogApiHandler(req, res, next) {
    const url = new URL(req.url || '/', 'http://localhost')
    if (!url.pathname.startsWith('/api/')) {
      if (typeof next === 'function') return next()
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
