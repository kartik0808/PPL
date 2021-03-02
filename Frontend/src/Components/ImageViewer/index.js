import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../Config/config";
import { Link } from "react-router-dom";
import time from "../../TimeFunctions";
import action from "../../Action/action";
import { connect, useSelector, useDispatch } from "react-redux";

function ImageViewer(props) {
  const data = props.match.params.number;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [imageInfo, setImageInfo] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState([]);
  const [value, setValue] = useState(false);
  const updater = useSelector(state => state.updater);
  const dispatch = useDispatch()

  useEffect(() => {
    axios.post(`${config.backendUrl}imageinfo`, { _id: data }).then((res) => {
      setImageInfo(res.data);
      setMessage(res.data.likedby.includes(localStorage.getItem("email")));
      setAddComment(res.data.comments);
    });
  }, [updater, value]);

  useEffect(() => {
    const id = localStorage.getItem("email");
    axios.post(`${config.backendUrl}userdata`, { email: id }).then((res) => {
      setUserName(res.data.fname + " " + res.data.lname);
    });
  }, []);

  function handleLike(event) {
    event.email = localStorage.getItem("email");
    if (updater === true) {
      axios
        .post(`${config.backendUrl}likes`, event)
        .then((res) => console.log(res.data))
        .then(dispatch(action.updateValue(false)));
    } else {
      axios
        .post(`${config.backendUrl}dislikes`, event)
        .then((res) => console.log(res.data))
        .then(dispatch(action.updateValue(true)));
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
      <div className="clear" />
    </div>
  );
}

export default (ImageViewer);
