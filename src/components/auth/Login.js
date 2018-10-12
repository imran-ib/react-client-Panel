import React, { Component } from "react";
import "./Login.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { notifyAction } from "../actions/notifyAction";
import Alert from "../layout/Alert";
// import Alert from "../layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  LoginFormSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { firebase, notifyAction } = this.props;

    firebase
      .login({
        email,
        password
      })
      .catch(() => notifyAction("Invalid Login Credentials", " error"));
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { Message, MessageType } = this.props.notify;
    return (
      <div id="LoginForm" className="mt-4">
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                {Message ? (
                  <Alert Message={Message} MessageType={MessageType} />
                ) : null}
                <h1>
                  <i className="fas fa-user-lock" /> Login
                </h1>
                <p>Please enter your email and password</p>
              </div>
              <form id="Login" onSubmit={this.LoginFormSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="forgot">
                  <a href="reset.html">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyAction }
  )
)(Login);
