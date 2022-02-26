import React from "react";
import { Switch, Link } from "react-router-dom";
import RouteWithSubRoutes from "../utils/RouteWithSubRoutes";

function AdminApp({ routes }) {
  const menu = [
    {
      path: "/admin/editProducts", // the url
      name: "Products", // name that appear in Sidebar
    },
    {
      path: "/home/page2",
      name: "Admin 2",
    },
  ];
  return (
    <>
      <div className="home">
        {/* This can be treated as a sidebar component */}
        <div className="sidebar">
          <h2>Admin Nested Routes</h2>

          <ul>
            {menu.map((menuItem) => (
              <li key={menuItem.name}>
                <Link to={menuItem.path}>{menuItem.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </>
  );
}

export default AdminApp;
