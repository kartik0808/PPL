const imageInfo = require('../Schemas/imageSchema');

module.exports ={
  uploadImage:async function(data){
    imageInfo.create(data);
    return ("Image Uploaded");
  },

  fetchUser:async function(data){
    return imageInfo.find({'email':data}).then(res=>{return res})

  }
}