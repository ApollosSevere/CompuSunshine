import React, { useEffect } from "react";
import { connect } from "react-redux";
import RouteWithSubRoutes from "./utils/RouteWithSubRoutes.js";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";

import { Login, Signup } from "./Pages/authForm/AuthForm.jsx";
import Home from "./Pages/home/Home.jsx";
import { me } from "./store";
import SingleProduct from "./Pages/singleProduct/SingleProduct.jsx";
import Cart from "./Pages/cart/Cart.jsx";
import AdminProducts from "./components/AdminProducts";
import AdminUsers from "./components/AdminUsers";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import AdminApp from "./Admin/AdminApp.js";
import ECommerceApp from "./ECommerceApp/ECommerceApp.js";

import Checkout from "./Pages/checkout/Checkout";
import MyAccount from "./Pages/profile/MyAccount.js";
import { ToastContainer, toast } from "react-toastify";
import NotFound from "./Pages/notFound/NotFound.js";

const Routes = ({ loadInitialData, isAdmin, isLoggedIn }) => {
  const dynamicRoutes = !isLoggedIn
    ? [
        { path: "/login", component: Login },
        { path: "/signup", component: Signup },
      ]
    : [];

  const independentRoutes = [
    { path: "/products/:productId", component: SingleProduct },
    { path: "/myAccount", component: MyAccount },
    { path: "/checkout", component: Checkout },
    { path: "/cart", component: Cart },
    { path: "/home", component: Home },
  ];

  let routes = [
    {
      path: "/admin",
      component: isAdmin ? AdminApp : NotFound,
      routes: [
        { path: "/admin/editProducts", component: AdminProducts },
        { path: "/admin/editProducts/:productId", component: EditProduct },
        { path: "/admin/createProduct", component: CreateProduct },
        { path: "/admin/users", component: AdminUsers },
      ],
    },
    {
      path: "/",
      component: ECommerceApp,
      routes: [
        ...independentRoutes,
        ...dynamicRoutes,
        { path: "/", component: Home },
      ],
    },
  ];

  useEffect(() => {
    try {
      loadInitialData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

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
