var nav=require('./connect');
var Nav=module.exports={};


Nav.getAll=function(callback)
{
     nav.findAll().then(function (res) {
     	       console.log(res[0].NavName);
               callback(res);
             })
}