import React from 'react'
// import Link from 'gatsby-link'
import {
  Fixed,
  Text,
  Toolbar,
  NavLink
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
          <NavLink
            mr='auto'
            href='/shop/'
          >
            <FontAwesomeIcon iconDefinition={faArrowLeft} />
            <Text
              children='&nbsp; back to the shop'
            />
          </NavLink>
        </Toolbar>
      </Fixed>
    )
  }
}

export default Backbar
