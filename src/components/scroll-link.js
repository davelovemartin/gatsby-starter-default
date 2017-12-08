import React from 'react'
import * as Scroll from 'react-scroll'
import CustomButton from './custom-button'

const ScrollLink = Scroll.ScrollLink

const Link = React.createClass({
  render: function () {
    return (
      <CustomButton
        fontSize={[0, 1, 2, 3]}
        children='read more'
        bg={'base'}
        {...this.props}
      />
    )
  }
})

export default ScrollLink(Link)
