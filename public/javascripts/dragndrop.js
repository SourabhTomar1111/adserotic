AD = window.AD || {};

AD.dragndrop = true;
// console.log(AD);

// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("sb-drag-holder");
let inputEle = document.getElementById("sb-uploadfile");

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  //   document.body.addEventListener(eventName, preventDefaults, false)
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Handle browsed files
dropArea.addEventListener('change', handleChange, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('active');
  dropArea.classList.remove('highlight');
}

function handleChange(e) {
  var files = e.target.files;
  handleFiles(files);
}

function handleDrop(e) {
  var dt = e.dataTransfer;
  var files = dt.files;

  handleFiles(files);
}

let uploadProgress = [];
let progressBar = document.getElementById('progress-bar');

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgress.push(0);
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
  progressBar.value = total;
}

function handleFiles(files) {
  files = [...files];
  initializeProgress(files.length);

  console.log(files);
  //for one by one upload code for multiple images
  // files.forEach(uploadFile);
  // files.forEach(previewFile);

  //for fulk upload files
  bulkUploadFiles(files);
  bulkPreviewFiles(files);

}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '100px';
    img.src = reader.result;
    document.getElementById('gallery').appendChild(img);
  }
}

function uploadFile(file, i) {
  var url = '/media/add';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100); // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })

  formData.append('action', 'static_banner');
  formData.append('upload_preset', 'ujpu6gyk');
  formData.append('file', file);
  xhr.send(formData);
}


function bulkPreviewFiles(files) {
  files.forEach(function (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.createElement('img');
      img.style.width = '100px';
      img.style.height = '100px';
      img.src = reader.result;
      document.getElementById('gallery').appendChild(img);
    }
  });
}

function bulkUploadFiles(files) {
  var i = 0;
  var url = '/media/add';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100); // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  })



  formData.append('action', 'static_banner');
  formData.append('upload_preset', 'ujpu6gyk');

  //handle multiple imamges
  files.forEach(function (file, j) {    
    formData.append('photo', file);
  });  

  // formData.append('photo[]', files);
  
  xhr.send(formData);
}
