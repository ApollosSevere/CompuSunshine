import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { fetchSingleProduct, updateProduct } from "../../store/adminproducts";
import { Link } from "react-router-dom";

function EditProduct({ getSingleProduct, product, updateProduct }) {
  const { productId } = useParams();
  const [formData, setFormData] = useState(product);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      updateProduct(productId, formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
    console.log(formData);
  };

  useEffect(() => {
    try {
      setFormData(product);
    } catch (error) {
      console.log(error);
    }
  }, [product]);

  useEffect(() => {
    getSingleProduct(productId);
  }, []);

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
              <button type="submit" className="btn btn-primary">
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
                      value={formData.name}
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
                      value={formData.brand}
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
                      value={formData.category}
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
                      value={formData.price}
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
                      onChange={handleChange}
                      value={formData.quantity}
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
                      value={formData.description}
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
                      value={formData.imageUrl}
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
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    getAllProducts: () => dispatch(fetchAllProducts()),
    clearProduct: () => {
      dispatch(setSingleProduct({}));
    },
    updateProduct: (id, product) =>
      dispatch(updateProduct(id, product, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
