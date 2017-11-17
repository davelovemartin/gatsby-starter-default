import React from 'react'
import Link from 'gatsby-link'
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
        <Link
          to={props.callToActionLink}
        >
          <CustomButton
            bg='base'
            fontSize={[1, 2, 3, 4]}
            children={props.callToAction}
          />
        </Link>
      </Box>
    </Flex>
  </Container>
)

export default Cta
