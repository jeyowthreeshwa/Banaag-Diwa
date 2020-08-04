
var num0 = 0;
var num1 = 0;
var num2 = 0;
var allowScroll = true;

const MAX_PAGES = 8; // change depending on number of pages

// always reset to #0
$('html, body').animate({
    scrollTop: $("#0").offset().top
}, {
    duration: 1000
});

var banaagpresent = true;

function scrll_move(){
  $(".scrll_arrw").animate({
    top: "82vh"
  }, {
      duration: 1000,
  });
  $(".scrll_arrw").animate({
    top: "80vh"
  }, {
    duration: 1000,
  });
}


function chckgdlns(){
  $('html, body').animate({
    scrollTop: $("#4").offset().top
  }, {
    duration: 1000,
    complete: function () {
        allowScroll = true;
    }
  });  
  $("#banaag").animate({left: "-=250px", opacity: "0"}, {
    duration: 1000
  });
  banaagpresent = false;
  $("#dot0").addClass('is-deselected');
  $("#dot0").removeClass('is-selected');
  $("#dot4").removeClass('is-deselected');
  $("#dot4").addClass('is-selected');
  num1 = 4;
  $(".scrll_arrw").animate({opacity: "0"}, {
    duration: 1000
  });
}

function sbmt_e(){
  $('html, body').animate({
    scrollTop: $("#8").offset().top
  }, {
    duration: 1000,
    complete: function () {
        allowScroll = true;
    }
  });  
  $("#banaag").animate({left: "-=250px", opacity: "0"}, {
    duration: 1000
  });
  banaagpresent = false;
  $("#dot0").addClass('is-deselected');
  $("#dot0").removeClass('is-selected');
  $("#dot8").removeClass('is-deselected');
  $("#dot8").addClass('is-selected');
  num1 = 8;
  $(".scrll_arrw").animate({opacity: "0"}, {
    duration: 1000
  });
}


$(`#dot${num1}`).addClass('is-selected');
$(window).bind('mousewheel', function(event) {
    num0 = event.originalEvent.wheelDelta/120;
    if (allowScroll) {
        allowScroll = false;
        if (num0 < 0) {
            // downscroll code
            num1++;
            num2 = 1;
            if (num1 === 1) {
                $("#banaag").animate({left: "-=250px", opacity: "0"}, {
                    duration: 1000
                });
                banaagpresent = false;
            }
            if (num1 > 0) {
              $(".scrll_arrw").animate({opacity: "0"}, {
                duration: 500
              });
            }
            
            if(num1 == 5){
              fix_gdlns();
            }


            if (num1 > MAX_PAGES) {
                num1 = MAX_PAGES;
            }
        } else if (num0 > 0) {
            // upscroll code
            num1--;
            num2 = -1;
            if (num1 === 0) {
                $("#banaag").animate({left: "+=250px", opacity: "1"}, {
                    duration: 1000
                });
                banaagpresent = true;
                $(".scrll_arrw").animate({opacity: "1"}, {
                  duration: 1000
                });
            }
            if (num1 < 0){
                num1 = 0;
            }
        }
        $('html, body').animate({
            scrollTop: $(`#${num1}`).offset().top
        }, {
            duration: 1000,
            complete: function () {
                allowScroll = true;
            }
        });
        
        $(`#dot${num1-num2}`).addClass('is-deselected');
        $(`#dot${num1-num2}`).removeClass('is-selected');
        $(`#dot${num1}`).removeClass('is-deselected');
        $(`#dot${num1}`).addClass('is-selected');
    }
});

function back_to_top(){
  allowScroll = false;
  $('html, body').animate({
    scrollTop: $("#0").offset().top
  }, {
      duration: 1000,
      complete: function () {
          allowScroll = true;
      }
  });
  num1 = 0;
  $("#dot8").addClass('is-deselected');
  $("#dot8").removeClass('is-selected');
  $("#dot0").removeClass('is-deselected');
  $("#dot0").addClass('is-selected');
  $("#banaag").animate({left: "+=250px", opacity: "1"}, {
    duration: 1000
  });
  banaagpresent = true;
  $(".scrll_arrw").animate({opacity: "1"}, {
    duration: 1000
  });
}


function dot_go_to(dot_num){
  allowScroll = false;
  $('html, body').animate({
    scrollTop: $(`#${dot_num}`).offset().top
  }, {
      duration: 1000,
      complete: function () {
          allowScroll = true;
      }
  });
  
  if(dot_num === 0){
    $(".scrll_arrw").animate({opacity: "1"}, {
      duration: 1000
    });
  }
  if(dot_num != 0){
    $(".scrll_arrw").animate({opacity: "0"}, {
      duration: 1000
    });
  }
  if(dot_num === 0 && banaagpresent == false){
    $("#banaag").animate({left: "+=250px", opacity: "1"}, {
      duration: 1000
    });
    banaagpresent = true;
  }
  if(dot_num != 0 && banaagpresent == true){
    $("#banaag").animate({left: "-=250px", opacity: "0"}, {
      duration: 1000
    });
    banaagpresent = false;
  }
  $(`#dot${num1}`).addClass('is-deselected');
  $(`#dot${num1}`).removeClass('is-selected');
  $(`#dot${dot_num}`).removeClass('is-deselected');
  $(`#dot${dot_num}`).addClass('is-selected');
  
  num1 = dot_num;
}
       
/*
var rect = element.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);
var bodyRect = document.body.getBoundingClientRect(),
    elemRect = element.getBoundingClientRect(),
    offset   = elemRect.top - bodyRect.top;

alert('Element is ' + offset + ' vertical pixels from <body>');


var left1 = document.getElementById("left1");
left1.style.position = "fixed":
left1.style.position = "absolute";
*/

/* 
//-------set "Guidelines" to position:fixed----------
//https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
//https://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element-relative-to-the-browser-window
//http://jsbin.com/wigaca/1/edit?html,console,output
function fix_gdlns(){
  var elemRect = document.html.getBoundingClientRect(),
      offsetTop   = elemRect.top - 20,
      offsetLeft   = elemRect.left;

  document.getElementById("bdy-gdlns1").style.position = "fixed";
  console.log('done fixed');
  document.getElementById("bdy-gdlns1").style.top = `${offsetTop}px`;
  console.log(offsetTop);
  document.getElementById("bdy-gdlns1").style.left = `${offsetLeft}px`;
  console.log(offsetLeft);
}
*/
