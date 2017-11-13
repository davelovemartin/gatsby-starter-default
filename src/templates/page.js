import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/navbar'
import Header from '../components/header'
import About from '../components/about'
import Content from '../components/content'
import Cta from '../components/cta'
import SignUpPrompt from '../components/sign-up-prompt'
import Copyright from '../components/copyright'
import Footer from '../components/footer'

class Page extends React.Component {
  render () {
    function checkElementDataExists (Component, node) {
      if (node) {
        return <Component children={node.internal.content} />
      }
    }
    const page = this.props.data.contentfulPage
    const about = checkElementDataExists(About, page.about)
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
        <SignUpPrompt />
        <Footer navigation={this.props.data.allContentfulNavigation.edges} />
        <Copyright />
      </div>
    )
  }
}

export default Page

export const query = graphql`
  query PageQuery($slug: String!) {
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
      about {
        internal {
          content
        }
      }
      content {
        internal {
          content
        }
      }
      callToAction
      callToActionLink
    }
  }
`
