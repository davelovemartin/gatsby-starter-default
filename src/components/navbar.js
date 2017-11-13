import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
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
                to={'/index/'}
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
            <Button
              ml={3}
              bg='base'
              fontSize={2}
              >
              Join Us
            </Button>
          </Toolbar>
        </Hide>
        <Hide sm md lg>
          <Button
            children='Toggle Drawer'
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
            <Flex
              direction='column'
            >
              <NavLink
                href='/index/'
                ml={2}
                mb={2}
                is='div'
              >
                Call of the Brave
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
              <Button
                mt={4}
                ml={3}
                bg='base'
                is='a'
                href='/start/'
              >
                Join Us
              </Button>
            </Flex>
          </Drawer>
        </Hide>
      </CustomFixed>
    )
  }
}

export default Navbar
