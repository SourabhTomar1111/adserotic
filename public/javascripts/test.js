
// ************************ Drag and drop ***************** //
/*********
let dropAreaVB = document.getElementById("vb-drag-holder");
let inputEleVB = document.getElementById("vb-inputfile");

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropAreaVB.addEventListener(eventName, preventDefaultsVB, false);
  //   document.body.addEventListener(eventName, preventDefaults, false)
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropAreaVB.addEventListener(eventName, highlightVB, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropAreaVB.addEventListener(eventName, unhighlightVB, false);
});

// Handle dropped files
dropAreaVB.addEventListener('drop', handleDropVB, false);

// Handle browsed files
dropAreaVB.addEventListener('change', handleChangeVB, false);

function preventDefaultsVB(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlightVB(e) {
  dropAreaVB.classList.add('highlight');
}

function unhighlightVB(e) {
  dropAreaVB.classList.remove('active');
  dropAreaVB.classList.remove('highlight');
}

function handleChangeVB(e) {
  var files = e.target.files;
  handleFilesVB(files);
}

function handleDropVB(e) {
  var dt = e.dataTransfer;
  var files = dt.files;

  handleFilesVB(files);
}

let uploadProgressVB = [];
let progressBarVB = document.getElementById('vb-progress-bar');

function initializeProgressVB(numFiles) {
  progressBarVB.value = 0;
  uploadProgressVB = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgressVB.push(0);
  }
}

function updateProgressVB(fileNumber, percent) {
  uploadProgressVB[fileNumber] = percent;
  let total = uploadProgressVB.reduce((tot, curr) => tot + curr, 0) / uploadProgressVB.length;
  progressBarVB.value = total;
}

function handleFilesVB(files) {
  files = [...files];
  initializeProgressVB(files.length);

  console.log(files);
  //for one by one upload code for multiple images
  files.forEach(uploadFileVB);
  files.forEach(previewVideoFile);
  //   files.forEach(previewFile);

}

function previewVideoFile(file) {
  let blobURL = URL.createObjectURL(file);

  let vid = document.createElement('video');
  vid.style.width = 100;
  vid.style.height = 100;
  vid.src = blobURL;
  vid.controls = true;
  document.getElementById('vb-gallery').appendChild(vid);
}

function previewFileVB(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '100px';
    img.src = reader.result;
    document.getElementById('vb-gallery').appendChild(img);
  }
}

function uploadFileVB(file, i) {
  var url = '/media/add';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgressVB(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgressVB(i, 100); // <- Add this
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


function bulkPreviewFilesVB(files) {
  files.forEach(function (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.createElement('img');
      img.style.width = '100px';
      img.style.height = '100px';
      img.src = reader.result;
      document.getElementById('vb-gallery').appendChild(img);
    }
  });
}

function bulkUploadFilesVB(files) {
  var i = 0;
  var url = '/media/add';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgressVB(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgressVB(i, 100); // <- Add this
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



// AD = window.AD || {};

// AD.dragndrop = true;
// // console.log(AD);

// ************************ Drag and drop ***************** //
/********
let dropAreaOL = document.getElementById("ol-drag-holder");
let inputEleOL = document.getElementById("ol-inputfile");

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropAreaOL.addEventListener(eventName, function (e) {
    e.preventDefault();
    e.stopPropagation();
  }, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropAreaOL.addEventListener(eventName, function (e) {
    dropAreaOL.classList.add('highlight');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropAreaOL.addEventListener(eventName, function unhighlight(e) {
    dropAreaOL.classList.remove('active');
    dropAreaOL.classList.remove('highlight');
  }, false);
});

// Handle dropped files
dropAreaOL.addEventListener('drop', handleDropOL, false);

// Handle browsed files
inputEleOL.addEventListener('change', handleChangeOL, false);

function handleChangeOL(e) {
  var files = e.target.files;
  handleFilesOL(files);
}

function handleDropOL(e) {
  var dt = e.dataTransfer;
  var files = dt.files;

  handleFilesOL(files);
}

let uploadProgressOL = [];
let progressBarOL = document.getElementById('ol-progress-bar');

function initializeProgressOL(numFiles) {
  progressBarOL.value = 0;
  uploadProgressOL = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgressOL.push(0);
  }
}

function updateProgressOL(fileNumber, percent) {
  uploadProgressOL[fileNumber] = percent;
  let total = uploadProgressOL.reduce((tot, curr) => tot + curr, 0) / uploadProgressOL.length;
  progressBarOL.value = total;
}

function handleFilesOL(files) {
  files = [...files];
  initializeProgressOL(files.length);

  console.log(files);
  //for one by one upload code for multiple images
  // files.forEach(uploadFileOL);
  // files.forEach(previewFileOL);

  //for fulk upload files
  bulkUploadFilesOL(files);
  bulkPreviewFilesOL(files);

}

function previewFileOL(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '100px';
    img.src = reader.result;
    document.getElementById('ol-gallery').appendChild(img);
  }
}

function uploadFileOL(file, i) {
  var url = '/media/add';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgressOL(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgressOL(i, 100); // <- Add this
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


function bulkPreviewFilesOL(files) {
  files.forEach(function (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.createElement('img');
      img.style.width = '100px';
      img.style.height = '100px';
      img.src = reader.result;
      document.getElementById('ol-gallery').appendChild(img);
    }
  });
}

function bulkUploadFilesOL(files) {
  var i = 0;
  var url = '/media/add';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgressOL(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgressOL(i, 100); // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  });

  formData.append('action', 'static_banner');
  formData.append('upload_preset', 'ujpu6gyk');

  //handle multiple imamges
  files.forEach(function (file, j) {
    formData.append('photo', file);
  });

  // formData.append('photo[]', files);

  xhr.send(formData);
}

// ************************ IN STREAM VIDEO Drag and drop ***************** //
/*********
let dropAreaSV = document.getElementById("sv-drag-holder");
let inputEleSV = document.getElementById("sv-inputfile");

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropAreaSV.addEventListener(eventName, function (e) {
    e.preventDefault();
    e.stopPropagation();
  }, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropAreaSV.addEventListener(eventName, function (e) {
    dropAreaSV.classList.add('highlight');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropAreaSV.addEventListener(eventName, function unhighlight(e) {
    dropAreaSV.classList.remove('active');
    dropAreaSV.classList.remove('highlight');
  }, false);
});

// Handle dropped files
dropAreaSV.addEventListener('drop', handleDropSV, false);

// Handle browsed files
inputEleSV.addEventListener('change', handleChangeSV, false);

function handleChangeSV(e) {
  var files = e.target.files;
  handleFilesSV(files);
}

function handleDropSV(e) {
  var dt = e.dataTransfer;
  var files = dt.files;

  handleFilesSV(files);
}

let uploadProgressSV = [];
let progressBarSV = document.getElementById('sv-progress-bar');

function initializeProgressSV(numFiles) {
  progressBarSV.value = 0;
  uploadProgressSV = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgressSV.push(0);
  }
}

function updateProgressSV(fileNumber, percent) {
  uploadProgressSV[fileNumber] = percent;
  let total = uploadProgressSV.reduce((tot, curr) => tot + curr, 0) / uploadProgressSV.length;
  progressBarSV.value = total;
}

function handleFilesSV(files) {
  files = [...files];
  initializeProgressSV(files.length);

  console.log(files);
  //for one by one upload code for multiple images
  files.forEach(uploadFileOL);
  files.forEach(previewVideoFileSV);

  //for fulk upload files
  //   bulkUploadFilesSV(files);
  //   bulkPreviewFilesSV(files);
  // previewVideoFileSV(files);

}

function previewFileSV(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '100px';
    img.src = reader.result;
    document.getElementById('sv-gallery').appendChild(img);
  }
}

function uploadFileSV(file, i) {
  var url = '/media/add';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgressSV(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgressSV(i, 100); // <- Add this
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


function bulkPreviewFilesSV(files) {
  files.forEach(function (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      let img = document.createElement('img');
      img.style.width = '100px';
      img.style.height = '100px';
      img.src = reader.result;
      document.getElementById('sv-gallery').appendChild(img);
    }
  });
}

function previewVideoFileSV(file) {
  console.log(file.type);
  let blobURL = URL.createObjectURL(file);
  let vid = document.createElement('video');
  vid.style.width = 100;
  vid.style.height = 100;
  vid.src = blobURL;
  vid.controls = true;
  document.getElementById('sv-gallery').appendChild(vid);
}

function bulkUploadFilesSV(files) {
  var i = 0;
  var url = '/media/add';
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgressSV(i, (e.loaded * 100.0 / e.total) || 100);
  })

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgressSV(i, 100); // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  });

  formData.append('action', 'static_banner');
  formData.append('upload_preset', 'ujpu6gyk');

  //handle multiple imamges
  files.forEach(function (file, j) {
    formData.append('photo', file);
  });

  // formData.append('photo[]', files);

  xhr.send(formData);
}
*/