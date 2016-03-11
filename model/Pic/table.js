//定义post表结构
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pic', {
     picUrl: {
      field: 'url',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
      articleUrl: {
      field: 'articleUrl',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
  } , {
    tableName: 'pic',
    timestamps: false,
    freezeTableName: true
  });
};