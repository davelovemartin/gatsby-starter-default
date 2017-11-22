import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

import {
  Text
} from 'rebass'

fontawesome.library.add(brands)

const _ = require(`lodash`)

const CustomLink = styled(Link)`
  color: white;
  font-weight: normal;
  text-decoration: none;
  margin-right: 6px;
  &:hover {
    text-decoration: underline;
    text-decoration-skip: ink;
  }
`

const CustomText = styled(Text)`
  display: inline;
`

const FooterNav = props => (
  <div>
    {_.chain(props.navigation).filter(['node.position', 'footer']).sortBy('node.order').map(({node}) => (
      <CustomLink
        key={node.order}
        to={node.href}
        children={node.text}
      />
    )).value()}
  </div>
)

export default FooterNav
