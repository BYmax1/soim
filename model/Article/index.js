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


 

//获得文章列表
Article.get=function(PageId,NavId,SubNavId,callback)
{ 

  if(PageId==100)
      sequelize.query("SELECT * FROM article  where NavId=? and SubNavId=? ORDER BY id DESC", {replacements: [NavId,SubNavId], type: sequelize.QueryTypes.SELECT}).then(function(res)
                   {
                     callback(res);
                   });
  else
      sequelize.query("SELECT * FROM article WHERE id NOT IN(SELECT t.id FROM (SELECT * from article where NavId=? and SubNavId=? ORDER BY id desc limit ?)as t) and NavId=? and SubNavId=? ORDER BY id DESC LIMIT 15", {replacements: [NavId,SubNavId,(PageId-1)*15,NavId,SubNavId], type: sequelize.QueryTypes.SELECT}).then(function(res)
                   {     
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

//文章搜索
Article.search=function(header,callback)
{
  var key="%"+header+"%";
  var params={where:{header:{$like:key}}};
  article.findAll(params).then(function(res)
  {
     callback(res);
  });
}

//文章删除
Article.destory=function(url)
{
   sequelize.query("delete from article where url= ?",{replacements: [url], type: sequelize.QueryTypes.DELETE})
}

//文章编辑
Article.edit=function(header,url,NavId,SubNavId)
{
  sequelize.query("UPDATE article SET header= ?,NavId= ?,SubNavId=? WHERE url = ?", { replacements: [header,NavId,SubNavId,url],type: sequelize.QueryTypes.UPDATE});
}