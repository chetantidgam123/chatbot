const multer = require('multer');
const path = require('path');
const { authorize, authorizeAdmin } = require('../../../_middleware')
const {addMsgTemplate, templateSchema, getTemplaltes } = require('./post')
const { log } = require('winston');

module.exports = (msgTemplateModal, { config }) => {
    const router = config.express.Router();
    const
        storage = multer.diskStorage({
            destination: function (req, file, cb) {
                if (file.fieldname == 'profile_photo') {
                    cb(null, 'uploads/profilepics');
                } else {
                    cb(null, 'uploads/');
                }
            },
            filename: function (req, file, cb) {

                cb(null, Date.now() + path.extname(file.originalname));
            },
        });
    function fileFilter(req, file, cb) {
        const allowedExtensions = ['.jpeg', '.jpg', '.png', '.yaml', '.json', '.pdf'];

        // Check if the file extension is in the allowedExtensions array
        const fileExtension = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(fileExtension)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Invalid file extension.'), false); // Reject the file
        }
    }
    const upload = multer({ storage: storage, fileFilter: fileFilter, });
    router.post('/add-template', templateSchema, addMsgTemplate(msgTemplateModal, { config }));
    router.post('/getTemplaltes', getTemplaltes(msgTemplateModal, { config }));
    return router;
};