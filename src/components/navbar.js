import React from 'react'
// import Link from 'gatsby-link'
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

class Navbar extends React.Component {
  constructor () {
    super()
    this.state = { open: false }
  }
  render () {
    return (
      <Fixed
        width={'100%'}
      >
        <Hide xs>
          <Toolbar
            color='white'
            bg='black'
          >
            <NavLink
              mr='auto'
              href='/index/'
              children='Call of the Brave'
            />
            {navigation.map(mainLink => (
              <NavLink
                key={mainLink.order}
                href={mainLink.href}
                children={mainLink.text}
              />
            ))}
            <Button ml={3}
              bg='base'
              is='a'
              href='/start/'
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
              >
                Call of the Brave
              </NavLink>
              {navigation.map(mainLink => (
                <NavLink
                  key={mainLink.order}
                  href={mainLink.href}
                  children={mainLink.text}
                  ml={2}
                />
              ))}
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
      </Fixed>
    )
  }
}

export default Navbar
const navigation = [{
  'order': 1,
  'href': '/mission/',
  'text': 'Mission',
  'type': 'Navigation',
  'position': 'Main'
},
{
  'order': 2,
  'href': '/manifesto/',
  'text': 'Manifesto',
  'type': 'Navigation',
  'position': 'Main'
},
{
  'order': 3,
  'href': '/independent-artist-t-shirts/',
  'text': 'Artists',
  'type': 'Navigation',
  'position': 'Main'
},
{
  'order': 4,
  'href': '/designs/',
  'text': 'Designs',
  'type': 'Navigation',
  'position': 'Main'
},
{
  'order': 5,
  'href': '/blog/',
  'text': 'Blog',
  'type': 'Navigation',
  'position': 'Main'
}]
