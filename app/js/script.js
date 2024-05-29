!function ($) {
  "use strict";

  $(document).ready(function () {

    var winWd = $(window).width();

    var toggler = document.querySelector(".navbar-toggler");
    var collapse = document.querySelector(".collapse");

    toggler.addEventListener("click", function () {
      var isCollapsed = collapse.classList.contains("show");
      collapse.classList.toggle("show", !isCollapsed);
    });

    if(winWd < 640){
      $('.nav-link').click(function(){
        $('.collapse').removeClass('show');
      });
    }

    $(".nav-link").click(function () {
      $(".nav-link").removeClass("active");
      $(this).addClass("active");
    });

    $('.scroll-sec').click(function(){
      var scoll_sec = $(this).attr('rel');
      var sec_top = $('#'+scoll_sec).offset().top - 100;
      var scrollto =  sec_top;
      $('html, body').animate({scrollTop:scrollto}, 100);
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

    // Contact Form validations

    $("#inquiry-form input").attr("autocomplete", "one-time-code");
    $("#inquiry-form input").on("copy paste", function (e) {
      e.preventDefault();
    });

    const alphaOnly = document.querySelectorAll(".alpha-only");
    alphaOnly.forEach(function (element) {
      element.addEventListener("beforeinput", function (event) {
        if (event.inputType === "deleteContentBackward") {
          return;
        }
        var value = this.value;
        if (
          !/^[a-zA-Z ]$/.test(event.data) ||
          (event.data === " " && value.length === 0)
        ) {
          event.preventDefault();
        }
      });
    });

    const numericOnly = document.querySelectorAll(".numeric-only");
    numericOnly.forEach(function (element) {
      element.addEventListener("beforeinput", function (event) {
        // Check if the input is the backspace key
        if (event.inputType === "deleteContentBackward") {
          // If it is, allow the input
          return;
        }

        // Check if the input is not a number
        if (!/^\d$/.test(event.data)) {
          // If it's not allowed, cancel the input event
          event.preventDefault();
        }
      });
    });

    // Function to set a cookie
    function setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
      var nameEQ = name + "=";
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == " ") {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }
      return null;
    }

    // Function to parse URL parameters
    function getUrlParams(url) {
      var params = {};
      var parser = document.createElement("a");
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
      return params;
    }

    // Function to set UTM parameters as cookies
    function setUTMCookies() {
      var urlParams = getUrlParams(window.location.href);
      var utmSource = urlParams["utm_source"];
      var utmMedium = urlParams["utm_medium"];
      var utmCampaign = urlParams["utm_campaign"];
      var utmTerm = urlParams["utm_term"];
      var utmContent = urlParams["utm_content"];

      if (utmSource) {
        setCookie("utm_new_source", utmSource, 7);
      }
      if (utmMedium) {
        setCookie("utm_new_medium", utmMedium, 7);
      }
      if (utmCampaign) {
        setCookie("utm_new_campaign", utmCampaign, 7);
      }
    }

    var utmSource = getCookie("utm_new_source");

    console.log(utmSource, "What is this");

    if (utmSource === null || utmSource == "") {
      setUTMCookies();
      console.log("UTM Cookies set");
    } else {
      console.log("UTM Cookies already set");
    }

    var utmSource = getCookie("utm_new_source");
    var utmCampaign = getCookie("utm_new_campaign");
    var utmMedium = getCookie("utm_new_medium");
    console.log(utmSource, utmCampaign, utmMedium);

    $(".form-success, .form-error").hide();

    // Form Submit Ajax Call
    $("#inquiry-form").submit(function (e) {
      e.preventDefault();

      var form = $(this);
      const first_name = $("#fname").val();
      const last_name = $("#lname").val();
      const email = $("#email").val();
      const phone = $("#phone").val();
      const inquiry = $("[name=inquiry]:checked").val();
      const message = $("#message").val();
      var formData = {
        "first_name": `${first_name}`,
        "last_name": `${last_name}`,
        "email": `${email}`,
        "mobile": `${phone}`,
        "inquiry": `${inquiry}`,
        "message": `${message}`,
        "utm_source": `${utmSource}`,
        "utm_medium": `${utmMedium}`,
        "utm_campaign": `${utmCampaign}`,
      };

      console.log(JSON.stringify(formData));

      $.ajax({
        type: "POST",
        url: "https://paktolus-backend.vercel.app/api/addlead",
        data: JSON.stringify(formData),
        success: function (data) {
          console.log(data);
          if (data.response) {
            $("#inquiry-form").trigger("reset");
            $(".form-success").show();
            $(".form-error").hide();
          } else {
            $(".form-error").show();
            $(".form-success").hide();
          }
        },
        error: function (data) {
          console.log(data);
          $(".form-error").show();
          $(".form-success").hide();
        },
      });
    });


  });
}.call(window, window.jQuery);
