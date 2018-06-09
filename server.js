//importing the libraries
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require("body-parser");

//setting up the express app
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
app.set('view engine','ejs');

//initializing firebase
const firebase_config = require('./config/firebase_config.json');
admin.initializeApp({
  credential: admin.credential.cert(firebase_config),
  databaseURL: 'https://huncho-5b8a7.firebaseio.com/'
});
const db = admin.database();


//static files
app.use(express.static("config"));
app.use(express.static("public"));

//making every query get logged before moving onto the handler
app.use((req,res,next) =>{
  let current_time = new Date();
  console.log("request : ",current_time," - ",req.url, " : ",req.body);
  next();
})

//handling read requests

app.get('/:appid',(req,res)=>{
  let reference = db.ref("/production/"+req.params.appid);
  reference.on("value",   function(snapshot){
    let returnable;
    if(snapshot.val()){
            let {heading,subheading,name} = {...snapshot.val()};
            res.render('template',smokescreen={
              "name":name,
              "heading":heading,
              "subheading":subheading,
              "callToAction":"Subscribe"
            });
            return;
    } else{
            returnable = {
              "error":"No such project found",
              "success":"false"
            }
    }
   resolver(res,returnable)
  }, function(error){
    let returnable = {
      "success":"false",
      "error":error
    }
    resolver(res,returnable)
  })
})
app.get('/:appid/analytics/:secret',(req,res)=>{
    let reference = db.ref("/production/"+req.params.appid);
    reference.on("value", function(snapshot){
          if(!snapshot.val()){
            let returnable = {
              "success":"false",
              "error":"No such project found"
            }
            resolver(res,returnable);
          }

          let {secret} = {...snapshot.val()}
          if(secret === req.params.secret){
            resolver(res,snapshot.val());
          } else{
            let returnable = {
              "success":"false",
              "error":"Secret mismatch"
            }
            resolver(res,returnable);
          }
    });
})
app.get('/exists/:appid',()=>{
    let reference = db.ref("/production/"+req.params.appid);
    reference.on("value", function(snapshot){
          let returnable;
          if(snapshot.val()){
              returnable= {
                    "exists":"true",
                    "success":"true"
              }
          } else {
              returnable= {
                    "exists":"false",
                    "success":"true"
              }
          }
          resolver(res,returnable);
    }, function(error){
          returnable= {
                "error":error,
                "success":"false"
          }
          resolver(res,returnable);
    })
})
//handling write requests

/*
  TODO collision handling
  Request Parameters
  1. name : name
  2. headline : headline
  3. subheading : subheading
*/
app.post('/write',async(req,res)=>{
  let {name, heading, subheading} = {...req.body}
  let secret = randomString(10);
  let reference = db.ref("/production/"+name);
  reference.set({
    "name":name,
    "heading":heading,
    "subheading":subheading,
    "secret":secret
  }).then((success)=>{
        let returnable = {
          "success":"true",
          "secret":secret
        };
        resolver(res,returnable)
    }).catch((error)=>{
        let returnable ={
          "success":"false",
          "error":error
        };
        resolver(res,returnable)
    })
})
//app.post('/write',write)
app.listen(port,()=>console.log("Listening on port ",port,"..."))




//Helper functions
function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

function resolver(res,returnable){
    res.status(200)
    .set({'Content-Type':'application/json'})
    .send(returnable);
    return;
}
