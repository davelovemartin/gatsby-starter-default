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
    mb={[ 1, 2, 3, 4 ]}
    w={[ 1, 1 / 3, 1 / 3 ]}
  >
    <Subhead
      fontSize={[1, 2, 3, 4]}
      children={props.title}
      color={'blue'}
    />
    <Text
      fontSize={[0, 1, 2, 3]}
      children={props.text}
    />
  </Box>
)

export default Feature
