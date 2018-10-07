import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components

import AppNavbar from "./components/layout/AppNavbar";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <React.Fragment>
            <Route component={AppNavbar} />
            <div className="container">
              <h1>Hello There</h1>
            </div>
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
