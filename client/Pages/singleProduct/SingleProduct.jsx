import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../../store/product";
import { setProduct } from "../../store/product";
import { Link, useParams } from "react-router-dom";
import { addToGuestCart, addToUserCart } from "../../store/cart";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "./singleProduct.css";

import Rating from "../../components/homeComponents/Rating.jsx";
import Message from "./../../components/LoadingError/Error";
import Header from "../../components/Header/Header.jsx";

const SingleProduct = ({
  isLoggedIn,
  loggedInUser,
  product,
  getProduct,
  add_UserProduct,
  add_GuestProduct,
}) => {
  const { productId } = useParams();
  window.scrollTo(0, 0);

  useEffect(() => {
    try {
      getProduct(productId);
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  const handleClick = () => {
    injectStyle();
    toast("Added to cart!");

    if (isLoggedIn) {
      let userId = loggedInUser;
      add_UserProduct(product.name, product.id, userId, product.price, product);
    } else {
      add_GuestProduct(product);
    }
  };

  return (
    <>
      <Header />
      {/* <img src={product.imageUrl} />
      <h3>{product.name}</h3>
      <h4>${product.price / 100}</h4>
      <h5>{product.brand}</h5>
      <h5>{product.category}</h5>
      <p>{product.description}</p>
      {product.quantity !== 0 ? (
        <button onClick={handleClick}>Add to Cart</button>
      ) : (
        "Out of Stock!"
      )} */}

      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{product.name}</div>
              </div>
              <p>{product.description}</p>

              <div className="product-count col-lg-7 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>
                  <span>${product.price}</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Status</h6>
                  {product.quantity > 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span>unavailable</span>
                  )}
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Reviews</h6>
                  {/* <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  /> */}
                </div>
                {product.quantity > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select>
                        {/* {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))} */}
                      </select>
                    </div>
                    <button onClick={handleClick} className="round-black-btn">
                      Add To Cart
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* RATING */}
        <div className="row my-5">
          <div className="col-md-6">
            <h6 className="mb-3">REVIEWS</h6>
            <Message variant={"alert-info mt-3"}>No Reviews</Message>
            <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
              <strong>Admin Doe</strong>
              <Rating />
              <span>Jan 12 2021</span>
              <div className="alert alert-info mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6>WRITE A CUSTOMER REVIEW</h6>
            <div className="my-4"></div>

            <form style={{ marginLeft: "15px" }}>
              <div style={{ width: "100%", margin: "0 auto" }} className="my-4">
                <strong>Rating</strong>
                <select className="col-12 bg-light p-3 mt-2 border-0 rounded">
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div style={{ width: "100%", margin: "0 auto" }} className="my-4">
                <strong>Comment</strong>
                <textarea
                  row="3"
                  className="col-12 bg-light p-3 mt-2 border-0 rounded"
                ></textarea>
              </div>
              <div style={{ width: "100%", margin: "0 auto" }} className="my-3">
                <button className="col-12 bg-black border-0 p-3 rounded text-white">
                  SUBMIT
                </button>
              </div>
            </form>
            <div style={{ marginLeft: "15px" }} className="my-3">
              <Message variant={"alert-warning"}>
                Please{" "}
                <Link to="/login">
                  " <strong>Login</strong> "
                </Link>{" "}
                to write a review{" "}
              </Message>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state) => ({
  product: state.product,
  isLoggedIn: !!state.auth.id,
  loggedInUser: state.auth.id,
});

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  add_UserProduct: (name, id, loggedInUser, price, productObj) =>
    dispatch(addToUserCart(name, id, loggedInUser, price, productObj)),
  add_GuestProduct: (product) => dispatch(addToGuestCart(product)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
