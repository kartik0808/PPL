const mongoose = require('mongoose');

let userData = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  fname: String,
  lname: String
})

let userInfo = mongoose.model("ppluserinfo",userData);

module.exports  = userInfo;