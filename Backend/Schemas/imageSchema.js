const mongoose = require("mongoose");

let imageData = new mongoose.Schema({
  email: String,
  imageName: String,
  description: String,
  filename: String,
  category: String,
  date: String,
  likes: { type: Number, default: 0 },
  likedby: Array,
  comments: Array,
  uploadedImage: String,
});

let imageInfo = mongoose.model("pplimageinfo", imageData);

module.exports = imageInfo;
