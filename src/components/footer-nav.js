import React from 'react'
import styled from 'styled-components'

import {
  NavLink
} from 'rebass'

const CustomNavLink = styled(NavLink)`
  color: white;
  font-weight: normal;
`

const FooterNav = props => (
  <div>
    {navigation.map(footerNavLink => (
      <CustomNavLink
        key={footerNavLink.order}
        href={footerNavLink.href}
        children={footerNavLink.text}
        ml={-2}
      />
    ))}
  </div>
)

export default FooterNav

const navigation = [{
  'order': 1,
  'href': '/faq/',
  'text': 'f.a.q. //',
  'type': 'Navigation',
  'position': 'Footer'
},
{
  'order': 2,
  'href': '/shipping-and-returns/',
  'text': 'shipping & returns //',
  'type': 'Navigation',
  'position': 'Footer'
},
{
  'order': 3,
  'href': 'http://m.me/callofthebrave',
  'text': 'contact us',
  'type': 'Navigation',
  'position': 'Footer'
}]
