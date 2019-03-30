/* Creation Date: Friday, February 1st 2019
 * Original Author: Nathan
 * Modifications by: Akash Patel, Rohan Rao
 * Contents of file: Starting point for the front end
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import User from "./models/User";

import IndexPage from "./pages/IndexPage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";

import './App.css';

// https://reacttraining.com/react-router/web/example/auth-workflow
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        User.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: "/",}} />
        )
      }
    />
  );
}

function AutoDashboardRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        User.isAuthenticated() ? (
          <Redirect to={{pathname: "/dashboard",}} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <AutoDashboardRoute path="/" exact component={IndexPage} />
            <PrivateRoute path="/dashboard/" exact component={DashboardPage} />
            <PrivateRoute path="/analytics/" exact component={AnalyticsPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
