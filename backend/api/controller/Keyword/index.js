const multer = require('multer');
const path = require('path');
const { authorize, authorizeAdmin } = require('../../../_middleware')
const {addKeyWord, keywordSchema, getKeywords,getTemplateMsg } = require('./post')
const { log } = require('winston');

module.exports = (keywordModal, { config }) => {
    const router = config.express.Router();
    router.post('/add-keyword', keywordSchema, addKeyWord(keywordModal, { config }));
    router.post('/getkeys', getKeywords(keywordModal, { config }));
    router.post('/getTemplateMsg', getTemplateMsg(keywordModal, { config }));
    return router;
};