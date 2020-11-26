var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 200;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};
window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML =
    ".typewrite > .wrap { border-right: 1px solid #fff; padding-right:2px}";
  document.body.appendChild(css);
};
jQuery(window).load(function () {
  "use strict";
  // Loader
  $(".loader .inner").fadeOut(500, function () {
    $(".loader").fadeOut(750);
  });

  //type writer

  // Portfolio
  var $container = $(".portfolio-items");
  $container.isotope({
    filter: "*",
    animationOptions: {
      duration: 1500,
      easing: "linear",
      queue: false,
    },
  });

  $("#filters a").click(function () {
    $("#filters .current").removeClass("current");
    $(this).addClass("current");

    var selector = $(this).attr("data-filter");
    $container.isotope({
      filter: selector,
      animationOptions: {
        duration: 1500,
        easing: "linear",
        queue: false,
      },
    });
    return false;
  });
});

$(document).ready(function () {
  "use strict";
  // Scroll
  $(".scrollto").click(function (e) {
    e.preventDefault();
    var scrollElm = $(this).attr("href");
    var scrollTo = $(scrollElm).offset().top;
    $("html, body").animate({ scrollTop: scrollTo - 50 }, "slow");
  });

  // Slides
  $("#slides").superslides({
    animation: "fade",
    play: 5000,
  });

  // Skills
  var owl = $("#skills-slide");
  owl.owlCarousel({
    autoPlay: true,
    items: 4,
    itemsDesktop: [1000, 4],
    itemsDesktopSmall: [900, 3],
    itemsTablet: [600, 2],
    itemsMobile: [480, 1],
  });

  var a = 0;
  $(window).scroll(function () {
    var oTop = $("#fact-counter").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $(".counter-value").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },

          {
            duration: 2000,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            },
          }
        );
      });
      a = 1;
    }
  });

  // Portfolio modal
  $(".fullwidth").boxer();

  // Animations
  var windowH = $(window).height();

  $(window).bind("resize", function () {
    windowH = $(window).height();
  });

  $(".hidethis").bind("inview", function (event, visible) {
    if (visible === true) {
      $(this).removeClass("hidethis");
    }
  });

  var servicesTopOffset = $(".services .services-inner").offset().top;
  var timelineTopOffset = $(".timeline").offset().top;
  var skillsTopOffset = $(".skills").offset().top;
  $(window).scroll(function () {
    // Fixed Navbar

    $(".navbar-flat").addClass("navbar-fixed-top");
    $(".firstSec").addClass("fixed");

    // Timeline animation
    if (window.pageYOffset > timelineTopOffset - windowH + 200) {
      $(".timeline li").addClass("fadeInUp");
    }
    // Skills Chart animation
    if (window.pageYOffset > skillsTopOffset - windowH + 200) {
      $(".chart").easyPieChart({
        easing: "easeInOut",
        barColor: "#ffffff",
        trackColor: "#d82c2e",
        scaleColor: false,
        lineWidth: 4,
        size: 152,
        onStep: function (from, to, percent) {
          $(this.el).find(".percent").text(Math.round(percent));
        },
      });
    }
  });
});
