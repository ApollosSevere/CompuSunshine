import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../../store/products";
import { deleteProduct, fetchAllProducts } from "../../../store/adminproducts";

import "./products.css";
const Product = (props) => {
  const { product, deleteProduct } = props;

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={product.imageUrl} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">${product.price}</div>
            <div className="row">
              <Link
                to={`/admin/edit/${product.id}`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                onClick={() => deleteProduct(product.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

class AdminProducts extends React.Component {
  async componentDidMount() {
    this.props.loadAllProducts();
  }

  render() {
    // *Important: Sort products first to keep from reshifting after a change!
    this.props.products.sort((itemA, itemB) => itemA.id - itemB.id);

    return (
      <>
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Products</h2>
            <div>
              <Link to="/admin/createProduct" className="btn btn-primary">
                Create new
              </Link>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <header className="card-header bg-white ">
              <div className="row gx-3 py-3">
                <div className="col-lg-4 col-md-6 me-auto ">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="form-control p-2"
                  />
                </div>
                <div className="col-lg-2 col-6 col-md-3">
                  <select className="form-select">
                    <option>All category</option>
                    <option>Electronics</option>
                    <option>Clothings</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="col-lg-2 col-6 col-md-3">
                  <select className="form-select">
                    <option>Latest added</option>
                    <option>Cheap first</option>
                    <option>Most viewed</option>
                  </select>
                </div>
              </div>
            </header>

            <div className="card-body">
              <div className="row">
                {/* Products */}
                {this.props.products.map((product) => (
                  <Product
                    product={product}
                    deleteProduct={this.props.deleteProduct}
                    key={product._id}
                  />
                ))}
              </div>

              <nav className="float-end mt-4" aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <Link className="page-link" to="#">
                      Previous
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.adminproducts.allProducts,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllProducts: () => {
      dispatch(fetchAllProducts());
    },
    deleteProduct: (productId) => {
      dispatch(deleteProduct(productId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
