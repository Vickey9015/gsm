import { randomUUID } from 'node:crypto'
import { getPool } from './db.js'

export async function saveMedia({ filename, mime, buffer }) {
  const id = randomUUID()
  const createdAt = new Date()
  await getPool().query(
    `INSERT INTO media (id, filename, mime, size, data, created_at)
     VALUES (:id, :filename, :mime, :size, :data, :createdAt)`,
    {
      id,
      filename: filename || 'upload',
      mime: mime || 'application/octet-stream',
      size: buffer.length,
      data: buffer,
      createdAt,
    },
  )
  return {
    id,
    filename: filename || 'upload',
    mime,
    size: buffer.length,
    url: `/api/media/${id}`,
    createdAt: createdAt.toISOString(),
  }
}

export async function getMedia(id) {
  const [rows] = await getPool().query(
    `SELECT id, filename, mime, size, data, created_at
     FROM media WHERE id = :id LIMIT 1`,
    { id },
  )
  return rows[0] || null
}
