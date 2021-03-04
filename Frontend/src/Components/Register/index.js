import React,{useState} from 'react';
import axios from 'axios';
import history from '../../History/history'
import './register.css'
import {Link} from 'react-router-dom'
import config from '../../Config/config'

function Register(){
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [fname,setFname] = useState('');
  const [lname,setLname] = useState('');
  const [signupCheck,setSignupCheck] = useState('');
  const [checkValue,setCheckValue] = useState('');
  
  function redirector(token){
    localStorage.setItem('token',token);
    history.push('/timeline');
  }

  function handleSubmit(event){
    event.preventDefault();
    const user = {
      username:username,
      password:password,
      email:email,
      fname:fname,
      lname:lname
    }
    if(checkValue){
      axios
        .post(`${config.backendUrl}receivedata`,user)
        .then(res=>{
          setSignupCheck(res.data.newUserDataCheck);
          console.log(signupCheck);
          if (res.data.newUserDataCheck === "Details entered") {
            redirector(res.data.accessToken);
          } else {
            history.push("/");
          }
      })
    } else {
      setSignupCheck("Please accept the Terms and Conditions");
    }
  }
    return (
      <div className="main">
        <div className="content_rgt">
          <div className="register_sec">
            <h1>Create An Account</h1>
            <form onSubmit={handleSubmit}>
              <li><span>Username</span><input type="text" name="username" placeholder="Enter your username" onChange={event=>setUsername(event.target.value)} required/></li>
              <li><span>Password</span><input type="password" name="password" placeholder="Enter your password" onChange={event=>setPassword(event.target.value)} required/></li>
              <li><span>Email</span><input type="email" name="email" placeholder="Enter your email" onChange={event=>setEmail(event.target.value)} required/></li>
              <li><span>First Name</span><input type="text" name="fname" placeholder="Enter your first name" onChange={event=>setFname(event.target.value)} required/></li>
              <li><span>Last Name</span><input type="text" name="lname" placeholder="Enter your last name" onChange={event=>setLname(event.target.value)} required/></li>
              <li><input type="checkbox" onChange={event=>setCheckValue(event.target.checked)}/>I agree to Term &amp; Conditions</li>
              {signupCheck==="Details entered"?(
                <h4 className="green">{signupCheck}</h4>
                ):(
                <h4 className="red">{signupCheck}</h4>
              )}
              <li><input type="submit" defaultValue="Register" /></li>
            </form>
            <div className="addtnal_acnt">I already have an account.<Link to="/login">Login My Account !</Link></div>
          </div>
        </div>
      </div>
    );
}

export default Register;
