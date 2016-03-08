//连接数据库当中的post表
Sequelize = require('sequelize');
var models=module.exports={};
var sequelize
    =
    new Sequelize
    ('test', 'root', '',
        {host : '127.0.0.1', port : '3306', dialect : 'mysql'});
var define = require('./table');
var Article=define(sequelize,Sequelize);
//Article.sync({force:true});
models.Article=Article;
models.sequelize=sequelize;
