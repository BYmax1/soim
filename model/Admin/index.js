var admin=require('./connect').Admin;//article表对象
 

var Admin=module.exports={};

//保存文章到数据库
Admin.get=function(account,callback)
{	
  admin.findOne
  (
    { where: { account: account } }
  ).then(function(res)
  {
    callback(res);
  });
};
