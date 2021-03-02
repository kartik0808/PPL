import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../History/history";
import ImageViewer from "../Components/ImageViewer";
import TimelineLeft from "../Components/TimelineLeft"

export default function TimelineRoutes() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/timeline/:number" component={ImageViewer} />
          <Route path="/timeline/" component={TimelineLeft} />
        </Switch>
      </Router>
    </div>
  );
}
