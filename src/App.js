import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components

import AppNavbar from "./components/layout/AppNavbar";
import { Dashboard } from "./components/layout/Dashboard";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <Route component={AppNavbar} />
            <div className="container">
              <Route path="/" component={Dashboard} />
            </div>
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
