import React from 'react'
import Img from 'gatsby-image'
import Navbar from '../components/navbar'
import RowWrapFlex from '../components/row-wrap-flex'
import AltHeader from '../components/alt-header'
import Copyright from '../components/copyright'
import Footer from '../components/footer'
import CustomHelmet from '../components/helmet'
import SignUpPrompt from '../components/sign-up-prompt'

import {
  Box,
  Container,
  Text
} from 'rebass'

var _ = require('lodash')

class Thankyou extends React.Component {
  constructor ({ props, children, location }) {
    super({ props, children, location })
  }
  render () {
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
        <AltHeader
          children='Thank You!'
        />
        <Container>
          <RowWrapFlex>
            <Box
              mb={5}
              width={'540px'}
            >
              <Text
                mb={2}
              >
                Your order will be processed and should be with you within 10 days.
                </Text>
                <Text
                  mb={2}
                >
                We have sent an email to confirm this but just in case take a note of your order number: {this.props.history.location.state.orderId} and quote this in any correspondence.
              </Text>
              {_.chain(this.props.data.allContentfulAsset.edges).filter(['node.id', 'c6eVLdFcRfUOmAEEgkiOeui']).map(({node}) => (
                <Img
                  key={node.id}
                  sizes={node.sizes}
                  alt={node.title}
                />
              )).value()}
            </Box>
          </RowWrapFlex>
        </Container>
        <SignUpPrompt />
        <Footer navigation={this.props.data.allContentfulNavigation.edges} />
        <Copyright />
      </div>
    )
  }
}

export default Thankyou

export const thankyouPageQuery = graphql`
query ThankyouPageQuery {
  site {
    siteMetadata {
      title
    }
  }
  allContentfulAsset {
    edges {
      node {
        id
        title
        sizes(maxHeight: 600) {
          ...GatsbyContentfulSizes
        }
      }
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
}
`
