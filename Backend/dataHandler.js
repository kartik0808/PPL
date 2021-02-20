
// Predefined Packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Userdefined Packages
const router = require('./Routes/routes');
const config = require('./Config/config')

const app = express();

// Connnection to database
mongoose.connect(config.dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log("Connected to the database");
});
console.log(config.portNumber);

//connecting to port no 8887
app.listen(config.portNumber,()=>{
    console.log('Server is Runnning');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/home',router);
app.use(express.static('imgs'));
