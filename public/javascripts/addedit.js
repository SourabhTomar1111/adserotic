jQuery(document).ready(function () {
  
  $(".addedit input[type=radio]").change(function () {
    const _current = $(this);
    let target = _current.data("toggle-target");

    if (target !== undefined) {
      let name = _current.attr("name");

      if ($("div[data-toggle-group=" + name + "]").length) {
        $("div[data-toggle-group=" + name + "]").addClass("d-none");
        $("div[data-toggle=" + target + "]").removeClass("d-none");
      }

      if ($("div[data-toggle=" + target + "]").hasClass("expandable")) {
        if ($("div[data-toggle=" + target + "]").hasClass("d-none")) {
          $("div[data-toggle=" + target + "]").removeClass("d-none");
        } else {
          $("div[data-toggle=" + target + "]").addClass("d-none");
        }
      }
    }
  });

  $('#create-group-btn').click(function(){
    let form = $(this).parents('form');
    let url = form.attr('action');
    let name = form.find('input').val();
    console.log(form)
    console.log(url)
    console.log(name)

    if(!name.length){
      alertify.error('Enter Name');
      return;
    }   

        $.ajax({
            type: "POST",
            url: url,
            data: {name},
            success: function (data) {
      
              if (data.status == 401) {
                alertify.error(data.msg);
              }
      
              if (data.status == 200) {  
                $('#create-close-btn').click(); 
                $(form).get(0).reset();
                alertify.success(data.msg);
              }
      
            },
            error: function (e) {
              alertify.error(data);
            }
          });
       
  });

  $(".cookie-add-btn").click(function () {
    const _cur = $(this);
    const _frm = _cur.parents('.form-tag');
    const _cont = _cur.parents('.content');
    const _tbl = _cont.find('.cookie-table');
    const _bdy = _tbl.find('table tbody');
    
    let s = _frm.find('.site-name');
    let n = _frm.find('.cookie-name');
    let v = _frm.find('.cookie-value');
    let a = _frm.find('.cookie-age');
    let pr = _frm.find('.add-cookie');

    let sv = s.val();
    let nv = n.val();
    let vv = v.val();
    let av = a.val();
    let prv = pr.val();

    if(sv == ''  || nv == ''   || vv == ''  || av == '' ){
      alert('Plz add sitename, cookiename, cookievalue, cookieage');
    }else{
      let mins =  60 * 60 * 24 * av;
      let arrObj = {'site_name': sv, 'name': nv, 'value': vv, 'age': mins};
      let _tr = '<tr><td>'+sv+'</td><td>'+nv+'</td><td>'+vv+'</td><td>'+mins+'</td><td><a class="view-code-btn btn btn-secondary view-code-btn">view code</a></td></tr>'
      
      _bdy.append(_tr);
      let newArr = [];
      if(prv != ''){
        let preArr = JSON.parse(prv);
        preArr.push(arrObj)
        newArr = preArr;        
      }else{
        newArr.push(arrObj);
      }
      pr.val(JSON.stringify(newArr));


      s.val('');
      n.val('');
      v.val('');
      a.val('');
    }

  });

  $(".cookie-cancel-btn").click(function () {
    const _cur = $(this);
    const _frm = _cur.parents('.form-tag');
    let s = _frm.find('.site-name');
    let n = _frm.find('.cookie-name');
    let v = _frm.find('.cookie-value');
    let a = _frm.find('.cookie-age');

    s.val('');
    n.val('');
    v.val('');
    a.val('');
  });

  $(".content table tbody").on('click', '.view-code-btn', function () {
    alert('view code')
  });
  

});
