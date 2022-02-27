import React from "react";
import { Switch, Link } from "react-router-dom";
import RouteWithSubRoutes from "../utils/RouteWithSubRoutes";
import "./responsive.css";
import "./admin.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/sidebar";

function AdminApp({ routes }) {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </main>
    </>
  );
}

export default AdminApp;
