import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";

export class Navbar extends Component {
  state = {
    isAuthenticated: false
  };
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }
  LogoutHandler = e => {
    e.preventDefault();
    const { firebase, history } = this.props;
    firebase.logout().then(() => {
      return history.push("/");
    });
  };

  render() {
    const { allowRegistration } = this.props.settings;
    return (
      <div>
        <nav className=" navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Client Panel
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              {this.state.isAuthenticated ? (
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              ) : null}
              {this.state.isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item ">
                    <a className="nav-link" href="#!">
                      {this.props.auth.email}
                    </a>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/settings">
                      Setings
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link"
                      href="#!"
                      onClick={this.LogoutHandler}
                    >
                      LogOut
                    </a>
                  </li>
                </ul>
              ) : null}

              {allowRegistration && !this.state.isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(Navbar);
