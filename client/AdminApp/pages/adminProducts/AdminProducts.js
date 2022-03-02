import React, { useEffect } from "react";
import "./products.css";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { deleteProduct, fetchAllProducts } from "../../../store/adminproducts";

function AdminProducts({ loadAllProducts, products, removeProduct }) {
  useEffect(() => {
    try {
      loadAllProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);
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
          <div className="card-body">
            <div className="row">
              {products.map((product) => (
                <Product
                  product={product}
                  removeProduct={removeProduct}
                  key={product.id}
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

const Product = ({ product, removeProduct }) => {
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
                onClick={() => removeProduct(product.id)}
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
    removeProduct: (productId) => {
      dispatch(deleteProduct(productId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
