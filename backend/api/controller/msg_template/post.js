const db = require("../../../_helpers/db");
const { omitHash } = require("../../../_helpers/userHelperFunction");
const configFile = require("../../../config.json");
const { validateRequest } = require("_middleware/validate-request");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const user = require(".");


const addMsgTemplate =
  ({ userModel }, { config }) =>
    async (req, res, next) => {
      const { content } = req.body;
      try {
        let _content = content.trim().length > 0 ? content.trim() : '';
        if (_content.length > 0) {
          const insertempQuery = `INSERT INTO "msg_templates"(content) VALUES (?)
          RETURNING "id"`;
          const [rowOut] = await db.sequelize.query(insertempQuery, {
            replacements: [_content],
            type: QueryTypes.INSERT,
          });
          if(rowOut[0].id && rowOut[0].id>0 ){
            return res.json({ status: true, code: 200, message: 'message template added successfully.' })
          }else{
            return res.json({ status: false, code: 200, message: 'someting went wrong.' })
          }
        } else {
          return res.json({ status: false, code: 200, message: 'message template required' })
        }
      } catch (err) {
        console.log(err);
      }
    };

function templateSchema(req, res, next) {
  const schema = Joi.object({
    content: Joi.string().trim().max(100).required(),
  });
  validateRequest(req, next, schema);
}

module.exports = {
  addMsgTemplate,
  templateSchema,
};
