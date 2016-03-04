var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '江西财经大学信息管理学院' });
});

module.exports = router;
