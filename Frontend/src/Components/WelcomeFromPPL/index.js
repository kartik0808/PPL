import React from 'react';
import LoginSignupRoutes from '../../Routes/LoginSignupRoutes'

  function LoginSignup(){
    return(
      <div>
        <div className="container">
          <div className="content">
            <LoginSignupRoutes/>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="./images/img_9.png" alt /> 
            </div>
          </div>
        </div>
      </div>
    );
  }

export default LoginSignup;


