import React from "react";

// Modules/Libraries
import { Switch } from "react-router-dom";

// Utils
import RouteWithSubRoutes from "../utils/RouteWithSubRoutes";

// Components
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
