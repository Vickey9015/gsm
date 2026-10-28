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

export default function AdminDashboard() {
  const { posts, publishedPosts, loading, error } = useBlogs()
  const drafts = posts.filter((p) => p.status !== 'published')
  const recent = [...posts]
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
    .slice(0, 5)

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of site content and blog publishing.</p>
        </div>
        <Link to="/admin/blogs/new" className="admin-btn admin-btn--primary">
          Create blog post
        </Link>
      </div>

      {error ? <div className="admin-alert admin-alert--error">{error}</div> : null}

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__label">Total posts</div>
          <div className="admin-stat__value">{loading ? '—' : posts.length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Published</div>
          <div className="admin-stat__value">{loading ? '—' : publishedPosts.length}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Drafts</div>
          <div className="admin-stat__value">{loading ? '—' : drafts.length}</div>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel__head">
          <h2>Recently updated</h2>
          <Link to="/admin/blogs" className="admin-btn">
            Manage all
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="admin-empty">No blog posts yet. Create your first article.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recent.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <span
                      className={`admin-badge admin-badge--${post.status === 'published' ? 'published' : 'draft'}`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td>{formatDate(post.updatedAt)}</td>
                  <td>
                    <Link to={`/admin/blogs/${post.id}`} className="admin-btn">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
