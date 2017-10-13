import React from 'react'
import {
  Box,
  Flex,
  Sticky,
  Text
} from 'rebass'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faHeart
} from '@fortawesome/fontawesome-free-solid'

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
          color='grey.3'
        >
        MADE WITH <FontAwesomeIcon iconDefinition={faHeart} /> IN BRISTOL &copy; 2017 CALL OF THE BRAVE LIMITED
        </Text>
      </Box>
    </Flex>
  </Sticky>
)

export default Copyright
