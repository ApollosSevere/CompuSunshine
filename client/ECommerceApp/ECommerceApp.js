import React from "react";
import { Switch, Link } from "react-router-dom";
import RouteWithSubRoutes from "../utils/RouteWithSubRoutes";
import Header from "../components/header/Header.jsx";

function ECommerceApp({ routes }) {
  const menu = [
    {
      path: "/home/page1", // the url
      name: "Page1", // name that appear in Sidebar
    },
    {
      path: "/home/page2",
      name: "Page2",
    },
    {
      path: "/admin",
      name: "Admin",
    },
  ];
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
