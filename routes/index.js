var express = require('express');
var router = express.Router();

var fs=require('fs');

var Nav=require('../model/Nav');
var SubNav=require('../model/SubNav');
var Article=require('../model/Article');


/* GET home page. */
router.get('/', function(req, res, next) 
{


Article.getIndex(10,function(xytz)
{
   Article.getIndex(11,function(jxky)
   {
     res.render('index', {title: '江西财经大学信息管理学院',xytz:xytz,jxky:jxky});
   })
    
});

 
});

 


router.get('/nav*', function(req, res, next) {
   
  var NavId=req.query.NavId;
  var SubNavId=req.query.SubNavId;
  var PageId=req.query.PageId;
  if(PageId===undefined)
     PageId=1;


  var pages;
  var articles;
  Article.count(NavId,SubNavId,function(number)
  {   
      console.log("一共有多少: "+number);
      pages=number/15+1;
       Article.get(number,PageId,NavId,SubNavId,function(c)
      {
        SubNav.getAll(NavId,function(subNavs){
         res.render('content-list', 
        { title: '院系介绍',subNavs:subNavs,NavId:NavId,SubNavId:SubNavId,pages:pages,articles:c,PageId:PageId});
       });
      });//获得某一页
  });
});

//显示文章
router.get('/article*',function(req,res,next)
{
     
    var url='./public/'+req.query.id+".html";
    var content=fs.readFileSync(url)
    content=content.toString();
    console.log("文章内容 "+content);
    var header=req.query.header;

    Article.add(req.query.id);//增加一个阅读量
    
    SubNav.getAll(req.query.NavId,function(subNavs)
    {
      res.render('article',
        {
          title:header,
          header:header,
          ArticleContent:content,
          subNavs:subNavs,
          SubNavId:req.query.SubNavId,
          PostTime:req.query.PostTime,
          ReadNum:req.query.ReadNum
        });
    })
});







//后台文章发表
router.get('/admin', function(req, res, next) {
  res.render('ue', { title: '发表文章' });
});

router.post('/admin', function(req, res, next) {
  

  console.log(req.body['content']);
  console.log(req.body['header']);
  console.log(req.body['NavId']);
  console.log(req.body['SubNavId']);
  console.log(req.body['url']);
  console.log(req.body['PostTime']);
  
  Article.save(req.body['NavId'],req.body['SubNavId'],req.body['header'],req.body['url'],req.body['PostTime']);//保存文章
  var url='./public/'+req.body['url']+'.html';
  fs.writeFile(url, req.body['content'], function(err)
  {
  	if(err)
  		{
       return console.error(err);
        }
  });
});


module.exports = router;
