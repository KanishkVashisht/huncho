const {database : db} = require("../../config/firebase_init")
const {resolver, randomString} = require('../helperFunctions')

exists = (req,res)=>{
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
}

module.exports = {
  exists:exists
}
