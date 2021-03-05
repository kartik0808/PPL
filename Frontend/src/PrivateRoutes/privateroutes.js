import React from 'react';
import { Route } from 'react-router-dom';
import history from '../History/history'

// Utils

const PrivateRoutes = ({ component: Component, ...rest }) => {  
  var session_token=localStorage.getItem('token')

  return (
    <Route {...rest} render={props => (
     session_token !== null ? (
      < Component  {...props} />
      ) : (
            history.push('/login')
          )
      )} 
    />
  )
};


export default PrivateRoutes;