//定义post表结构
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Nav', {
    NavId: {
      field: 'NavId',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    NavName: {
      field: 'NavName',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
  } , {
    tableName: 'Nav',
    timestamps: false,
    freezeTableName: true
  });
};