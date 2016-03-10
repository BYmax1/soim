var express = require('express');
var router = express.Router();

var fs=require('fs');

var Nav=require('../model/Nav');
var SubNav=require('../model/SubNav');
var Article=require('../model/Article');
var Admin=require('../model/Admin');

//获得首页
router.get('/', function(req, res, next) 
{

 

Article.getIndex(11,function(xytz)
{
   Article.getIndex(12,function(jxky)
   {
         Article.getIndex(13,function(yjsjy)
   {
         Article.getIndex(14,function(xsgz)
   {
           Article.getIndex(15,function(xsgg)
   {
         Article.getIndex(16,function(fwzl)
   {
         res.render('index', {title: '江西财经大学信息管理学院',xytz:xytz,jxky:jxky,yjsjy:yjsjy,xsgz:xsgz,xsgg:xsgg,fwzl:fwzl});   
   })
   })
   })
   })
   })    
});

 
});

 

//获得文章列表
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
      if(number==0)
        pages=0;
      else
        pages=number/15+1;
       Article.get(PageId,NavId,SubNavId,function(c)
      {
        SubNav.getAll(NavId,function(subNavs){
         res.render('content-list', 
        { title: '院系介绍',subNavs:subNavs,NavId:NavId,SubNavId:SubNavId,pages:pages,articles:c,PageId:PageId});
       });
      });
  });
});

//显示文章
router.get('/article*',function(req,res,next)
{
     
    var url='./public/'+req.query.id+".html";
    var content=fs.readFileSync(url)
    content=content.toString();
    
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



//处理搜索
router.post('/search', function(req, res, next) {
   console.log(req.body['search']);  

   Article.search(req.body['search'],function(articles)
   {
        res.render('search', 
        { title: '站内搜索',articles:articles});
        
   })
  
});

//后台登录
router.get('/login', function(req, res, next) {
  res.render('login', { title: '后台登录' });
});

router.post('/login', function(req, res, next) {

  // var session=req.session;
  // session.a="123";
  // console.log(session.a);
   req.session.user=false;
   Admin.get(req.body['account'],function(r)
   {
      if(req.body['password']==r.password)
      { 
        req.session.user=true;
        res.redirect("./admin.html");
        
      } 
      else
      {
        res.redirect("./login");
      }
   })
});

//后台文章发表
router.get('/post', checkLogin);
router.get('/post', function(req, res, next) {
    res.render('post', { title: '发表文章'});//1表示发表新文章
});

router.post('/post', function(req, res, next) {
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

//后台文章管理
router.get('/manage', checkLogin);
router.get('/manage', function(req, res, next) {
  var NavId=req.query.NavId;
  var SubNavId=req.query.SubNavId;

  
  if(SubNavId===undefined)
     SubNavId=1;
  if(NavId===undefined)
     NavId=1;

  Article.get(100,NavId,SubNavId,function(c)
    {
        res.render('article-manage', 
        { title: '文章管理',NavId:NavId,SubNavId:SubNavId,articles:c});
    });//获得某一页
});

//后台文章删除
router.get('/delete*', checkLogin);
router.get('/delete*', function(req, res, next) {
    Article.destory(req.query.id);
    res.redirect('./manage');
});

//获得后台文章编辑的页面
router.get('/edit*', checkLogin);
router.get('/edit*', function(req, res, next) {

    var url='./public/'+req.query.id+'.html';
    var header=req.query.header;
    var NavId=req.query.NavId;
    var SubNavId=req.query.SubNavId;
    var content=fs.readFileSync(url);
    content=content.toString();
    res.render('ue', { title: '编辑文章',header:header,content:content,url:req.query.id,NavId:NavId,SubNavId:SubNavId });//0 表示编辑
});

//后台编辑的新文章发表
router.post('/edit*', checkLogin);
router.post('/edit*', function(req, res, next) {

    var url=req.body['url'];
    var header=req.body['header'];
    var content=req.body['content'];
    var NavId=req.body['NavId'];
    var SubNavId=req.body['SubNavId'];
    fs.writeFile('./public/'+url+'.html', content, function(err)//将原来文章覆盖
    {
    if(err)
      {
       return console.error(err);
        }
    });
    Article.edit(header,url,NavId,SubNavId);     
});

router.get('/logout',function(req, res, next)
{
  req.session.user=null;
  res.redirect('/login');
});


//判断是否登录
function checkLogin(req, res, next) {
  console.log(req.session.user);
 if (!req.session.user) 
 {
 return res.redirect('/login');
 }
 next();
}
module.exports = router;
