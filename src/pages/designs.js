import React from 'react'
import Link from 'gatsby-link'
import Navbar from '../components/navbar'
import AltHeader from '../components/alt-header'
import styled from 'styled-components'
import Copyright from '../components/copyright'
import Footer from '../components/footer'
import CustomHelmet from '../components/helmet'
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
        <CustomHelmet
          title={this.props.data.site.siteMetadata.title}
          description={this.props.data.site.siteMetadata.description}
          googleSiteVerification={this.props.data.site.siteMetadata.googleSiteVerification}
          fbAppId={this.props.data.site.siteMetadata.fbAppId}
          url={this.props.data.site.siteMetadata.url}
          facebookImage={'https://www.callofthebrave.org/images/dave/call-of-the-brave-1st-edition/facebook-image.jpg'}
          twitter={this.props.data.site.siteMetadata.twitter}
          preview={'https://www.callofthebrave.org/images/dave/call-of-the-brave-1st-edition/preview.jpg'}
          location={this.props.location.pathname}
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
                      alt={'Mock up of ' + node.name + ' designed by ' + node.skus.data[0].attributes.artist}
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
