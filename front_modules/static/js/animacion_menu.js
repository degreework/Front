var main = function(){
  
  $('.icon-menu').click(function() {
    //$('.menu ul').slideToggle('slow')
    $('.menu').animate({
      left: '0px'
    }, 300);

    $('.icon-menu').hide()
    $('.icon-close').show()
    
  });
  
  $('.icon-close').click(function(){
    $('.menu').animate({
        left:'-280px'
    },300);
    
    $('.icon-menu').show()
    $('.icon-close').hide()  

  });

  
};
 
$(document).ready(main);