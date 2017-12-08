import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Heading
} from 'rebass'

const CustomHeading = styled(Heading)`
  display: inline;
  font-style: italic;
`

const AltHeader = props => (
  <header role='banner'>
    <Container
      py={5}
    >
      <CustomHeading
        children={props.children}
        bg={'blue'}
        color={'white'}
        p={2}
      />
    </Container>
  </header>
)

export default AltHeader
