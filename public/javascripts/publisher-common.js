jQuery(document).ready(function(){
    getPagesDataTable();

    $('.page-list').on('click', '.del-lbl', function(){
        let _this = $(this);
        let id = _this.data('id');

        alertify.confirm('Delete', 'Are you sure!', 
        function(){ 
            let data = new FormData();
        data.append("id", id);

        let url="/pages/delete";

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
      
              if (data.code == 400 && data.status == "error") {
                alertify.error(data.message);
              }
      
              if (data.code == 200 && data.status == "success") {  
                alertify.success(data.message);
                window.location.reload();
              }
      
            },
            error: function (e) {
              alertify.error(data);
            }
          });
        },
        function(){
             //do nothing 
        });

        

        

    });
});

function getPagesDataTable() {
  let i = 1;
  let jtable = $("#myTable");
  let dtable = jtable.DataTable({
    language: {
      emptyTable: "No records to display",
    },
    ajax: "/pages/getAll",
    retrieve: true,
    columns: [
      {
        data: "id",
        render: function (data, type, full, meta) {
          return i++;
        },
      },
      { data: "url" },
      { 
          data: "category",
          render: function (data, type, full, meta) {
              if(data == 1)
              return "Straight"
              if(data == 2)
              return "Gay"
              if(data == 3)
              return "Trans"            
          },
     },
      { 
          data: "state",
          render: function (data, type, full, meta) {
            if(data == 1)
            return "Active"
            return "Deactive"            
        },
      },
      { data: "price" },
      {
        data: "id",
        render: function (data, type, row) {
          return (
            '<a class="btn .del-lbl ml-3" data-id="' +
            data +
            '" role="button" title="Delete"><i class="fas fa-trash"></i></a>'
          );
        },
      },
    ],
  });

  return dtable;
}

