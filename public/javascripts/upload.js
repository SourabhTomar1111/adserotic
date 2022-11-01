AD = window.AD || {};

AD.types = ['static_banner', 'video_banner', 'overlay_banner', 'video_stream'];

AD.static_banner = {
  allowed_file_exts: ['jpg', 'jpeg', 'png', 'gif'],
  upload_url: '/media/static_banner',
  multiple: true,
  max_file_size_kb: 300
};
AD.video_banner = {
  allowed_file_exts: ['mp4', 'mpg', 'mpeg', 'avi'],
  upload_url: '/media/video_banner',
  multiple: true,
  max_file_size_mb: 1
};
AD.overlay_banner = {
  allowed_file_exts: ['png'],
  upload_url: '/media/overlay_banner',
  multiple: true,
  max_file_size_kb: 300
};
AD.video_stream = {
  allowed_file_exts: ['mp4', 'mpg', 'mpeg', 'avi', 'mov', 'wmv'],
  upload_url: '/media/video_stream',
  multiple: false,
  max_file_size_mb: 500,
  resolution: 1080,
  aspect_retio: '16:9',
  min_video_length: 5,
  max_video_length: 30
};

AD.imageTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];
AD.videoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/mpeg', 'video/mpg', 'video/quicktime', 'video/x-ms-wmv'];
//quicktime for mov and x-ms-wmv for wmv
AD.option = {
  labelText: "Click or Drag and Drop Files Here to Upload",
}
AD.tabs = {
  'static_banner': true,
  'overlay_banner': false,
  'video_banner': false,
  'video_stream': false,
  'rejected': false
}

/******************************customized code************************************/

//static_banner
let dropAreaSB = document.getElementById("sb-drag-holder");
let inputEleSB = document.getElementById("sb-inputfile");
let progressBarSB = document.getElementById('sb-progress-bar');
let previewDivSB = document.getElementById('sb-gallery');


//video_banner
let dropAreaVB = document.getElementById("vb-drag-holder");
let inputEleVB = document.getElementById("vb-inputfile");
let progressBarVB = document.getElementById('vb-progress-bar');
let previewDivVB = document.getElementById('vb-gallery');


//overlay_banner
let dropAreaOL = document.getElementById("ol-drag-holder");
let inputEleOL = document.getElementById("ol-inputfile");
let progressBarOL = document.getElementById('ol-progress-bar');
let previewDivOL = document.getElementById('ol-gallery');

//video_stream
let dropAreaSV = document.getElementById("sv-drag-holder");
let inputEleSV = document.getElementById("sv-inputfile");
let progressBarSV = document.getElementById('sv-progress-bar');
let previewDivSV = document.getElementById('sv-gallery');


// let uploadProgress = [];

attachEvents(dropAreaSB, inputEleSB, progressBarSB, previewDivSB);
attachEvents(dropAreaVB, inputEleVB, progressBarVB, previewDivVB);
attachEvents(dropAreaOL, inputEleOL, progressBarOL, previewDivOL);
attachEvents(dropAreaSV, inputEleSV, progressBarSV, previewDivSV);

let errors = [];


function attachEvents($dropArea, $inputFile, $progressBar, $previewDiv, $uploadProgress = []) {

  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    $dropArea.addEventListener(eventName, function preventDefaultsVB(e) {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  // Highlight drop area when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    $dropArea.addEventListener(eventName, function (e) {
      let _cur = this;
      _cur.classList.add('highlight');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    $dropArea.addEventListener(eventName, function (e) {
      let _cur = this;
      _cur.classList.remove('active');
      _cur.classList.remove('highlight');

    }, false);
  });

  // Handle dropped files
  $dropArea.addEventListener('drop', function (e) {
    let _cur = this;
    let dt = e.dataTransfer;
    let files = dt.files;
    let $type = $dropArea.dataset.type;
    console.log(files);

    initializeProgress(0, $progressBar);
    let label = $dropArea.querySelector('.sy-label');
    setLabelText(label, 'Uploading...');
    handleFiles(files, $type, $dropArea, $progressBar, $previewDiv, label);

  }, false);

  // Handle browsed files
  $inputFile.addEventListener('change', function (e) {
    let _cur = this;
    let files = e.target.files;
    let $type = $dropArea.dataset.type;

    initializeProgress(0, $progressBar);
    let label = $dropArea.querySelector('.sy-label');
    if (files.length) {
      setLabelText(label, 'Uploading...');
    } else {
      setLabelText(label, 'Click or Drag and Drop Files Here to Upload');
    }
    handleFiles(files, $type, $dropArea, $progressBar, $previewDiv, label);
  }, false);
}



function handleFiles(files, type, dropArea, progressBar, previewDiv, label) {
  files = [...files];

  errors = [];
  //clear previewDiv 
  if (previewDiv.innerHTML) {
    previewDiv.innerHTML = '';
  }

  //validation for files
  validateFiles(files, type);

  // console.log('Errors::',errors.length);

  if (errors.length) {
    setLabelText(label, errors[0]);
    alertify.error(errors[0]);
    return;
  }

  initializeProgress(files.length, progressBar);

  //for one by one upload code for multiple images
  files.forEach(function (file, index) {
    uploadFile(file, index, dropArea, type, progressBar, label);
  });


  // files.forEach(previewVideoFile(file, previewDiv));
  // files.forEach(previewFile);

  //multiple file at the same time
  // uploadFile(files, previewDiv);
  // previewFile(files, previewDiv);

  _bulkPreviewFiles(files, previewDiv);

}

function initializeProgress(numFiles, progressBar) {
  progressBar.value = 0;
  uploadProgress = [];

  for (let i = numFiles; i > 0; i--) {
    uploadProgress.push(i);
  }
}

function updateProgress(progressBar, fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
  progressBar.value = total;
}

function uploadFile(file, i, dropArea, type, progressBar, label) {

  var url = AD[type].upload_url;
  // console.log(url);
  var xhr = new XMLHttpRequest();
  var formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function (e) {
    updateProgress(progressBar, i, (e.loaded * 100.0 / e.total) || 100);
  });

  xhr.addEventListener('readystatechange', function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // updateProgress(progressBar, i, 100); // <- Add this
      var response = JSON.parse(xhr.responseText);

      if (response.code == 200) {

        //redirect to new location
        // window.location.reload();
        dropArea.getElementsByTagName('form')[0].reset();
        setLabelText(label, 'Click or Drag and Drop Files Here to Upload');
        dropArea.nextElementSibling.innerHTML = '';
        updateProgress(progressBar, i, 0);
        alertify.success(response.message);

        console.log('uploaded...')
        getRefreshData(type);


      }




    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
      // updateProgress(progressBar, i, 100);
    }
  });



  formData.append('action', type);
  formData.append('banner', file);
  xhr.send(formData);
}


function _bulkPreviewFiles(files, previewDiv) {
  files.forEach(function (file) {

    const isImage = AD.imageTypes.includes(file.type);
    const isVideo = AD.videoTypes.includes(file.type);

    if (isImage) {
      previewImageFile(file, previewDiv);
    } else if (isVideo) {
      //previewVideoFile(file, previewDiv);
    } else {
      //console.log('Not allowed file type');
    }

  });
}

function previewVideoFile(file, previewDiv) {
  let blobURL = URL.createObjectURL(file);
  let vid = document.createElement('video');
  // let source = document.createElement('source');
  // source.type = file.type;
  // source.src = blobURL;

  vid.style.width = 100;
  vid.style.height = 100;
  vid.style.margin = '10px';
  vid.src = blobURL;
  vid.controls = true;
  previewDiv.appendChild(vid);
}

function previewImageFile(file, previewDiv) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    let img = document.createElement('img');
    img.style.width = '100px';
    img.style.height = '100px';
    img.style.margin = '10px';
    img.src = reader.result;
    previewDiv.appendChild(img);
  }
}

function validateFiles(files, type) {
  switch (type) {
    case 'static_banner':
      files.forEach(validateStaticBanner);
      break;
    case 'overlay_banner':
      files.forEach(validateOverlayBanner);
      break;
    case 'video_banner':
      files.forEach(validateVideoBanner);
      break;
    case 'video_stream':
      files.forEach(validateVideoStream);
      break;

    default:
    // console.log('default case');
  }
}

function validateStaticBanner(file, i) {

  let sizeKb = getFileSizeKB(file.size);
  let ext = getFileExtension(file.type);

  // console.log('kb', sizeKb);
  // console.log(ext);

  if (!AD.static_banner.allowed_file_exts.includes(ext)) {
    errors.push('File is not allowed');
  }

  if (sizeKb > AD.static_banner.max_file_size_kb) {
    errors.push('File size exceeding..');
  }
}

function validateOverlayBanner(file, i) {

  let sizeKb = getFileSizeKB(file.size);
  let ext = getFileExtension(file.type);

  // console.log('kb', sizeKb);
  // console.log(ext);

  if (!AD.overlay_banner.allowed_file_exts.includes(ext)) {
    errors.push('File is not allowed');
  }

  if (sizeKb > AD.overlay_banner.max_file_size_kb) {
    errors.push('File size exceeding..');
  }
}

function validateVideoBanner(file, i) {

  let sizeKb = getFileSizeMB(file.size);
  let ext = getFileExtension(file.type);

  // console.log('MB', sizeKb);
  // console.log(ext);

  if (!AD.video_banner.allowed_file_exts.includes(ext)) {
    errors.push('File is not allowed');
  }

  if (sizeKb > AD.video_banner.max_file_size_mb) {
    errors.push('File size exceeding..');
  }
}

function validateVideoStream(file, i) {

  let sizeKb = getFileSizeMB(file.size);
  let ext = getFileExtension(file.type);

  if (!AD.video_stream.multiple && i != 0) {
    errors.push('Multiple files not allowed');
  }

  if (!AD.video_stream.allowed_file_exts.includes(ext)) {
    errors.push('File is not allowed');
  }


  if (!AD.video_stream.allowed_file_exts.includes(ext)) {
    errors.push('File is not allowed');
  }

  if (sizeKb > AD.video_stream.max_file_size_mb) {
    errors.push('File size exceeding..');
  }
}

function getFileExtension($file_type) {
  let [type, ext] = $file_type.split("/");
  console.log(type, ext);

  if (ext) {
    return ext;
  }
  return null;
}

function getFileSizeKB($filesize) {
  let sizeKB = Math.ceil($filesize / 1024);
  if (sizeKB) {
    return sizeKB;
  }
  return 0;
}

function getFileSizeMB($filesize) {
  let sizeMB = Math.ceil($filesize / (1024 * 1024));
  if (sizeMB) {
    return sizeMB;
  }
  return 0;
}

function setLabelText(label, text) {
  label.innerHTML = text;
}


function getData($type, target) {

  if (!AD.tabs[$type]) {
    AD.tabs[$type] = true;
    // console.log('Fetching data...', $type);
    let url = '/media/getAllStaticBanner';
    switch ($type) {
      case 'static_banner':
        url = '/media/getAllStaticBanner';
        break;
      case 'overlay_banner':
        url = '/media/getAllOverlayBanner';
        break;
      case 'video_banner':
        url = '/media/getAllVideoBanner';
        break;
      case 'video_stream':
        url = '/media/getAllVideoStream';
        break;
      case 'rejected':
        url = '/media/getAllRejected';
        break;
    }

    let i =1;
    $(target + ' table').DataTable({
      retrieve: true,
      language: {
        "emptyTable": "No records to display"
      },
      ajax: {
        url: url,
        dataSrc: 'data'
      },
      columns: [
        {
          "render": function(data, type, full, meta) {
            return i++;
          }
        },
        { data: 'title' },
        { data: 'name' },
        { data: 'extension' },
        {
          data: 'id',
          render: function (data, type, row) {
            return '<a class="btn del-lbl-btn ml-3" data-id="' + data + '" role="button" title="Delete"><i class="fas fa-trash"></i></a>&nbsp;<a class="btn show-lbl-btn ml-3" data-id="' + data + '" role="button" title="Delete"><i class="fas fa-eye"></i></a>';
          }
        },
      ]
    });


  } else {
  }

  return false;
}

function getRefreshData($type) {
  let tab = $('ul#myTab li a[data-type="'+$type+'"]');
  let target = $(tab).attr('href');
  // console.log('New target', target);
  // if (!AD.tabs[$type]) {
    // AD.tabs[$type] = true;
    console.log('Fetching data...', $type);
    let url = '/media/getAllStaticBanner';
    switch ($type) {
      case 'static_banner':
        url = '/media/getAllStaticBanner';
        break;
      case 'overlay_banner':
        url = '/media/getAllOverlayBanner';
        break;
      case 'video_banner':
        url = '/media/getAllVideoBanner';
        break;
      case 'video_stream':
        url = '/media/getAllVideoStream';
        break;
      case 'rejected':
        url = '/media/getAllRejected';
        break;
    }

    let i =1;
    $(target + ' table').DataTable({
      retrieve: true,
      language: {
        "emptyTable": "No records to display"
      },
      order: [[0, "desc"]],
      ajax: {
        url: url,
        dataSrc: 'data'
      },
      columns: [
        {
          "render": function (data, type, full, meta) {
            return i++;
          }
        },
        { data: 'title' },
        { data: 'name' },
        { data: 'extension' },
        {
          data: 'id',
          render: function (data, type, row) {
            return '<a class="btn del-lbl-btn ml-3" data-id="' + data + '" role="button" title="Delete"><i class="fas fa-trash"></i></a>&nbsp;<a class="btn show-lbl-btn ml-3" data-id="' + data + '" role="button" title="View"><i class="fas fa-eye"></i></a>';
          }
        },
      ]
    }).ajax.reload();


  // } else {
  // }

  return false;
}



$('#media-tab1 a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var _target = $(e.target).attr("href") // activated tab
  var type = $(this).data('type');
  var da1 = $(_target).find('div[data-type="' + type + '"]');

  if (da1.length) {

    var frm1 = da1.find('form');
    $(frm1).get(0).reset();

    var lbl1 = frm1.find('label');
    lbl1.text(AD.option.labelText);

    var pp1 = da1.find('progress');
    pp1.val(0);

    var gal1 = da1.next('.gallery');
    gal1.html('');
 }

  //get data here since rejected to data
  getData(type, _target);

});


jQuery(document).ready(function ($) {

  let i=1;
  $('#static table').DataTable({
    language: {
      "emptyTable": "No records to display"
    },
    ajax: {
      url: '/media/getAllStaticBanner',
      dataSrc: 'data'
    },
    columns: [
      {
        "render": function(data, type, full, meta) {
          return i++;
        }
      },
      { data: 'title' },
      { data: 'name' },
      { data: 'extension' },
      {
        data: 'id',
        render: function (data, type, row) {
          return '<a class="btn del-lbl-btn ml-3" data-id="' + data + '" role="button" title="Delete"><i class="fas fa-trash"></i></a>&nbsp;<a class="btn show-lbl-btn ml-3" data-id="' + data + '" role="button" title="View"><i class="fas fa-eye"></i></a>';
        }
      },
    ]
  });


  $(document).on('click', '.del-lbl-btn', function () {
    let _this = $(this);
    let id = _this.data('id');
    let data = new FormData();
    data.append("id", id);

    let url = "/media/delete";

    $.ajax({
      type: "DELETE",
      enctype: 'multipart/form-data',
      url: url,
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 800000,
      success: function (data) {

        if (data.code == 400) {
          let errors = data.error.errors;
          errors.map(element => {
            alertify.message(element.msg);
          });
        }

        if (data.code == 200) {
          getDataTable().ajax.reload();
          // console.log('reloaded:');          
          $(_this).parents('tr').hide();
          alertify.success(data.message);
        }

      },
      error: function (e) {
        alertify.error(data);
      }
    });
  });

  $(document).on('click', '.show-lbl-btn', function () {
    let _this = $(this);
    let id = _this.data('id');
    let data = new FormData();
    data.append("id", id);

    let url = "/media/show";

    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: url,
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 800000,
      success: function (res) {

        if (res.code == 400) {
          let errors = res.error.errors;
          errors.map(element => {
            alertify.message(element.msg);
          });
        }

        if (res.code == 200) {
          // console.log(res);
          $('#viewModal').find('.modal-body').html(res.data);
          $('#show-me').click();
          // alertify.success(res.message);
        }

      },
      error: function (e) {
        alertify.error(data);
      }
    });
  });


});


/**************custom functions******************/
function getDataTable() {

  let jtable = $('#myTable');
  let dtable = jtable.DataTable({
    language: {
      "emptyTable": "No records to display"
    },
    order: [[0, "desc"]],
    ajax: '/label/getAll',
    retrieve: true,
    columns: [
      {
        "render": function (data, type, full, meta) {
          return i++;
        }
      },
      { data: 'title' },
      {
        data: 'id',
        render: function (data, type, row) {
          return '<a class="btn del-lbl-btn ml-3" data-id="' + data + '" role="button" title="Delete"><i class="fas fa-trash"></i></a>&nbsp;<a class="btn view-lbl-btn ml-3" data-id="' + data + '" role="button" title="View"><i class="fas fa-eye"></i></a>';
        }
      },
    ]
  });

  return dtable;

}