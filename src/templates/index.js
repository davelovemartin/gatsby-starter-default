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
    const about = checkElementDataExists(About, this.props.data.contentfulPage.about)
    const quote = checkElementDataExists(Quote, this.props.data.contentfulPage.quote)
    const quoteAttribute = checkElementDataExists(QuoteAttribute, this.props.data.contentfulPage.quoteAttribute)
    const content = checkElementDataExists(Content, this.props.data.contentfulPage.content)

    return (
      <div>
        <Navbar />
        <Header
          title={this.props.data.contentfulPage.title}
          subtitle={this.props.data.contentfulPage.subtitle}
          image={this.props.data.contentfulPage.bannerCover.file.url}
        />
        {about}
        {content}
        <Cta
          callToAction={this.props.data.contentfulPage.callToAction}
          callToActionLink={'/' + this.props.data.contentfulPage.callToActionLink + '/'}
        />
        {quote}
        {quoteAttribute}
        <IndexSubFooter>
          <Cta
            callToAction={this.props.data.contentfulPage.callToAction}
            callToActionLink={'/' + this.props.data.contentfulPage.callToActionLink + '/'}
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
