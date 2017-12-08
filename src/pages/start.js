import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import Navbar from '../components/navbar'
import CustomHelmet from '../components/helmet'
import AltHeader from '../components/alt-header'
import Copyright from '../components/copyright'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

import CustomButton from '../components/custom-button'
import {
  Container,
  Subhead,
  Text
} from 'rebass'

const CustomNav = styled.nav`
  width: 38%;
  margin: 2rem auto;
  display: inline-flex;
  justify-content: space-around;
`

const CustomAnchor = styled.a`
  background-color: #2979c9;
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  color: white;
  cursor: pointer;
  display: inline-block;
  height: 48px;
  line-height: 48px;
  transition-duration: 0.2s;
  transition-timing-function: ease;
  width: 48px;
  &:hover {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  &:active {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px #c92929;
  }
`

var _ = require('lodash')

class StartPage extends React.Component {
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
          location={this.props.location.pathname}
        />
        <Navbar navigation={this.props.data.allContentfulNavigation.edges} />
        <AltHeader
          children='Join the t-shirt revolution'
        />
        <Container
          mb={5}
        >
          <Subhead
            px={5}
            fontSize={3}
            center
            children="We're launching our crowdfunding website Spring '18"
          />
          <Subhead
            px={5}
            fontSize={3}
            center
            mb={3}
          >
            You can join us by:
          </Subhead>
          <Text
            px={5}
            fontSize={3}
            center
            mt={5}
            mb={3}
          >
              Showing your support on Social
          </Text>
          <Text
            px={5}
            center
            mb={3}
          >
              Follow @callofthebrave
          </Text>
          <Text
            px={5}
            center
            mb={3}
          >
            <CustomNav role='navigation'>
              <CustomAnchor
                href='https://twitter.com/callofthebrave'
                target='_blank'
                title='twitter'
              >
                <FontAwesomeIcon
                  size={'2x'}
                  pack='fab'
                  name='twitter'
                  transform='shrink-1 down-2'
                />
              </CustomAnchor>
              <CustomAnchor
                href='https://www.facebook.com/callofthebrave/'
                target='_blank'
                title='facebook'
              >
                <FontAwesomeIcon
                  size={'2x'}
                  pack='fab'
                  name='facebook-f'
                  transform='shrink-1 down-2'
                />
              </CustomAnchor>
              <CustomAnchor
                href='https://www.instagram.com/callofthebrave/'
                target='_blank'
                title='instagram'
              >
                <FontAwesomeIcon
                  size={'2x'}
                  pack='fab'
                  name='instagram'
                  transform='shrink-2 down-2'
                />
              </CustomAnchor>
            </CustomNav>
          </Text>
          <Text
            px={5}
            fontSize={3}
            center
            mb={3}
            mt={5}
          >
              Designing a t-shirt
          </Text>
          <Text
            px={5}
            center
            mb={3}
          >
            Think brave. Positive messaging. Or just a cool design.
          </Text>
          <Text
            px={5}
            center
            mb={3}
          >
          We ask for a 300ppi PNG (to preserve your transparent background). Use RGB colour values when designing your artwork. The maximum printing area is 32cm x 50cm
          </Text>
          <Text
            px={5}
            fontSize={3}
            center
            mb={3}
            mt={5}
          >
              Joining our Call of the Brave Champions
          </Text>
          <Text
            px={5}
            center
            mb={5}
          >
            <CustomButton
              bg='base'
              children='Join us'
              fontSize={4}
              is='a'
              href='https://dave22.typeform.com/to/lX93wI'
              target='_blank'
            />
          </Text>
          {_.chain(this.props.data.allContentfulAsset.edges).filter(['node.id', 'c3TKfjBGHMIIGsOuWWoKcOY']).map(({node}) => (
            <Img
              key={node.id}
              sizes={node.sizes}
              alt={node.description}
            />
          )).value()}
        </Container>
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
    allContentfulAsset {
      edges {
        node {
          id
          title
          description
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
