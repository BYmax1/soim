$(document).ready(function(){

    $(".navbar-default .navbar-nav >li").mouseenter(function()
    {    
         $(this).children("div.nav-item-decoration").css("visibility","visible");
         $(this).find("b").css("visibility","visible");
    });
     $(".navbar-default .navbar-nav >li").mouseleave(function()
    {    
         $(this).children("div.nav-item-decoration").css("visibility","hidden");
         $(this).find("b").css("visibility","hidden");
    });
  
});