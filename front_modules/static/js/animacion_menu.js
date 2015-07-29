var main = function(){
  
  $('.icon-menu').mouseover(function() {
    $('.menu').animate({
      left: '0px'
    }, 200);
    $('.menu ul').fadeIn();  
  });
  
  $('.icon-close').click(function(){
    $('.menu').animate({
        left:'-190px'
    },200);
    $('.menu ul').fadeOut();  
  });
};
 
$(document).ready(main);