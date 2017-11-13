import React from 'react'
import Link from 'gatsby-link'
import Navbar from '../components/navbar'
import AltHeader from '../components/alt-header'
import styled from 'styled-components'
import Copyright from '../components/copyright'
import Footer from '../components/footer'
import Helmet from 'react-helmet'
import RowWrapFlex from '../components/row-wrap-flex'
import SignUpPrompt from '../components/sign-up-prompt'

import {
  BackgroundImage,
  Box,
  Card,
  Container,
  Subhead
} from 'rebass'

const CustomCard = styled(Card)`
  box-shadow: none;
`

const CustomLink = styled(Link)`
  text-decoration: none;
`

class Designs extends React.Component {
  render () {
    const designs = this.props.data
    return (
      <div>
        <Helmet
          title={designs.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />
        <Navbar navigation={designs.allContentfulNavigation.edges} />
        <AltHeader
          children='On Demand Shop'
        />
        <Container>
          <RowWrapFlex>
          {designs.allStripeProduct.edges.map(({ node }) => (
            <Box
              mb={3}
              width={'320px'}
              key={node.id}
            >
              <CustomLink
                to={'/designs/' + node.slug}
              >
                <CustomCard>
                  <BackgroundImage
                    ratio={1}
                    src={node.images[0]}
                  />
                  <Subhead
                    pt={2}
                    center
                    fontSize={1}
                    children={node.name + ' // ' + node.skus.data[0].attributes.artist}
                  />
                </CustomCard>
              </CustomLink>
            </Box>
          ))}
          </RowWrapFlex>
        </Container>
        <SignUpPrompt />
        <Footer navigation={designs.allContentfulNavigation.edges} />
        <Copyright />
      </div>
    )
  }
}

export default Designs

export const designsQuery = graphql`
query DesignsQuery {
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
  allStripeProduct {
    edges {
      node {
        id
        name
        url
        caption
        description
        slug
        images
        skus {
          data {
            id
            price
            image
            attributes {
              artist
              colour
              size
              style
            }
          }
        }
      }
    }
  }
}
`
