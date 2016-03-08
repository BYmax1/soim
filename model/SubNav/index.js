var nav=require('./connect');
var Nav=module.exports={};


Nav.getAll=function(navId,callback)
{   
	 
  nav.findAll({ where: { NavId: navId } }).then(function(res)
   {
  	 console.log(res[0].SubNavName);
     callback(res);
})

}