
// Predefined Packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Userdefined Packages
const router = require('./Routes/routes');

const app = express();
app.use(express.static('imgs'));

// Connnection to database
mongoose.connect('mongodb://localhost/ppluser', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to the database");
});

//connecting to port no 8887
app.listen(8887,()=>{
    console.log('Server is Runnning');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/home',router);
