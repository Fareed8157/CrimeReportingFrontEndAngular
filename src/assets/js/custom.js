$(document).ready(function()
{


  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
    
});

  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
  if (!$(this).next().hasClass('show')) {
    $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
  }
  var $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass('show');


  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
    $('.dropdown-submenu .show').removeClass("show");
  });


  return false;
});


$("#myBtn").click(function () {
    document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  });
// When the user clicks on the button, scroll to the top of the document





// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}



  // on scroll fix navbar
  
  $(document).on('scroll', function()
  {
    if($(window).scrollTop() > 120)
      {
        //window.alert($(window).scrollTop());
        $('.navbar-default').addClass('sticky-top');
      }
      else{
        $('.navbar-default').removeClass('sticky-top');
      }
  });
if(window.innerWidth == 360 || window.innerWidth == 322 || window.innerWidth == 411){
      $(".logo_line_1").css('font-size','15px');
      console.log("out 360"+window.innerWidth);
    }
    else if(window.innerWidth<=752){
       $(".logo_line_1").css('font-size','15px');
            console.log("out 752 "+window.innerWidth);
    }
  //window.alert(window.innerWidth);
  // moving loging/registration group
  if(window.innerWidth <= 752){
    
       $('#navbrand').css('display','block');
       $("#logonImage").css('height','20px');
       $("#logonImage").css('width','20px');
       $(".registerPart").css('display','none');
       console.log("inside image condition");
      //window.alert(window.innerWidth+"less 767 "+window.innerHeight);
   }

  $(window).resize(function(){
    
    // var inCreaseWidth=parseInt($(".top_bar_content").css('left'));
    //window.alert(window.innerWidth);
    // console.log(inCreaseWidth);
    // var inCreaseWidth=inCreaseWidth-2;
    // $(".counter").text(window.innerWidth+"="+inCreaseWidth);
    // $(".top_bar_content").css('left',+parseFloat(inCreaseWidth)+'px');

    if(window.innerWidth == 360 || window.innerWidth == 322 || window.innerWidth == 411 || window.innerWidth == 375
      || window.innerWidth == 414
      ){
      $(".logo_line_1").css('font-size','15px');
      console.log("in  360"+window.innerWidth);
    }
    else if(window.innerWidth <= 752){
       $(".logo_line_1").css('font-size','20px');
       console.log("in 752"+window.innerWidth);
    }

    
    if(window.innerWidth <= 752){
       $('#navbrand').css('display','block');
      
       $("#logonImage").css('height','40px');
       $("#logonImage").css('width','40px');
       $(".register_login_collapse").css('display','block');
      $(".registerPart").css('display','none');
    //     var inCreaseWidth=inCreaseWidth-2;

    // $(".counter").text(window.innerWidth+"="+inCreaseWidth);
    // $(".top_bar_content").css('left',+parseFloat(inCreaseWidth)+'px');
       
      //window.alert(window.innerWidth+"less 767 "+window.innerHeight);
   }else{
       // window.alert(window.innerWidth+"greater 767 "+window.innerHeight);
       $('#navbrand').css('display','none');
       $(".logo_line_1").css('font-size','30px');
       $("#logonImage").css('height','50px');
       $("#logonImage").css('width','50px');
        $(".registerPart").css('display','block');
    //     var inCreaseWidth=inCreaseWidth+2;
    // $(".counter").text(window.innerWidth+"="+inCreaseWidth);
    // $(".top_bar_content").css('left',+parseFloat(inCreaseWidth)+'px');
   }
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  
 



  
}); 
  
});

