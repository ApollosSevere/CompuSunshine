import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import CheckoutItem from "../../components/utils/CheckoutItem";
import { updateProductCount } from "../../store/products";
import { updateOrder, fetchOrder } from "../../store/order";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { Link } from "react-router-dom";
import "./checkout.css";

import useForm from "../../components/creditCard/utils/useForm";

import CreditCardForm from "../../components/creditCard/CreditCardForm.jsx";
// import Header from "../../components/Header/Header.jsx";
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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(auth);
  let cart = cartInfo ? (auth.id ? cartInfo.userCart : cartInfo.guestCart) : [];
  let iconWidth = {
    1: "10%",
    2: "45%",
    3: window.innerWidth <= 425 ? "100%" : "96%",
    4: window.innerWidth <= 425 ? "110%" : "96%",
  };

  let progressWidth = {
    1: window.innerWidth <= 425 ? "25%" : "10%",
    2: window.innerWidth <= 425 ? "50%" : "45%",
    3: "100%",
    4: "100%",
  };

  const { values } = useForm();
  console.log(values);

  useEffect(() => {
    checkAvailabily();
    reset_CartConflicts();
    getCart(auth.id);
    getGuestCart();
    if (auth.id) getOrder(auth.id);
  }, [auth, window.innerWidth]);

  useEffect(() => {
    reset_CanSubmit();
    checkAvailabily();
  }, [cart]);

  const handleSubmit = () => {
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
      {/* <Header /> */}
      {console.log(window.innerWidth)}
      <div className="container parent">
        <div className="order-detail">
          <div
            className={`col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 step ${
              currentStep == 4 && "stepCompleted"
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
              currentStep === 4 && "stepCompleted"
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
              currentStep == 4 && "stepCompleted"
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
                    <p>Pay method: {values.cardType}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="progress-bar">
          <div className="outer-bar">
            <div
              style={{ width: progressWidth[currentStep] }}
              className="my-bar"
            ></div>
          </div>
        </div>

        <div className="icon-outer">
          <div className="cart-icon">
            <i
              style={{
                left: iconWidth[currentStep],
              }}
              class="fa fa-shopping-cart icon-cart"
            ></i>
          </div>
        </div>
      </div>

      {/* <div><h2>Order Summary</h2></div> */}

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

      {currentStep === 3 && <CreditCardForm setCurrentStep={setCurrentStep} />}

      {currentStep === 4 && (
        <div className="container">
          <div className="row order-products justify-content-between">
            <div className="col-lg-8">
              {/* <Message variant="alert-info mt-5">Your cart is empty</Message> */}

              {auth.id
                ? cartInfo.userCart.map((product) => (
                    <CheckoutItem product={product} />
                  ))
                : cartInfo.guestCart.map((product) => (
                    <CheckoutItem product={product} />
                  ))}
              {/* <div className="order-product row">
                <div className="col-md-3 col-6">
                  <img src="/images/8.png" alt="product" />
                </div>
                <div className="col-md-5 col-6 d-flex align-items-center">
                  <Link to={"/"}>
                    <h6>Girls Nike shoes</h6>
                  </Link>
                </div>
                <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                  <h4>QUANTITY</h4>
                  <h6>4</h6>
                </div>
                <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                  <h4>SUBTOTAL</h4>
                  <h6>$567</h6>
                </div>
              </div> */}
            </div>
            {/* total */}
            <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Products</strong>
                    </td>
                    <td>${itemSubtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Shipping</strong>
                    </td>
                    <td>$0.00</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tax</strong>
                    </td>
                    <td>${tax}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>${(Number(itemSubtotal) + Number(tax)).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" onClick={() => handleSubmit()}>
                <Link to="/" className="text-white">
                  PLACE ORDER
                </Link>
              </button>
              {/* <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div> */}
            </div>
          </div>
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

// 5290990016556656
