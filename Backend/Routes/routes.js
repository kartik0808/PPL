var router = require('express').Router();
const userapi = require('../Api/userapi');
const imageapi = require('../Api/imageapi');
const multer = require('multer');
var storage = multer.diskStorage({
  destination: './imgs',
  filename: function ( req, file, cb ) {
    cb( null, file.originalname);
  }
});  
var upload = multer( { storage: storage } );
const fs = require('fs');

router.get('/',(req,res)=>{
  res.end("This is the Home Page");
  console.log('get call');
})

// adding data to the database
router.post("/receivedata",async function(req,res) {
  const newUserDataCheck = await userapi.addUser(req.body);
  console.log(newUserDataCheck);
  res.end(newUserDataCheck);
});

// checking and  logging in user
router.post("/checkuser",async function(req,res){
  const checkUserExists = await userapi.checkUser(req.body);
  console.log(checkUserExists);
  res.end(checkUserExists);
})

//uploading the image
router.post("/uploadimage",upload.single('uploadedFile'),async function(req,res){
  const uploadImage = await imageapi.uploadImage(req.body);
  res.end(uploadImage);
})

router.post("/getpost",async function(req,res){
  const checkEmail = await imageapi.fetchUser(req.body.email);
  res.json(checkEmail);
})

router.post("/userdata",async function(req,res){
  const userData = await userapi.getUserName(req.body.email);
  res.json(userData);
})
module.exports = router;