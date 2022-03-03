import React, { useEffect, useState } from "react";
import "./checkout.css";

// Modules/Libraries
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { injectStyle } from "react-toastify/dist/inject-style";

// Redux
import {
  fetchCart,
  checkInventory,
  resetCanSubmit,
  fetch_GuestCart,
  resetCartConflicts,
} from "../../../store/cart";
import { updateProductCount } from "../../../store/products";
import { updateOrder, fetchOrder } from "../../../store/order";

// Components
import CheckoutItem from "../../components/utils/CheckoutItem";
import useForm from "../../components/creditCard/utils/useForm";
import CreditCardForm from "../../components/creditCard/CreditCardForm.jsx";

function Checkout({
  auth,
  order,
  getCart,
  history,
  cartInfo,
  getOrder,
  canSubmit,
  getGuestCart,
  loggedInUser,
  toUpdateOrder,
  reset_CanSubmit,
  check_Inventory,
  reset_CartConflicts,
  update_ProductCount,
}) {
  const { values } = useForm();
  const [formData, setFormData] = useState(auth);
  const [currentStep, setCurrentStep] = useState(1);
  let cart = cartInfo ? (auth.id ? cartInfo.userCart : cartInfo.guestCart) : [];

  let iconWidth = {
    1: "10%",
    2: "45%",
    3: window.innerWidth <= 700 ? "110%" : "96%",
    4: window.innerWidth <= 700 ? "110%" : "96%",
  };

  let progressWidth = {
    1: window.innerWidth <= 700 ? "25%" : "10%",
    2: window.innerWidth <= 700 ? "50%" : "45%",
    3: "100%",
    4: "100%",
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const checkAvailability = () => {
    if (cart.length > 0) {
      for (let index = 0; index < cart.length; index++) {
        const orderItem = cart[index];
        const productId = auth.id ? orderItem.productId : orderItem.id;
        check_Inventory(productId, orderItem.quantity, orderItem.id);
      }
    }
  };

  useEffect(() => {
    reset_CanSubmit();
    checkAvailability();
  }, [cart]);

  useEffect(() => {
    checkAvailability();
    reset_CartConflicts();
    getCart(auth.id);
    getGuestCart();
    if (auth.id) getOrder(auth.id);
  }, [auth]);

  const handleSubmit = () => {
    injectStyle();

    if (canSubmit) {
      toUpdateOrder({ ...order, status: "fullfilled" });
      for (let index = 0; index < cart.length; index++) {
        const orderItem = cart[index];
        const productId = auth.id ? orderItem.productId : orderItem.id;
        update_ProductCount(productId, orderItem.quantity);
      }
      !loggedInUser && localStorage.removeItem("cart");
      toast("Order submitted!");
      history.push("/home");
    }

    toast("Cannot complete order: Insufficient quantity");
    checkAvailability();
    reset_CanSubmit();
  };

  const taxRate = 0.09;
  const itemSubtotal = cart.reduce(function (prev, curr) {
    return prev + (curr.quantity * curr.price) / 100;
  }, 0);
  const tax = (itemSubtotal * taxRate).toFixed(2);

  return (
    <>
      <div className="container parent">
        <div className="order-detail">
          <div
            className={`col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0 step ${
              currentStep == 4 && window.innerWidth > 700 && "stepCompleted"
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
              currentStep === 4 && window.innerWidth > 700 && "stepCompleted"
            }`}
          >
            <div className="row ">
              <div className="col-md-4 check-Icon">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
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
              currentStep == 4 && window.innerWidth > 700 && "stepCompleted"
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
              className="fa fa-shopping-cart icon-cart"
            ></i>
          </div>
        </div>
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

      {currentStep === 3 && <CreditCardForm setCurrentStep={setCurrentStep} />}

      {currentStep === 4 && (
        <div className="container">
          <div className="row order-products justify-content-between">
            <div className="col-lg-8">
              {auth.id
                ? cartInfo.userCart.map((product) => (
                    <CheckoutItem key={product.id} product={product} />
                  ))
                : cartInfo.guestCart.map((product) => (
                    <CheckoutItem key={product.id} product={product} />
                  ))}
            </div>

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
              <button
                className="text-white"
                type="submit"
                onClick={handleSubmit}
              >
                <Link to={canSubmit ? "/home" : "#"} className="text-white">
                  PLACE ORDER
                </Link>
              </button>
              <hr />
              {!canSubmit && (
                <button
                  style={{ backgroundColor: "black" }}
                  type="cancel"
                  onClick={() => history.push("/cart")}
                >
                  Go back
                </button>
              )}
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
    order: state.order,
    cartInfo: state.cart,
    loggedInUser: state.auth.id,
    canSubmit: state.cart.canSubmit,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  getGuestCart: () => dispatch(fetch_GuestCart()),
  reset_CanSubmit: () => dispatch(resetCanSubmit()),
  getOrder: (userId) => dispatch(fetchOrder(userId)),
  toUpdateOrder: (order) => dispatch(updateOrder(order)),
  reset_CartConflicts: () => dispatch(resetCartConflicts()),
  getCart: (loggedInUser) => dispatch(fetchCart(loggedInUser)),

  update_ProductCount: (productId, cartItemAmount) =>
    dispatch(updateProductCount(productId, cartItemAmount)),

  check_Inventory: (productId, cartItemAmount, cartItemId) =>
    dispatch(checkInventory(productId, cartItemAmount, cartItemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

// 5290990016556656
