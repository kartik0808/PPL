import React from 'react';
import {Router ,Route, Switch} from 'react-router-dom';
import Profile from '../Components/Profile';
import history from '../History/history' 
import Timeline from '../Components/Timeline'
import LoginSignup from '../Components/WelcomeFromPPL';
import Image from '../Components/ImageUploadForm'

export default function Routes(){
  return(
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/timeline" component={Timeline}/>
          <Route path="/image" component={Image}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/" component={LoginSignup}/>
        </Switch>
      </Router>
      
    </div>
  );
}