var pic=require('./connect').Pic;
var sequelize=require('./connect').sequelize;
var Pic=module.exports={};


Pic.getAll=function(callback)
{   	 
    sequelize.query("SELECT * FROM pic  ORDER BY id", {type: sequelize.QueryTypes.SELECT}).then(function(res)
                   {
                     callback(res);
                   });
}

Pic.copy=function()
{
  sequelize.query("UPDATE cachepic,pic set cachepic.url=pic.url,cachepic.articleUrl=pic.articleUrl WHERE cachepic.id=pic.id", {type: sequelize.QueryTypes.UPDATE})
}

 