import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Spiner from "../layout/spiner";

export class Clients extends Component {
  render() {
    const Clients = this.props.clients;

    if (Clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fa fa-users" aria-hidden="true" /> Clients
              </h2>
            </div>
            <div className="col-md-6" />
          </div>
          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Balance</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {Clients.map(client => {
                return (
                  <tr key={client.id}>
                    <th scope="row">
                      {client.FirstName} {client.LastName}
                    </th>
                    <td>{client.Email}</td>
                    <td>${parseFloat(client.Balance).toFixed(2)}</td>
                    <td>
                      <Link
                        className="btn btn-secondary btn-sm"
                        to={`/client/${client.id}`}
                      >
                        <i className="fa fa-arrow-circle-right mr-1" />
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spiner />;
    }
  }
}

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
