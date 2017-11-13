import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/navbar'
import Header from '../components/header'
import About from '../components/about'
import Content from '../components/content'
import Cta from '../components/cta'
import Quote from '../components/quote'
import Benefits from '../components/benefits'
import Logos from '../components/logos'
import SignUpPrompt from '../components/sign-up-prompt'
import Copyright from '../components/copyright'
import Footer from '../components/footer'

class Index extends React.Component {
  render () {
    function checkElementDataExists (Component, node) {
      if (node) {
        return <Component children={node.internal.content} />
      }
    }
    const page = this.props.data.contentfulPage
    const about = checkElementDataExists(About, page.about)
    const quote = checkElementDataExists(Quote, page.quote)
    const content = checkElementDataExists(Content, page.content)

    return (
      <div>
        <Helmet
          title={this.props.data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />
        <Navbar navigation={this.props.data.allContentfulNavigation.edges} />
        <Header
          title={page.title}
          subtitle={page.subtitle}
          image={page.bannerCover.sizes}
        />
        {about}
        {content}
        <Cta
          callToAction={page.callToAction}
          callToActionLink={'/' + page.callToActionLink + '/'}
        />
        {quote}
        <Benefits
          features={page.features.features}
        />
        <Cta
          callToAction={page.callToAction}
          callToActionLink={'/' + page.callToActionLink + '/'}
        />
        <Logos image={page.logos.sizes} />
        <SignUpPrompt />
        <Footer navigation={this.props.data.allContentfulNavigation.edges} />
        <Copyright />
      </div>
    )
  }
}

export default Index

export const query = graphql`
  query IndexQuery($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulNavigation {
      edges {
        node {
          order
          href
          position
          text
        }
      }
    }
    contentfulPage(slug: { eq: $slug } ) {
      slug
      title
      subtitle
      bannerCover{
        file {
          url
        }
        sizes(maxHeight: 600) {
          ...GatsbyContentfulSizes
        }
      }
      content {
        internal {
          content
        }
      }
      about {
        internal {
          content
        }
      }
      quote {
        internal {
          content
        }
      }
      quoteAttribute {
        internal {
          content
        }
      }
      callToAction
      callToActionLink
      features {
        features {
          title
          text
        }
      }
      logos {
        sizes(maxHeight: 600) {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`
