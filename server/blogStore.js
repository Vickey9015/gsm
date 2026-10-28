import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_PATH = path.resolve(__dirname, '../data/blogs.json')
const PUBLIC_PATH = path.resolve(__dirname, '../public/data/blogs.json')

function ensureDirs() {
  for (const file of [DATA_PATH, PUBLIC_PATH]) {
    const dir = path.dirname(file)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  }
}

function readBlogs() {
  ensureDirs()
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, '[]', 'utf8')
  }
  const raw = fs.readFileSync(DATA_PATH, 'utf8')
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeBlogs(blogs) {
  ensureDirs()
  const json = `${JSON.stringify(blogs, null, 2)}\n`
  fs.writeFileSync(DATA_PATH, json, 'utf8')
  fs.writeFileSync(PUBLIC_PATH, json, 'utf8')
  return blogs
}

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function uniqueSlug(blogs, base, excludeId) {
  let slug = base || 'post'
  let i = 2
  while (blogs.some((b) => b.slug === slug && b.id !== excludeId)) {
    slug = `${base}-${i}`
    i += 1
  }
  return slug
}

export function listBlogs() {
  return readBlogs().sort(
    (a, b) => new Date(b.updatedAt || b.publishedAt || 0) - new Date(a.updatedAt || a.publishedAt || 0),
  )
}

export function getBlog(idOrSlug) {
  return readBlogs().find((b) => b.id === idOrSlug || b.slug === idOrSlug) || null
}

export function createBlog(input) {
  const blogs = readBlogs()
  const now = new Date().toISOString()
  const baseSlug = slugify(input.slug || input.title)
  const post = {
    id: randomUUID(),
    title: input.title?.trim() || 'Untitled',
    slug: uniqueSlug(blogs, baseSlug, null),
    excerpt: input.excerpt || '',
    content: input.content || '',
    coverImage: input.coverImage || '',
    status: input.status === 'published' ? 'published' : 'draft',
    publishedAt: input.status === 'published' ? input.publishedAt || now : input.publishedAt || null,
    updatedAt: now,
    author: input.author || 'GSM Team',
    seoTitle: input.seoTitle || '',
    seoDescription: input.seoDescription || '',
    seoKeywords: input.seoKeywords || '',
    ogImage: input.ogImage || '',
    canonicalUrl: input.canonicalUrl || '',
    noIndex: Boolean(input.noIndex),
  }
  blogs.unshift(post)
  writeBlogs(blogs)
  return post
}

export function updateBlog(id, input) {
  const blogs = readBlogs()
  const index = blogs.findIndex((b) => b.id === id)
  if (index === -1) return null

  const existing = blogs[index]
  const now = new Date().toISOString()
  const nextStatus = input.status === 'published' ? 'published' : input.status === 'draft' ? 'draft' : existing.status
  const baseSlug = slugify(input.slug || input.title || existing.slug)

  const updated = {
    ...existing,
    title: input.title !== undefined ? input.title.trim() || existing.title : existing.title,
    slug: uniqueSlug(blogs, baseSlug, id),
    excerpt: input.excerpt !== undefined ? input.excerpt : existing.excerpt,
    content: input.content !== undefined ? input.content : existing.content,
    coverImage: input.coverImage !== undefined ? input.coverImage : existing.coverImage,
    status: nextStatus,
    publishedAt:
      nextStatus === 'published'
        ? existing.publishedAt || input.publishedAt || now
        : existing.publishedAt,
    updatedAt: now,
    author: input.author !== undefined ? input.author : existing.author,
    seoTitle: input.seoTitle !== undefined ? input.seoTitle : existing.seoTitle,
    seoDescription: input.seoDescription !== undefined ? input.seoDescription : existing.seoDescription,
    seoKeywords: input.seoKeywords !== undefined ? input.seoKeywords : existing.seoKeywords,
    ogImage: input.ogImage !== undefined ? input.ogImage : existing.ogImage,
    canonicalUrl: input.canonicalUrl !== undefined ? input.canonicalUrl : existing.canonicalUrl,
    noIndex: input.noIndex !== undefined ? Boolean(input.noIndex) : existing.noIndex,
  }

  blogs[index] = updated
  writeBlogs(blogs)
  return updated
}

export function deleteBlog(id) {
  const blogs = readBlogs()
  const next = blogs.filter((b) => b.id !== id)
  if (next.length === blogs.length) return false
  writeBlogs(next)
  return true
}

export function syncPublicCopy() {
  writeBlogs(readBlogs())
}
