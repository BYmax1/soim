$(document).ready(function(){
    
     var parms;
     var flag;
     $("#side-nav a").mouseenter(function()
     {
        parms={"color":"    #FF4500","background-color":"#D3D3D3","border-left":"3px solid #48D1CC"}
        $(this).css(parms);
     });
     $("#side-nav a").mouseleave(function()
     { 
        if(flag!=1)
        parms={"color":"gray","background-color":"white","border":"none"}
        $(this).css(parms);
     });
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