import React, { useState, useEffect } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

function CheckoutItem({ product, cartConflicts, cart }) {
  const [error, setError] = useState("");

  useEffect(() => {
    let conflict = cartConflicts.filter(
      (id) => Number(id) === Number(product.id)
    );

    if (conflict.includes(Number(product.id))) {
      setError("Cannot fulfill: insufficient stock", error);
    } else {
      setError(false);
    }
  }, [cartConflicts, cart]);

  return (
    <>
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
          <Alert
            style={{ height: "fit-content", width: "50%" }}
            variant="danger"
          >
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
