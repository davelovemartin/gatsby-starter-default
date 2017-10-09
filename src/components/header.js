import React from 'react'
import Logo from './logo.js'
import {
  Banner,
  Heading,
  Subhead
} from 'rebass'

const Header = props => (
  <Banner
    color='white'
    bg='gray7'
    backgroundImage={props.image}
    mb={5}
    >
    <Logo />
    <Heading
      mt={3}
      fontSize={[2, 3, 4]}
      children={props.title}
      center
    />
    <Subhead
      mt={3}
      fontSize={[0, 1, 2]}
      children={props.subtitle}
      center
    />
  </Banner>
)

export default Header
