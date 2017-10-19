import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'
import About from '../components/about'
import Content from '../components/content'
import Cta from '../components/cta'
import Quote from '../components/quote'
import QuoteAttribute from '../components/quote-attribute'
import IndexSubFooter from '../components/index-sub-footer'
import Footer from '../components/footer'
import Copyright from '../components/copyright'

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
    const quoteAttribute = checkElementDataExists(QuoteAttribute, page.quoteAttribute)
    const content = checkElementDataExists(Content, page.content)

    return (
      <div>
        <Navbar />
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
        {quoteAttribute}
        <IndexSubFooter>
          <Cta
            callToAction={page.callToAction}
            callToActionLink={'/' + page.callToActionLink + '/'}
          />
        </IndexSubFooter>
        <Footer />
        <Copyright />
      </div>
    )
  }
}

export default Index

export const query = graphql`
  query IndexQuery($slug: String!) {
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
    }
  }
`
