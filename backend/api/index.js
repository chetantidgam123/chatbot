const express = require('express')
const errorHandler = require('_middleware/error-handler');
const msg_template = require('./controller/msg_template')
const keywords = require('./controller/Keyword')
const models = require('./model')
const routersInit = (config) => {
    const router = express.Router();
    router.use('/', msg_template(models, { config }))
    router.use('/', keywords(models, { config }))
    // catch api all errors
    router.use(errorHandler);
    return router;
}

module.exports = routersInit;