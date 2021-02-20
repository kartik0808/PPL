import React, { useState, useEffect } from "react";
import { Link, Switch, Route, Router } from "react-router-dom";
import UploadImage from "../ImageUploadForm";
import axios from "axios";
import time from "../../TimeFunctions";
import ImageViewer from "../ImageViewer";
import config from "../../Config/config";

function Timeline() {
  const [uploadImage, setUploadImage] = useState(false);
  const [dataOnUser, setDataOnUser] = useState([]);
  const [userName, setUserName] = useState("");
  const [value, setValue] = useState(false);

  useEffect(() => {
    // const id = localStorage.getItem("email");
    axios.post(`${config.backendUrl}getpost`).then((res) => {
      setDataOnUser(res.data);
      console.log(res.data);
    });
  }, [value]);

  useEffect(() => {
    const id = localStorage.getItem("email");
    axios.post(`${config.backendUrl}userdata`, { email: id }).then((res) => {
      setUserName(res.data.fname + " " + res.data.lname);
    });
  }, []);

  function toggleValue() {
    if (value === false) {
      setValue(true);
    } else {
      setValue(false);
    }
  }
  return (
    <div>
      <div>
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <Link
                  onClick={() =>
                    setUploadImage(!uploadImage)
                  }
                >
                  Upload Post
                </Link>{" "}
              </div>
              {uploadImage === true ? (
                <UploadImage toggleValue={toggleValue} />
              ) : null}
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <Link to="#">Invite Friends</Link>{" "}
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_01.png" alt="up" />
                        </span>{" "}
                        CATS
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_02.png" alt="up" />
                        </span>{" "}
                        Dogs
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_03.png" alt="up" />
                        </span>{" "}
                        Birds
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_04.png" alt="up" />
                        </span>{" "}
                        Rabbit
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="list_icon">
                          <img src="images/icon_05.png" alt="up" />
                        </span>{" "}
                        Others
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">
                  Featured
                </div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img1.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img2.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img3.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft" id="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends
                    </li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged
                    </li>
                  </ul>
                </div>
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/timeline_img1.png" />
                      <div className="profile_text">
                        <a href="#">Change Profile Pic</a>
                      </div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div">
                        <a href="#">
                          Edit <img src="images/timeline_img.png" />
                        </a>
                      </div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">{userName}</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">Female</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">
                              This is an example of a comment. You can create as
                              many comments like this one or sub comments as you
                              like and manage all of your content inside
                              Account.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li>
                        <a href="#" className="active">
                          Timeline
                        </a>
                      </li>
                      <li>
                        <a href="#">About </a>
                      </li>
                      <li>
                        <a href="#">Album</a>
                      </li>
                      <li>
                        <a href="#"> Pets</a>
                      </li>
                      <li>
                        <a href="#">My Uploads </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {dataOnUser
                .map((image, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <div className="contnt_2">
                          <div className="div_a">
                            <div className="div_title">{image.imageName}</div>
                            <div className="btm_rgt">
                              <div className="btm_arc">{image.category}</div>
                            </div>
                            <div className="div_top">
                              <div className="div_top_lft">
                                <img src="images/img_6.png" />
                                {image.email}
                              </div>
                              <div className="div_top_rgt">
                                <span className="span_date">
                                  {time.convertDate(image.date)}
                                </span>
                                <span className="span_time">
                                  {time.convertTime(image.date)}
                                </span>
                              </div>
                            </div>
                            <div className="div_image">
                              <Link
                                to={`/timeline/${image._id}`}
                              >
                                <img
                                  id="image-upload"
                                  src={config.backendImageUrl + image.filename}
                                  alt="pet"
                                />
                              </Link>
                            </div>
                            <div className="div_btm">
                              <div className="btm_list">
                                <ul>
                                  <li>
                                    <a href="#">
                                      <span className="btn_icon">
                                        <img
                                          src="images/icon_001.png"
                                          alt="share"
                                        />
                                      </span>
                                      Share
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="btn_icon">
                                        <img
                                          src="images/icon_002.png"
                                          alt="share"
                                        />
                                      </span>
                                      Flag
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="btn_icon">
                                        <img
                                          src="images/icon_003.png"
                                          alt="share"
                                        />
                                      </span>
                                      0 Likes
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span className="btn_icon">
                                        <img
                                          src="images/icon_004.png"
                                          alt="share"
                                        />
                                      </span>
                                      4 Comments
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
                .reverse()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
