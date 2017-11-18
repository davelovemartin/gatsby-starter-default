import React from 'react'
import { withPrefix } from 'gatsby-link'
import CustomHelmet from '../components/helmet'
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
  constructor ({ props, children, location }) {
    super({ props, children, location })
  }
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
        <CustomHelmet
          title={this.props.data.site.siteMetadata.title}
          description={this.props.data.site.siteMetadata.description}
          googleSiteVerification={this.props.data.site.siteMetadata.googleSiteVerification}
          fbAppId={this.props.data.site.siteMetadata.fbAppId}
          url={this.props.data.site.siteMetadata.url}
          facebookImage={'https://www.callofthebrave.org/images/dave/call-of-the-brave-1st-edition/facebook-image.jpg'}
          twitter={this.props.data.site.siteMetadata.twitter}
          preview={'https://www.callofthebrave.org/images/dave/call-of-the-brave-1st-edition/preview.jpg'}
          location={location.pathname}
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
        description
        googleSiteVerification
        fbAppId
        twitter
        url
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
