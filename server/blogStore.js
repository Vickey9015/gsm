import { randomUUID } from 'node:crypto'
import { getPool } from './db.js'

export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toIso(value) {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

function mapRow(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content || '',
    coverImage: row.cover_image || '',
    status: row.status,
    publishedAt: toIso(row.published_at),
    updatedAt: toIso(row.updated_at),
    author: row.author || 'GSM Team',
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    seoKeywords: row.seo_keywords || '',
    ogImage: row.og_image || '',
    canonicalUrl: row.canonical_url || '',
    noIndex: Boolean(row.no_index),
  }
}

async function uniqueSlug(base, excludeId = null) {
  let slug = base || 'post'
  let i = 2
  for (;;) {
    const [rows] = await getPool().query(
      excludeId
        ? 'SELECT id FROM blogs WHERE slug = :slug AND id <> :excludeId LIMIT 1'
        : 'SELECT id FROM blogs WHERE slug = :slug LIMIT 1',
      { slug, excludeId },
    )
    if (!rows.length) return slug
    slug = `${base}-${i}`
    i += 1
  }
}

export async function listBlogs() {
  const [rows] = await getPool().query(
    `SELECT * FROM blogs
     ORDER BY COALESCE(updated_at, published_at) DESC`,
  )
  return rows.map(mapRow)
}

export async function getBlog(idOrSlug) {
  const [rows] = await getPool().query(
    `SELECT * FROM blogs
     WHERE id = :idOrSlug OR slug = :idOrSlug
     LIMIT 1`,
    { idOrSlug },
  )
  return mapRow(rows[0])
}

export async function createBlog(input) {
  const now = new Date()
  const status = input.status === 'published' ? 'published' : 'draft'
  const baseSlug = slugify(input.slug || input.title)
  const post = {
    id: randomUUID(),
    title: input.title?.trim() || 'Untitled',
    slug: await uniqueSlug(baseSlug),
    excerpt: input.excerpt || '',
    content: input.content || '',
    coverImage: input.coverImage || '',
    status,
    publishedAt: status === 'published' ? input.publishedAt || now.toISOString() : input.publishedAt || null,
    updatedAt: now.toISOString(),
    author: input.author || 'GSM Team',
    seoTitle: input.seoTitle || '',
    seoDescription: input.seoDescription || '',
    seoKeywords: input.seoKeywords || '',
    ogImage: input.ogImage || '',
    canonicalUrl: input.canonicalUrl || '',
    noIndex: Boolean(input.noIndex),
  }

  await getPool().query(
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
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      status: post.status,
      publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
      updatedAt: new Date(post.updatedAt),
      author: post.author,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      seoKeywords: post.seoKeywords,
      ogImage: post.ogImage,
      canonicalUrl: post.canonicalUrl,
      noIndex: post.noIndex ? 1 : 0,
    },
  )

  return getBlog(post.id)
}

export async function updateBlog(id, input) {
  const existing = await getBlog(id)
  if (!existing) return null

  const now = new Date()
  const nextStatus =
    input.status === 'published' ? 'published' : input.status === 'draft' ? 'draft' : existing.status
  const baseSlug = slugify(input.slug || input.title || existing.slug)

  const updated = {
    ...existing,
    title: input.title !== undefined ? input.title.trim() || existing.title : existing.title,
    slug: await uniqueSlug(baseSlug, id),
    excerpt: input.excerpt !== undefined ? input.excerpt : existing.excerpt,
    content: input.content !== undefined ? input.content : existing.content,
    coverImage: input.coverImage !== undefined ? input.coverImage : existing.coverImage,
    status: nextStatus,
    publishedAt:
      nextStatus === 'published'
        ? existing.publishedAt || input.publishedAt || now.toISOString()
        : existing.publishedAt,
    updatedAt: now.toISOString(),
    author: input.author !== undefined ? input.author : existing.author,
    seoTitle: input.seoTitle !== undefined ? input.seoTitle : existing.seoTitle,
    seoDescription: input.seoDescription !== undefined ? input.seoDescription : existing.seoDescription,
    seoKeywords: input.seoKeywords !== undefined ? input.seoKeywords : existing.seoKeywords,
    ogImage: input.ogImage !== undefined ? input.ogImage : existing.ogImage,
    canonicalUrl: input.canonicalUrl !== undefined ? input.canonicalUrl : existing.canonicalUrl,
    noIndex: input.noIndex !== undefined ? Boolean(input.noIndex) : existing.noIndex,
  }

  await getPool().query(
    `UPDATE blogs SET
      title = :title,
      slug = :slug,
      excerpt = :excerpt,
      content = :content,
      cover_image = :coverImage,
      status = :status,
      published_at = :publishedAt,
      updated_at = :updatedAt,
      author = :author,
      seo_title = :seoTitle,
      seo_description = :seoDescription,
      seo_keywords = :seoKeywords,
      og_image = :ogImage,
      canonical_url = :canonicalUrl,
      no_index = :noIndex
     WHERE id = :id`,
    {
      id,
      title: updated.title,
      slug: updated.slug,
      excerpt: updated.excerpt,
      content: updated.content,
      coverImage: updated.coverImage,
      status: updated.status,
      publishedAt: updated.publishedAt ? new Date(updated.publishedAt) : null,
      updatedAt: new Date(updated.updatedAt),
      author: updated.author,
      seoTitle: updated.seoTitle,
      seoDescription: updated.seoDescription,
      seoKeywords: updated.seoKeywords,
      ogImage: updated.ogImage,
      canonicalUrl: updated.canonicalUrl,
      noIndex: updated.noIndex ? 1 : 0,
    },
  )

  return getBlog(id)
}

export async function deleteBlog(id) {
  const [result] = await getPool().query('DELETE FROM blogs WHERE id = :id', { id })
  return result.affectedRows > 0
}
