const {database : db} = require("../../config/firebase_init")
const {resolver, randomString} = require('../helperFunctions')

addPage = async(req,res)=>{
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
}

module.exports = {
  addPage: addPage
}
