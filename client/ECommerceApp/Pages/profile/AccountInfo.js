import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../../store/user";
import { me } from "../../../store/auth";

function AccountInfo({ toUpdateUser, refreshUser, auth }) {
  const [formData, setFormData] = useState({});
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  useEffect(() => {
    try {
      getSingleProduct(productId);
    } catch (error) {
      console.log(error);
    }
    return () => {
      clearProduct();
    };
  }, []);

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      toUpdateUser({ ...auth, ...formData });
      refreshUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={this.handleSubmit} className="row form-container">
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="email">
              <h1>Email:</h1>
            </label>
            <input
              name="email"
              onChange={this.handleChange}
              value={email}
              className="form-control"
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="city">
              <h1>City:</h1>
            </label>
            <input
              name="city"
              onChange={this.handleChange}
              value={city}
              className="form-control"
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="state">
              <h1>State:</h1>
            </label>
            <input
              name="state"
              onChange={this.handleChange}
              value={state}
              className="form-control"
            ></input>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="phone">
              <h1>Phone:</h1>
            </label>
            <input
              name="phone"
              onChange={this.handleChange}
              value={phone}
              className="form-control"
            ></input>
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
}
// {
//   first_name: "",
//   last_name: "",
//   email: "",
//   address_1: "",
//   address_2: "",
//   phone: "",
//   city: "",
//   state: "",
//   zipcode: "",
// };

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  toUpdateUser: (user) => dispatch(updateUser(user)),
  refreshUser: () => dispatch(me()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
