import React from 'react'
import {
  Box,
  Flex,
  Sticky,
  Text
} from 'rebass'

const Copyright = props => (
  <Sticky bottom>
    <Flex
      bg='jet'
    >
      <Box
        m='auto'
      >
        <Text
          p={2}
          f={0}
          center
          children='MADE WITH ❤️ IN BRISTOL © 2017 CALL OF THE BRAVE LIMITED'
          color='grey.3'
        />
      </Box>
    </Flex>
  </Sticky>
)

export default Copyright
