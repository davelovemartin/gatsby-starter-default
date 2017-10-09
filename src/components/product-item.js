import React from 'react'
import {
  BackgroundImage,
  Card,
  Subhead
} from 'rebass'

const ProductItem = props => (
  <Card
    width={256}
  >
    <BackgroundImage
      ratio={1}
      src={props.images}
    />
    <Subhead
      children={props.name}
      p={2}
     />
  </Card>
)

export default ProductItem
