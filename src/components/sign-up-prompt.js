import React from 'react'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faShare
} from '@fortawesome/fontawesome-free-solid'
import {
  Container,
  Heading,
  Text
} from 'rebass'

fontawesome.library.add(faShare)

const SignUpPrompt = props => (
  <Container>
    <Heading
      children='Sign up to our Newsletter and get a 10% discount on your first t-shirt!'
      center
      color={'blue'}
      mt={5}
    />
    <Text
      center
      mt={3}
      mb={5}
      color={'blue'}
    >
      <FontAwesomeIcon
        size={'5x'}
        iconDefinition={faShare}
        transform={{ rotate: 140 }}
      />
    </Text>
  </Container>
)
export default SignUpPrompt
