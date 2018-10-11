import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spiner from "../layout/spiner";
import ClassNames from "classnames";

class Details extends Component {
  state = {
    showBalanceUpdate: "",
    updateAmount: 0
  };

  onSubmit = async e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { updateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(updateAmount)
    };

    // Update in firestore
    await firestore.update(
      { collection: "clients", doc: client.id },
      clientUpdate
    );
  };

  onDeleteHandler = e => {
    const { client, firestore } = this.props;

    firestore
      .delete({ collection: "clients", doc: client.id })
      .then(() => this.props.history.push("/"));
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { client } = this.props;
    const { showBalanceUpdate, updateAmount } = this.state;

    let updatedBalace = "";

    if (showBalanceUpdate) {
      updatedBalace = (
        <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="updateAmount"
              placeholder="Add New Balance"
              value={updateAmount}
              onChange={this.onChange}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>
      );
    } else {
      updatedBalace = null;
    }

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button
                  onClick={this.onDeleteHandler}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <h3 className="card-header">
              {client.FirstName} {client.LastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{" "}
                    <span
                      className={ClassNames({
                        "text-danger": client.Balance > 0,
                        "text-success": client.Balance === 0
                      })}
                    >
                      ${parseFloat(client.Balance).toFixed(2)}
                    </span>{" "}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        <i className="fas fa-pencil-alt" />
                      </a>
                    </small>
                  </h3>
                  {updatedBalace}
                </div>
              </div>

              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.Email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.Phone}
                </li>
              </ul>
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
)(Details);
