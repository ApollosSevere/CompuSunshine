import React, { useEffect } from "react";
import "./shopSection.css";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { fetchProducts } from "../../../../store/products";

// Utils/Components
import Rating from "../rating/Rating.jsx";
import Pagination from "../pagination.jsx";

function ShopSection({ getProducts, products }) {
  useEffect(() => {
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {products.length > 0 ? (
                  products.map((product) => {
                    const validRatings =
                      (product.reviews &&
                        product.reviews.filter((v) => v.rating != 0)) ||
                      [];

                    const ratingAverage =
                      validRatings.reduce((acc, b) => {
                        return acc + Number(b.rating);
                      }, 0) / validRatings.length || 0;

                    return (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product.id}
                      >
                        <div className="border-product">
                          <Link to={`/products/${product.id}`}>
                            <div className="shopBack">
                              <img src={product.imageUrl} alt={product.name} />
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/${product.id}`}>
                                {product.name}
                              </Link>
                            </p>

                            <h5>Brand: {product.brand}</h5>
                            <h3>
                              {product.quantity === 0 ? "Out of Stock!" : ""}
                            </h3>

                            <Rating
                              value={ratingAverage}
                              text={`${product.reviews.length} reviews`}
                            />
                            <h3>${product.price / 100}</h3>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h3>No Products to show!</h3>
                )}
                {/* Pagination */}
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapState = (state) => ({
  products: state.products,
});

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(ShopSection);
