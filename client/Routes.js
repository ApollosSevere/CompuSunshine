import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import Admin from "./components/Admin";
import AdminProducts from "./components/AdminProducts";
import AdminUsers from "./components/AdminUsers";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";

import Checkout from "./components/Checkout";
import MyAccount from "./components/MyAccount";
import AccountInfo from "./components/AccountInfo";
import PastOrders from "./components/PastOrders";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
            {isAdmin ? (
              <Switch>
                <Route exact path="/admin" component={Admin} />
                <Route
                  exact
                  path="/admin/editProducts"
                  component={AdminProducts}
                />
                <Route
                  exact
                  path="/admin/editProducts/:productId"
                  component={EditProduct}
                />
                <Route
                  exact
                  path="/admin/createProduct"
                  component={CreateProduct}
                />
                <Route exact path="/admin/users" component={AdminUsers} />
                <Route exact path="/products" component={AllProducts} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/cart" component={Cart} />
                <Route path="/home" component={Home} />
              </Switch>
            ) : (
              console.log("on null case")
            )}
            <Route exact path="/products" component={AllProducts} />
            <Route path="/myAccount" component={MyAccount} />
            <Route path="/accountInfo" component={AccountInfo} />
            <Route path="/pastOrders" component={PastOrders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/cart" component={Cart} />
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
            {/* <Route path="/cart" component={UserCart} /> */}
          </Switch>
        ) : (
          <Switch>
            <Route
              exact
              path="/products/:productId"
              component={SingleProduct}
            />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
