import React from 'react'
import axios from 'axios'
import './upload.css'

export default function UploadImage(props){
  
  const [imageName,setImageName] = React.useState('');
  const [description,setDescription] = React.useState('');
  const [category,setCategory] = React.useState('');
  const [imageStatus,setImageStatus] = React.useState('');

  function handleSubmit(event){

    event.preventDefault();
    const formData = new FormData();
    formData.append('email',localStorage.getItem('email'));
    formData.append('imageName',imageName);
    formData.append('description',description);
    formData.append('filename',event.target[7].files[0].name);
    formData.append('category',category);
    formData.append('date',new Date());

    axios
      .post("http://localhost:8887/home/uploadimage",formData)
      .then(res=>{
        //console.log(res);
        setImageStatus(res.data);
        props.toggleValue();
      })

      var form = document.getElementById('uploadImage');
      form.reset();
  }
  return(
    <div className="upload-container">
      <form onSubmit={handleSubmit} id="uploadImage" enctype="multipart/form-data">
        <label className="label1">Name:</label>
        <input type='text' name="imageName" onChange={event=>setImageName(event.target.value)} required />
        <label className="label1">Description(Max. 20 letters):</label>
        <textarea name="description" maxlength="20" onChange={event=>setDescription(event.target.value)} />
        <label className="label1">Categories:</label>
        <div className="category">
          <div className="animals">
            <input type="radio" id="dog" name="categories" value="dog" onChange={event=>setCategory(event.target.value)} required/>
            <label for="dog">Dogs</label>
          </div>
          <div className="animals">
            <input type="radio" id="cat" name="categories" value="cat" onChange={event=>setCategory(event.target.value)} />
            <label for="cat">Cats</label>
          </div>
          <div className="animals">
            <input type="radio" name="categories" value="bird" onChange={event=>setCategory(event.target.value)} />
            <label for="bird">Birds</label>
          </div>
          <div className="animals">
            <input type="radio" name="categories" value="rabbit" onChange={event=>setCategory(event.target.value)} />
            <label for="rabbit">Rabbit</label>
          </div>
          <div className="animals">
            <input type="radio" id="other" name="categories" value="other" onChange={event=>setCategory(event.target.value)} />
            <label for="other">Other</label>
          </div>
        </div>
        <input type='file' name='uploadedFile' required />
        {imageStatus==="Image Uploaded"?(
          <h4 className="green">{imageStatus}</h4>
          ):(
          <h4 className="red">{imageStatus}</h4>
        )}
        <input id="submit-image" type='submit' value='submit' />
      </form>
    </div>
  );  
}