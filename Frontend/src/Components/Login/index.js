import React, { useState, useCallback } from "react";
import axios from "axios";
import history from "../../History/history";
import "./login.css";
import { Link } from "react-router-dom";
import config from "../../Config/config";
import { useDispatch } from "react-redux";
import action from "../../Action/action";
import apiCaller from "../../utils/apicaller";

function Login(props) {
  const errorMessage = props.location.data;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    try {
      const res = await apiCaller({
        url: "checkuser",
        method: "POST",
        data: user,
      });
      setLoginError(res.data.checkUserExists);
      if (res.data.checkUserExists === "Login Successful") {
        localStorage.setItem("token", res.data.accessToken);
        history.push({
          pathname: "/timeline",
        });
      } else {
        history.push("/login");
        var form = document.getElementById("login-form");
        form.reset();
      }
    } catch (err) {
      console.log("This is error", err);
    }
  };

  return (
    <div>
      <div className="content_rgt">
        <div className="login_sec">
          <h1>Log In</h1>
          <p className="red">{errorMessage}</p>
          <form onSubmit={handleSubmit} id="login-form">
            <li>
              <span>Email-ID</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </li>
            <li>
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </li>
            <li>
              <input type="checkbox" />
              Remember Me
            </li>
            {loginError === "Login Successful" ? (
              <h4 className="green">{loginError}</h4>
            ) : (
              <h4 className="red">{loginError}</h4>
            )}
            <li>
              <input id="submit" type="submit" defaultValue="Log In" />
              <Link to="/forgot">Forgot Password</Link>
            </li>
          </form>
          <div className="addtnal_acnt">
            I do not have any account yet.
            <Link to="/">Create My Account Now !</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
