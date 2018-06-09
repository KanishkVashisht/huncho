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

module.exports = {
  randomString: randomString,
  resolver: resolver
}
