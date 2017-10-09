import React from 'react'
import styled from 'styled-components'

import {
  Blockquote,
  Container
} from 'rebass'

const CustomBlockquote = styled(Blockquote)`
  text-align: center;
`

const Quote = props => (
  <Container
  >
    <CustomBlockquote
      f={[2, 3, 4]}
      p={4}
      color={'blue.5'}
      children={props.children}
    />
  </Container>
)

export default Quote
