import React from 'react';
import { Link } from 'react-router-dom';

export default class Admin extends React.Component {
  render() {
    return(
      <div>
        <h1>Admin Page</h1>
        <Link to="admin/editProducts">
          <button type="button">Edit Products</button>
        </Link>
        <Link to="admin/createProduct">
          <button type="button">Create New Product</button>
        </Link>
        <Link to="admin/users">
          <button type="button">View Users</button>
        </Link>
      </div>
    )
  }
}