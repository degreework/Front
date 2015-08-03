var main = function(){
  
  $('.icon-menu').click(function() {
    $('.menu ul').slideToggle('slow')
    //$('.menu').
    /*$('.menu').animate({
      left: '0px'
    }, 200);*/
    
  });
  
  /*$('.menu').mouseleave(function(){
    $('.menu').animate({
        left:'-190px'
    },200);
    //$('.menu').toggle('slow')
    $('.menu ul').fadeOut();  
  });*/
};
 
$(document).ready(main);