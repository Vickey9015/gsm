import 'dotenv/config'
import { createBlogApiHandler } from '../server/blogApi.js'

export function blogApiPlugin() {
  const handler = createBlogApiHandler()

  return {
    name: 'gsm-blog-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handled = await handler(req, res, next)
        if (!handled) next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handled = await handler(req, res, next)
        if (!handled) next()
      })
    },
  }
}
