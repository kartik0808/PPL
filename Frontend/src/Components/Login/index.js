
import React,{useState} from 'react';
import axios from 'axios';
import history from '../../History/history'
import './login.css'
import {Link} from 'react-router-dom'
import config from '../../Config/config'

function Login(){

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loginError,setLoginError] = useState('');
  
  function handleSubmit(event){
    event.preventDefault();
    const user = {
      email:email,
      password:password
    }

    async function redirector(){
      await localStorage.setItem('email',user.email);
      history.push({
        pathname:'/timeline',
        data:user
      });
    }

    axios
      .post(`${config.backendUrl}checkuser`,user)
      .then(res=>{
        console.log(res.data);
        setLoginError(res.data);
        if(res.data=== "Login Successful"){
          redirector();
        } else{
          history.push('/login')
        }
      })

    var form = document.getElementById('login-form');
    form.reset();
  }

  return(
    <div>
      <div className="content_rgt">
        <div className="login_sec">
          <h1>Log In</h1>
          <form onSubmit={handleSubmit} id="login-form">
            <li><span>Email-ID</span><input type="email" name="email" placeholder="Enter your email" onChange={event => setEmail(event.target.value)}/></li>
            <li><span>Password</span><input type="password" name="password" placeholder="Enter your password" onChange={event => setPassword(event.target.value)}/></li>
            <li><input type="checkbox" />Remember Me</li>
            {loginError==="Login Successful"?(
              <h4 className="green">{loginError}</h4>
              ):(
              <h4 className="red">{loginError}</h4>
            )}
            <li><input id="submit" type="submit" defaultValue="Log In" /><Link to="/forgot">Forgot Password</Link></li>
          </form>
          <div className="addtnal_acnt">I do not have any account yet.<Link to="/">Create My Account Now !</Link></div>
        </div>
      </div>
    </div>
  );
}

export default Login;