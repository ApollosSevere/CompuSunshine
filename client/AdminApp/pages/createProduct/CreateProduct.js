import React from "react";
import { connect } from "react-redux";
import { createProduct } from "../../../store/adminproducts";
import { Link } from "react-router-dom";

import "./createProduct.css";

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
      <>
        {/* <h2> Add New Product </h2>
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
        </form> */}

        <section className="content-main" style={{ maxWidth: "1200px" }}>
          <form onSubmit={this.handleSubmit}>
            <div className="content-header">
              <Link to="/products" className="btn btn-danger text-white">
                Go to products
              </Link>
              <h2 className="content-title">Add product</h2>
              <div>
                <button type="submit" className="btn btn-primary">
                  Publish now
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%" }} className="row mb-4">
                <div className="col-xl-8 col-lg-8">
                  <div className="card mb-4 shadow-sm">
                    <div className="card-body">
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          name="name"
                          onChange={this.handleChange}
                          value={this.state.name}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Brand Name
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          name="brand"
                          onChange={this.handleChange}
                          value={this.state.brand}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Category
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          name="category"
                          onChange={this.handleChange}
                          value={this.state.category}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          name="price"
                          onChange={this.handleChange}
                          value={this.state.price}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          name="inventory"
                          onChange={this.handleChange}
                          value={this.state.quantity}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          name="description"
                          onChange={this.handleChange}
                          value={this.state.description}
                          required
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Image Url</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Inter Image URL"
                          name="imageUrl"
                          onChange={this.handleChange}
                          value={this.state.imageUrl}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/admin">Cancel</Link>
          </form>
        </section>
      </>
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
