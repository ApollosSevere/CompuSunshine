import React from "react";
import { connect } from "react-redux";
import { createProduct } from "../../store/adminproducts";
import { Link } from "react-router-dom";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      brand: "",
      category: "",
      price: 0,
      imageUrl: "",
      description: "",
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct({ ...this.state });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <div>
        <h2> Add New Product </h2>
        <form id="create-product" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Product Name</label>
            <input
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />

            <label htmlFor="brand">Brand</label>
            <input
              name="brand"
              type="text"
              onChange={this.handleChange}
              value={this.state.brand}
            />

            <label htmlFor="category">Category</label>
            <input
              name="category"
              onChange={this.handleChange}
              value={this.state.category}
            />

            <label htmlFor="price">Price</label>
            <input
              name="price"
              type="number"
              onChange={this.handleChange}
              value={this.state.price}
            />

            <label htmlFor="imageUrl">imageUrl</label>
            <input
              name="imageUrl"
              onChange={this.handleChange}
              value={this.state.imageUrl}
            />

            <label htmlFor="description">Description</label>
            <input
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />

            <label htmlFor="inventory">Initial Inventory</label>
            <input
              name="inventory"
              type="number"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </div>
          <button type="submit">Create Product</button>
          <Link to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    createProduct: (product) => {
      dispatch(createProduct(product, history));
    },
  };
};

export default connect(null, mapDispatch)(CreateProduct);
