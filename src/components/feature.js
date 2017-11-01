import React from 'react'
import {
  Box,
  Subhead,
  Text
} from 'rebass'

const Feature = props => (
  <Box
    key={props.title}
    px={4}
    mb={[ 2, 3, 4 ]}
    w={[ 1, 1 / 3, 1 / 3 ]}
  >
    <Subhead
      f={[2, 3, 4]}
      children={props.title}
    />
    <Text
      f={[1]}
      children={props.text}
    />
  </Box>
)

export default Feature
