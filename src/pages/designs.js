import React from 'react'
import Navbar from '../components/navbar'
import AltHeader from '../components/alt-header'
import styled from 'styled-components'
import Link from 'gatsby-link'
import Copyright from '../components/copyright'
import Footer from '../components/footer'
import Helmet from 'react-helmet'

import {
  BackgroundImage,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Subhead
} from 'rebass'

const CustomCard = styled(Card)`
  box-shadow: none;
`
const CustomFlex = styled(Flex)`
  display: -webkit-flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-content: flex-end;
  align-content: flex-end;
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
          title={this.props.data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />
        <Navbar navigation={this.props.data.allContentfulNavigation.edges} />
        <AltHeader
          children='On Demand Shop'
        />
        <Container>
          <CustomFlex>
          {designs.allStripeProduct.edges.map(({ node }) => (
            <Box
              mb={3}
              width={'320px'}
            >
              <CustomLink
                to={'/designs/' + node.slug}
              >
                <CustomCard
                  key={node.id}
                >
                  <BackgroundImage
                    ratio={1}
                    src={node.images}
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
          </CustomFlex>
        </Container>
        <Footer navigation={this.props.data.allContentfulNavigation.edges} />
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
              size
              artist
              age
              brand
              style
              colour
              gender
              material
            }
          }
        }
      }
    }
  }
}
`
