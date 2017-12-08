import React from 'react'
import ProductItem from '../product-item'

class ProductList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      products: []
    }
  }

  componentDidMount () {
    this.fetchProducts()
  }

  render () {
    const {products} = this.state
    const productList = products.map((product, index) => {
      return (
        <ProductItem id={product.id}
          name={product.name}
          images={product.images} />
      )
    })

    return (
      <div id='products'>
        {productList}
      </div>
    )
  }
}

export default ProductList
