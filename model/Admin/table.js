//定义post表结构
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin', {
    account: {
      field: 'account',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
     password: {
     field: 'password',
     type: DataTypes.STRING,
     allowNull: true,
     defaultValue: null
    }  
  } , {
    tableName: 'admin',
    timestamps: false,
    freezeTableName: true
  });
};