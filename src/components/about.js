import React from 'react'
import { Element } from 'react-scroll'
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
    mt={[4, 4, 4, 5]}
    pt={[4, 4, 4, 5]}
    pb={[4, 4, 4, 5]}
    mb={[4, 4, 4, 5]}
    w={[320, 540, 720]}
  >
    <Element
      name='about'
    >
      <CustomLead
        fontSize={[1, 2, 3, 4]}
        children={props.children}
      />
    </Element>
  </Container>
)

export default About
