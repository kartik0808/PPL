import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import time from "../../TimeFunctions";
import {updateValue} from "../../Action/action";
import apiCaller from "../../utils/apicaller";
import history from "../../History/history";
import { useSelector, useDispatch } from "react-redux";

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
  const updater = useSelector((state) => state.updater);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const res = await apiCaller({
        url: "imageinfo",
        method: "POST",
        data: { _id: data },
      });
      setImageInfo(res.data);
      setMessage(res.data.likedby.includes(localStorage.getItem("email")));
      setAddComment(res.data.comments);
      setUserName(res.data.userInfo.username);
    } catch (err) {
      error(err);
    }
  }, [updater, value]);

  function error(err) {
    history.push({
      pathname: "/login",
      search: "?query=error" + err,
      data: "Login Credentials do not match.Please Login again",
    });
  }

  async function handleLike(event) {
    event.email = localStorage.getItem("email");
    if (updater === true) {
      try {
        const res = await apiCaller({
          url: "likes",
          method: "POST",
          data: event,
        });
        dispatch(updateValue(false));
      } catch (err) {
        error(err);
      }
    } else {
      try {
        const res = await apiCaller({
          url: "dislikes",
          method: "POST",
          data: event,
        });
        dispatch(updateValue(true));
      } catch (err) {
        error(err);
      }
    }
  }

  async function handleComment() {
    const data = {
      _id: props.match.params.number,
      comment: comment,
      email: localStorage.getItem("email"),
      date: new Date(),
    };
    try {
      const res = await apiCaller({
        url: "comment",
        method: "POST",
        data: data,
      });
      toggleValue();
    } catch (err) {
      error(err);
    }
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

export default ImageViewer;
