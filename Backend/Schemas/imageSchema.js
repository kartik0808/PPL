const mongoose = require('mongoose');

let imageData = new mongoose.Schema({
  email: String,
  imageName: String,
  description: String,
  filename: String,
  category: String,
  date: String,
  uploadedImage: String
})

let imageInfo = mongoose.model("pplimageinfo",imageData);

module.exports  = imageInfo;