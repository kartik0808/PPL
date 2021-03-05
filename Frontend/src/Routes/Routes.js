import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Profile from "../Components/Profile";
import history from "../History/history";
import Timeline from "../Components/Timeline";
import LoginSignup from "../Components/WelcomeFromPPL";
import PrivateRoutes from "../PrivateRoutes/privateroutes"

export default function Routes() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoutes path="/timeline" component={Timeline} />
          <PrivateRoutes path="/profile" component={Profile} />
          <Route path="/" component={LoginSignup} />
        </Switch>
      </Router>
    </div>
  );
}
