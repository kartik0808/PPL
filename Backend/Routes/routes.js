var router = require("express").Router();
const userapi = require("../Api/userapi");
const imageapi = require("../Api/imageapi");
const multer = require("multer");
const nodemailer = require("../NodeMailer/nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

var storage = multer.diskStorage({
  destination: "./imgs",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });
const fs = require("fs");

router.get("/", (req, res) => {
  res.send("This is the Home Page");
  console.log("get call");
});

// adding data to the database
router.post("/receivedata", async function (req, res) {
  const newUserDataCheck = await userapi.addUser(req.body);
  if(newUserDataCheck === "Details entered") {
    const user = {
      email:req.body.email,
      username:req.body.username,
      fname:req.body.fname,
      lname:req.body.lname
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken, newUserDataCheck: newUserDataCheck});
  }
  res.json({newUserDataCheck:newUserDataCheck});
});

// checking and  logging in user
router.post("/checkuser", async function (req, res) {
  const checkUserExists = await userapi.checkUser(req.body);
  console.log(checkUserExists)
  if (checkUserExists.email === req.body.email) {
    const user = {
      username: checkUserExists.username,
      email: checkUserExists.email,
      fname: checkUserExists.fname,
      lname: checkUserExists.lname,
    };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken, checkUserExists: "Login Successful" });
  } else {
    res.json({ checkUserExists: checkUserExists });
  }
});

// uploading the image
router.post(
  "/uploadimage",
  authenticateToken,
  upload.single("uploadedFile"),
  async function (req, res) {
    const uploadImage = await imageapi.uploadImage(req.body);
    res.send(uploadImage);
  }
);

// getting all the images
router.get("/getpost", authenticateToken, async function (req, res) {
  const getImages = await imageapi.fetchAllImages();
  console.log(req.user);
  res.json({getImages:getImages,loggedIn:req.user});
});

// get information of the logged in user
router.get("/userdata", authenticateToken,async function (req, res) {
  const userData = await userapi.getUserName(req.user.email);
  res.json(userData);
});

// getting the information of the image
router.post("/imageinfo", async function (req, res) {
  const imageData = await imageapi.getImageInfo(req.body);
  res.json(imageData);
});

// updating the likes of the image
router.post("/likes", authenticateToken, async function (req, res) {
  const likesData = await imageapi.updateLikes(req.body);
  res.json(likesData);
});

// updating the dislikes of the image
router.post("/dislikes", authenticateToken, async function (req, res) {
  const likesData = await imageapi.updateDislikes(req.body);
  res.json(likesData);
});

// adding comments for an image
router.post("/comment", authenticateToken, async function (req, res) {
  const commentData = await imageapi.addComment(req.body);
  res.json(commentData);
});

// verifying if user exists requesting for resetting password
router.post("/forgot", async function (req, res) {
  if ((await userapi.getUserName(req.body.email)) !== null) {
    const forgotPassword = await nodemailer.main(req.body.email);
    res.json(forgotPassword);
  } else {
    res.json("email doesnot exist");
  }
});

// resetting the password of the user
router.post("/updatepassword", async function (req, res) {
  const updateData = await userapi.updatePassword(req.body);
  res.json(updateData);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader === null) {
    return res.sendStatus(401);
  }
  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
