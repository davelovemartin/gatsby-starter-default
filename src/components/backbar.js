import React from 'react'
import Link from 'gatsby-link'
import {
  Fixed,
  NavLink,
  Text,
  Toolbar
} from 'rebass'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faArrowLeft
} from '@fortawesome/fontawesome-free-solid'

class Backbar extends React.Component {
  constructor () {
    super()
    this.state = { open: false }
  }
  render () {
    return (
      <Fixed
        width={'100%'}
      >
        <Toolbar
          color='black'
          bg='white'
        >
          <Link
            to={'/designs/'}
          >
            <NavLink
              is='div'
            >
              <FontAwesomeIcon iconDefinition={faArrowLeft} />
              <Text
                pl={1}
                fontSize={2}
                children='back to the shop'
              />
            </NavLink>
          </Link>
        </Toolbar>
      </Fixed>
    )
  }
}

export default Backbar
