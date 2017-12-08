import React from 'react'
import styled from 'styled-components'
import Link, { navigateTo } from 'gatsby-link'
import CustomButton from './custom-button'
import {
  Button,
  Drawer,
  Fixed,
  Flex,
  NavLink,
  Toolbar
} from 'rebass'
import Hide from 'hidden-styled'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faBars
} from '@fortawesome/fontawesome-free-solid'

const _ = require(`lodash`)

const CustomFixed = styled(Fixed)`
  z-index: 2;
`

const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
`

class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }
  render () {
    return (
      <CustomFixed
        width={'100%'}
      >
        <Hide xs>
          <nav role='navigation'>
            <Toolbar
              color='white'
              bg='black'
            >
              <NavLink
                mr='auto'
                is='div'
                fontSize={2}
              >
                <CustomLink
                  to={'/'}
                  children={'Call of the Brave'}
                  color={'white'}
                />
              </NavLink>
              {_.chain(this.props.navigation).filter(['node.position', 'main']).sortBy('node.order').map(({node}) => (
                <NavLink
                  key={node.order}
                  is='div'
                  fontSize={2}
                >
                  <CustomLink
                    to={'/' + node.href + '/'}
                    children={node.text}
                  />
                </NavLink>
              )).value()}
              <CustomButton
                ml={3}
                bg='base'
                fontSize={2}
                onClick={() => navigateTo('/start/')}
                >
                Join Us
              </CustomButton>
            </Toolbar>
          </nav>
        </Hide>
        <Hide sm md lg>
          <Button
            value='Toggle Drawer'
            bg='black'
            onClick={() => this.setState({ open: !this.state.open })}
          >
            <FontAwesomeIcon iconDefinition={faBars} />
          </Button>
          <Drawer
            open={this.state.open}
            onClick={() => this.setState({ open: !this.state.open })}
            position='right'
            p={3}
            color='white'
            bg='black'>
            <nav role='navigation'>
              <Flex
                direction='column'
              >
                <NavLink
                  ml={2}
                  mb={2}
                  is='div'
                  fontSize={2}
                >
                  <CustomLink
                    to={'/'}
                    children={'Call of the Brave'}
                    color={'white'}
                  />
                </NavLink>
                {_.chain(this.props.navigation).filter(['node.position', 'main']).sortBy('node.order').map(({node}) => (
                  <NavLink
                    key={node.order}
                    ml={2}
                    is='div'
                  >
                    <CustomLink
                      to={'/' + node.href + '/'}
                      children={node.text}
                    />
                  </NavLink>
                )).value()}
                <CustomButton
                  mt={4}
                  ml={3}
                  bg='base'
                  fontSize={2}
                  onClick={() => navigateTo('/start/')}
                >
                  Join Us
                </CustomButton>
              </Flex>
            </nav>
          </Drawer>
        </Hide>
      </CustomFixed>
    )
  }
}

export default Navbar
