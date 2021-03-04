import React, { useEffect } from "react";
import axios from "axios";
import "./upload.css";
import config from "../../Config/config";
import { useDispatch } from "react-redux";
import action from "../../Action/action";

function UploadImage(props) {
  const [userReference, setUserReference] = React.useState({});
  const [imageName, setImageName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [imageStatus, setImageStatus] = React.useState("");
  const [uploadedFile, setUploadedFile] = React.useState("");
  const [uploadImg, setUploadImg] = React.useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${config.backendUrl}userdatafromdb`)
      .then((res) => {
        console.log(res.data);
        setUserReference(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userInfo", userReference._id);
    formData.append("email", localStorage.getItem("email"));
    formData.append("imageName", imageName);
    formData.append("description", description);
    formData.append("filename", event.target[7].files[0].name);
    formData.append("category", category);
    formData.append("date", new Date());
    formData.append("uploadedFile", event.target[7].files[0]);
    formData.append("likes", 0);

    axios
      .post(`${config.backendUrl}uploadimage`, formData)
      .then((res) => {
        setImageStatus(res.data);
        props.toggleValue();
      })
      .then(setUploadImg(!uploadImg))
      .then(dispatch(action.uploadImage(uploadImg)));

    var form = document.getElementById("uploadImage");
    form.reset();
  }
  return (
    <div className="upload-container">
      <form
        onSubmit={handleSubmit}
        id="uploadImage"
        encType="multipart/form-data"
      >
        <label className="label1">Name:</label>
        <input
          type="text"
          name="imageName"
          onChange={(event) => setImageName(event.target.value)}
          required
        />
        <label className="label1">Description(Max. 20 letters):</label>
        <textarea
          name="description"
          maxLength="20"
          onChange={(event) => setDescription(event.target.value)}
        />
        <label className="label1">Categories:</label>
        <div className="category">
          <div className="animals">
            <input
              type="radio"
              id="dog"
              name="categories"
              value="dog"
              onChange={(event) => setCategory(event.target.value)}
              required
            />
            <label htmlFor="dog">Dogs</label>
          </div>
          <div className="animals">
            <input
              type="radio"
              id="cat"
              name="categories"
              value="cat"
              onChange={(event) => setCategory(event.target.value)}
            />
            <label htmlFor="cat">Cats</label>
          </div>
          <div className="animals">
            <input
              type="radio"
              name="categories"
              value="bird"
              onChange={(event) => setCategory(event.target.value)}
            />
            <label htmlFor="bird">Birds</label>
          </div>
          <div className="animals">
            <input
              type="radio"
              name="categories"
              value="rabbit"
              onChange={(event) => setCategory(event.target.value)}
            />
            <label htmlFor="rabbit">Rabbit</label>
          </div>
          <div className="animals">
            <input
              type="radio"
              id="other"
              name="categories"
              value="other"
              onChange={(event) => setCategory(event.target.value)}
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>
        <input
          type="file"
          name="uploadedFile"
          onChange={(event) => setUploadedFile(event.target.files[0])}
          required
        />
        {imageStatus === "Image Uploaded" ? (
          <h4 className="green">{imageStatus}</h4>
        ) : (
          <h4 className="red">{imageStatus}</h4>
        )}
        <input id="submit-image" type="submit" value="submit" />
      </form>
    </div>
  );
}

export default UploadImage;
