var express = require('express');
var router = express.Router();
var fs=require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '江西财经大学信息管理学院' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: '江西财经大学信息管理学院' });
});


router.get('/nav*', function(req, res, next) {
  
  console.log(req.query.navId);
  res.render('content-list', { title: '院系介绍'});
});

router.get('/admin', function(req, res, next) {
  res.render('ue', { title: '发表文章' });
});

router.post('/admin', function(req, res, next) {
  

  console.log(req.body['content']);
  console.log(req.body['header']);
  fs.writeFile('./public/1.html', req.body['content'], function(err)
  {
  	if(err)
  		{
       return console.error(err);
        }
  });
 
});


module.exports = router;
