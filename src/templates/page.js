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
    const page = this.props.data.contentfulPage
    const about = checkElementDataExists(About, page.about)
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
        // TODO: properly display images / markdown
        // https://www.gatsbyjs.org/packages/gatsby-image/
        // https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/
        // https://www.gatsbyjs.org/packages/gatsby-source-contentful/
        // https://www.gatsbyjs.org/packages/gatsby-remark-images/
        // https://github.com/Rulikkk/gatsby-remark-emoji
        // TODO: add metrics collection https://github.com/viatsko/gatsby-plugin-yandex-metrika
        {content}
        <Cta
          callToAction={page.callToAction}
          callToActionLink={'/' + page.callToActionLink + '.html'}
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
