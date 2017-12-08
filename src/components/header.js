import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import ScrollLink from './scroll-link'
import Logo from './logo'
import {
  Absolute,
  Heading,
  Subhead
} from 'rebass'

const CustomHeading = styled(Heading)`
  width: fit-content;
  margin: 1rem auto;
`
const CustomSubhead = styled(Subhead)`
  width: fit-content;
  margin: 1rem auto;
`

const CustomImg = styled(Img)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 96px;
  z-index: -99;
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
  <header role='banner'
  >
    <CustomImg
      sizes={props.image}
      alt=''
    />
    <Absolute
      top
      left={0}
      right={0}
      pt={[0, 4, 5, 5]}
      width={'100%'}
    >
      <Logo />
      <div
        width='100%'
      >
        <CustomHeading
          fontSize={[1, 2, 3, 4]}
          children={props.title}
          color={'white'}
          bg={'black'}
          center
          is='h1'
          p={1}
        />
      </div>
      <div
        width='100%'
      >
        <CustomSubhead
          mt={[0, 1, 2, 3]}
          fontSize={[0, 1, 2, 3]}
          color={'white'}
          children={props.subtitle}
          bg={'black'}
          center
          is='h2'
          p={1}
        />
      </div>
      <P>
        <ScrollLink
          activeClass='active'
          delay={200}
          duration={500}
          offset={-110}
          smooth
          to='about'
        />
      </P>
    </Absolute>
  </header>
)

export default Header
