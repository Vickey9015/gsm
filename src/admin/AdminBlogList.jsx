import { Link } from 'react-router-dom'
import { useBlogs } from '../context/BlogContext'

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function AdminBlogList() {
  const { posts, loading, error, removePost } = useBlogs()

  async function handleDelete(post) {
    const ok = window.confirm(`Delete “${post.title}”? This cannot be undone.`)
    if (!ok) return
    try {
      await removePost(post.id)
    } catch (err) {
      window.alert(err.message || 'Failed to delete')
    }
  }

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Blog</h1>
          <p>Create, edit, and publish SEO-ready articles.</p>
        </div>
        <Link to="/admin/blogs/new" className="admin-btn admin-btn--primary">
          New post
        </Link>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}

      <div className="admin-panel">
        <div className="admin-panel__head">
          <h2>All posts</h2>
          <Link to="/blog" className="admin-btn" target="_blank" rel="noreferrer">
            Open public blog
          </Link>
        </div>

        {loading ? <div className="admin-empty">Loading…</div> : null}

        {!loading && posts.length === 0 ? (
          <div className="admin-empty">No posts yet.</div>
        ) : null}

        {!loading && posts.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <strong>{post.title}</strong>
                    {post.seoTitle ? (
                      <div className="admin-form__hint">SEO: {post.seoTitle}</div>
                    ) : null}
                  </td>
                  <td>
                    <code>/{post.slug}</code>
                  </td>
                  <td>
                    <span
                      className={`admin-badge admin-badge--${post.status === 'published' ? 'published' : 'draft'}`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td>{formatDate(post.updatedAt)}</td>
                  <td>
                    <div className="admin-row-actions">
                      <Link to={`/admin/blogs/${post.id}`} className="admin-btn">
                        Edit
                      </Link>
                      {post.status === 'published' ? (
                        <Link
                          to={`/blog/${post.slug}`}
                          className="admin-btn"
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </Link>
                      ) : null}
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleDelete(post)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </>
  )
}
