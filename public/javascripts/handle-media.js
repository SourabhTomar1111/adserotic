// alert('handledl');


// function handleDrop(e) {
//     e.stopPropagation(); // Stops some browsers from redirecting.
//     e.preventDefault();

//     var files = e.dataTransfer.files;
//     for (var i = 0, f; (f = files[i]); i++) {
//       // Read the File objects in this FileList.
//     }
//   }

//   function handleDragStart(e) {
//     this.style.opacity = '0.4';
//   }

//   function handleDragEnd(e) {
//     this.style.opacity = '1';
//   }

//   let items = document.querySelectorAll('.static-banner-drag-holder');
//   items.forEach(function (item) {
//     item.addEventListener('dragstart', handleDragStart);
//     item.addEventListener('dragend', handleDragEnd);
//   });

let dropHolder = $('.static-banner-drag-holder');
// let $form = dropHolder.find('form');
// let $form = $('form#static_banner');
let $form = document.getElementById('sb_form');
let $label = document.getElementById('sb_label');
console.log($form);
// let form = $('#static_banner');

// form.on('submit', function (e) {
//   e.preventDefault();
//   submitForm(this);
// })


// let uploadedFile = dropHolder.find('.upload-file');

// if (uploadedFile.length) {
//   uploadedFile.on('change', function (e) {
//     let browsefile = e.target.files;
//     // console.log('browse file');
//     // console.log(browsefile);
//     // console.log(browsefile.length);

//     for (let i = 0; i < browsefile.length; i++) {
//       imagePreview(browsefile[i]);
//     }


//     submitForm($form);
//   });
// }


// isAdvancedUpload = true;
// if (isAdvancedUpload) {


//   let droppedFiles = false;

// form.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
//   e.preventDefault();
//   e.stopPropagation();
// })
// .on('dragover dragenter', function () {
//   $form.addClass('is-dragover');
//   $form.find('label').text('start dragged...');
// })
// .on('dragleave dragend drop', function () {
//   $form.removeClass('is-dragover');
//   $form.find('label').text('stop dragged...');
// })
// .on('drop', function (e) {

//   var files = e.originalEvent.dataTransfer.files;
//   droppedFiles = e.originalEvent.dataTransfer.files;
//   // $("#static-upload-banner")[0].files = e.originalEvent.dataTransfer.files;

//   document.getElementById('static-upload-banner').files = e.originalEvent.dataTransfer.files;

//   // uploadedFile.files = e.originalEvent.dataTransfer.files;
//   // uploadedFile.files = e.dataTransfer.files;
//   // console.log(uploadedFile);

//   console.log(droppedFiles);

//   //for multiple dropped files
//   for (let i = 0; i < droppedFiles.length; i++) {
//     imagePreview(files[0]);
//   }

//   submitForm($form);

// });

//   console.log(droppedFiles);

// }

// $form.addEventListener('drag dragstart dragend dragover dragenter dragleave drop', function (e) {
//   e.preventDefault();
//   e.stopPropagation();
// });
let multiple_events1 = "drag dragstart dragend dragover dragenter dragleave drop";
multiple_events1.split(" ").forEach(function (e) {
  window.addEventListener(e, stopDefault, false);
});

let multiple_events2 = "drop submit";
multiple_events2.split(" ").forEach(function (e) {
  window.addEventListener(e, addFilesAndSubmit, false);
});

$text = 'Drop the images here to upload them.';
let multiple_events3 = "dragenter dragover";
multiple_events3.split(" ").forEach(function (e) {
  window.addEventListener(e, dragOver.bind(e, $label, $text), false);
});


let multiple_events4 = "dragleave drop";
multiple_events4.split(" ").forEach(function (e) {
  window.addEventListener(e, dragLeave, false);
});

$form.sb_uploadfile.addEventListener('change', function (e) {
  addFilesAndSubmit(e);
});



function submitFilesForm(form) {

  let label = document.querySelector("#sb_label");
  dragOver(label, "Uploading images..."); // set the drop zone text and styling

  var fd = new FormData();

  fd.append('name','sanjay');
  // console.log(file);
  // console.log(inputfile.files);
  console.log(form.sb_uploadfile.files);
  for (var i = 0; i < form.sb_uploadfile.files.length; i++) {
    var field = form.sb_uploadfile;
    console.log(field);
    fd.append(field.name, field.files[i], field.files[i].name);
  }
  // console.log(fd);
//   for(var pair of fd.entries()) {
//     console.log(pair[0]+ ', '+ pair[1]);
//  }
  //send form to server data
//   var xhttp = new XMLHttpRequest();
// xhttp.open("POST", "ajaxfile.php", true); 
// xhttp.setRequestHeader("Content-Type", "application/json");
// xhttp.onreadystatechange = function() {
//    if (this.readyState == 4 && this.status == 200) {
//      // Response
//      var response = this.responseText;
//    }
// };
// var data = {name:'yogesh',salary: 35000,email: 'yogesh@makitweb.com'};
// xhttp.send(JSON.stringify(data));







  return false;
}

function imagePreview(file) {
  var img = document.createElement("img");
  $(img).width(150).height(200);
  var reader = new FileReader();
  reader.onloadend = function () {
    img.src = reader.result;
  }
  reader.readAsDataURL(file);

  //return img;
  $('.sb-preview-holder').html(img);
}

function stopDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}
function dragOver(label, text) {
  /* ADD ALMOST ANY STYLING YOU LIKE */
  // label.style.animationName = "dropbox";
  label.innerText = text;
}
function dragLeave(label) {
  /* THIS SHOULD REMOVE ALL STYLING BY dragOver() */
  // var len = label.style.length;
  // for (var i = 0; i < len; i++) {
  //   label.style[label.style[i]] = "";
  // }
  label.innerText = "Click to Choose Images OR Drag-n-Drop Files Here to Upload";
}
function addFilesAndSubmit(event) {
  var files = event.target.files || event.dataTransfer.files;
  document.getElementById("sb_uploadfile").files = files;
  //for multiple dropped files
  for (let i = 0; i < files.length; i++) {
    imagePreview(files[i]);
  }
  submitFilesForm(document.getElementById("sb_form"));
}