import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/client/AddClient";
import Details from "./components/client/Detail";
import EditForm from "./components/client/EditForm";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <Route component={AppNavbar} />
            <div className="container">
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/client/add" component={AddClient} />
              <Route exact path="/client/edit/:id" component={EditForm} />
              <Route exact path="/client/:id" component={Details} />
            </div>
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
