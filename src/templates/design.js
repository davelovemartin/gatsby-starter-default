import React from 'react'
import Backbar from '../components/backbar'
import Footer from '../components/footer'
import Copyright from '../components/copyright'

class DesignPage extends React.Component {
  render () {
    return (
      <div>
        <Backbar />
        {this.props.data.stripeProduct.name}
        <Footer />
        <Copyright />
      </div>
    )
  }
}

export default DesignPage

export const query = graphql`
  query DesignQuery($slug: String!) {
    stripeProduct(slug: { eq: $slug } ) {
      id
      name
      url
      caption
      description
      slug
      images
      skus {
        data {
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
`
