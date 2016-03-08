var article=require('./connect').Article;//article表对象
var sequelize=require('./connect').sequelize;//数据库对象

var Article=module.exports={};

//保存文章到数据库
Article.save=function(NavId,SubNavId,header,url,PostTime)
{	
  article.create
  (
   {
     NavId:NavId,
     SubNavId:SubNavId,
     url:url,
     header:header,
     PostTime:PostTime    
   }
  );
};

 
//统计有多少文章
Article.count=function(NavId,SubNavId,callback)
{
  article.count({ where: {NavId:NavId,SubNavId:SubNavId} }).then(function(c) {
      callback(c);
  })
}

//这里需要改进
Article.get=function(Num,PageId,NavId,SubNavId,callback)
{ 
  sequelize.query("SELECT * FROM article WHERE id NOT IN(SELECT t.id FROM (SELECT * from article where NavId=? ORDER BY id desc limit ?)as t) and NavId=? ORDER BY id DESC LIMIT 15", {replacements: [NavId,(PageId-1)*15,NavId], type: sequelize.QueryTypes.SELECT}).then(function(res)
                   {
                     console.log('文章: '+res[0].header );
                     callback(res);
                   });
}

//阅读量+1
Article.add=function(url)
{
   console.log("阅读量+1");
   sequelize.query("UPDATE article SET ReadNum = ReadNum+1 WHERE url = ?", { replacements: [url],type: sequelize.QueryTypes.UPDATE});
}

//获得首页当中5条最新的文章
Article.getIndex=function(NavId,callback)
{
  sequelize.query("select * from article WHERE NavId= ? ORDER BY id DESC LIMIT 5", {replacements: [NavId], type: sequelize.QueryTypes.SELECT}).then(function(res)
                   {
                     callback(res);
                   });
};