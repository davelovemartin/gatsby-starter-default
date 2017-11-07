import React from 'react'
import styled from 'styled-components'
import colors from '../layouts/index.js'
import FooterNav from './footer-nav.js'
import MailingListSignUp from './mailing-list-sign-up.js'

import {
  Box,
  Flex
} from 'rebass'

const Footer = props => (
  <Flex
    wrap
    bg={'black'}
  >
    <Box
      ml={[2, 5, 5]}
      my={[3, 5, 5]}
      w={[ 1, 1 / 2, 1 / 3 ]}
      mr={'auto'}
    >
      <MailingListSignUp />
    </Box>
    <Box
      ml={[2, 5, 5]}
      my={[3, 5, 5]}
      w={[ 1, 1 / 2, 1 / 3 ]}
    >
      <FooterNav navigation={props.navigation} />
    </Box>
  </Flex>
)

export default Footer
