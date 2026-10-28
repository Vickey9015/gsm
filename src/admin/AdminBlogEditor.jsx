import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useBlogs } from '../context/BlogContext'
import { slugify } from '../lib/slugify'

const emptyForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  coverImage: '',
  status: 'draft',
  author: 'GSM Team',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  ogImage: '',
  canonicalUrl: '',
  noIndex: false,
}

export default function AdminBlogEditor() {
  const { id } = useParams()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()
  const { posts, loading, createPost, updatePost } = useBlogs()
  const existing = useMemo(() => (isNew ? null : posts.find((p) => p.id === id) || null), [isNew, posts, id])

  const [form, setForm] = useState(emptyForm)
  const [slugTouched, setSlugTouched] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isNew) {
      setForm(emptyForm)
      setSlugTouched(false)
      return
    }
    if (existing) {
      setForm({
        title: existing.title || '',
        slug: existing.slug || '',
        excerpt: existing.excerpt || '',
        content: existing.content || '',
        coverImage: existing.coverImage || '',
        status: existing.status || 'draft',
        author: existing.author || 'GSM Team',
        seoTitle: existing.seoTitle || '',
        seoDescription: existing.seoDescription || '',
        seoKeywords: existing.seoKeywords || '',
        ogImage: existing.ogImage || '',
        canonicalUrl: existing.canonicalUrl || '',
        noIndex: Boolean(existing.noIndex),
      })
      setSlugTouched(true)
    }
  }, [isNew, existing])

  function updateField(name, value) {
    setForm((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'title' && !slugTouched) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')
    try {
      if (!form.title.trim()) throw new Error('Title is required')
      if (!form.slug.trim()) throw new Error('Slug is required')

      const payload = {
        ...form,
        slug: slugify(form.slug),
        seoTitle: form.seoTitle || form.title,
        seoDescription: form.seoDescription || form.excerpt,
        ogImage: form.ogImage || form.coverImage,
      }

      if (isNew) {
        const post = await createPost(payload)
        setMessage('Post created')
        navigate(`/admin/blogs/${post.id}`, { replace: true })
      } else {
        await updatePost(id, payload)
        setMessage('Post saved')
      }
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (!isNew && loading) {
    return <div className="admin-empty">Loading post…</div>
  }

  if (!isNew && !loading && !existing) {
    return (
      <div className="admin-empty">
        <p>Post not found.</p>
        <Link to="/admin/blogs" className="admin-btn">
          Back to blog list
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>{isNew ? 'New blog post' : 'Edit blog post'}</h1>
          <p>Update content and SEO metadata for search and social sharing.</p>
        </div>
        <Link to="/admin/blogs" className="admin-btn">
          Back to list
        </Link>
      </div>

      {message ? <div className="admin-alert">{message}</div> : null}
      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}

      <form className="admin-editor" onSubmit={handleSubmit}>
        <div className="admin-editor__grid">
          <div className="admin-form">
            <div className="admin-field">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                required
              />
            </div>

            <div className="admin-field">
              <label htmlFor="slug">URL slug</label>
              <input
                id="slug"
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  updateField('slug', e.target.value)
                }}
                required
              />
              <p className="admin-form__hint">Public URL: /blog/{slugify(form.slug) || '…'}</p>
            </div>

            <div className="admin-field">
              <label htmlFor="excerpt">Excerpt</label>
              <textarea
                id="excerpt"
                value={form.excerpt}
                onChange={(e) => updateField('excerpt', e.target.value)}
                rows={3}
              />
            </div>

            <div className="admin-field">
              <label htmlFor="content">Content (HTML supported)</label>
              <textarea
                id="content"
                className="admin-field__content"
                value={form.content}
                onChange={(e) => updateField('content', e.target.value)}
                placeholder="<p>Write your article…</p>"
              />
            </div>

            <div className="admin-field">
              <label htmlFor="coverImage">Cover image URL</label>
              <input
                id="coverImage"
                value={form.coverImage}
                onChange={(e) => updateField('coverImage', e.target.value)}
                placeholder="https://…"
              />
            </div>
          </div>

          <div className="admin-form">
            <div className="admin-field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => updateField('status', e.target.value)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="admin-field">
              <label htmlFor="author">Author</label>
              <input
                id="author"
                value={form.author}
                onChange={(e) => updateField('author', e.target.value)}
              />
            </div>

            <div className="admin-seo">
              <h3>SEO settings</h3>
              <p>These fields control how the article appears in Google and social previews.</p>

              <div className="admin-form">
                <div className="admin-field">
                  <label htmlFor="seoTitle">SEO title</label>
                  <input
                    id="seoTitle"
                    value={form.seoTitle}
                    onChange={(e) => updateField('seoTitle', e.target.value)}
                    placeholder="Defaults to post title"
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="seoDescription">Meta description</label>
                  <textarea
                    id="seoDescription"
                    value={form.seoDescription}
                    onChange={(e) => updateField('seoDescription', e.target.value)}
                    rows={3}
                    placeholder="Defaults to excerpt"
                  />
                  <p className="admin-form__hint">
                    {(form.seoDescription || form.excerpt || '').length}/160 characters recommended
                  </p>
                </div>

                <div className="admin-field">
                  <label htmlFor="seoKeywords">Keywords</label>
                  <input
                    id="seoKeywords"
                    value={form.seoKeywords}
                    onChange={(e) => updateField('seoKeywords', e.target.value)}
                    placeholder="growth strategy, market positioning"
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="ogImage">Open Graph image URL</label>
                  <input
                    id="ogImage"
                    value={form.ogImage}
                    onChange={(e) => updateField('ogImage', e.target.value)}
                    placeholder="Defaults to cover image"
                  />
                </div>

                <div className="admin-field">
                  <label htmlFor="canonicalUrl">Canonical URL</label>
                  <input
                    id="canonicalUrl"
                    value={form.canonicalUrl}
                    onChange={(e) => updateField('canonicalUrl', e.target.value)}
                    placeholder="https://www.consultgsm.com/blog/…"
                  />
                </div>

                <label className="admin-check">
                  <input
                    type="checkbox"
                    checked={form.noIndex}
                    onChange={(e) => updateField('noIndex', e.target.checked)}
                  />
                  Noindex (hide from search engines)
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? 'Saving…' : isNew ? 'Create post' : 'Save changes'}
          </button>
          {!isNew && form.status === 'published' ? (
            <Link to={`/blog/${slugify(form.slug)}`} className="admin-btn" target="_blank" rel="noreferrer">
              Preview live
            </Link>
          ) : null}
        </div>
      </form>
    </>
  )
}
