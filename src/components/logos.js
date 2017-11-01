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
    />
  </Container>
)

export default Logos
