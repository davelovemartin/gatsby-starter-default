import React from 'react'
import Img from 'gatsby-image'

import {
  Container
} from 'rebass'

const Logos = props => (
  <Container
    my={[5, 5, 6]}
  >
    <Img
      sizes={props.image}
      alt='Logos of the Big Lottery Fund, School for Social Entrepreneurs Fellow and a certified Social Enterprise by Social Enterprise UK'
    />
  </Container>
)

export default Logos
