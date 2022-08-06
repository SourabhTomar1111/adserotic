let AD = window.AD || {};
console.log(AD);

// jQuery(window).load(function(){
//    console.log("loaded...");
// });

jQuery(document).ready(function ($) {


    // $('#myTable').DataTable({
    //     ajax: '/label/getAll',
    //     columns: [
    //         { data: 'id' },
    //         { data: 'title' },
    //         { data: 'id' },
    //         { data: 'title' },
    //     ]
    // });
    // let table = $('#myTable');
    // let table = document.querySelector('#myTable');

    // getDataRandom(table);

    getDataTable();

    main();




});

function onLoadLable() {
    alert('claled');
}

//add label 

// getLabels();

function main() {

    // let table = $('#myTable');
    // let dtable = getDataTable();
    // getDataTable();
    let lbl_frm = document.querySelector('#add-lbl-form');
    let lbl_btn = document.querySelector('#add-lbl-btn');
    let cancel_btn = document.querySelector('#cancel-lbl-btn');
    let lbl_title_in = $('#lbl-title');

    $(lbl_title_in).on('keyup', function () {
        if ($(this).val().length >= 3) {
            $(lbl_btn).removeAttr('disabled');
        } else {
            $(lbl_btn).attr('disabled', 1);
        }
    });
    // console.log(lbl_btn.length);
    // if (lbl_btn.length) {

    lbl_btn.onclick = function () {
        let lbltitle = $('#lbl-title').val();
        console.log(lbltitle.length);
        if (lbltitle.length) {
            $.post("/label/add_new",
                {
                    title: lbltitle,
                },
                function (data, status) {
                    console.log(data);
                    console.log(status);

                    if (data.code == 200) {
                        lbl_frm.reset();
                        // alert(data.message);
                        alertify.success(data.message);

                        // getDataRandom();
                        // getmyData();
                        getDataTable().ajax.reload();
                        // dtable.ajax.reload();
                    }

                    if (data.code == 400) {
                        // console.log(data.message);
                        // alert(data.message);
                        alertify.error(data.message);
                    }
                });
        }


    }
    // }


    cancel_btn.onclick = function () {
        lbl_frm.reset();
        $(lbl_btn).attr('disabled', 1);
    }


    $(document).on('click', '.del-lbl', function(){
        let _this = $(this);
        let id = _this.data('id');
        let data = new FormData();
        data.append("id", id);

        let url="/label/delete";

        $.ajax({
            type: "POST",
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
                getDataTable();
                $(_this).parents('tr').hide();
                alertify.success(data.message);
              }
      
            },
            error: function (e) {
              alertify.error(data);
            }
          });
    });


    

}//ready



function getLabels() {
    $.get("/label/getAll", function (data, status) {
        console.log(data);
        console.log(status);

        if (data.status == 200) {
            // lbl_frm.reset();
            alert(data.message);
        }

        if (data.status == 400) {
            // console.log(data.message);
            alert(data.message);
        }
    });
}

function getDataRandom(table) {

    // let table = document.querySelector('#myTable');
    // console.log(table);
    let i =1;
    table.DataTable({
        language: {
            "emptyTable": "No records to display"
        },
        order: [[ 0, "desc" ]],
        ajax: '/label/getAll',
        retrieve: true,
        columns: [
            {
                "render": function (data, type, full, meta) {
                  return i++;
                }
            },
            { data: 'title' },
            { data: 'id' },
            { data: 'title' },
        ],
        
    });

}

function getDataTable() {
   
    let i =1;
    let jtable = $('#myTable');
    let dtable = jtable.DataTable({
        language: {
            "emptyTable": "No records to display"
        },
        ajax: '/label/getAll',
        retrieve: true,
        columns: [
            {
                data: 'id',
                "render": function (data, type, full, meta) {
                  return i++;
                }
            },
            { data: 'title' },
            { 
                data: 'id',
                render: function ( data, type, row ) {
                    return '<a class="btn del-lbl ml-3" data-id="'+data+'" role="button" title="Delete"><i class="fas fa-trash"></i></a>';
                }
             },
        ]
    });

    return dtable;

}



function getmyData() {
    $.get('/label/getAll',
        function (data, status) {
            console.log(data);
            console.log(status);


        });
}


/************************************************************************/