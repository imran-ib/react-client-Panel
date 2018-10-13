import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AddClient extends Component {
  state = {
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Balance: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;
    const { history } = this.props;

    if (newClient.Balance === "") {
      newClient.Balance = 0;
    }

    this.props.firestore
      .add({ collection: "clients" }, newClient)
      .then(history.push("/"));
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { FirstName, LastName, Email, Phone, Balance } = this.state;
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div>
        <div className="mb-3 mt-3">
          <Link to="/">
            <i className="fas fa-arrow-alt-circle-left" />
            <span className="text-primary ml-2">Take Me Back To Home</span>
          </Link>
        </div>

        <div className="row">
          <div className="col-md-10">
            <div className="card">
              <div className="card-header">Add Client</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      name="FirstName"
                      value={FirstName}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      name="LastName"
                      value={LastName}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      name="Email"
                      value={Email}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Conatct Numbet</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                      name="Phone"
                      value={Phone}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Balnce</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Balance"
                      name="Balance"
                      value={Balance}
                      onChange={this.onChange}
                      disabled={disableBalanceOnAdd}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    settings: state.settings
  }))
)(AddClient);
