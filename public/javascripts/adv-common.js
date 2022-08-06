jQuery(document).ready(function(){
  getUserPagesDT1();

    $('.campaigns').on('click', '.del-page-btn', function(){
        let _this = $(this);
        let id = _this.data('id');

        alertify.confirm('Delete', 'Are you sure!', 
        function(){ 
            let data = new FormData();
        data.append("id", id);

        let url="/campaigns/delete";

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


  
 function getUserPagesDT1() {
  let i = 1;
  let jtable = $("#mytable");
  let dtable = jtable.DataTable({
    columns: [
      
      {
        
        render: function (data) {
          return (
            '<a class="btn del-page-btn ml-3" data-id="' +
            data +
            '" role="button" title="Delete"><i class="fas fa-trash"></i></a>'
          );
        },
      },
    ],
  });

  return dtable;
}


// function getUserPagesDT1() {

  
//     $.ajax({
//       url : "/campaigns",
//     success: function(dtable) {
//       var data = JSON.parse(dtable)
//       var st = "";
//       $.each(data, function(index){
//          st += "<tr><td>"+data[index].url+"</td>";
//       });
//       $("#showData").html(st);
//     }
//   })
// // })
// }
 

 


