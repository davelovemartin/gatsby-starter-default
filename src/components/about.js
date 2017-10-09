import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Lead
} from 'rebass'

const CustomLead = styled(Lead)`
  white-space:pre-wrap;
`

const About = props => (
  <Container
    mb={5}
    w={[320, 540, 720]}
  >
    <CustomLead
      f={[1, 2, 3]}
      children={props.children}
    />
  </Container>
)

export default About
