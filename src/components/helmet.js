import React from 'react'
import Helmet from 'react-helmet'

const CustomHelmet = props => (
  <Helmet
    title={props.title}
    htmlAttributes={{ lang: 'en' }}
    meta={[
      { name: 'description', content: props.description },
      { name: 'google-site-verification', content: props.googleSiteVerification },
      { property: 'fb:app_id', content: props.fbAppId },
      { property: 'og:url', content: props.url },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: props.title },
      { property: 'og:description', content: props.description },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image', content: props.facebookImage },
      { property: 'og:image:url', content: props.facebookImage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: props.twitter },
      { name: 'twitter:title', content: props.title },
      { name: 'twitter:description', content: props.description },
      { name: 'twitter:image', content: props.preview }
    ]}
    link={[
      { rel: 'alternate', href: props.location, hreflang: 'en-uk' },
      { rel: 'canonical', href: props.location },
      { rel: 'shortcut icon', href: 'https://www.callofthebrave.org/images/touch/favicon.ico' }
    ]}
  >
    <script type='application/ld+json'>{`
      '@context': 'http://schema.org',
      '@type': 'Organization',
      'name' : 'Call of the Brave',
      'url': 'https://www.callofthebrave.org',
      'logo': 'https://www.callofthebrave.org/images/logo.png',
      'sameAs' : [
        'http://www.facebook.com/callofthebrave',
        'http://www.twitter.com/callofthebrave',
        'http://plus.google.com/callofthebrave'
      ]
    `}</script>
  </Helmet>
)

export default CustomHelmet
