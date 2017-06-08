$(document).ready(function () {
  // Checking localStorage for added items into cart
  var initCart = function () {
    var localStorage = window.localStorage;
    if (localStorage.getItem('kapla_cart')) {
      $('[data-name=cart]').addClass('has-items');
    }
  };
  initCart();

  $('[data-name=cart_add]').on('click', function () {
    var localStorage = window.localStorage;
    localStorage.setItem('kapla_cart', true);
    initCart();
  })

  $('.Header-logo').on('dblclick', function () {
    var localStorage = window.localStorage;
    localStorage.removeItem('kapla_cart');
    $('[data-name=cart]').removeClass('has-items');
  })

  // Animating counter
  // https://codepen.io/dmcreis/pen/VLLYPo
  var a = 0;
  $(window).scroll(function () {
    if ($('[data-scroll]').length === 0) {
      return;
    }

    var oTop = $('[data-name=counter_wrapper]').offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $('[data-name=counter_figure]').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
            countNum: countTo
          },
          {
            duration: 2000,
            easing: 'swing',
            step: function() {
              $this.text(Math.floor(this.countNum));
            },
            complete: function() {
              $this.text(this.countNum);
            }
          });
      });
      a = 1;
    }

  });

  $('[data-name=checkout]').magnificPopup({
    items: [
      { src: 'img/checkout-1.png' },
      { src: 'img/checkout-2.png' },
      { src: 'img/checkout-3.png' },
      { src: 'img/checkout-4.png' },
    ],
    gallery: {
      enabled: true,
      arrowMarkup: ''
    },
    type: 'image' // this is default type
  });
})
