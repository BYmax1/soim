//定义post表结构
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SubNav', {
    SubNavId: {
      field: 'SubNavId',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
     NavId: {
      field: 'NavId',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    SubNavName: {
      field: 'SubNavName',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
     url: {
      field: 'url',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
  } , {
    tableName: 'SubNav',
    timestamps: false,
    freezeTableName: true
  });
};