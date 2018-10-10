import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spiner from "../layout/spiner";
import ClassNames from "classnames";

class Details extends Component {
  render() {
    const { client } = this.props;
    if (client) {
      console.log(client);
      return (
        <div className="row">
          <div className="mb-3 mt-3 col-md-6">
            <Link to="/">
              <i className="fas fa-arrow-alt-circle-left" />
              <span className="text-primary ml-2">Take Me Back To Home</span>
            </Link>
          </div>
          <div className="col-md-6">
            <div className="btn-group float-right mt-3 ">
              <Link
                className="btn-dark btn-lg"
                to={`/client/edit/${client.id}`}
              >
                Edit
              </Link>
              <button className="btn-danger"> Delete </button>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-header mb-3">
                  {client.FirstName} {client.LastName}
                </h5>
                <div className="card-subtitle mb-2 text-muted float-right">
                  <h3>
                    {" "}
                    Balance :
                    <span
                      className={ClassNames(
                        client.Balance > 0 ? "text-danger" : "text-success"
                      )}
                    >
                      ${parseFloat(client.Balance).toFixed(2)}
                    </span>
                  </h3>
                </div>
                <p className="card-text ">
                  ID : <span className="font-weight-light">{client.id}</span>
                </p>
                <ul className="list-group">
                  <li className="list-group-item">
                    Contact Email :{" "}
                    <span className="float-right">{client.Email}</span>
                  </li>
                  <li className="list-group-item">
                    Contact Phone :
                    <span className="float-right">{client.Phone}</span>
                  </li>
                </ul>
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
)(Details);
