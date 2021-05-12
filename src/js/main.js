/****************************/
const headerMenuBtn = document.querySelector('.header-menu');
const menuMobile = document.querySelector('.menu-mobile');

headerMenuBtn.addEventListener('click', function () {
  this.classList.toggle("active");
  menuMobile.classList.toggle("is-show");
});
/****************************/

const resultsSlider = new Swiper('.js-slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  autoHeight: true,

  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1
    },
    730: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
});



document.addEventListener('click', function (event) {

  if (event.target.dataset.show === 'consultation') {
    event.preventDefault()
    console.log('consultation');
  }
});


const windowWidth = (window.innerWidth); // вся ширина окна
const documentWidth = (document.documentElement.clientWidth); // ширина минус прокрутка
//
//
// window.onscroll = function() {stickyHeader()};
//
// const header = document.querySelector(".section-header");
//
// const sticky = header.offsetTop;
//
// function stickyHeader() {
//   if (window.pageYOffset > sticky) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
// }



/****************************************************************/
/****************************************************************/
/****************************************************************/




$(function () {


  /*c-dropdown-menu*/
  $(document).on('click', '.js-dropdown-menu .c-dropdown-menu__value', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("is-show");
    $(this).siblings('.c-dropdown-menu-list').slideToggle();
  });

  $(document).on('click', '.js-dropdown', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass("is-show");
    $(this).siblings().slideToggle();
  });
  /**/

  const $html = $('html');
  //
  $('.js-phone-mask').mask('+7(000)000-00-00', {clearIfNotMatch: true});

  function showPopup(icon, popup) {
    $(document).on('click', icon, function (e) {

      e.preventDefault();
      const costType = $(this).attr('data-type');
      const costName = $(this).attr('data-name');
      console.log('type', costType);
      console.log('name', costName);
      if(costType !== ''){

        $(popup).addClass(costType);
        $(popup).find('.popup-title').text(costName)
      }

      $(popup).addClass('is-visible');
      $('.mfp-bg').addClass('is-visible');


      $html.addClass('blocked');
      // $('body').addClass('blocked');

      var widthScroll = windowWidth - documentWidth;
      console.log('widthScroll: ' + widthScroll);
      if (windowWidth > documentWidth) {
        $html.css({
          'margin-right': widthScroll
        });
        $header.css({
          'padding-right': widthScroll
        });
      } else {
      }
    });
  }







  $(document).on('click', '.js-popup-close', function (e) {
    e.preventDefault();
    $(this).parents('.mfp-wrap').removeClass('is-visible');
    $('.mfp-bg').removeClass('is-visible');
    $html.css({
      'margin-right': '0'
    }).removeClass('blocked');

    $header.css({
      'padding-right': '0'
    });

    var parentModal = $(this).parents('.mfp-wrap');
    if (parentModal.data('save')) {
      onPopupClose(parentModal);
    }
  });

  showPopup(".js-show-consultation", '.popup-auth');
  showPopup(".js-show-email", '.popup-email');


  $(document).on('click', '.js-show-menu', function (e) {
    e.preventDefault();
    $('.menu-mobile').toggleClass('is-visible');
  });




  //
  //
  // $('.header-menu__link, .banner-arrow__icon, .header-logo a').on('click', function(event) {
  //   event.preventDefault();
  //
  //     // Store hash
  //     var hash = this.hash;
  //     var heightHeader = $('.section-header').height();
  //     var heightHash = $(hash).offset().top - heightHeader ;
  //
  //
  //     $('html, body').animate({
  //
  //       scrollTop: heightHash
  //
  //     }, 800);
  // });

  // $('.header-logo a').on('click', function(event) {
  //   event.preventDefault();
  //   $('html, body').animate({
  //
  //     scrollTop: $('html').offset().top
  //
  //   }, 300);
  // });
  //
  //
  // /*простые табы*/
  $(document).on('click', '.tabs-menu a', function(event) {
    event.preventDefault();
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    let tab = $(this).attr("href");
    $('.tab').find(".tab-content").not(tab).css("display", "none");
    // $(this).parents('.tabs-menu').parent().siblings('.tab').find(".tab-content").not(tab).css("display", "none");
    $(tab).fadeIn();
  });


});
