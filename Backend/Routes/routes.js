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

//uploading the image
router.post("/uploadimage",upload.single('uploadedFile'),async function(req,res){
  const uploadImage = await imageapi.uploadImage(req.body);
  res.send(uploadImage);
})

router.post("/getpost",async function(req,res){
  const checkEmail = await imageapi.fetchUser();
  res.json(checkEmail);
})

router.post("/userdata",async function(req,res){
  const userData = await userapi.getUserName(req.body.email);
  res.json(userData);
})

router.post('/imageinfo',async function(req,res){
  const imageData = await imageapi.getImageInfo(req.body);
  res.json(imageData);
})

router.post('/likes',async function(req,res){
  console.log(req.body);
  const likesData = await imageapi.updateLikes(req.body);
  res.json(likesData);
})

router.post("/dislikes", async function (req, res) {
  console.log(req.body);
  const likesData = await imageapi.updateDislikes(req.body);
  res.json(likesData);
})

router.post('/comment',async function(req,res){
  const commentData = await imageapi.addComment(req.body);
  res.json(commentData);
})

module.exports = router;