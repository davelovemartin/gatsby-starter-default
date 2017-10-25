import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Copyright from '../components/copyright'
import styled from 'styled-components'
import Link from 'gatsby-link'
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

const CustomHeading = styled(Heading)`
  display: inline;
  font-style: italic;
`

const CustomLink = styled(Link)`
  text-decoration: none;
`

class Designs extends React.Component {
  render () {
    const designs = this.props.data
    return (
      <div>
        <Navbar />
        <Container
          py={5}
        >
          <CustomHeading
            children={'On Demand Shop'}
            bg={'blue'}
            color={'white'}
            p={2}
          />
        </Container>
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
        <Footer />
        <Copyright />
      </div>
    )
  }
}

export default Designs

export const designsQuery = graphql`
query DesignsQuery {
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
