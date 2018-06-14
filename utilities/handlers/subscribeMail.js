const {database : db} = require("../../config/firebase_init")
const {resolver, randomString} = require('../helperFunctions')


addSubscriber = async(req,res) =>{
  let {email,appid} = {...req.body};
  let reference = db.ref("/production/"+appid);
  await reference.on("value",snapshot =>{
    if(!snapshot.val()){
      let returnable = {
        "success":"false",
        "error":"No such project found"
      }
      resolver(res,returnable);
    }
  });

  db.ref("/production/"+appid+"/analytics/subscribers").push().set({
    "email":email
  }).then((success)=>{
    let returnable = {
      "success":"true",
      "message":"successfully added"
    }
    resolver(res,returnable);
  }).catch((error)=>{
    let returnable = {
      "success":"false",
      "error":"No such project found"
    }
    resolver(res,returnable);
  })
}

module.exports = {
  addSubscriber: addSubscriber
}
