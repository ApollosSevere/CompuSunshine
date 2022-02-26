import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../../../store/user";
import { me } from "../../../store/auth";

class AccountInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      address_1: "",
      address_2: "",
      phone: "",
      city: "",
      state: "",
      zipcode: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const user = this.props.auth;

    this.setState({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      address_1: user.address_1 || "",
      address_2: user.address_2 || "",
      phone: user.phone || "",
      city: user.city || "",
      state: user.state || "",
      zipcode: user.zipcode || "",
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    try {
      await event.preventDefault();
      await this.props.toUpdateUser({ ...this.props.auth, ...this.state });
      await this.props.refreshUser();
      // await this.props.history.push("/myAccount");
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      address_1,
      address_2,
      phone,
      city,
      state,
      zipcode,
    } = this.state;

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
}

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
