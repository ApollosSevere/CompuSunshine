import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartRow from "../../components/utils/cartRow/CartRow";
import { connect } from "react-redux";
import {
  fetchCart,
  fetch_GuestCart,
  fetch_GuestCartBuffer,
  addToUserCartFromGuest,
  remove_GuestCart,
} from "../../store/cart";

// import Header from "../../components/Header/Header.jsx";

import "./cart.css";

function Cart({
  cartInfo,
  isLoggedIn,
  loggedInUser,
  getCart,
  guestCart,
  getGuestCart,
  addToUserCart,
  removeGuestCart,
  getGuestCartBuffer,
  guestCartBuffer,
  state,
}) {
  let cart = cartInfo
    ? loggedInUser
      ? cartInfo.userCart
      : cartInfo.guestCart
    : [];
  let rowView;

  const itemSubtotal = cart.reduce(function (prev, curr) {
    return prev + (curr.quantity * curr.price) / 100;
  }, 0);
  const taxRate = 0.03;
  const tax = (itemSubtotal * taxRate).toFixed(2);

  useEffect(() => {
    try {
      getCart(loggedInUser);
      loggedInUser &&
        guestCartBuffer.map((item) =>
          addToUserCart(item.id, loggedInUser, item.price, item)
        );
    } catch (error) {
      console.log(error);
    }
  }, [loggedInUser, guestCart]);

  useEffect(() => {
    try {
      getGuestCart();
      getGuestCartBuffer();
      loggedInUser && removeGuestCart();
    } catch (error) {
      console.log(error);
    }
  }, [loggedInUser]);

  if (isLoggedIn || loggedInUser) {
    userCart && userCart.length === 0
      ? (rowView = (
          <h1 style={{ textAlign: "center" }}>Cart is Empty, ya bum!</h1>
        ))
      : (rowView =
          userCart &&
          userCart
            .sort((itemA, itemB) => itemA.id - itemB.id)
            .map((item) => (
              <CartRow
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                quantity={item.quantity}
                loggedInUser={loggedInUser}
                guestUser={false}
              />
            )));
  } else {
    console.log("should not log!!");
    rowView =
      guestCart.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>Cart is Empty, ya bum!</h1>
      ) : (
        guestCart.map((item) => (
          <CartRow
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            quantity={item.quantity}
            loggedInUser={loggedInUser}
            guestUser={true}
          />
        ))
      );
  }

  return (
    <>
      {/* <Header /> */}
      {/* {console.log(cart, "we on view")}
      <table style={{ width: "1200px", marginLeft: "60px" }}>
        <thead>
          <tr>
            <th className="product-thumbnail">Product</th>
            <th className="product-price">Price</th>
            <th className="product-quantity">Quantity</th>
            <th className="product-subtotal">Total</th>
            <th className="product-remove">Remove</th>
          </tr>
        </thead>

        <tbody>{rowView}</tbody>
        <Link to="/checkout">
          <button>Checkout</button>
        </Link>
      </table> */}

      <div className="container">
        {/* <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div> */}
        <div className=" alert alert-info text-center mt-3">
          Total Cart Products
          <Link className="text-success mx-2" to="/cart">
            {cart.length}
          </Link>
        </div>
        {rowView}
        {/* Cart */}
        <div className="container">
          {/* <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div> */}

          {/* End of cart items */}
          <div className="total">
            <span className="sub">shipping:</span>
            <span className="total-price">$0.00</span>
          </div>
          <div className="total">
            <span className="sub">tax:</span>
            <span className="total-price">${tax}</span>
          </div>
          <div className="total">
            <span className="sub">total:</span>
            <span className="total-price">
              ${(Number(itemSubtotal) + Number(tax)).toFixed(2)}
            </span>
          </div>

          <hr />
          <div className="cart-buttons d-flex justify-content-between align-items-center row">
            <Link to="/" className="col-md-6 d-flex justify-content-center">
              <button>Continue To Shopping</button>
            </Link>
            <Link
              to="/checkout"
              className="col-md-6 text-white d-flex justify-content-center "
            >
              <button>Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const mapState = (state) => ({
  cartInfo: state.cart,
  userCart: state.cart.userCart,
  guestCart: state.cart.guestCart,
  guestCartBuffer: state.cart.guestCartBuffer,
  isLoggedIn: !!state.auth.id,
  loggedInUser: state.auth.id,
  state: state,
});

const mapDispatch = (dispatch) => ({
  getCart: (loggedInUser) => dispatch(fetchCart(loggedInUser)),
  getGuestCart: () => dispatch(fetch_GuestCart()),
  getGuestCartBuffer: () => dispatch(fetch_GuestCartBuffer()),
  addToUserCart: (id, loggedInUser, price, productObj) =>
    dispatch(addToUserCartFromGuest(id, loggedInUser, price, productObj)),
  removeGuestCart: () => dispatch(remove_GuestCart()),
});

export default connect(mapState, mapDispatch)(Cart);
