import React from 'react'
import styled from 'styled-components'
import Feature from './feature.js'
import {
  Container,
  Flex
} from 'rebass'

const CustomFlex = styled(Flex)`
  display: -webkit-flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-align-content: flex-end;
  align-content: flex-end;
`

const Benefits = props => (
  <Container
    mt={6}
  >
    <CustomFlex
      wrap
      mx={-3}
      children={props.features.map(feature => <Feature title={feature.title} text={feature.text} />)}
    />
  </Container>
)

export default Benefits
