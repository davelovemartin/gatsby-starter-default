import React from 'react'
import styled from 'styled-components'

import {
  Box,
  Flex,
  Text
} from 'rebass'

const CustomText = styled(Text)`
  white-space: pre-wrap;
  letter-spacing: 1px;
`

const Content = props => (
  <Flex>
    <Box
      mx='auto'
      mb={5}
      w={[320, 540, 640]}
    >
      <CustomText
        f={2}
        children={props.children}
      />
    </Box>
  </Flex>
)

export default Content
