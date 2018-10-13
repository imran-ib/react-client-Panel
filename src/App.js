import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./helper/authHelper";

// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/client/AddClient";
import Details from "./components/client/Detail";
import EditForm from "./components/client/EditForm";
import Login from "./components/auth/Login";
import settings from "./components/settings/Settings";
import Register from "./components/auth/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <Route component={AppNavbar} />
            <div className="container">
              <Route
                exact
                path="/"
                component={UserIsAuthenticated(Dashboard)}
              />
              <Route
                exact
                path="/client/add"
                component={UserIsAuthenticated(AddClient)}
              />
              <Route
                exact
                path="/client/edit/:id"
                component={UserIsAuthenticated(EditForm)}
              />
              <Route
                exact
                path="/client/:id"
                component={UserIsAuthenticated(Details)}
              />
              <Route
                exact
                path="/settings"
                component={UserIsAuthenticated(settings)}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />
            </div>
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
