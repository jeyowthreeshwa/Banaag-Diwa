

$(document).ready(function() {
  
    //document.body.scrollTop = 0; // For Safari
    //document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    $('#submission').bind('change', function() {
        $('#docus').hide();
        $('#imgs').hide();
        $('#sbmt_btn').hide();
        $('#titlediv').hide();
        $('#pdf_only').hide();
        var sub_value = $(this).val();

        if (sub_value) {
          if (sub_value.length){    
            $('#docus').show();
            $('#sbmt_btn').show();
            $('#titlediv').show();
            $('#pdf_only').show();
            document.getElementById("submission").style.color = "white";
            document.getElementById("floating_subtype").setAttribute(
              "style", "top: 5px; left: 10px; opacity: 1; font-size: x-small;");
            if(sub_value == "0"){
              $('#imgs').show();
            }
          }
        }

    }).trigger('change');
    $('#yrlvl').bind('change', function() {
      var sub_value2 = $(this).val();
      
      if (sub_value2) {
        if (sub_value2.length){
          document.getElementById("yrlvl").style.color = "white";
          document.getElementById("floating_yrlvl").setAttribute(
            "style", "top: 5px; left: 10px; opacity: 1; font-size: x-small;");
        }
      }

    }).trigger('change');

    document.querySelector("#f_1").addEventListener('change', function() {
      if (this.files && this.files[0]) {
        $('#pdf_only').hide();
      }
    });
});




function line_in(f_number) {
    $(`#line${f_number}`).stop().animate({width: "100%"}, {
      duration: 300
    });
}
function line_out(f_number) {
  $(`#line${f_number}`).stop().animate({width: "0%"}, {
    duration: 300
  });
}

var banaagpresent = true , 
    allowScroll = true;

var $window = $(window);
var div = document.getElementById('covid_id');
var orig = div.getBoundingClientRect();
orig_y = orig.top;

var distance = $(".logo").offset().top,
    $window = $(window);


$window.scroll(function() {
  if(allowScroll){
    if ( $window.scrollTop() >= distance && banaagpresent == true) {
      allowScroll = false;
      $("#banaag").stop().animate({left: "-=250px", opacity: "0"}, {
        duration: 300, 
        complete: function () {
          allowScroll = true;
        }
      });
      banaagpresent = false;
    }
    else if ( $window.scrollTop() < distance && banaagpresent == false) {
      allowScroll = false;
      $("#banaag").stop().animate({left: "+=250px", opacity: "1"}, {
        duration: 300,
        complete: function () {
          allowScroll = true;
        }
      });
      banaagpresent = true;
    }
  }
});

/*$window.scroll(function() {
  if(allowScroll){
    var rect = div.getBoundingClientRect();
    y = rect.top;
    if (y != orig_y && banaagpresent == true) {
      allowScroll = false;
      $("#banaag").stop().animate({left: "-=250px", opacity: "0"}, {
        duration: 300, 
        complete: function () {
          allowScroll = true;
        }
      });
      banaagpresent = false;
    }
    else if ( y == orig_y && banaagpresent == false) {
      allowScroll = false;
      $("#banaag").stop().animate({left: "+=250px", opacity: "1"}, {
        duration: 300,
        complete: function () {
          allowScroll = true;
        }
      });
      banaagpresent = true;
    }
  }
});*/

function upload_details(file_num){
    var x = document.getElementById(`f_${file_num}`);
    var txt = "";
    if ('files' in x) {
      if (x.files.length == 0) {
        txt = "Select one or more files.";
      } else {
        for (var i = 0; i < x.files.length; i++) {
          //txt += "<strong>" + (i+1) + ".</strong> ";
          txt += " ";
          var file = x.files[i];
          if ('name' in file) {
            txt += file.name;
          }
          if (i+1 != x.files.length){
            txt +=", "  
          }
        }
      }
    } 
    else {
      if (x.value == "") {
        txt += "Select one or more files.";
      } else {
        txt += "The files property is not supported by your browser!";
        txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
      }
    }
    document.getElementById(`output_${file_num}`).innerHTML = txt;
}

function clearForm() {
  document.getElementById("fullname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("yrlvl").value = null;
  document.getElementById("course").value = null;
  document.getElementById("submission").value = "";
  document.getElementById("f_1").value = null;
  document.getElementById("f_2").value = null;
  document.getElementById("title").value = "";
  document.getElementById("output_1").innerHTML = "";
  document.getElementById("output_2").innerHTML = "";
}

async function postToWP(data) {
  document.getElementById("form_submit").disabled = true;
  document.getElementById("form_submit").value = "Please wait...";

  // change url of this to actual rest api plugin
  //axios.post('http://atenewswp.lan/wp-json/atenews/v1/banaag_diwa_submit', data, {
  axios.post('https://wp.atenews.ph/wp-json/atenews/v1/banaag_diwa_submit', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    if (res.data.success) {
      Swal.fire({
        title: 'Successfully submitted work!',
        text: '',
        icon: 'success',
        confirmButtonText: 'Confirm'
      })
      clearForm();
    } else {
      Swal.fire({
        title: res.data.error,
        text: '',
        icon: 'error',
        confirmButtonText: 'Confirm'
      })
    }
    document.getElementById("form_submit").disabled = false;
    document.getElementById("form_submit").value = "Submit";
    console.log(res);
  }).catch((err) => {
    Swal.fire({
      title: 'Network error',
      text: '',
      icon: 'error',
      confirmButtonText: 'Confirm'
    })
    document.getElementById("form_submit").disabled = false;
    document.getElementById("form_submit").value = "Submit";
    console.log(err);
  })
}

$("#submission_form").submit(function(e) {
  e.preventDefault();
  grecaptcha.ready(function() {
    grecaptcha.execute('6LfAxswZAAAAABJNdXX5L0onxMkM4Sqk_1X-vMw7', {action: 'submit'}).then(function(token) {
      // Add your logic to submit to your backend server here.
      var formData = new FormData();
      formData.append("recaptcha_token", token);
      formData.append("name", document.getElementById("fullname").value);
      formData.append("email", document.getElementById("email").value,);
      formData.append("year", document.getElementById("yrlvl").value);
      formData.append("course", document.getElementById("course").value);
      formData.append("type", document.getElementById("submission").value);
      formData.append("document", document.getElementById("f_1").files[0]);

      for (var i = 0; i < document.getElementById("f_2").files.length; i++) {
        formData.append('images[]', document.getElementById("f_2").files[i]);
      }

      formData.append("title", document.getElementById("title").value);
      
      postToWP(formData);
    });
  });
});




