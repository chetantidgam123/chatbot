const { DataTypes,literal } = require("sequelize");
const keywordSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  template_ids: { type: DataTypes.STRING(100), allowNull: false },
  keyword: { type: DataTypes.STRING(100), allowNull: false },
  is_active:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
  is_deleted:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
  created_at: { type: DataTypes.DATE, allowNull: true,defaultValue: literal('CURRENT_TIMESTAMP') },
  updated_at: { type: DataTypes.DATE, allowNull: true,defaultValue: literal('CURRENT_TIMESTAMP') },
};
module.exports = keywordSchema;
