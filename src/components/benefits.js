import React from 'react'
import {
  Box,
  Container,
  Flex,
  Subhead,
  Text
} from 'rebass'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faRocket,
  faUsers,
  faFlagCheckered
} from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faRocket, faUsers, faFlagCheckered)

const Benefits = props => (
  <Container
    mt={6}
  >
    <Flex
      wrap
      mx={-3}>
      {features.map(feature => (
        <Box
          key={feature.title}
          px={4}
          mb={[ 2, 3, 4 ]}
          w={[ 1, 1 / 3, 1 / 3 ]}
        >
          <Subhead
            f={[2, 3, 4]}
          >
            {feature.title}
          </Subhead>
          <Text f={[1]}>
            {feature.text}
          </Text>
        </Box>
      ))}
    </Flex>
  </Container>
)

const features = [
  {title: 'Launch.', text: 'Upload a design and set up your campaign page in 3 simple steps.'},
  {title: 'Share.', text: 'Share on your social channels and collect pre-orders for a limited period.'},
  {title: 'Get Paid.', text: 'Sell 10 or more t-shirts and we\'ll send them out direct to your buyers and pay you a comission.'}
]

export default Benefits
