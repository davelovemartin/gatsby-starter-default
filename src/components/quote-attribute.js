import React from 'react'
import styled from 'styled-components'

import {
  Subhead,
  Container
} from 'rebass'

const CustomSubhead = styled(Subhead)`
  text-align: center;
`

const QuoteAttribute = props => (
  <Container
  >
    <CustomSubhead
      f={[1, 2, 3]}
      p={4}
      children={props.children}
    />
  </Container>
)

export default QuoteAttribute
