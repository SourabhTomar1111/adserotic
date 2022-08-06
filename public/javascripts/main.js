
(function () {
  "use strict";


  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }



  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

})()

jQuery(document).ready(function () {
  //do register code here
  $('#btn-pub-reg').on('click', function (e) {
    e.preventDefault();

    let form = $('#frm-pub').get(0);
    let url =  $(form).attr('action');
    

    // Create an FormData object 
    var data = new FormData(form);

    // If you want to add an extra field for the FormData
    data.append("CustomField", "This is some extra data, testing");

    // disabled the submit button
    $("#btnSubmit").prop("disabled", true);

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
          console.log(data.error);
          let errors = data.error.errors;
          errors.map(element => {
            alertify.message(element.msg);
          });
        }

        if (data.code == 200) {
          form.reset();          
          alertify.success(data.message, 0, function(){
            window.location.href=data.redirect;
          });
        }

      },
      error: function (e) {
        alertify.error(data);
      }
    });

  });

  $('#btn-adv-reg').on('click', function (e) {
    e.preventDefault();

    let form = $('#frm-adv').get(0);
    let url = $(form).attr('action');

    // Create an FormData object 
    var data = new FormData(form);

    // If you want to add an extra field for the FormData
    data.append("CustomField", "This is some extra data, testing");

    // disabled the submit button
    $("#btnSubmit").prop("disabled", true);

    

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

        // $("#output").text(data);
        // console.log("SUCCESS : ", data);
        // $("#btnSubmit").prop("disabled", false);

        if (data.code == 400) {
          console.log(data.error);
          let errors = data.error.errors;
          errors.map(element => {
            alertify.message(element.msg);
          });
        }

        if (data.code == 200) {
          form.reset();          
          alertify.success(data.message, 0, function(){
            window.location.href=data.redirect;
          });
        }

      },
      error: function (e) {
        alertify.error(data);
      }
    });

  });

  

});//ready




