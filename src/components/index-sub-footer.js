import React from 'react'
import Benefits from './benefits'
import Logos from './logos.js'

const IndexSubFooter = props => (
  <div>
    <Benefits />
    {props.children}
    <Logos />
  </div>
)

export default IndexSubFooter
