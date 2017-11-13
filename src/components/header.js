import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Link } from 'react-scroll'
import Logo from './logo.js'
import {
  Absolute,
  Button,
  Heading,
  Subhead
} from 'rebass'

const CustomImg = styled(Img)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 96px;
  z-index: -99
`
const P = styled.p`
  margin-top: 96px;
  text-align: center;
  @media (max-width: 64em) {
    margin-top: 48px;
  }
  @media (max-width: 48em) {
    margin-top: 24px;
  }
`

const Header = props => (
  <div
  >
    <CustomImg
      sizes={props.image}
    />
    <Absolute
      top
      left={0}
      right={0}
      pt={[0, 4, 5, 5]}
      width={'100%'}
    >
      <Logo />
      <Heading
        fontSize={[1, 2, 3, 4]}
        children={props.title}
        color={'white'}
        center
      />
      <Subhead
        mt={[0, 1, 2, 3]}
        fontSize={[0, 1, 2, 3]}
        color={'white'}
        children={props.subtitle}
        center
      />
      <P>
        <Link activeClass='active'
          to='about'
          smooth
          offset={-110}
          duration={500}
          delay={200}
        >
          <Button
            fontSize={[0, 1, 2, 3]}
            children='read more'
            bg={'base'}
          />
        </Link>
      </P>
    </Absolute>
  </div>
)

export default Header
