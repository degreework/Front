var main = function(){
  
  $('.icon-menu').mouseover(function() {
    $('.menu').animate({
      left: '0px'
    }, 200);
  });
  
  $('.icon-close').click(function(){
    $('.menu').animate({
        left:'-100px'
    },200);
  
  });
  };
 
$(document).ready(main);