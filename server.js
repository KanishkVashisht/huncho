//Setting up the express application
const express = require('express');
let admin = require('firebase-admin');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.set('view engine','ejs');
const firebase_config = require('./config/firebase_config.json');

//initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(firebase_config),
  databaseURL: 'https://huncho-5b8a7.firebaseio.com/'
});

//static files
app.use(express.static("config"));
app.use(express.static("public"));

//making every query get logged before moving onto the handler
app.use((req,res,next) =>{
  let current_time = (new Date()).getTime();
  console.log("request : ",current_time," - ",req.url, " : ",req.body);
  next();
})

//handling read requests
app.get('/:appid',(req,res)=>{
    console.log("Rendering the app page for app = ",req.params.appid);
})

app.get('/:appid/analytics/:secret',(req,res)=>{
   console.log("Rendering the app",req.params.appid," with the secret ",req.params.secret);
})

//handling write requests
app.post('/write',(req,res)=>{
  console.log(...req)
})
//app.post('/write',write)
app.listen(port,()=>console.log("Listening on port ",port,"..."))