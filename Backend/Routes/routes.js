var router = require('express').Router();
const userapi = require('../Api/userapi');
const imageapi = require('../Api/imageapi');
const multer = require('multer');
const nodemailer = require('../NodeMailer/nodemailer');

var storage = multer.diskStorage({
  destination: './imgs',
  filename: function ( req, file, cb ) {
    cb( null, file.originalname);
  }
});  
var upload = multer( { storage: storage } );
const fs = require('fs');

router.get('/',(req,res)=>{
  res.send("This is the Home Page");
  console.log('get call');
})

// adding data to the database
router.post("/receivedata",async function(req,res) {
  const newUserDataCheck = await userapi.addUser(req.body);
  res.send(newUserDataCheck);
});

// checking and  logging in user
router.post("/checkuser",async function(req,res){
  const checkUserExists = await userapi.checkUser(req.body);
  res.send(checkUserExists);
})

// uploading the image
router.post("/uploadimage",upload.single('uploadedFile'),async function(req,res){
  const uploadImage = await imageapi.uploadImage(req.body);
  res.send(uploadImage);
})

// getting all the images
router.post("/getpost",async function(req,res){
  const checkEmail = await imageapi.fetchAllImages();
  res.json(checkEmail);
})

// get information of the logged in user
router.post("/userdata",async function(req,res){
  const userData = await userapi.getUserName(req.body.email);
  res.json(userData);
})

// getting the information of the image
router.post('/imageinfo',async function(req,res){
  const imageData = await imageapi.getImageInfo(req.body);
  res.json(imageData);
})

// updating the likes of the image
router.post('/likes',async function(req,res){
  console.log(req.body);
  const likesData = await imageapi.updateLikes(req.body);
  res.json(likesData);
})

// updating the dislikes of the image
router.post("/dislikes", async function (req, res) {
  console.log(req.body);
  const likesData = await imageapi.updateDislikes(req.body);
  res.json(likesData);
})

// adding comments for an image
router.post('/comment',async function(req,res){
  const commentData = await imageapi.addComment(req.body);
  res.json(commentData);
})

// verifying if user exists requesting for resetting password
router.post('/forgot',async function(req,res){
  if(await userapi.getUserName(req.body.email) !== null){
    const forgotPassword = await nodemailer.main(req.body.email);
    res.json(forgotPassword);
  } else{
    res.json('email doesnot exist');
  }
})

// resetting the password of the user
router.post('/updatepassword',async function(req,res){
  const updateData = await userapi.updatePassword(req.body); 
  res.json(updateData);
})

module.exports = router;