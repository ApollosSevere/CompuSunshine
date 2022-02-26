import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function CheckoutItem({ product, cartConflicts, cart }) {
  const [error, setError] = useState("");

  useEffect(() => {
    let conflict = cartConflicts.filter(
      (id) => Number(id) === Number(product.id)
    );

    if (conflict.includes(Number(product.id))) {
      setError("Cannot fullfill: insufficient stock", error);
    } else {
      setError(false);
    }
  }, [cartConflicts, cart]);

  return (
    <>
      {/* <div style={{ display: "flex" }} key={product.id}>
        <div>
          <img className="product-thumbnail" src={product.imageUrl} />
          <h4>{product.name}</h4>
          <h5>Price Per Unit: ${product.price / 100}</h5>
          <h5>Quantity: {product.quantity}</h5>
          <h5>Sub-total: ${(product.price * product.quantity) / 100}</h5>
        </div>
        {error && (
          <Alert style={{ height: "fit-content" }} variant="danger">
            {error}
          </Alert>
        )}
      </div> */}

      <div className="order-product row">
        <div className="col-md-3 col-6">
          <img src={product.imageUrl} alt="product" />
        </div>
        <div className="col-md-5 col-6 d-flex align-items-center">
          <Link to={`/products/${product.id}`}>
            <h6>{product.name}</h6>
          </Link>
        </div>
        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
          <h4>QUANTITY</h4>
          <h6>{product.quantity}</h6>
        </div>
        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
          <h4>SUBTOTAL</h4>
          <h6>${(product.price * product.quantity) / 100}</h6>
        </div>
        {error && (
          <Alert style={{ height: "fit-content" }} variant="danger">
            {error}
          </Alert>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cartConflicts: state.cart.cartConflicts,
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(CheckoutItem);
