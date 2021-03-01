import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../Config/config";
import { Link } from "react-router-dom";
import time from "../../TimeFunctions";
import action from "../../Action/action";
import { connect } from "react-redux";

function ImageViewer(props) {
  const data = props.match.params.number;
  console.log(props);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [imageInfo, setImageInfo] = useState("");
  const [userName, setUserName] = useState("");
  //const [updater, setUpdater] = useState(true);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState([]);
  const [value, setValue] = useState(false);

  useEffect(() => {
    axios.post(`${config.backendUrl}imageinfo`, { _id: data }).then((res) => {
      setImageInfo(res.data);
      setMessage(res.data.likedby.includes(localStorage.getItem("email")));
      setAddComment(res.data.comments);
      console.log("hello");
    });
  }, [props.updater, value]);

  useEffect(() => {
    const id = localStorage.getItem("email");
    axios.post(`${config.backendUrl}userdata`, { email: id }).then((res) => {
      setUserName(res.data.fname + " " + res.data.lname);
    });
  }, []);

  function handleLike(event) {
    event.email = localStorage.getItem("email");
    if (updater == true) {
      axios
        .post(`${config.backendUrl}likes`, event)
        .then((res) => console.log(res.data))
        .then(props.dispatch(action.updateValue(false)));
    } else {
      axios
        .post(`${config.backendUrl}dislikes`, event)
        .then((res) => console.log(res.data))
        .then(props.dispatch(action.updateValue(true)));
    }
  }

  function handleComment() {
    const data = {
      _id: props.match.params.number,
      comment: comment,
      email: localStorage.getItem("email"),
      date: new Date(),
    };
    axios.post(`${config.backendUrl}comment`, data).then(() => toggleValue());
  }

  function toggleValue() {
    if (value === false) {
      setValue(true);
    } else {
      setValue(false);
    }
  }

  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="rght_btn">
              {" "}
              <span className="rght_btn_icon">
                <img src="/images/btn_iconb.png" alt="up" />
              </span>{" "}
              <span className="btn_sep">
                <img src="/images/btn_sep.png" alt="sep" />
              </span>{" "}
              <a href="#">Upload Post</a>{" "}
            </div>
            <div className="rght_btn">
              {" "}
              <span className="rght_btn_icon">
                <img src="/images/btn_icona.png" alt="up" />
              </span>{" "}
              <span className="btn_sep">
                <img src="/images/btn_sep.png" alt="sep" />
              </span>{" "}
              <a href="#">Invite Friends</a>{" "}
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
                        <img src="/images/icon_01.png" alt="up" />
                      </span>{" "}
                      CATS
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="/images/icon_02.png" alt="up" />
                      </span>{" "}
                      Dogs
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="/images/icon_03.png" alt="up" />
                      </span>{" "}
                      Birds
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="/images/icon_04.png" alt="up" />
                      </span>{" "}
                      Rabbit
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="list_icon">
                        <img src="/images/icon_05.png" alt="up" />
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
                    <img src="/images/feat_img1.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img">
                    <img src="/images/feat_img2.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                </div>
                <div className="feat_sec">
                  <div className="feat_sec_img">
                    <img src="/images/feat_img3.png" alt="image" />
                  </div>
                  <div className="feat_txt">Lorem Ipusum Text</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Rabbits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content_lft">
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">{imageInfo.imageName}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{imageInfo.category}</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft">
                    <img src="/images/img_6.png" />
                    {userName}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">
                      {time.convertDate(imageInfo.date)}
                    </span>
                    <span className="span_time">
                      {time.convertTime(imageInfo.date)}
                    </span>
                  </div>
                </div>
                <div className="div_image">
                  <img
                    src={`http://localhost:8887/${imageInfo.filename}`}
                    alt="pet"
                  />
                </div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="/images/icon_001.png" alt="share" />
                          </span>
                          Share
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="/images/icon_002.png" alt="share" />
                          </span>
                          Flag
                        </a>
                      </li>
                      <li>
                        <Link onClick={() => handleLike(imageInfo)}>
                          <span className="btn_icon">
                            <img src="/images/icon_003.png" alt="share" />
                          </span>
                          {imageInfo.likes} Likes
                        </Link>
                      </li>
                      <li>
                        <Link>
                          <span className="btn_icon">
                            <img src="/images/icon_004.png" alt="share" />
                          </span>
                          {addComment.length} Comments
                        </Link>
                      </li>
                      <span>
                        {message === true ? (
                          <h6 className="green">You have liked this photo!</h6>
                        ) : null}
                      </span>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="contnt_3">
              <ul>
                <li>
                  <div className="cmnt_div1">
                    <input
                      type="text"
                      placeholder="Enter your Comment"
                      className="cmnt_bx1"
                      name="comments"
                      onChange={(event) => {
                        setComment(event.target.value);
                      }}
                    />
                    <input
                      type="submit"
                      className="sub_bttn1"
                      defaultValue="Submit Comment"
                      onClick={() => handleComment()}
                    />
                  </div>
                </li>
                {addComment
                  .map((value, index) => {
                    return (
                      <li key={index}>
                        <div className="list_image">
                          <div className="image_sec">
                            <img src="/images/post_img.png" />
                          </div>
                          <div className="image_name">{value.by}</div>
                        </div>
                        <div className="list_info">{value.value}</div>
                        <input
                          type="button"
                          defaultValue="Reply"
                          className="orng_btn"
                        />
                      </li>
                    );
                  })
                  .reverse()}
              </ul>
              <div className="view_div">
                <a href="#">View more</a>
              </div>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  console.log(state);
  const { updater } = state;
  console.log(updater);
  return {
    updater: updater,
  };
};

// const mapDispatchtoProps = (dispatch) => {
//   return {
//     updateValue: () => dispatch(action.type === "updateValue"),
//   };
// };

export default connect(mapStatetoProps)(ImageViewer);
