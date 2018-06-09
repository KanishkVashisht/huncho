//importing libraries
const router = require('express').Router();
const {addPage, pageRetriever, analyticsRetriever, exists} = require('../handlers');

router.get('/:appid',pageRetriever);
router.get('/:appid/analytics/:secret',analyticsRetriever);
router.get('/exists/:appid',exists);
router.post('/write',addPage);

module.exports ={
  router: router
}
