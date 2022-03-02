import React, { useState, useEffect } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

// Redux
import {
  fetchSingleProduct,
  updateProduct,
  setSingleProduct,
} from "../../../store/adminproducts";

function EditProduct({
  product,
  clearProduct,
  updateProduct,
  getSingleProduct,
}) {
  const { productId } = useParams();
  const [formData, setFormData] = useState({});

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateProduct(productId, formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      getSingleProduct(productId);
    } catch (error) {
      console.log(error);
    }
    return () => {
      clearProduct();
    };
  }, []);

  useEffect(() => {
    setFormData(product);
  }, [product]);

  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/admin/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button
                onClick={() => history.back()}
                type="submit"
                className="btn btn-primary"
              >
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
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
                      onChange={handleChange}
                      value={formData.name || ""}
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
                      onChange={handleChange}
                      value={formData.brand || ""}
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
                      onChange={handleChange}
                      value={formData.category || ""}
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
                      onChange={handleChange}
                      value={formData.price || ""}
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
                      name="quantity"
                      onChange={handleChange}
                      value={formData.quantity || ""}
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
                      onChange={handleChange}
                      value={formData.description || ""}
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
                      onChange={handleChange}
                      value={formData.imageUrl || ""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.adminproducts.singleProduct,
    allProducts: state.products.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProduct: () => {
      dispatch(setSingleProduct({}));
    },
    updateProduct: (id, product) =>
      dispatch(updateProduct(id, product, history)),
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    getAllProducts: () => dispatch(fetchAllProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
