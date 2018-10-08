import React, { Component } from "react";
import Sidebar from "../layout/Sidebar";
import Client from "../client/Client";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-8">
            <Client />
          </div>
          <div className="col-4">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
