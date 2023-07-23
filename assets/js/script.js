$(document).ready(function() {
    //cursor effect
    var scrollArea = $("body");
    var cursorShadowOuter = $('.cursor-effect-outer');
    var cursorShadowInner = $('.cursor-effect-inner');
    var cursorTimer;
   if (isMobileDevice()) {
       $('a,button,div.card,div.services').off("hover")
   }

    function updateShadowPosition(x, y) {
      if (!isMobileDevice()) {
        const { left: scrollAreaLeft, top: scrollAreaTop } = scrollArea.offset();

        const posX = x - scrollAreaLeft;
        const posY = y - scrollAreaTop;
        
        setTimeout(function() {
          cursorShadowOuter.css({
            display: 'block',
            left: `${posX - 15}px`,
            top: `${posY - 15}px`
          });
        }, 50);
        cursorShadowInner.css({
          display: 'block',
          left: `${posX - 2}px`,
          top: `${posY - 2}px`
        });
      }  
    }
    function handleMouseMove(event) {
        const { pageX, pageY } = event;
        updateShadowPosition(pageX, pageY);
    }
    scrollArea.on('mousemove', handleMouseMove);
    $(window).on('mouseleave', function() {
     setTimeout(function(){   
       cursorShadowInner.css("display","none"),
       cursorShadowOuter.css("display","none")},100
     );
    });

    $('a,button,div.card,div.services').on('mouseenter', function(event) {
        $(".cursor-effect-outer").addClass("active");
        $(".cursor-effect-inner").addClass("active");
    });
    $('a,button,div.card,div.services').on('mouseleave', function(event) {
        $(".cursor-effect-outer").removeClass("active");
        $(".cursor-effect-inner").removeClass("active");
    });
      
    $("div.card").on("mouseenter", function() {
        var percentage = $(this).children(".circle").children(".percent").attr("value");
        var progressValue = 0;
        var circle = $(this).children(".circle");
        let progress = setInterval(function () {
          if (progressValue <= percentage) {
            circle.children(".percent").text(progressValue + "%");
            circle.css("background", 'conic-gradient(#48C5B6 ' + progressValue * 3.6 + 'deg,#266d65 ' + progressValue * 3.6 + 'deg)');
          } else {
            clearInterval(progress);
          }
          progressValue++;
        }, 20);
    });
      
    $("div.services").on("click", function() {
          if ($(this).hasClass("active")) {
            $(this).removeClass("active"); 
          } else {
            $(this).addClass("active").siblings().removeClass("active");
            var clickedService = $(this);
            setTimeout(function() {
              clickedService.removeClass("active");
            }, 5000);
          }
    });
  $(window).scroll(function(){
    toggleUpButton()
    checkBoxes()
    onScroll()
  })
});

//nav functions ------------------------
function menuButton(element){
    if($(element).attr("class") === "menu-button"){
        $(element).children("i").hide(200);
        $(element).children("span").show(200);
        $(element).addClass("active");
        $(".menu-list").animate({left:'0',opacity:'1'});
    }else{
        $(element).children("i").show(200);
        $(element).children("span").hide();
        $(element).removeClass().addClass("menu-button");
        $(".menu-list").animate({left:'100%',opacity:'0'});
    }
}
function selectPage(element){
    $(element).siblings().removeClass("active");
    $(element).addClass("active");
    $(".menu").removeClass().addClass("menu");
    $(".menu-button").children("i").show(200);
    $(".menu-button").children("span").hide();
    $(".menu-button").removeClass().addClass("menu-button");
    $(".menu-list").animate({left:'100%',opacity:'0'});
}
function isPastHeader() {
  const header = $('header');
  const headerBottom = header.offset().top + header.outerHeight();
  return headerBottom <= $(window).scrollTop();
}
function toggleUpButton() {
  const upButton = $('.up-button');
  if (isPastHeader()) {
    upButton.show();
  } else {
    upButton.hide();
  }
}
function scrollUp() {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
}
//service
// skills
function displaycirclePercent() {
  var progressValues = {};

  var getElements = $(".skills-content .card");
  $.each(getElements, function (index, element) {
    var percentage = $(element).children(".circle").children(".percent").attr("value");
    var deduction = 100 - percentage;
    var circle = $(element).children(".circle");

    if (!progressValues[index]) {
      progressValues[index] = { value: 0, intervalId: null };
    }

    progressValues[index].intervalId = setInterval(function () {
      progressValues[index].value++;

      if (progressValues[index].value <= parseInt(percentage)) {
        $(element).children(".circle").children(".percent").text(progressValues[index].value + "%");
        circle.css("background", 'conic-gradient(#48C5B6 ' + progressValues[index].value * 3.6 + 'deg,#266d65 ' + progressValues[index].value * 3.6 + 'deg)');
      } else {
        clearInterval(progressValues[index].intervalId);
      }
    }, 10);
  });
}

// function scroll
function checkBoxes(){
  //mobile view effects
  //service-effects
  const bottomTrigger1 = window.innerHeight/4.5*4;
  var getElements = $(".service-content .services");
  $.each(getElements, function(index, elements){
    const boxTop1 = elements.getBoundingClientRect().top;
    if(boxTop1<bottomTrigger1){
      $(elements).addClass("show");
    }else{
     $(elements).removeClass("show");
    }
  });
  //skills effects
  const bottomTrigger2 = window.innerHeight/4.5*4;
  var getElements = $(".skills-content .card");
  $.each(getElements, function(index, elements){
    const boxTop2 = elements.getBoundingClientRect().top;
    if(boxTop2<bottomTrigger2){
      $(elements).addClass("show");
    }else{
      $(elements).removeClass("show");
    }
  });
}
// contacts
function moreContacts(){
  $('html, body').animate({
    scrollTop: $('#Contacts').offset().top
  }, 'slow');
}
function scrollMenu(element){
  var page = ""
    switch ($(element).text()) {
      case "Home":
        page = "#Banner"
        break;
      case "About":
        page = "#About"
        break;
      case "Services":
        page = "#Service"
        break;
      case "Skills":
        page = "#Skills"
        break;
      case "Projects":
        page = "#Projects"
        break;
      case "Education":
        page = "#Education"
        break;
      
      default:
        break;
    }
    $('html, body').animate({
      scrollTop: $(page).offset().top
    }, 'slow');
}
// function to  check if the website is being  open in mobile
function isMobileDevice() {
  const mobileKeywords = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  const userAgent = navigator.userAgent;
  return mobileKeywords.test(userAgent);
}
function disableHoverOnMobile() {
  if (isMobileDevice()) { // Adjust the width threshold as per your requirements
    $('a,button,div.card,div.services').addClass("disabled-hover"); // Add the class to disable hover effects
  } else {
    $('a,button,div.card,div.services').removeClass("disabled-hover"); // Remove the class to enable hover effects
  }
}
//check the nearest element in vuew
function isElementInViewport(elem) {
  var rect = elem.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function onScroll() {
  var sections = $(".elements");

  $.each(sections, function(index, element) {
      var top = window.scrollY;
      var offset = element.offsetTop - 150;
      var height = element.offsetHeight;

      if (top >= offset && top < offset + height) {
          $(element).addClass("animate");
          $(".text-label").text($(element).attr('title'))
          transActiveMuenu($(element).attr('title'))
          if($(element).attr('title') == "Services"){
            $(".view-service-details").show()
          }else{
            $(".view-service-details").hide()
          }
      } else {
          $(element).removeClass("animate");
      }
  });
}
function transActiveMuenu(text){
  $.each($(".menu-list").children(), function(index,elememt){
    if($(elememt).text() === text){
       $(elememt).addClass("active")
       $(elememt).siblings().removeClass("active")
    }
  });
}