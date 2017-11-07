import React from 'react'
import Img from 'gatsby-image'
import Navbar from '../components/navbar'
import RowWrapFlex from '../components/row-wrap-flex'
import AltHeader from '../components/alt-header'
import Copyright from '../components/copyright'
import Footer from '../components/footer'
import Helmet from 'react-helmet'

import {
  Box,
  Container,
  Text
} from 'rebass'

var _ = require('lodash')

class Thankyou extends React.Component {
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
          children='Thank You!'
        />
        <Container>
          <RowWrapFlex>
            <Box
              mb={5}
            >
              <Text
                mb={2}
              >
                Your order will be processed and will be with you within 10 days.
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
