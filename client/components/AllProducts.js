import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../store/products'
import { Link } from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const { products } = this.props

    return (
      <div>
        <div className='all-products-view'>
          {products.length ? (
            products.map(product => (
              <div className='single-product' key={product.id}>
                <img className='product-img' src={product.imageUrl} />
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <h5>Brand: {product.brand}</h5>
                <h3>${product.price}</h3>
              </div>
            ))
          ) : (
            <h3>Out of stock!</h3>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
})

export default connect(mapState, mapDispatch)(AllProducts)
