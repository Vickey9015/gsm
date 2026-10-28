import { Link, useParams } from 'react-router-dom'
import Seo, { SITE_URL } from '../components/Seo'
import { useBlogs } from '../context/BlogContext'
import './Blog.css'

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const { getBySlug, loading } = useBlogs()
  const post = getBySlug(slug)

  if (loading) {
    return (
      <section className="section blog-post">
        <div className="container">
          <p className="blog-index__status">Loading article…</p>
        </div>
      </section>
    )
  }

  if (!post || post.status !== 'published') {
    return (
      <section className="section blog-post">
        <div className="container blog-post__missing">
          <h1>Article not found</h1>
          <p>This post may be unpublished or the link is incorrect.</p>
          <Link to="/blog" className="btn btn--primary">
            Back to blog
          </Link>
        </div>
      </section>
    )
  }

  const seoTitle = post.seoTitle || post.title
  const seoDescription = post.seoDescription || post.excerpt
  const canonical = post.canonicalUrl || `${SITE_URL}/blog/${post.slug}`
  const image = post.ogImage || post.coverImage
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: seoDescription,
    image: image ? [image] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'GSM',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GSM',
      url: SITE_URL,
    },
    mainEntityOfPage: canonical,
  }

  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        keywords={post.seoKeywords}
        canonical={canonical}
        image={image}
        type="article"
        noIndex={post.noIndex}
        jsonLd={jsonLd}
      />

      <article className="blog-post">
        <header className="blog-post__hero">
          <div className="container blog-post__hero-inner">
            <Link to="/blog" className="blog-post__back">
              ← All insights
            </Link>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <h1>{post.title}</h1>
            {post.excerpt ? <p className="blog-post__lead">{post.excerpt}</p> : null}
            {post.author ? <p className="blog-post__author">By {post.author}</p> : null}
          </div>
        </header>

        {post.coverImage ? (
          <div className="container blog-post__cover">
            <img src={post.coverImage} alt="" />
          </div>
        ) : null}

        <div className="container blog-post__content" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="container blog-post__footer">
          <Link to="/contact" className="btn btn--primary">
            Start a conversation
          </Link>
          <Link to="/blog" className="btn btn--ghost">
            More articles
          </Link>
        </div>
      </article>
    </>
  )
}
