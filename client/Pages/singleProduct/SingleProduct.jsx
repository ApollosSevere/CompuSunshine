import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProduct, addReview } from "../../store/product";
import { setProduct } from "../../store/product";
import { Link, useParams } from "react-router-dom";
import { addToGuestCart, addToUserCart } from "../../store/cart";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import "./singleProduct.css";
import RatingSystem from "../../components/starFeature/RatingSystem.jsx";

import Rating from "../../components/homeComponents/rating/Rating.jsx";
import Message from "./../../components/LoadingError/Error";
// import Header from "../../components/Header/Header.jsx";

const SingleProduct = ({
  isLoggedIn,
  loggedInUser,
  product,
  getProduct,
  add_UserProduct,
  add_GuestProduct,
  add_Review,
}) => {
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const { productId } = useParams();

  const validRatings =
    (product.reviews && product.reviews.filter((v) => v.rating != 0)) || [];

  const ratingAverage =
    validRatings.reduce((acc, b) => {
      return acc + Number(b.rating);
    }, 0) / validRatings.length || 0;

  // const handleComment = ({ target }) => {
  //   setComment({ ...formData, [target.name]: target.value });
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      add_UserProduct(
        product.name,
        product.id,
        userId,
        product.price,
        product,
        quantity
      );
    } else {
      add_GuestProduct({ ...product, amount: quantity });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (loggedInUser) {
        add_Review({
          productId,
          commenter_Id: loggedInUser,
          rating,
          comment,
        });
        injectStyle();
        toast("Comment Added!");
        setRating(0);
        setComment("");
      } else {
        injectStyle();
        toast("Please Log In!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Header /> */}
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
                  <Rating
                    value={ratingAverage}
                    text={`${
                      product.reviews && product.reviews.length
                    } reviews`}
                  />
                </div>
                {product.quantity > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select
                        value={quantity}
                        onChange={({ target }) => setQuantity(target.value)}
                      >
                        {[...Array(product.quantity).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
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
            <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
              <strong>Example Review: Admin Doe</strong>
              <Rating value={2} />
              <span>Jan 12 2021</span>
              <div className="alert alert-info mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </div>
            </div>
            {product.reviews !== undefined ? (
              product.reviews.length == 0 ? (
                <Message variant={"alert-info mt-3"}>No Real Reviews</Message>
              ) : (
                <>
                  <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
                    {product.reviews
                      .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                      )
                      .map((review, index) => {
                        const date = new Date(review.createdAt).toDateString(
                          "en-US"
                        );
                        const time = new Date(
                          review.createdAt
                        ).toLocaleTimeString("en-US");
                        return (
                          <>
                            <strong>@{review.user.username}</strong>
                            <Rating value={review.rating} />
                            <span>{date.split(" ").splice(1).join(" ")}</span>
                            <div
                              style={index % 2 !== 0 ? { height: "150px" } : {}}
                              className="alert alert-info mt-3"
                            >
                              {review.comment}
                            </div>
                            {product.reviews.length > 1 && <hr />}
                          </>
                        );
                      })}
                  </div>
                </>
              )
            ) : (
              <>
                <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
              </>
            )}
          </div>
          <div className="col-md-6">
            <h6>WRITE A CUSTOMER REVIEW</h6>
            <div className="my-4"></div>

            <form
              onSubmit={(event) => handleSubmit(event)}
              style={{ marginLeft: "15px" }}
            >
              <div className="review">
                <strong>Rating</strong>
                <RatingSystem rating={rating} setRating={setRating} />
              </div>

              <div style={{ width: "100%", margin: "0 auto" }} className="my-4">
                <strong>Comment</strong>
                <textarea
                  row="3"
                  className="col-12 bg-light p-3 mt-2 border-0 rounded"
                  onChange={({ target }) => setComment(target.value)}
                  value={comment}
                ></textarea>
              </div>

              <div style={{ width: "100%", margin: "0 auto" }} className="my-3">
                <button className="col-12 bg-black border-0 p-3 rounded text-white">
                  SUBMIT
                </button>
              </div>
            </form>

            <div style={{ marginLeft: "15px" }} className="my-3">
              {!isLoggedIn && (
                <Message variant={"alert-warning"}>
                  Please{" "}
                  <Link to="/login">
                    " <strong>Login</strong> "
                  </Link>{" "}
                  to write a review{" "}
                </Message>
              )}
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
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  getProduct: (id) => dispatch(fetchProduct(id)),
  add_UserProduct: (name, id, loggedInUser, price, productObj, quantity) =>
    dispatch(
      addToUserCart(name, id, loggedInUser, price, productObj, quantity)
    ),
  add_GuestProduct: (product) => dispatch(addToGuestCart(product)),
  add_Review: (review) => dispatch(addReview(review)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
