import React from 'react'
import styled from 'styled-components'

import {
  Banner,
  Blockquote,
  Container
} from 'rebass'

const CustomBlockquote = styled(Blockquote)`
  text-align: center;
`

const Quote = props => (
  <Banner
    bg={'blue5'}
    my={5}
  >
    <Container
    >
      <CustomBlockquote
        fontSize={[2, 3, 4, 5]}
        p={[0, 1, 2, 3]}
        color={'white'}
        children={props.children}
      />
    </Container>
  </Banner>
)

export default Quote
