import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'
import About from '../components/about'
import Cta from '../components/cta'
import Quote from '../components/quote'
import Benefits from '../components/benefits'
import Logos from '../components/logos'
import Footer from '../components/footer'
import Copyright from '../components/copyright'

const StartPage = ({ data }) => (
  <div>
    <Navbar />
    <Header />
    <About />
    <Cta />
    <Quote />
    <Benefits />
    <Cta />
    <Logos />
    <Footer />
    <Copyright />
  </div>
)

export default StartPage

export const query = graphql`
  query StartQuery {
    allContentfulPage {
      edges {
        node {
          title
          subtitle
          about {
            id
          }
          bannerCover {
            file {
              url
              fileName
              contentType
            }
          }
          callToAction
        }
      }
    }
  }
`
