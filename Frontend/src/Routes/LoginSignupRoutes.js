import React from 'react';
import {Router ,Route, Switch} from 'react-router-dom';
import Register from '../Components/Register'
import history from '../History/history'
import Login from '../Components/Login' 
import ForgotPassword from '../Components/ForgotPassword/forgotpassword'

export default function LoginSignupRoutes(){
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/forgot" component={ForgotPassword} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}