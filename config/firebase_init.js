//getting firebase admin
const admin = require('firebase-admin');

//initializing firebase
const firebase_config = require('./firebase_config.json');
admin.initializeApp({
  credential: admin.credential.cert(firebase_config),
  databaseURL: 'https://huncho-5b8a7.firebaseio.com/'
});
const db = admin.database();

module.exports = {
  database:db
}
