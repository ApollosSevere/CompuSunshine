import React from "react";
import { Switch, Link } from "react-router-dom";
import RouteWithSubRoutes from "../utils/RouteWithSubRoutes";
import Header from "./components/header/Header.jsx";

function ECommerceApp({ routes }) {
  return (
    <>
      <Header />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </>
  );
}

export default ECommerceApp;
