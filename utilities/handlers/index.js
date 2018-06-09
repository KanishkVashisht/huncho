const {addPage} = require('./addPage');
const {exists} = require('./exists');
const {pageRetriever} = require('./pageRetriever');
const {analyticsRetriever} = require('./analyticsRetriever');

module.exports = {
  addPage:addPage,
  exists:exists,
  pageRetriever:pageRetriever,
  analyticsRetriever:analyticsRetriever
}
