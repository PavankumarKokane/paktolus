!function(d){"use strict";d(document).ready(function(){var e=d(window).width(),t=document.querySelector(".navbar-toggler"),o=document.querySelector(".collapse");function n(e){d("."+e).slick({dots:!1,infinite:!0,speed:300,slidesToShow:3,slidesToScroll:1,prevArrow:d(".arrow-btn.prev"),nextArrow:d(".arrow-btn.next"),responsive:[{breakpoint:640,settings:{slidesToShow:1,slidesToScroll:1}}]})}t.addEventListener("click",function(){var e=o.classList.contains("show");o.classList.toggle("show",!e)}),e<640&&d(".nav-link").click(function(){d(".collapse").removeClass("show")}),d(".nav-link").click(function(){d(".nav-link").removeClass("active"),d(this).addClass("active")}),d(".scroll-sec").click(function(){var e=d(this).attr("rel"),e=d("#"+e).offset().top-100;d("html, body").animate({scrollTop:e},100)}),n("room-1"),d(".tab-link").click(function(){var e=d(this).attr("data-room");d(".tab-link").removeClass("active"),d(".slider-box").removeClass("active"),d(this).addClass("active");["room-1","room-2","room-3","room-4"].forEach(e=>{d("."+e).hasClass("slick-initialized")&&d("."+e).slick("unslick")}),d(".slider-box.room-"+e).addClass("active"),n("room-"+e)}),d(".lang-div a").click(function(){d(".lang-div a").removeClass("active"),d(this).addClass("active")}),d("#inquiry-form input").attr("autocomplete","one-time-code"),d("#inquiry-form input").on("copy paste",function(e){e.preventDefault()});const r=document.querySelectorAll(".alpha-only"),i=(r.forEach(function(e){e.addEventListener("beforeinput",function(e){var t;"deleteContentBackward"!==e.inputType&&(t=this.value,/^[a-zA-Z ]$/.test(e.data)&&(" "!==e.data||0!==t.length)||e.preventDefault())})}),document.querySelectorAll(".numeric-only"));function a(e,t,o){var n,r="";o&&((n=new Date).setTime(n.getTime()+24*o*60*60*1e3),r="; expires="+n.toUTCString()),document.cookie=e+"="+(t||"")+r+"; path=/"}function s(e){for(var t=e+"=",o=document.cookie.split(";"),n=0;n<o.length;n++){for(var r=o[n];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return null}function c(){var e=function(e){var t={},o=document.createElement("a");o.href=e;for(var n=o.search.substring(1).split("&"),r=0;r<n.length;r++){var i=n[r].split("=");t[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return t}(window.location.href),t=e.utm_source,o=e.utm_medium,n=e.utm_campaign;e.utm_term,e.utm_content;t&&a("utm_new_source",t,7),o&&a("utm_new_medium",o,7),n&&a("utm_new_campaign",n,7)}i.forEach(function(e){e.addEventListener("beforeinput",function(e){"deleteContentBackward"===e.inputType||/^\d$/.test(e.data)||e.preventDefault()})});var l=s("utm_new_source"),l=(console.log(l,"What is this"),null===l||""==l?(c(),console.log("UTM Cookies set")):console.log("UTM Cookies already set"),s("utm_new_source")),u=s("utm_new_campaign"),m=s("utm_new_medium");console.log(l,u,m),d(".form-success, .form-error").hide(),d("#inquiry-form").submit(function(e){e.preventDefault();d(this);e={first_name:""+d("#fname").val(),last_name:""+d("#lname").val(),email:""+d("#email").val(),mobile:""+d("#phone").val(),inquiry:""+d("[name=inquiry]:checked").val(),message:""+d("#message").val(),utm_source:""+l,utm_medium:""+m,utm_campaign:""+u};console.log(JSON.stringify(e)),d.ajax({type:"POST",url:"https://paktolus-backend.vercel.app/api/addlead",data:JSON.stringify(e),success:function(e){console.log(e),(e.response?(d("#inquiry-form").trigger("reset"),d(".form-success").show(),d(".form-error")):(d(".form-error").show(),d(".form-success"))).hide()},error:function(e){console.log(e),d(".form-error").show(),d(".form-success").hide()}})})})}.call(window,window.jQuery);