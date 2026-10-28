import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ScrollReveal from '../components/ScrollReveal'
import Seo from '../components/Seo'
import { useBlogs } from '../context/BlogContext'
import { siteImages } from '../data/images'
import './Blog.css'

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Blog() {
  const { publishedPosts, loading, error } = useBlogs()

  return (
    <>
      <Seo
        title="Insights & Growth Strategy Blog"
        description="GSM insights on growth strategy, market positioning, acquisition systems, and structured market leadership."
        keywords="GSM blog, growth strategy, market positioning, business consulting insights"
        canonical="https://www.consultgsm.com/blog"
      />

      <PageHero
        variant="card"
        eyebrow="Blog"
        title="Insights for structured growth"
        lead="Practical perspectives on positioning, acquisition, and scaling with discipline — written for operators and leadership teams."
        image={siteImages.pageHero.about}
        imageAlt="Strategic growth insights"
      />

      <section className="section blog-index">
        <div className="container">
          {loading ? <p className="blog-index__status">Loading articles…</p> : null}
          {error ? <p className="blog-index__status blog-index__status--error">{error}</p> : null}

          {!loading && !error && publishedPosts.length === 0 ? (
            <p className="blog-index__status">No published articles yet. Check back soon.</p>
          ) : null}

          <div className="blog-index__grid">
            {publishedPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.05}>
                <article className="blog-card">
                  {post.coverImage ? (
                    <Link to={`/blog/${post.slug}`} className="blog-card__media">
                      <img src={post.coverImage} alt="" loading="lazy" />
                    </Link>
                  ) : null}
                  <div className="blog-card__body">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    <h2>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="blog-card__link">
                      Read article →
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
