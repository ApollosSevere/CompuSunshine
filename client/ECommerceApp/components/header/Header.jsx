import React, { useEffect, useState } from "react";
import "./header.css";

// Modules/Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Redux
import { logout } from "../../../store";

const Header = ({
  handleClick,
  isLoggedIn,
  isAdmin,
  user,
  canSearch,
  cartInfo,
}) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartResult = cartInfo
      ? isLoggedIn
        ? cartInfo.userCart
        : cartInfo.guestCart
      : [];

    setCart(cartResult);
  }, [cartInfo]);

  return (
    <div>
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+255 768 356 890</p>
              <p>info@zpunet.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.webp" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user"></i>
                    </button>
                    <div className="dropdown-menu">
                      {isLoggedIn ? (
                        <>
                          <Link className="dropdown-item" to="/myAccount">
                            Profile
                          </Link>
                          {isAdmin && (
                            <Link
                              style={{ backgroundColor: "#ebb450" }}
                              className="dropdown-item"
                              to="/admin"
                            >
                              Admin Page
                            </Link>
                          )}
                          <Link className="dropdown-item" to="/home">
                            Shop
                          </Link>
                          <Link className="dropdown-item" to="/about">
                            About
                          </Link>
                          <Link
                            to="#"
                            onClick={handleClick}
                            className="dropdown-item"
                          >
                            Logout
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link className="dropdown-item" to="/login">
                            Login
                          </Link>
                          <Link
                            onClick={handleClick}
                            className="dropdown-item"
                            to="/signup"
                          >
                            SignUp
                          </Link>
                          <Link className="dropdown-item" to="/home">
                            Shop
                          </Link>
                          <Link className="dropdown-item" to="/about">
                            About
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">
                      {cart.length > 0 ? cart.length : ""}
                    </span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center justify-content-evenly nav">
                  {canSearch && (
                    <form className="input-group">
                      <input
                        type="search"
                        className="form-control rounded search"
                        placeholder="Search"
                      />
                      <button type="submit" className="search-button">
                        search
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.webp" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center justify-content-evenly">
                {canSearch ? (
                  <form className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                ) : (
                  <>
                    <Link
                      style={{ fontSize: "22px", color: "#333" }}
                      className="nav-link nav-item"
                      to="/home"
                    >
                      Shop
                    </Link>
                    <Link
                      style={{ fontSize: "22px", color: "#333" }}
                      className="nav-link  nav-item"
                      to="/about"
                    >
                      About
                    </Link>
                  </>
                )}
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                <div className="btn-group">
                  <button
                    type="button"
                    className="name-button dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Hello {user.username || "guest"}
                  </button>
                  <div className="dropdown-menu">
                    {isLoggedIn ? (
                      <>
                        <Link className="dropdown-item" to="/myAccount">
                          Profile
                        </Link>
                        <Link
                          to="#"
                          onClick={handleClick}
                          className="dropdown-item"
                        >
                          Logout
                        </Link>
                        {isAdmin && (
                          <Link
                            style={{ backgroundColor: "#ebb450" }}
                            className="dropdown-item"
                            to="/admin"
                          >
                            Admin Page
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                        <Link
                          onClick={handleClick}
                          className="dropdown-item"
                          to="/signup"
                        >
                          signup
                        </Link>
                      </>
                    )}
                  </div>
                </div>

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">
                    {cart.length > 0 ? cart.length : ""}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
    user: state.auth,
    cartInfo: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Header);
