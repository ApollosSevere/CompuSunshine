import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import CheckoutItem from "../../components/utils/CheckoutItem";
import { updateProductCount } from "../../store/products";
import { updateOrder, fetchOrder } from "../../store/order";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "./checkout.css";

import Header from "../../components/Header/Header.jsx";
import {
  checkInventory,
  resetCanSubmit,
  resetCartConflicts,
  fetchCart,
  fetch_GuestCart,
} from "../../store/cart";

function Checkout({
  auth,
  history,
  order,
  reset_CartConflicts,
  reset_CanSubmit,
  loggedInUser,
  cartInfo,
  getOrder,
  getCart,
  toUpdateOrder,
  check_Inventory,
  canSubmit,
  update_ProductCount,
  getGuestCart,
}) {
  const [step, setStep] = useState([1, 2, 3]);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(auth);
  let cart = cartInfo ? (auth.id ? cartInfo.userCart : cartInfo.guestCart) : [];
  let width = { 1: "15%", 2: "45%", 3: "100%" };
  useEffect(() => {
    checkAvailabily();
    reset_CartConflicts();
    getCart(auth.id);
    getGuestCart();
    if (auth.id) getOrder(auth.id);
  }, [auth]);

  useEffect(() => {
    reset_CanSubmit();
    checkAvailabily();
  }, [cart]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (canSubmit) {
      injectStyle();

      toast("Order submitted!");
      toUpdateOrder({ ...order, status: "fullfilled" });
      for (let index = 0; index < cart.length; index++) {
        const orderItem = cart[index];
        const productId = auth.id ? orderItem.productId : orderItem.id;
        update_ProductCount(productId, orderItem.quantity);
      }
      !loggedInUser && localStorage.removeItem("cart");
    }
    checkAvailabily();
    reset_CanSubmit();
  };

  const checkAvailabily = () => {
    if (cart.length > 0) {
      for (let index = 0; index < cart.length; index++) {
        const orderItem = cart[index];
        const productId = auth.id ? orderItem.productId : orderItem.id;
        check_Inventory(productId, orderItem.quantity, orderItem.id);
      }
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const itemSubtotal = cart.reduce(function (prev, curr) {
    return prev + (curr.quantity * curr.price) / 100;
  }, 0);
  const taxRate = 0.09;
  const tax = (itemSubtotal * taxRate).toFixed(2);

  return (
    <>
      <Header />
      <div className="container parent">
        <div className=" order-detail">
          <div
            className={`col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 step ${
              currentStep >= 1 && "stepCompleted"
            }`}
          >
            <div className="row ">
              <div className="col-md-4  check-Icon">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 checkout-infoBox">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                {currentStep > 1 && (
                  <p className="text"> {formData.address_1}</p>
                )}
              </div>
            </div>
          </div>

          <div
            className={`col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 step ${
              currentStep >= 2 && "stepCompleted"
            }`}
          >
            <div className="row ">
              <div className="col-md-4 check-Icon">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 checkout-infoBox">
                <h5>
                  <strong>Customer</strong>
                </h5>
                {currentStep > 2 && (
                  <>
                    <p>{`${formData.first_name} ${formData.last_name}`}</p>
                    <p>{formData.email}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className={`col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 step ${
              currentStep >= 3 && "stepCompleted"
            }`}
          >
            <div className="row ">
              <div className="col-md-4 check-Icon ">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 checkout-infoBox ">
                <h5>
                  <strong>Payment</strong>
                </h5>
                {currentStep >= 3 && (
                  <>
                    <p>Shipping: America</p>
                    <p>Pay method: Paypal</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="progress-bar">
          <div className="outer-bar">
            <div style={{ width: width[currentStep] }} className="my-bar"></div>
          </div>
        </div>

        <div className="icon-outer">
          <div className="cart-icon">
            <i
              style={{ left: currentStep !== 3 ? width[currentStep] : "97%" }}
              class="fa fa-shopping-cart icon-cart"
            ></i>
          </div>
        </div>
      </div>

      <div>
        {/* <h2>Order Summary</h2> */}

        {/* {auth.id
          ? cartInfo.userCart.map((product) => (
              <CheckoutItem product={product} />
            ))
          : cartInfo.guestCart.map((product) => (
              <CheckoutItem product={product} />
            ))}
        <table className="checkout">
          <tbody>
            <tr>
              <th>Item Subtotal: </th>
              <th>${itemSubtotal.toFixed(2)}</th>
            </tr>
            <tr>
              <th>Shipping: </th>
              <th>$0.00</th>
            </tr>
            <tr>
              <th>Tax: </th>
              <th>${tax}</th>
            </tr>
            <tr>
              <th>Total: </th>
              <th>${(Number(itemSubtotal) + Number(tax)).toFixed(2)}</th>
            </tr>
          </tbody>
        </table> */}
        {/* <form
          style={{ display: "flex", flexDirection: "column" }}
          id="checkout-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="first_name">
            <h1>First Name:</h1>
          </label>
          <input
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            required
          ></input>

          <label htmlFor="last_name">
            <h1>Last Name:</h1>
          </label>
          <input
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
            required
          ></input>

          <label htmlFor="email">
            <h1>Email:</h1>
          </label>
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          ></input>

          <label htmlFor="address_1">
            <h1>Address Line 1:</h1>
          </label>
          <input
            name="address_1"
            onChange={handleChange}
            value={formData.address_1}
            required
          ></input>

          <label htmlFor="address_2">
            <h1>Address Line 2:</h1>
          </label>
          <input
            name="address_2"
            onChange={handleChange}
            value={formData.address_2}
            required
          ></input>

          <label htmlFor="city">
            <h1>City:</h1>
          </label>
          <input
            name="city"
            onChange={handleChange}
            value={formData.city}
            required
          ></input>

          <label htmlFor="state">
            <h1>State:</h1>
          </label>
          <input
            name="state"
            onChange={handleChange}
            value={formData.state}
            required
          ></input>

          <label htmlFor="zipcode">
            <h1>Zipcode:</h1>
          </label>
          <input
            name="zipcode"
            onChange={handleChange}
            value={formData.zipcode}
            required
          ></input>

          <label htmlFor="phone">
            <h1>Phone:</h1>
          </label>
          <input
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            required
          ></input>

          <button type="submit">Submit</button>
          <button type="cancel" onClick={() => history.push("/cart")}>
            Cancel
          </button>
        </form> */}
      </div>

      {currentStep === 1 && (
        <div className="container d-flex justify-content-center align-items-center">
          <form
            className="Login custom-form col-7"
            onSubmit={() => setCurrentStep(2)}
          >
            <h6>DELIVERY ADDRESS</h6>

            <input
              name="address_1"
              onChange={handleChange}
              value={formData.address_1}
              placeholder="Enter address"
              required
            ></input>

            <input
              name="city"
              onChange={handleChange}
              value={formData.city}
              placeholder="Enter city"
              required
            ></input>

            <input
              name="state"
              onChange={handleChange}
              value={formData.state}
              placeholder="Enter state"
              required
            ></input>

            <input
              name="zipcode"
              onChange={handleChange}
              value={formData.zipcode}
              placeholder="Enter zip code"
              required
            ></input>

            <button type="submit">Next</button>
            <button type="cancel" onClick={() => history.push("/cart")}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {currentStep === 2 && (
        <div className="container d-flex justify-content-center align-items-center">
          <form
            className="Login  custom-form col-7"
            onSubmit={() => setCurrentStep(3)}
          >
            <h6>CUSTOMER INFORMATION</h6>

            <input
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              placeholder="Enter first name"
              required
            ></input>

            <input
              name="last_name"
              onChange={handleChange}
              value={formData.last_name}
              placeholder="Enter last name"
              required
            ></input>

            <input
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Enter email"
              required
            ></input>

            <input
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder="Enter phone #"
              required
            ></input>

            <button type="submit">Next</button>
            <button type="cancel" onClick={() => setCurrentStep(1)}>
              Go back
            </button>
          </form>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    loggedInUser: state.auth.id,
    cartInfo: state.cart,
    order: state.order,
    canSubmit: state.cart.canSubmit,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  toUpdateOrder: (order) => dispatch(updateOrder(order)),
  getOrder: (userId) => dispatch(fetchOrder(userId)),
  check_Inventory: (productId, cartItemAmount, cartItemId) =>
    dispatch(checkInventory(productId, cartItemAmount, cartItemId)),
  update_ProductCount: (productId, cartItemAmount) =>
    dispatch(updateProductCount(productId, cartItemAmount)),
  reset_CanSubmit: () => dispatch(resetCanSubmit()),
  reset_CartConflicts: () => dispatch(resetCartConflicts()),
  getCart: (loggedInUser) => dispatch(fetchCart(loggedInUser)),
  getGuestCart: () => dispatch(fetch_GuestCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
