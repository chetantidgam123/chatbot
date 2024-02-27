const multer = require('multer');
const path = require('path');
const { authorize, authorizeAdmin } = require('../../../_middleware')
const {addKeyWord, keywordSchema } = require('./post')
const { log } = require('winston');

module.exports = (keywordModal, { config }) => {
    const router = config.express.Router();
    router.post('/add-keyword', keywordSchema, addKeyWord(keywordModal, { config }));
    return router;
};