import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../Config/config";

export default function ResetPassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(false);
  const isEnabled = newPassword === confirmNewPassword;

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${config.backendUrl}updatepassword`, {
        email: props.location.data,
        password: newPassword,
      })
      .then((res) => console.log(res.data))
      .then(() => setLoginMessage(true));
  }

  return (
    <div className="content_rgt">
      <div className="register_sec">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <li>
            <span>Enter New Password</span>
            <input
              type="password"
              placeholder="Enter your new password"
              onChange={(event) => {
                setNewPassword(event.target.value);
              }}
            />
          </li>
          <li>
            <span>Confirm Password</span>
            <input
              type="password"
              placeholder="Enter your password again"
              onChange={(event) => {
                setConfirmNewPassword(event.target.value);
              }}
            />
          </li>
          {newPassword !== confirmNewPassword &&
          confirmNewPassword.length > 0 ? (
            <span className="red">Passwords do not match</span>
          ) : null}
          {loginMessage ? (
            <div>
              <span className="green">
                Passwords changed succesfully!
                <br />
                Click <Link to="/login">here</Link> to login
                <br />
              </span>
            </div>
          ) : null}
          <li>
            <input type="submit" defaultValue="Submit" disabled={!isEnabled} />
          </li>
        </form>
      </div>
    </div>
  );
}
