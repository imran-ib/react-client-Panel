import React, { Component } from "react";
import { Link } from "react-router-dom";

export class SideBar extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/new" className="btn btn-group-sm btn-success mt-2">
            <i className="fas fa-plus mr-2" />
            New
          </Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
