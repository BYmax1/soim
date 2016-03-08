//定义post表结构
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    NavId: {
      field: 'NavId',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
     SubNavId:
     {
      field: 'SubNavId',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
     },
    header:
    {
      field: 'header',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    url:
    {
      field: 'url',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    ReadNum:
    {
      field: 'ReadNum',
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    PostTime:
    {
      field: 'PostTime',
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  } , {
    tableName: 'article',
    timestamps: false,
    freezeTableName: true
  });
};