const { DATE } = require("sequelize");
const { DataTypes,literal } = require("sequelize");
const msgTemplateSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: { type: DataTypes.STRING(500), allowNull: false },
  is_active:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
  is_deleted:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
  created_at: { type: DataTypes.DATE, allowNull: true,defaultValue: literal('CURRENT_TIMESTAMP') },
  updated_at: { type: DataTypes.DATE, allowNull: true,defaultValue: literal('CURRENT_TIMESTAMP') },
};
module.exports = msgTemplateSchema;
