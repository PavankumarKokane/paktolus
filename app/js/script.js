!function ($) {
  "use strict";

  $(document).ready(function () {
    var toggler = document.querySelector(".navbar-toggler");
    var collapse = document.querySelector(".collapse");

    toggler.addEventListener("click", function () {
      var isCollapsed = collapse.classList.contains("show");
      collapse.classList.toggle("show", !isCollapsed);
    });

    $(".nav-link").click(function () {
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
    });

    function slider_initial(sliderClass) {
      $("." + sliderClass).slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $(".arrow-btn.prev"),
        nextArrow: $(".arrow-btn.next"),
        responsive: [
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    }

    slider_initial("room-1");

    $(".tab-link").click(function () {
      var tab_id = $(this).attr("data-room");

      $(".tab-link").removeClass("active");
      $(".slider-box").removeClass("active");

      $(this).addClass("active");
      var sliderClasses = ["room-1", "room-2", "room-3", "room-4"];
      sliderClasses.forEach((sliderClass) => {
        if ($("." + sliderClass).hasClass("slick-initialized")) {
          $("." + sliderClass).slick("unslick");
        }
      });
      $(".slider-box.room-" + tab_id).addClass("active");
      slider_initial("room-" + tab_id);
    });

    $(".lang-div a").click(function () {
      $(".lang-div a").removeClass("active");
      $(this).addClass("active");
    });
  });
}.call(window, window.jQuery);
