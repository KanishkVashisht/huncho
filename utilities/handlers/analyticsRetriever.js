const {database : db} = require("../../config/firebase_init")
const {resolver, randomString} = require('../helperFunctions')

analyticsRetriever = (req,res)=>{
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
}

module.exports = {
  analyticsRetriever: analyticsRetriever
}
