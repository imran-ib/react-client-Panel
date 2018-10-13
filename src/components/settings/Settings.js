import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  disableBalanceOnAdd,
  allowRegistration,
  disableBalanceOnEdit
} from "../actions/settingsActions";

class Setings extends Component {
  handdleDisableBalanceOnAdd = () => {
    //action
    const { disableBalanceOnAdd } = this.props;
    disableBalanceOnAdd();
  };
  handdleDisableBalanceOnEdit = () => {
    //action
    const { disableBalanceOnEdit } = this.props;
    disableBalanceOnEdit();
  };

  HanddleAllowRegistration = () => {
    //action
    const { allowRegistration } = this.props;
    allowRegistration();
  };

  render() {
    const {
      disableBalanceOnAdd,
      allowRegistration,
      disableBalanceOnEdit
    } = this.props.settings;
    return (
      <div>
        <div className="mb-3 mt-3">
          <Link to="/">
            <i className="fas fa-arrow-alt-circle-left" />
            <span className="text-primary ml-2">Take Me Back To Home</span>
          </Link>
        </div>
        <div className="card">
          <div className="card-header">
            <h1>Settings</h1>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 ">
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="disableBalanceOnAdd"
                        value={disableBalanceOnAdd}
                        checked={!!disableBalanceOnAdd}
                        onChange={this.handdleDisableBalanceOnAdd}
                      />
                      Disable Blanace On Add
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="disableBalanceOnEdit"
                        value={disableBalanceOnEdit}
                        checked={!!disableBalanceOnEdit}
                        onChange={this.handdleDisableBalanceOnEdit}
                      />
                      Disable Blanace On Edit
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="allowRegistration"
                        value={allowRegistration}
                        checked={!!allowRegistration}
                        onChange={this.HanddleAllowRegistration}
                      />
                      Allow Registration
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  {
    disableBalanceOnAdd,
    allowRegistration,
    disableBalanceOnEdit
  }
)(Setings);
