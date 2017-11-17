import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import Navbar from '../components/navbar'
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

var _ = require('lodash')

class StartPage extends React.Component {
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
            <a
              href='https://twitter.com/callofthebrave'
              target='_blank'
              title='twitter'
            >
              <FontAwesomeIcon
                size={'2x'}
                pack='fab'
                name='twitter'
                transform='shrink-1 left-4'
              />
            </a>
            <a
              href='https://www.facebook.com/callofthebrave/'
              target='_blank'
              title='facebook'
            >
              <FontAwesomeIcon
                size={'2x'}
                pack='fab'
                name='facebook-f'
                transform='shrink-1 left-1'
              />
            </a>
            <a
              href='https://www.instagram.com/callofthebrave/'
              target='_blank'
              title='instagram'
            >
              <FontAwesomeIcon
                size={'2x'}
                pack='fab'
                name='instagram'
                transform='shrink-2 right-3'
              />
            </a>
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
            <a
              href='https://www.callofthebrave.org/images/32x50cm-template.psd'
              children='Download the template'
            />
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
            <a
              href='https://dave22.typeform.com/to/lX93wI'
              target='_blank'
            >
              <CustomButton
                bg='base'
                children='Join us'
                fontSize={4}
              />
            </a>
          </Text>
          {_.chain(this.props.data.allContentfulAsset.edges).filter(['node.id', 'c3TKfjBGHMIIGsOuWWoKcOY']).map(({node}) => (
            <Img
              key={node.id}
              sizes={node.sizes}
              alt={node.title}
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
