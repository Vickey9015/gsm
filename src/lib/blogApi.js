const API = '/api/blogs'

async function request(path = '', options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

export async function fetchPosts() {
  const data = await request('')
  return data.posts || []
}

export async function fetchPost(idOrSlug) {
  const data = await request(`/${encodeURIComponent(idOrSlug)}`)
  return data.post
}

export async function createPost(payload) {
  const data = await request('', { method: 'POST', body: JSON.stringify(payload) })
  return data.post
}

export async function updatePost(id, payload) {
  const data = await request(`/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
  return data.post
}

export async function deletePost(id) {
  return request(`/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
