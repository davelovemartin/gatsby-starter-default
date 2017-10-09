import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'
import About from '../components/about'
import Content from '../components/content'
import Cta from '../components/cta'
import Footer from '../components/footer'
import Copyright from '../components/copyright'

class Page extends React.Component {
  render () {
    function checkElementDataExists (Component, node) {
      if (node) {
        return <Component children={node.internal.content} />
      }
    }
    const about = checkElementDataExists(About, this.props.data.contentfulPage.about)
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
          callToActionLink={'/' + this.props.data.contentfulPage.callToActionLink + '.html'}
        />
        <Footer />
        <Copyright />
      </div>
    )
  }
}

export default Page

export const query = graphql`
  query PageQuery($slug: String!) {
    contentfulPage(slug: { eq: $slug } ) {
      slug
      title
      subtitle
      bannerCover{
        file {
          url
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
