import React, { useEffect } from "react";
import "./cart.css";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import {
  fetchCart,
  fetch_GuestCart,
  fetch_GuestCartBuffer,
  addToUserCartFromGuest,
  remove_GuestCart,
} from "../../../store/cart";

// Components
import CartRow from "../../components/utils/cartRow/CartRow";

function Cart({
  getCart,
  cartInfo,
  userCart,
  guestCart,
  isLoggedIn,
  loggedInUser,
  getGuestCart,
  addToUserCart,
  removeGuestCart,
  guestCartBuffer,
  getGuestCartBuffer,
}) {
  const cart = cartInfo
    ? loggedInUser
      ? cartInfo.userCart
      : cartInfo.guestCart
    : [];
  let rowView;

  const taxRate = 0.03;
  const itemSubtotal =
    cart &&
    cart.reduce(function (prev, curr) {
      return prev + (curr.quantity * curr.price) / 100;
    }, 0);
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
      <div className="container">
        <div className=" alert alert-info text-center mt-3">
          Total Cart Products
          <Link className="text-success mx-2" to="/cart">
            {(cart && cart.length) || 0}
          </Link>
        </div>

        {rowView}

        <div className="container">
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
            {cart && (
              <Link
                to="/checkout"
                className="col-md-6 text-white d-flex justify-content-center "
              >
                <button>Checkout</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapState = (state) => ({
  cartInfo: state.cart,
  loggedInUser: state.auth.id,
  isLoggedIn: !!state.auth.id,
  userCart: state.cart.userCart,
  guestCart: state.cart.guestCart,
  guestCartBuffer: state.cart.guestCartBuffer,
});

const mapDispatch = (dispatch) => ({
  getGuestCart: () => dispatch(fetch_GuestCart()),
  removeGuestCart: () => dispatch(remove_GuestCart()),
  getGuestCartBuffer: () => dispatch(fetch_GuestCartBuffer()),
  getCart: (loggedInUser) => dispatch(fetchCart(loggedInUser)),

  addToUserCart: (id, loggedInUser, price, productObj) =>
    dispatch(addToUserCartFromGuest(id, loggedInUser, price, productObj)),
});

export default connect(mapState, mapDispatch)(Cart);
