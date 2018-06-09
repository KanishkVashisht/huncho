//importing the libraries, modules
const express = require('express');
const bodyParser = require("body-parser");
const {database : db} = require("./config/firebase_init")
const {router} = require('./utilities/routes')


//setting up the express app
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.set('view engine','ejs');

//static files
app.use(express.static("public"));

//making every query get logged before moving onto the handler
app.use((req,res,next) =>{
  let current_time = new Date();
  console.log("request : ",current_time," - ",req.url, " : ",req.body);
  next();
})

//adding router
app.use(router)

//adding port
app.listen(port,()=>console.log("Listening on port ",port,"..."))
