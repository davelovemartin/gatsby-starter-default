import React from 'react'
import { withPrefix } from 'gatsby-link'
import CustomHelmet from '../components/helmet'
import Navbar from '../components/navbar'
import Header from '../components/header'
import About from '../components/about'
import Content from '../components/content'
import Cta from '../components/cta'
import Quote from '../components/quote'
import Benefits from '../components/benefits'
import Logos from '../components/logos'
import SignUpPrompt from '../components/sign-up-prompt'
import Copyright from '../components/copyright'
import Footer from '../components/footer'

var _ = require('lodash')

class Index extends React.Component {
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
          location={this.props.location.pathname}
        />
        <Navbar navigation={this.props.data.allContentfulNavigation.edges} />
        {_.chain(this.props.data.allContentfulAsset.edges).filter(['node.id', 'c3vQz6oymeQ6E6SQoeuyiks']).map(({node}) => (
          <Header
            key={node.id}
            title='Wear the change you want to see in the World'
            subtitle='ethical t-shirts // raising money for people affected by unfair fashion'
            image={node.sizes}
          />
        )).value()}
        <About
          children={`Fashion is broken
      a sweatshop industry has become unstitched
      Take a stand against fast-fashion with sweatshop-free
      planet-friendly clothes
      Join the t-shirt revolution…`}
        />
        <Cta
          callToAction='ANSWER THE CALL OF THE BRAVE'
          callToActionLink={'/start/'}
        />
        <Quote
          children={`We're on a mission to empower artists to help people affected by unfair fashion in a way that doesn't cost the Earth`}
        />
        <Benefits
          features={benefits.features}
        />
        <Cta
          callToAction={'ANSWER THE CALL OF THE BRAVE'}
          callToActionLink={'/start/'}
        />
        {
          _.chain(this.props.data.allContentfulAsset.edges).filter(['node.id', 'y7UXz9AmzuYAOUy8KcgIO']).map(({node}) => (
            <Logos
              key={node.id}
              image={node.sizes}
            />
          )).value()
        }
        <SignUpPrompt />
        <Footer navigation={this.props.data.allContentfulNavigation.edges} />
        <Copyright />
      </div>
    )
  }
}

export default Index

const benefits = {
	"features": [
		{
			"text": "Upload a design, set a time-limit, and start your crowdfunding campaign.",
			"title": "1. Launch."
		},
		{
			"text": "Share on your social channels, and collect pre-orders for your design.",
			"title": "2. Share."
		},
		{
			"text": "Sell 10+ t-shirts & we send them out direct to your buyers and pay you.",
			"title": "3. Get Paid."
		}
	]
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        googleSiteVerification
        fbAppId
        twitter
        url
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
