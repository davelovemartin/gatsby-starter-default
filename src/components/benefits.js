import React from 'react'
import styled from 'styled-components'
import RowWrapFlex from './row-wrap-flex'
import Feature from './feature.js'
import {
  Container,
  Flex
} from 'rebass'

const Benefits = props => (
  <Container
    mt={6}
  >
    <RowWrapFlex
      wrap
      mx={-3}
      children={props.features.map(feature => <Feature title={feature.title} text={feature.text} />)}
    />
  </Container>
)

export default Benefits
