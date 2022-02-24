import "./authForm.css";
import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store/auth";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

function LoginForm({ name, handleSubmit, error }) {
  return (
    <>
      <Header />
      {/* <div className="login">
        <span className="loginTitle">Login</span>
        <form onSubmit={handleSubmit} className="registerForm" name={name}>
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your email..."
            name="username"
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            name="password"
          />
          <button className="loginButton">Login</button>
        </form>
        {error && error.response && <div> {error.response.data} </div>}
      </div> */}

      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <span className="formTitle">Login</span>
        <form
          onSubmit={handleSubmit}
          name={name}
          className="Login col-md-8 col-lg-4 col-11"
        >
          <label>Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="Enter your email..."
            name="username"
          />
          <label>Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Enter your password..."
            name="password"
          />
          <button className="loginButton">Login</button>
          <p>
            <Link to={"/signup"}>Create Account</Link>
          </p>
        </form>
        {error && error.response && <div> {error.response.data} </div>}
      </div>
    </>
  );
}

function SignupForm({ name, handleSubmit, error }) {
  return (
    <>
      <Header />
      {/* <div className="register">
        <span className="registerTitle">Register</span>
        <form name={name} onSubmit={handleSubmit} className="registerForm">
          <label>Username</label>
          <input
            name="username"
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
          />

          <label>Password</label>
          <input
            name="password"
            className="registerInput"
            type="password"
            placeholder="Enter your password..."
          />
          <button type="submit" className="registerButton">
            Register
          </button>
        </form>
        {error && error.response && <div> {error.response.data} </div>}
      </div> */}

      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <span className="formTitle">Register</span>
        <form
          name={name}
          onSubmit={handleSubmit}
          className="Login col-md-8 col-lg-4 col-11"
        >
          <label>Username</label>
          <input
            name="username"
            className="registerInput"
            type="text"
            placeholder="Enter your username..."
          />

          <label>Password</label>
          <input
            name="password"
            className="registerInput"
            type="password"
            placeholder="Enter your password..."
          />
          <button type="submit" className="registerButton">
            Register
          </button>
          <p>
            <Link to={"/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
        {error && error.response && <div> {error.response.data} </div>}
      </div>
    </>
  );
}

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
export const Signup = connect(mapSignup, mapDispatch)(SignupForm);
