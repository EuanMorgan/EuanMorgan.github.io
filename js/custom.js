/*==================================
* Author        : With Html
* Template Name : Samrat - One Page Personal Portfolio Template
* Version       : 1.0
==================================== */




/*=========== TABLE OF CONTENTS ===========
1. Preloader
2. Menu scroll
3. Navigation Jquery
4. Smooth scroll
5. Banner Text
6. Skill Bar
7. Portfolio Showcase
8. Fact Counter 
9. Testimonial Slide
10. Scroll to Top
===========*/




(function ($) {
    'use strict';
		
	
	
// ===== 1. Preloader ==== 	

	$(window).on('load', function() {
                $('#preloader').fadeOut(300);
     });
 
 
	
// ===== 2. Menu scroll ==== 	

$(window).on('scroll', function() {
    var menu_area = $('.custom-nav');
    if ($(window).scrollTop() > 50) {
        menu_area.addClass('sticky-menu');
    } else {
        menu_area.removeClass('sticky-menu');
    }
});




// ===== 3. Navigation Jquery ==== 	

$(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});

$('.navbar-collapse a').on('click',function(){
          $(".navbar-collapse").collapse('hide');
        });

$('body').scrollspy({
    target: '.navbar-collapse',
    offset: 195
});



// ===== 4. Smooth scroll ==== 	

$('a.data-scroll').on("click", function(e) {
    e.preventDefault();
    var anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top - 50
    }, 1000);
});



// ===== 5. Banner Text ==== 

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 200;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 1px solid #fff; padding-right:2px}";
    document.body.appendChild(css);
};




// ===== 6. Skill Bar ==== 

var skillsDiv = jQuery('.skillbar');
jQuery(window).on('scroll', function(){
	var winT = jQuery(window).scrollTop(),
  	winH = jQuery(window).height(),
  	skillsT = skillsDiv.offset().top;
  if(winT + winH  > skillsT){
  	jQuery('.skillbar').each(function(){
      jQuery(this).find('.skillbar-bar').animate({
        width:jQuery(this).attr('data-percent')
      },3000);
    });
  }
});



// ===== 7. Portfolio Showcase ==== 

$('.portfolio-showcase').mixItUp();





// ===== 8. Fact Counter ==== 

var a = 0;
$(window).scroll(function() {

  var oTop = $('#fact-counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});



// ===== 9. Testimonial Slide ==== 

$(".testimonial-slide").owlCarousel({

    loop: true,
    autoPlay: false,
    navigation: false,
    pagination: true,
    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    slideSpeed: 800,
    items: 2,
    itemsDesktop: [1199, 2],
    itemsDesktopSmall: [991.98, 1],
    itemsTablet: [768, 1],
    itemsTabletSmall: false,
    itemsMobile: [380, 1]

});



// ===== 10. Scroll to Top ==== 

	var html_body = $("html,body"),
    btn_top = $(".return-to-top");
$(window).on("scroll", function() {
    if ($(window).scrollTop() > 200) {
        btn_top.fadeIn()
    } else {
        btn_top.fadeOut()
    }
});
btn_top.on("click", function() {
    html_body.animate({
        scrollTop: 0
    }, 1000)
});



})(jQuery);