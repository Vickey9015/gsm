export async function uploadImage(file) {
  if (!file) throw new Error('No file selected')
  if (!file.type?.startsWith('image/')) throw new Error('Please choose an image file')
  if (file.size > 5 * 1024 * 1024) throw new Error('Image must be under 5MB')

  const body = new FormData()
  body.append('file', file)

  const res = await fetch('/api/upload', {
    method: 'POST',
    body,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Upload failed (${res.status})`)
  return data.media
}
