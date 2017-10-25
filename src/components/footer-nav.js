import React from 'react'
import styled from 'styled-components'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(brands)

import {
  NavLink,
  Text
} from 'rebass'

const CustomNavLink = styled(NavLink)`
  color: white;
  font-weight: normal;
`

const CustomText = styled(Text)`
  display: inline;
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
    <CustomText
      color={'white'}
    >
      <FontAwesomeIcon
        size={'2x'}
        pack='fab'
        name='facebook-messenger'
        transform='shrink-5 left-3 down-3'
      />
    </CustomText>
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
