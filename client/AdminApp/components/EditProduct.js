import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { fetchSingleProduct, updateProduct } from "../../store/adminproducts";

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
    <form
      style={{ width: "200", margin: "0 500px" }}
      id="edit-product"
      onSubmit={handleSubmit}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200",
          margin: "0 70px",
        }}
      >
        <label htmlFor="name">Product Name: </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        ></input>

        <label htmlFor="brand">Brand: </label>
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        ></input>

        <label htmlFor="category">Category: </label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
        ></input>

        <label htmlFor="price">Price (in cents): </label>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
        ></input>

        <label htmlFor="imageUrl">Image </label>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
        ></input>

        <label htmlFor="imageUrl">Quantity </label>
        <input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        ></input>
      </div>

      <button type="submit">Edit</button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.adminproducts.singleProduct,
    allProducts: state.products.allProducts,
    state: state,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
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
