import React from 'react'
import { navigateTo } from 'gatsby-link'
import CustomButton from './custom-button'

import {
  Box,
  Flex,
  Container
} from 'rebass'

const Cta = props => (
  <Container
    pb={[3, 3, 3, 4]}
    mb={[3, 3, 3, 4]}
  >
    <Flex>
      <Box
        mx='auto'
        pb={[3, 3, 3, 4]}
        mb={[3, 3, 3, 4]}
      >
        <CustomButton
          bg='base'
          fontSize={[1, 2, 3, 4]}
          onClick={() => navigateTo(props.callToActionLink)}
          children={props.callToAction}
        />
      </Box>
    </Flex>
  </Container>
)

export default Cta
