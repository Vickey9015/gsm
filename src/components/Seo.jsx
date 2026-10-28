import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'GSM — Growth Strategy Management'
const SITE_URL = 'https://www.consultgsm.com'
const DEFAULT_DESCRIPTION =
  'GSM — Growth Strategy Management. Strategic growth consultancy helping businesses scale through positioning, strategy, and structured market leadership.'

export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  image,
  type = 'website',
  noIndex = false,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | GSM` : SITE_NAME
  const pageUrl = canonical || (typeof window !== 'undefined' ? window.location.href : SITE_URL)
  const ogImage = image || `${SITE_URL}/favicon.svg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow" />}
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="GSM" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  )
}

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION }
