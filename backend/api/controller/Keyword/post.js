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




const addKeyWord =
  ({ userModel }, { config }) =>
    async (req, res, next) => {
      const { keyword, template_ids } = req.body;
      try {
        let _keyword = keyword.trim().length > 0 ? keyword.trim() : '';
        let _ids = template_ids && Number(template_ids) > 0 ? Number(template_ids) : 0;
        if (_keyword.length > 0) {
          console.log(template_ids);
          if (_ids > 0) {
            const insertempQuery = `INSERT INTO "keywords"(keyword,template_ids) VALUES (?,?)
          RETURNING "id"`;
            const [rowOut] = await db.sequelize.query(insertempQuery, {
              replacements: [_keyword, _ids.toString()],
              type: QueryTypes.INSERT,
            });
            if (rowOut[0].id && rowOut[0].id > 0) {
              return res.json({ status: true, code: 200, message: 'message template added successfully.' })
            } else {
              return res.json({ status: false, code: 200, message: 'someting went wrong.' })
            }
          } else {
            return res.json({ status: false, code: 200, message: 'select any one template' })
          }
        } else {
          return res.json({ status: false, code: 200, message: 'message template required' })
        }
      } catch (err) {
        console.log(err);
      }
    };

function keywordSchema(req, res, next) {
  const schema = Joi.object({
    keyword: Joi.string().trim().max(50).required(),
    template_ids: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}
const getKeywords =
  ({ userModel }, { config }) =>
    async (req, res, next) => {
      try {
        const selectTemplated = `SELECT keyword,template_ids, id FROM keywords where is_deleted='false'`;
        const rowData = await db.sequelize.query(selectTemplated, {
          replacements: [],
          type: QueryTypes.SELECT,
        });
        if (rowData && rowData.length > 0) {
          return res.json({ status: true, code: 200, message: '', result: rowData })
        } else {
          return res.json({ status: true, code: 200, message: '', result: [] })
        }
      }
      catch (err) {
        console.log(err);
      }
    };

    const getTemplateMsg =
  ({ userModel }, { config }) =>
    async (req, res, next) => {
      const { keyword } = req.body;
      try {
        let _keyword = keyword.trim().length > 0 ? keyword.trim() : '';
        if (_keyword.length > 0) {
          let _a = _keyword.split(' ');
          let temp_message = '';
          for (let index = 0; index < _a.length; index++) {
            const selectTemplated = `SELECT mt.content FROM keywords as k JOIN msg_templates as mt on mt.id::text=k.template_ids  WHERE k.keyword LIKE ?`;
            const rowData = await db.sequelize.query(selectTemplated, {
              replacements: ['%'+_a[index]+'%'],
              type: QueryTypes.SELECT,
            });
            if (rowData && rowData.length > 0) {
              temp_message = rowData[0].content.trim()
              break;
            } 
          }
          if(temp_message.length>0){
            return res.json({ status: true, code: 200, temp_message: temp_message })
          }else{
            return res.json({ status: true, code: 200, temp_message: 'sorry' })
          }
        } else {
          return res.json({ status: false, code: 200, message: 'key word  required' })
        }
      } catch (err) {
        console.log(err);
      }
    };

module.exports = {
  addKeyWord,
  keywordSchema,
  getKeywords,
  getTemplateMsg
};
