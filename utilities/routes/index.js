//importing libraries
const router = require('express').Router();
const {addPage, pageRetriever, analyticsRetriever, exists, addSubscriber} = require('../handlers');

router.get('/:appid',pageRetriever);
router.get('/:appid/analytics/:secret',analyticsRetriever);
router.get('/exists/:appid',exists);
router.post('/write',addPage);
router.post('/addSubscriber',addSubscriber);

module.exports ={
  router: router
}
