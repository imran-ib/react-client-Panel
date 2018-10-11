import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spiner from "../layout/spiner";

class EditClient extends Component {
  constructor(props) {
    super(props);

    this.FirstNameInput = React.createRef();
    this.LastNameInput = React.createRef();
    this.EmailInput = React.createRef();
    this.PhoneInput = React.createRef();
    this.BlanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;

    const updatedClient = {
      FirstName: this.FirstNameInput.current.value,
      LastName: this.LastNameInput.current.value,
      Email: this.EmailInput.current.value,
      Phone: this.PhoneInput.current.value,
      Balance:
        this.BlanceInput.current.value === ""
          ? 0
          : this.BlanceInput.current.value
    };

    firestore
      .update({ collection: "clients", doc: client.id }, updatedClient)
      .then(() => this.props.history.push("/"));
  };

  render() {
    const { client } = this.props;
    if (this.props.client) {
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
                <div className="card-header">Edit Client</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        name="FirstName"
                        ref={this.FirstNameInput}
                        defaultValue={client.FirstName}
                      />
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        name="LastName"
                        ref={this.LastNameInput}
                        defaultValue={client.LastName}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="Email"
                        ref={this.EmailInput}
                        defaultValue={client.Email}
                      />
                    </div>

                    <div className="form-group">
                      <label>Conatct Numbet</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        name="Phone"
                        ref={this.PhoneInput}
                        defaultValue={client.Phone}
                      />
                    </div>

                    <div className="form-group">
                      <label>Balnce</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Balance"
                        name="Balance"
                        ref={this.BlanceInput}
                        defaultValue={client.Balance}
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
    } else {
      return <Spiner />;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(EditClient);
