import React, { useState } from "react";
import config from "../../Config/config";
import axios from "axios";
import Modal from "react-modal";
import history from '../../History/history'

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [verificationCode,setVerificationCode] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [receivedVerificationCode,setReceivedVerificationCode] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    axios.post(`${config.backendUrl}forgot`, { email: email }).then((res) => {
      console.log(res);
      if (res.data === "email doesnot exist") {
        setCheckEmail(true);
      } else {
        setReceivedVerificationCode(res.data);
        setOpenModal(true);
      }
    });
  }

  return (
    <div>
      <Modal isOpen={openModal} className="custom-modal-style">
        <div className="popup_sec" id="pop_forgt">
          <div className="clos_btn">
            <img
              src="images/clos.png"
              alt
              id="clos_pop"
              onClick={() => setOpenModal(false)}
            />
          </div>
          <div className="pop_hdr">
            A Verification Code has been sent to your e-mail Id for Reset
            Password Link
          </div>
          <div className="man_contnt">
            <span>Please Enter the Verification Code</span>
            <input
              type="text"
              onChange={(event) => setVerificationCode(event.target.value)}
            />
            <br />
            {showErrorMessage ? (
              <span className="red">Please enter a the correct Verification Code!</span>
            ) : null}
            <input
              type="submit"
              defaultValue="Ok"
              placeholder="Verification Code"
              onClick={() => {
                if (parseInt(verificationCode) === receivedVerificationCode) {
                  setOpenModal(false);
                  history.push("/timeline");
                } else {
                  setShowErrorMessage(true);
                }
              }}
            />
          </div>
        </div>
      </Modal>
      <div className="content_rgt">
        <div className="register_sec">
          <h1>Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <li>
              <span>Enter E-mail ID</span>
              <input
                type="email"
                placeholder="User@gmail.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </li>
            {checkEmail ? (
              <span className="red">Please enter a valid Email!</span>
            ) : null}
            <li>
              <input type="submit" defaultValue="Submit" />
            </li>
          </form>
        </div>
      </div>
    </div>
  );
}
