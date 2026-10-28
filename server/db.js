import 'dotenv/config'
import mysql from 'mysql2/promise'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let pool = null
let readyPromise = null

function requiredEnv(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getDbConfig() {
  // Hostinger Node must use 127.0.0.1 — "localhost" resolves to ::1 and is denied.
  const host = requiredEnv('DB_HOST', '127.0.0.1')
  return {
    host: host === 'localhost' ? '127.0.0.1' : host,
    port: Number(requiredEnv('DB_PORT', '3306')),
    user: requiredEnv('DB_USER', 'gsm'),
    password: requiredEnv('DB_PASSWORD', 'gsm'),
    database: requiredEnv('DB_NAME', 'gsm'),
    waitForConnections: true,
    connectionLimit: 3,
    connectTimeout: 10000,
    namedPlaceholders: true,
    timezone: 'Z',
  }
}

export function getPool() {
  if (!pool) {
    throw new Error('Database is not initialized. Call initDb() first.')
  }
  return pool
}

async function createSchema(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS blogs (
      id CHAR(36) NOT NULL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      excerpt TEXT NULL,
      content LONGTEXT NULL,
      cover_image VARCHAR(1000) NULL,
      status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
      published_at DATETIME(3) NULL,
      updated_at DATETIME(3) NOT NULL,
      author VARCHAR(255) NULL,
      seo_title VARCHAR(255) NULL,
      seo_description VARCHAR(500) NULL,
      seo_keywords VARCHAR(500) NULL,
      og_image VARCHAR(1000) NULL,
      canonical_url VARCHAR(1000) NULL,
      no_index TINYINT(1) NOT NULL DEFAULT 0,
      UNIQUE KEY uq_blogs_slug (slug),
      KEY idx_blogs_status_updated (status, updated_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)

  await connection.query(`
    CREATE TABLE IF NOT EXISTS media (
      id CHAR(36) NOT NULL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL,
      mime VARCHAR(120) NOT NULL,
      size INT NOT NULL DEFAULT 0,
      data LONGBLOB NOT NULL,
      created_at DATETIME(3) NOT NULL,
      KEY idx_media_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `)
}

async function seedIfEmpty(connection) {
  const [rows] = await connection.query('SELECT COUNT(*) AS count FROM blogs')
  if (Number(rows[0].count) > 0) return

  const seedPath = path.resolve(__dirname, '../data/blogs.json')
  if (!fs.existsSync(seedPath)) return

  const posts = JSON.parse(fs.readFileSync(seedPath, 'utf8'))
  if (!Array.isArray(posts) || posts.length === 0) return

  for (const post of posts) {
    await connection.query(
      `INSERT INTO blogs (
        id, title, slug, excerpt, content, cover_image, status,
        published_at, updated_at, author, seo_title, seo_description,
        seo_keywords, og_image, canonical_url, no_index
      ) VALUES (
        :id, :title, :slug, :excerpt, :content, :coverImage, :status,
        :publishedAt, :updatedAt, :author, :seoTitle, :seoDescription,
        :seoKeywords, :ogImage, :canonicalUrl, :noIndex
      )`,
      {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        content: post.content || '',
        coverImage: post.coverImage || '',
        status: post.status === 'published' ? 'published' : 'draft',
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
        updatedAt: new Date(post.updatedAt || post.publishedAt || Date.now()),
        author: post.author || 'GSM Team',
        seoTitle: post.seoTitle || '',
        seoDescription: post.seoDescription || '',
        seoKeywords: post.seoKeywords || '',
        ogImage: post.ogImage || '',
        canonicalUrl: post.canonicalUrl || '',
        noIndex: post.noIndex ? 1 : 0,
      },
    )
  }

  console.log(`Seeded ${posts.length} blog post(s) into MySQL`)
}

export async function initDb() {
  if (readyPromise) return readyPromise

  readyPromise = (async () => {
    const config = getDbConfig()
    pool = mysql.createPool(config)

    const connection = await pool.getConnection()
    try {
      await createSchema(connection)
      await seedIfEmpty(connection)
      console.log(`MySQL connected: ${config.user}@${config.host}:${config.port}/${config.database}`)
    } finally {
      connection.release()
    }

    return pool
  })().catch((err) => {
    readyPromise = null
    pool = null
    throw err
  })

  return readyPromise
}

export async function pingDb() {
  const [rows] = await getPool().query('SELECT 1 AS ok')
  return rows[0]?.ok === 1
}
