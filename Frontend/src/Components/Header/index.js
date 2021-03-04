import React from "react";
import axios from "axios";
import lodash from "lodash"
import config from "../../Config/config";
import action from "../../Action/action"
import history from "../../History/history";
import { useSelector,useDispatch } from "react-redux";
import "./header.css";

function Header() {
  const userInfo = useSelector((state) => state.storeUserInfo);
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.clear();
    dispatch(action.storeUserInfo({}))
    history.push("/login");
  }

  return (
    <div>
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button
              type="button"
              className="btn btn-navbar"
              data-toggle="collapse"
              data-target=".nav-collapse"
            >
              {" "}
              <span className="icon-bar" /> <span className="icon-bar" />{" "}
              <span className="icon-bar" />{" "}
            </button>
            <a className="brand">PPL</a>
            <div className="pro_info pull-right">
              <div className="pro_icn">
                <img src="/./images/pic_small.png" />
              </div>
                {!lodash.isEmpty(userInfo) ? (
                  <div className="pro_txt">{userInfo.username}</div>
                ) : (
                  <div className="pro_txt">Me</div>
                )}
                <b className="caret" />
              <ul
                className="dropdown-menu"
                role="menu"
                aria-labelledby="dLabel"
              >
                <li>
                  <a tabIndex={-1} onClick={handleLogout}>
                    Logout
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="#">
                    Message Box
                  </a>
                </li>
                <li>
                  <a tabIndex={-1} href="#">
                    Change Language
                  </a>
                </li>
                <li className="divider" />
                <li>
                  <a tabIndex={-1} href="#">
                    <input type="text" placeholder="search" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active">
                  {" "}
                  <a>Home</a>{" "}
                </li>
                <li>
                  {" "}
                  <a>E-Coupons</a>{" "}
                </li>
                <li>
                  {" "}
                  <a>E-Brands</a>{" "}
                </li>
                <li>
                  {" "}
                  <a>Resuse Market</a>{" "}
                </li>
                <li>
                  {" "}
                  <a>Lost and Found</a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="header_lft">
          <div className="logo">
            <a href="#">
              <img src="/./images/logo.png" />
            </a>
          </div>
          <div className="navigatn">
            <ul>
              <li>
                <a href="#" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#"> E-Coupons </a>
              </li>
              <li>
                <a href="#">E-Brands </a>
              </li>
              <li>
                <a href="#"> Resuse Market </a>
              </li>
              <li>
                <a href="#"> Lost and Found</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <div className="flag_div">
            <img src="/./images/flag.png" />
          </div>
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="msg_box">
            <a href="#">
              <span className="msg_count">100</span>
            </a>
          </div>
          <div className="info_div">
            <div className="image_div">
              {" "}
              <div className="image_div">
                {" "}
                <div className="dropdown">
                  <img src="/./images/pic.png" />{" "}
                  <div className="dropdown-content">
                    <a href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </div>
                </div>
              </div>{" "}
            </div>
            {!lodash.isEmpty(userInfo) ? (
              <div className="info_div1">{userInfo.username}</div>
            ) : (
              <div className="info_div1">Me</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
