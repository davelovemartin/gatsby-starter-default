import React from 'react'
import RowWrapFlex from './row-wrap-flex'
import Feature from './feature.js'
import {
  Container,
  Subhead
} from 'rebass'

const Benefits = props => (
  <Container
    mt={[5, 5, 5, 6]}
    mb={5}
  >
    <Subhead
      children="It's as easy as 1, 2, 3&hellip;"
      center
      fontSize={[2, 3, 4, 5]}
      mb={5}
    />
    <RowWrapFlex
      wrap
      mx={-3}
      children={props.features.map(feature => <Feature title={feature.title} text={feature.text} />)}
    />
  </Container>
)

export default Benefits
