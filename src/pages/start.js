import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/navbar'
import AltHeader from '../components/alt-header'
import SignIn from '../components/sign-in'
import Copyright from '../components/copyright'
import Footer from '../components/footer'

import {
  Text
} from 'rebass'

class StartPage extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
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
        <AltHeader
          children='Join the t-shirt revolution'
        />
        <Text>
          Why? There needs to be a section compelling the reader to Join
        </Text>
        {this.props.isAuthenticated
          ? <SignIn />
          : <Text
            children='you signed in'
            />
        }
        <Footer navigation={this.props.data.allContentfulNavigation.edges} />
        <Copyright />
      </div>
    )
  }
}

export default StartPage

export const query = graphql`
  query StartQuery {
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
    allContentfulPage {
      edges {
        node {
          title
          subtitle
          about {
            id
          }
          bannerCover {
            file {
              url
              fileName
              contentType
            }
          }
          callToAction
        }
      }
    }
  }
`
