import React, { useState } from "react";
import "./cartRow.css";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { update_UserCart, update_GuestCart } from "../../../../store/cart";

function CartRow({
  id,
  name,
  price,
  imageUrl,
  quantity,
  guestUser,
  updateUserCart,
  updateGuestCart,
  loggedInUser,
}) {
  const handleClick = (task) => {
    if (!guestUser) {
      updateUserCart(id, loggedInUser, task);
    } else if (guestUser) {
      updateGuestCart(id, task);
    }
  };

  return (
    <>
      <div className="cart-iterm row">
        <div
          onClick={() => handleClick("remove")}
          className="remove-button d-flex justify-content-center align-items-center"
        >
          <i className="fas fa-times"></i>
        </div>
        <div className="cart-image col-md-3">
          <img src={imageUrl} alt="nike" />
        </div>
        <div className="cart-text col-md-5 d-flex align-items-center">
          <Link to="#">
            <h4>{name}</h4>
          </Link>
        </div>
        <div className="cart-qty col-md-2 col-sm-5  d-flex align-items-center  flex-column justify-content-center ">
          <h6>QUANTITY</h6>

          <div className="d-flex adjust flex-row justify-content-center">
            <button
              className="btn-subtract"
              onClick={() => handleClick("subtract")}
            >
              -
            </button>

            {quantity}

            <button className="btn-add" onClick={() => handleClick("add")}>
              +
            </button>
          </div>
        </div>
        <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
          <h6>SUBTOTAL</h6>
          <h4>${(quantity * price) / 100}</h4>
        </div>
      </div>
    </>
  );
}

const mapDispatch = (dispatch) => ({
  updateUserCart: (cartId, loggedInUser, task) =>
    dispatch(update_UserCart(cartId, loggedInUser, task)),
  updateGuestCart: (itemId, task) => dispatch(update_GuestCart(itemId, task)),
});

export default connect(null, mapDispatch)(CartRow);
