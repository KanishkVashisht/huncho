const {database : db} = require("../../config/firebase_init")
const {resolver, randomString} = require('../helperFunctions')

pageRetriever = (req,res)=>{
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
}

module.exports = {
  pageRetriever: pageRetriever
}
