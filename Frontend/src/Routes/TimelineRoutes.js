import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../History/history";
import ImageViewer from "../Components/ImageViewer";
import TimelineLeft from "../Components/TimelineLeft";
import PrivateRoutes from "../PrivateRoutes/privateroutes"

export default function TimelineRoutes() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoutes path="/timeline/:number" component={ImageViewer} />
          <PrivateRoutes path="/timeline/" component={TimelineLeft} />
        </Switch>
      </Router>
    </div>
  );
}
