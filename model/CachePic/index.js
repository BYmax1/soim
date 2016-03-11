var pic=require('./connect').Pic;
var sequelize=require('./connect').sequelize;
var Pic=module.exports={};


Pic.save=function(id,url,articleUrl)
{   	 
    sequelize.query("UPDATE cachepic set url=?,articleUrl=? where id=? ", {replacements: [url,articleUrl,id],type: sequelize.QueryTypes.UPDATE}).then(function(res)
                   {
                     callback(res);
                   });
}

Pic.getAll=function(callback)
{   	 
    sequelize.query("SELECT * FROM cachepic ORDER BY id", {type: sequelize.QueryTypes.SELECT}).then(function(res)
                   {
                     callback(res);
                   });
}

Pic.copy=function()
{
  console.log("123");
  sequelize.query("UPDATE cachepic,pic set pic.url=cachepic.url,pic.articleUrl=cachepic.articleUrl WHERE cachepic.id=pic.id", {type: sequelize.QueryTypes.UPDATE})
}