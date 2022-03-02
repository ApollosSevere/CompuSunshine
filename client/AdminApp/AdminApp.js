import React from "react";
import "./responsive.css";
import "./admin.css";

// Modules/Libraries
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "../utils/RouteWithSubRoutes";

// Components
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
