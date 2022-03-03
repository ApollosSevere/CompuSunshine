import React, { useEffect } from "react";

// Modules/Libraries
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";

// Utils
import NotFound from "./utils/NotFound.js";
import RouteWithSubRoutes from "./utils/RouteWithSubRoutes.js";

// Redux
import { me } from "./store";

// E-Commerce App Components
import Home from "./ECommerceApp/Pages/home/Home.jsx";
import Cart from "./ECommerceApp/Pages/cart/Cart.jsx";
import ECommerceApp from "./ECommerceApp/ECommerceApp.js";
import Checkout from "./ECommerceApp/Pages/checkout/Checkout.js";
import MyAccount from "./ECommerceApp/Pages/profile/MyAccount.js";
import { Login, Signup } from "./ECommerceApp/Pages/authForm/AuthForm.jsx";
import SingleProduct from "./ECommerceApp/Pages/singleProduct/SingleProduct.jsx";

// E-Commerce App Components
import AdminApp from "./AdminApp/AdminApp.js";
import AdminUsers from "./AdminApp/pages/users/AdminUsers.js";
import EditProduct from "./AdminApp/pages/editProduct/EditProduct.js";
import CreateProduct from "./AdminApp/pages/createProduct/CreateProduct";
import AdminProducts from "./AdminApp/pages/adminProducts/AdminProducts.js";

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
        { path: "/admin/products", component: AdminProducts },
        { path: "/admin/edit/:productId", component: EditProduct },
        { path: "/admin/createProduct", component: CreateProduct },
        { path: "/admin/users", component: AdminUsers },
        { path: "/", component: AdminProducts },
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
